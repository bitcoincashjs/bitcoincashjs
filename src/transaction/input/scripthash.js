'use strict';

var _ = require('lodash');
var inherits = require('inherits');
var Input = require('./input');
var Output = require('../output');
var $ = require('../../util/preconditions');

var Script = require('../../script');
var Signature = require('../../crypto/signature');
var Sighash = require('../sighash');
var PublicKey = require('../../publickey');
var BufferUtil = require('../../util/buffer');
var TransactionSignature = require('../signature');

/**
 * @constructor
 */
function ScriptHashInput(input, pubkeys, redeemScript) {
  Input.apply(this, arguments);
  var self = this;
  this.publicKeys = pubkeys || input.publicKeys;
  this.threshold = threshold || input.threshold;
  this.redeemScript = redeemScript;
  $.checkState(Script.buildScriptHashOut(this.redeemScript).equals(this.output.script),
    'Provided redeemScript doesn\'t hash to the provided output');
  this.publicKeyIndex = {};
  this.publicKeys.forEach((publicKey, index) => {
    self.publicKeyIndex[publicKey.toString()] = index;
  });
  // Empty array of signatures
  this.signatures = new Array(this.publicKeys.length);
}
inherits(ScriptHashInput, Input);

ScriptHashInput.prototype.toObject = function() {
  var obj = Input.prototype.toObject.apply(this, arguments);
  obj.threshold = this.threshold;
  obj.publicKeys = this.publicKeys.map(publicKey => publicKey.toString());
  obj.signatures = this._serializeSignatures();
  return obj;
};

ScriptHashInput.prototype._deserializeSignatures = function(signatures) {
  return signatures.map(signature => signature ? new TransactionSignature(signature) : undefined);
};

ScriptHashInput.prototype._serializeSignatures = function() {
  return this.signatures.map(signature => signature ? signature.toObject() : undefined);
};

ScriptHashInput.prototype.getSignatures = function(transaction, privateKey, index, sigtype) {
  $.checkState(this.output instanceof Output, 'Malformed output found when signing transaction');
  sigtype = sigtype || (Signature.SIGHASH_ALL |  Signature.SIGHASH_FORKID);

  var self = this;
  var results = [];
  this.publicKeys.forEach(publicKey => {
    if (publicKey.toString() === privateKey.publicKey.toString()) {
      results.push(new TransactionSignature({
        publicKey: privateKey.publicKey,
        prevTxId: self.prevTxId,
        outputIndex: self.outputIndex,
        inputIndex: index,
        signature: Sighash.sign(transaction, privateKey, sigtype, index, self.redeemScript, self.output.satoshisBN),
        sigtype: sigtype
      }));
    }
  });
  return results;
};

ScriptHashInput.prototype.addSignature = function(transaction, signature) {
  $.checkState(!this.isFullySigned(), 'All needed signatures have already been added');
  $.checkArgument(this.publicKeyIndex[signature.publicKey.toString()] !== undefined,
    'Signature has no matching public key');
  $.checkState(this.isValidSignature(transaction, signature));
  this.signatures[this.publicKeyIndex[signature.publicKey.toString()]] = signature;
  this._updateScript();
  return this;
};

ScriptHashInput.prototype._updateScript = function() {
  this.setScript(Script.buildP2SHMultisigIn(
    this.publicKeys,
    this.threshold,
    this._createSignatures(),
    { cachedMultisig: this.redeemScript }
  ));
  return this;
};

ScriptHashInput.prototype._createSignatures = function() {
  const definedSignatures = this.signatures.filter(signature => signature !== undefined)
  return definedSignatures.map(
    signature => BufferUtil.concat([
      signature.signature.toDER(),
      BufferUtil.integerAsSingleByteBuffer(signature.sigtype)
    ])
  )
};

ScriptHashInput.prototype.clearSignatures = function() {
  this.signatures = new Array(this.publicKeys.length);
  this._updateScript();
};

ScriptHashInput.prototype.isFullySigned = function() {
  return this.countSignatures() === this.threshold;
};

ScriptHashInput.prototype.countMissingSignatures = function() {
  return this.threshold - this.countSignatures();
};

ScriptHashInput.prototype.countSignatures = function() {
  return this.signatures.reduce((sum, signature) => sum + !!signature, 0);
};

ScriptHashInput.prototype.publicKeysWithoutSignature = function() {
  var self = this;
  return this.publicKeys.filter(publicKey => !(self.signatures[self.publicKeyIndex[publicKey.toString()]]));
};

ScriptHashInput.prototype.isValidSignature = function(transaction, signature) {
  // FIXME: Refactor signature so this is not necessary
  signature.signature.nhashtype = signature.sigtype;
  return Sighash.verify(
      transaction,
      signature.signature,
      signature.publicKey,
      signature.inputIndex,
      this.redeemScript,
      this.output.satoshisBN
  );
};

ScriptHashInput.OPCODES_SIZE = 7; // serialized size (<=3) + 0 .. N .. M OP_CHECKMULTISIG
ScriptHashInput.SIGNATURE_SIZE = 74; // size (1) + DER (<=72) + sighash (1)
ScriptHashInput.PUBKEY_SIZE = 34; // size (1) + DER (<=33)

ScriptHashInput.prototype._estimateSize = function() {
  return ScriptHashInput.OPCODES_SIZE +
    this.threshold * ScriptHashInput.SIGNATURE_SIZE +
    this.publicKeys.length * ScriptHashInput.PUBKEY_SIZE;
};

module.exports = ScriptHashInput;
