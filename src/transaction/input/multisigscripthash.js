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
function MultiSigScriptHashInput(input, pubkeys, threshold, signatures, redeemScript) {
  Input.apply(this, arguments);
  var self = this;
  pubkeys = pubkeys || input.publicKeys;
  this.threshold = threshold || input.threshold;
  signatures = signatures || input.signatures;
  this.publicKeys = _.sortBy(pubkeys, publicKey => publicKey.toString('hex'));
  this.redeemScript = redeemScript || Script.buildMultisigOut(this.publicKeys, this.threshold);
  $.checkState(Script.buildScriptHashOut(this.redeemScript).equals(this.output.script),
    'RedeemScript does not hash to the provided output'
  );
  this.publicKeyIndex = {};
  this.publicKeys.forEach((publicKey, index) =>
    self.publicKeyIndex[publicKey.toString()] = index
  );
  // Empty array of signatures
  this.signatures = signatures ? this._deserializeSignatures(signatures) : new Array(this.publicKeys.length);
}
inherits(MultiSigScriptHashInput, Input);

MultiSigScriptHashInput.prototype.toObject = function() {
  var obj = Input.prototype.toObject.apply(this, arguments);
  obj.threshold = this.threshold;
  obj.publicKeys = this.publicKeys.map(publicKey => publicKey.toString());
  obj.signatures = this._serializeSignatures();
  return obj;
};

MultiSigScriptHashInput.prototype._deserializeSignatures = function(signatures) {
  return signatures.map(signature => signature ? new TransactionSignature(signature) : undefined);
};

MultiSigScriptHashInput.prototype._serializeSignatures = function() {
  return this.signatures.map(signature => signature ? signature.toObject() : undefined);
};

MultiSigScriptHashInput.prototype.getSignatures = function(transaction, privateKey, index, sigtype) {
  $.checkState(this.output instanceof Output, 'Malformed output found when signing transaction');
  sigtype = sigtype || (Signature.SIGHASH_ALL |  Signature.SIGHASH_FORKID);

  var publicKeysForPrivateKey = this.publicKeys.filter(publicKey => publicKey.toString() === privateKey.publicKey.toString())
  return publicKeysForPrivateKey.map(publicKey => new TransactionSignature({
    publicKey: privateKey.publicKey,
    prevTxId: this.prevTxId,
    outputIndex: this.outputIndex,
    inputIndex: index,
    signature: Sighash.sign(transaction, privateKey, sigtype, index, this.redeemScript, this.output.satoshisBN),
    sigtype: sigtype
  }))
};

MultiSigScriptHashInput.prototype.addSignature = function(transaction, signature) {
  $.checkState(!this.isFullySigned(),
    'All needed signatures have already been added'
  );
  $.checkArgument(this.publicKeyIndex[signature.publicKey.toString()] !== undefined,
    'Signature has no matching public key'
  );
  $.checkState(this.isValidSignature(transaction, signature),
    'Signature invalid'
  );
  this.signatures[this.publicKeyIndex[signature.publicKey.toString()]] = signature;
  this._updateScript();
  return this;
};

MultiSigScriptHashInput.prototype._updateScript = function() {
  this.setScript(Script.buildP2SHMultisigIn(
    this.publicKeys,
    this.threshold,
    this._createSignatures(),
    { cachedMultisig: this.redeemScript }
  ));
  return this;
};

MultiSigScriptHashInput.prototype._createSignatures = function() {
  const definedSignatures = this.signatures.filter(signature => signature !== undefined)
  return definedSignatures.map(
    signature => BufferUtil.concat([
      signature.signature.toDER(),
      BufferUtil.integerAsSingleByteBuffer(signature.sigtype)
    ])
  )
};

MultiSigScriptHashInput.prototype.clearSignatures = function() {
  this.signatures = new Array(this.publicKeys.length);
  this._updateScript();
};

MultiSigScriptHashInput.prototype.isFullySigned = function() {
  return this.countSignatures() === this.threshold;
};

MultiSigScriptHashInput.prototype.countMissingSignatures = function() {
  return this.threshold - this.countSignatures();
};

MultiSigScriptHashInput.prototype.countSignatures = function() {
  return this.signatures.reduce((sum, signature) => sum + !!signature, 0);
};

MultiSigScriptHashInput.prototype.publicKeysWithoutSignature = function() {
  return this.publicKeys.filter(publicKey => !(this.signatures[this.publicKeyIndex[publicKey.toString()]]));
};

MultiSigScriptHashInput.prototype.isValidSignature = function(transaction, signature) {
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

MultiSigScriptHashInput.OPCODES_SIZE = 7; // serialized size (<=3) + 0 .. N .. M OP_CHECKMULTISIG
MultiSigScriptHashInput.SIGNATURE_SIZE = 74; // size (1) + DER (<=72) + sighash (1)
MultiSigScriptHashInput.PUBKEY_SIZE = 34; // size (1) + DER (<=33)

MultiSigScriptHashInput.prototype._estimateSize = function() {
  return MultiSigScriptHashInput.OPCODES_SIZE +
    this.threshold * MultiSigScriptHashInput.SIGNATURE_SIZE +
    this.publicKeys.length * MultiSigScriptHashInput.PUBKEY_SIZE;
};

module.exports = MultiSigScriptHashInput;
