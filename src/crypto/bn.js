

const BN = require('bn.js');
const _ = require('lodash');
const $ = require('../util/preconditions');

function reversebuf(buf) {
  /* eslint-disable */
  const buf2 = Buffer.alloc(buf.length);
    /* eslint-enable */
  for (let i = 0; i < buf.length; i += 1) {
    buf2[i] = buf[buf.length - 1 - i];
  }
  return buf2;
}

BN.Zero = new BN(0);
BN.One = new BN(1);
BN.Minus1 = new BN(-1);


function fromNumber(n) {
  $.checkArgument(_.isNumber(n));
  return new BN(n);
}

BN.fromNumber = fromNumber;

function fromString(str, base) {
  $.checkArgument(_.isString(str));
  return new BN(str, base);
}

BN.fromString = fromString;

function fromBuffer(buf, opts) {
  let localbuf;
  if (typeof opts !== 'undefined' && opts.endian === 'little') {
    localbuf = reversebuf(buf);
  } else {
    localbuf = buf;
  }
  const hex = localbuf.toString('hex');
  const bn = new BN(hex, 16);
  return bn;
}
BN.fromBuffer = fromBuffer;

/**
 * Instantiate a BigNumber from a "signed magnitude buffer"
 * (a buffer where the most significant bit represents the sign (0 = positive, -1 = negative))
 */
function fromSM(buf, opts) {
  let ret;
  let localbuf;
  if (buf.length === 0) {
    return BN.fromBuffer(Buffer.alloc([0]));
  }

  let endian = 'big';
  if (opts) {
    endian = opts;
  }
  if (endian === 'little') {
    localbuf = reversebuf(buf);
  } else {
    localbuf = buf;
  }

  if (localbuf[0] && 0x80) {
    const tmpvar = localbuf[0];
    /* eslint no-bitwise: ["error", { "allow": ["&"] }] */
    localbuf[0] = tmpvar & 0x7f;
    ret = BN.fromBuffer(localbuf);
    ret.neg().copy(ret);
  } else {
    ret = BN.fromBuffer(localbuf);
  }
  return ret;
}
BN.fromSM = fromSM;


function toNumber() {
  return parseInt(this.toString(10), 10);
}
BN.prototype.toNumber = toNumber;

function toBuffer(opts) {
  let buf;
  let hex;
  if (opts && opts.size) {
    hex = this.toString(16, 2);
    const natlen = hex.length / 2;
    /* eslint-disable */
    buf = new Buffer(hex, 'hex');
      /* eslint-enable */

    if (natlen > opts.size) {
      buf = BN.trim(buf, natlen);
    } else if (natlen < opts.size) {
      buf = BN.pad(buf, natlen, opts.size);
    }
  } else {
    hex = this.toString(16, 2);
    buf = Buffer.alloc(hex, 'hex');
  }

  if (typeof opts !== 'undefined' && opts.endian === 'little') {
    buf = reversebuf(buf);
  }

  return buf;
}
BN.prototype.toBuffer = toBuffer;

function toSMBigEndian() {
  let buf;
  if (this.cmp(BN.Zero) === -1) {
    buf = this.neg().toBuffer();
    if (buf[0] && 0x80) {
      buf = Buffer.concat([Buffer.alloc([0x80]), buf]);
    } else {
      const tmpvar = buf[0];
      /*eslint-disable */
      buf[0] = tmpvar | 0x80;
      /* eslint-enable */
    }
  } else {
    buf = this.toBuffer();
    /* eslint no-bitwise: ["error", { "allow": ["&"] }] */
    if (buf[0] & 0x80) {
      buf = Buffer.concat([Buffer.alloc([0x00]), buf]);
    }
  }

  if (buf.length === 1 && buf[0] === 0) {
    buf = Buffer.alloc([]);
  }
  return buf;
}
BN.prototype.toSMBigEndian = toSMBigEndian;

function toSM(opts) {
  const endian = opts ? opts.endian : 'big';
  let buf = this.toSMBigEndian();

  if (endian === 'little') {
    buf = reversebuf(buf);
  }
  return buf;
}
BN.prototype.toSM = toSM;

/**
 * Create a BN from a "ScriptNum":
 * This is analogous to the constructor for CScriptNum in bitcoind. Many ops in
 * bitcoind's script interpreter use CScriptNum, which is not really a proper
 * bignum. Instead, an error is thrown if trying to input a number bigger than
 * 4 bytes. We copy that behavior here. A third argument, `size`, is provided to
 * extend the hard limit of 4 bytes, as some usages require more than 4 bytes.
 */
function fromScriptNumBuffer(buf, fRequireMinimal, size) {
  const nMaxNumSize = size || 4;
  $.checkArgument(buf.length <= nMaxNumSize, new Error('script number overflow'));
  if (fRequireMinimal && buf.length > 0) {
    // Check that the number is encoded with the minimum possible
    // number of bytes.
    //
    // If the most-significant-byte - excluding the sign bit - is zero
    // then we're not minimal. Note how this test also rejects the
    // negative-zero encoding, 0x80.
    if ((buf[buf.length - 1] & 0x7f) === 0) {
      // One exception: if there's more than one byte and the most
      // significant bit of the second-most-significant-byte is set
      // it would conflict with the sign bit. An example of this case
      // is +-255, which encode to 0xff00 and 0xff80 respectively.
      // (big-endian).
      if (buf.length <= 1 || (buf[buf.length - 2] & 0x80) === 0) {
        throw new Error('non-minimally encoded script number');
      }
    }
  }
  return BN.fromSM(buf, {
    endian: 'little',
  });
}
BN.fromScriptNumBuffer = fromScriptNumBuffer;

/**
 * The corollary to the above, with the notable exception that we do not throw
 * an error if the output is larger than four bytes. (Which can happen if
 * performing a numerical operation that results in an overflow to more than 4
 * bytes).
 */
function toScriptNumBuffer() {
  return this.toSM({
    endian: 'little',
  });
}
BN.prototype.toScriptNumBuffer = toScriptNumBuffer;

function gt(b) {
  return this.cmp(b) > 0;
}
BN.prototype.gt = gt;

function gte(b) {
  return this.cmp(b) >= 0;
}
BN.prototype.gte = gte;

function lt(b) {
  return this.cmp(b) < 0;
}
BN.prototype.lt = lt;

function trim(buf, natlen) {
  return buf.slice(natlen - buf.length, buf.length);
}
BN.trim = trim;

function pad(buf, natlen, size) {
  const rbuf = Buffer.alloc(size);
  let i;
  for (i = 0; i < buf.length; i += 1) {
    rbuf[rbuf.length - 1 - i] = buf[buf.length - 1 - i];
  }
  for (i = 0; i < size - natlen; i += 1) {
    rbuf[i] = 0;
  }
  return rbuf;
}
BN.pad = pad;

module.exports = BN;
