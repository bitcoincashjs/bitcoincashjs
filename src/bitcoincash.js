'use strict';

var bch = module.exports;

// module information
bch.version = 'v' + require('../package.json').version;
bch.versionGuard = function(version) {
  return
  // if (version !== undefined) {
  //   var message = 'More than one instance of bitcoincashjs found. ' +
  //     'Please make sure to require bitcoincashjs and check that submodules do' +
  //     ' not also include their own bitcoincashjs dependency.';
  //   throw new Error(message);
  // }
};
bch.versionGuard(global._bch);
global._bch = bch.version;

// crypto
bch.crypto = {};
bch.crypto.BN = require('./crypto/bn');
bch.crypto.ECDSA = require('./crypto/ecdsa');
bch.crypto.Hash = require('./crypto/hash');
bch.crypto.Random = require('./crypto/random');
bch.crypto.Point = require('./crypto/point');
bch.crypto.Signature = require('./crypto/signature');

// encoding
bch.encoding = {};
bch.encoding.Base58 = require('./encoding/base58');
bch.encoding.Base58Check = require('./encoding/base58check');
bch.encoding.BufferReader = require('./encoding/bufferreader');
bch.encoding.BufferWriter = require('./encoding/bufferwriter');
bch.encoding.Varint = require('./encoding/varint');

// utilities
bch.util = {};
bch.util.buffer = require('./util/buffer');
bch.util.js = require('./util/js');
bch.util.preconditions = require('./util/preconditions');

// errors thrown by the library
bch.errors = require('./errors');

// main bitcoin library
bch.Address = require('./address');
bch.Block = require('./block');
bch.BlockHeader = require('./block/blockheader');
bch.HDPrivateKey = require('./hdprivatekey.js');
bch.HDPublicKey = require('./hdpublickey.js');
bch.MerkleBlock = require('./block/merkleblock');
bch.Message = require('./message');
bch.Mnemonic = require('./mnemonic');
bch.Networks = require('./networks');
bch.Opcode = require('./opcode');
bch.PrivateKey = require('./privatekey');
bch.PublicKey = require('./publickey');
bch.Script = require('./script');
bch.Transaction = require('./transaction');
bch.Unit = require('./unit');
bch.URI = require('./uri');

// dependencies, subject to change
bch.deps = {};
bch.deps.bnjs = require('bn.js');
bch.deps.bs58 = require('bs58');
bch.deps.Buffer = Buffer;
bch.deps.elliptic = require('elliptic');
bch.deps._ = require('lodash');

// Internal usage, exposed for testing/advanced tweaking
bch.Transaction.sighash = require('./transaction/sighash');
