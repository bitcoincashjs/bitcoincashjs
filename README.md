# [BitcoinCashFlow](https://github.com/BitcoinDB/BitcoinCashFlow): A Bitcoin Cash implementation written in modern Javascript

## About BitcoinCashFlow

BitcoinCashFlow is a community driven effort to produce a readable, reliable and modern Javascript implementation of Bitcoin. Most current Javascript Bitcoin implementations do not adhere to modern coding standards and are very hard to read as a consequence. We want to create a Bitcoin implementation that every JavaScript programmer can read and understand.

In step one, we want to get the entire codebase to comply with the [Airbnb JavaScript Style Guide](https://github.com/airbnb/javascript). Step two will be to port the code base to ES6. Step three will be to statically typecheck the entire codebase with Facebook’s Flow. We suspect we will uncover bugs in the process.

We are looking for contributors. You do not have to be a Bitcoin protocol expert to contribute. All you need to be is a good Javascript programmer. If you want to help, check out [CONTRIBUTING.md](https://github.com/BitcoinDB/BitcoinCashFlow/blob/master/CONTRIBUTING.md) or email [clemens@bitcointoken.com](mailto:clemens@bitcointoken.com).

## Warning

BitcoinCashFlow is currently undergoing a major refactoring which might break parts of the API. **We do not recommend it to be used until the version 1.0.0 is released.**

## About Bitcoin Cash

Bitcoin Cash is peer-to-peer electronic cash for the Internet. It is fully decentralized, has no central bank, and requires no trusted third-parties to operate. Bitcoin Cash is the continuation of the Bitcoin project, upgraded with consensus rules that allow it to grow and scale.

## Installation

### Using NPM

```s
$ npm install --save bitcoincashflow
```

### Using Bower

```s
$ bower install --save bitcoincashflow
```

### Manually

You can also download a pre-compiled and minified version here: [dist](https://github.com/BitcoinDB/BitcoinCashFlow/tree/master/dist)

## Examples

You can find many useful, up-to-date examples to get you started right away by following the provided
examples:

* [Generate a random address](https://github.com/BitcoinDB/BitcoinCashFlow/blob/master/docs/examples.md#generate-a-random-address)
* [Generate a address from a SHA256 hash](https://github.com/BitcoinDB/BitcoinCashFlow/blob/master/docs/examples.md#generate-a-address-from-a-sha256-hash)
* [Translate an address to any Bitcoin Cash address format](https://github.com/BitcoinDB/BitcoinCashFlow/blob/master/docs/examples.md#translate-an-address-to-any-bitcoin-cash-address-format)
* [Read an address from any Bitcoin Cash address format](https://github.com/BitcoinDB/BitcoinCashFlow/blob/master/docs/examples.md#read-an-address-from-any-bitcoin-cash-address-format)
* [Import an address via WIF](https://github.com/BitcoinDB/BitcoinCashFlow/blob/master/docs/examples.md#import-an-address-via-wif)
* [Create a Transaction](https://github.com/BitcoinDB/BitcoinCashFlow/blob/master/docs/examples.md#create-a-transaction)
* [Verify a Bitcoin message](https://github.com/BitcoinDB/BitcoinCashFlow/blob/master/docs/examples.md#verify-a-bitcoin-message)
* [Sign a Bitcoin message](https://github.com/BitcoinDB/BitcoinCashFlow/blob/master/docs/examples.md#sign-a-bitcoin-message)
* [Create an OP RETURN transaction](https://github.com/BitcoinDB/BitcoinCashFlow/blob/master/docs/examples.md#create-an-op-return-transaction)
* [Create a 2-of-3 multisig P2SH address](https://github.com/BitcoinDB/BitcoinCashFlow/blob/master/docs/examples.md#create-a-2-of-3-multisig-p2sh-address)
* [Spend from a 2-of-2 multisig P2SH address](https://github.com/BitcoinDB/BitcoinCashFlow/blob/master/docs/examples.md#spend-from-a-2-of-2-multisig-p2sh-address)

## Security

BitcoinCashFlow is a fork of [bitcore-lib](https://github.com/bitpay/bitcore-lib/), which is used in production at Bitpay Inc. and many other [projects](http://bitcore.io#projects). If you find a security issue, please email [clemens@bitcointoken.com](mailto:clemens@bitcointoken.com).

## Contributing

This is an open-source project, and any form of contribution is welcome. Feel free to create an issue in case you would like to share ideas for improvement, or would like to report a bug. Also, please send pull requests for bug fixes or code optimization. For more information on how to contribute, please refer to our [CONTRIBUTING](CONTRIBUTING.md) file.

## Development

To get started with development, you should first clone the repository and install any dependencies:

```s
$ git clone https://github.com/BitcoinDB/BitcoinCashFlow
$ cd BitcoinCashFlow
$ npm install
```
Next, you can check everything is installed correctly by running the full test-suite and verifying that all tests are completed successfully.

```s
$ npm test
```

## Progress


| File       | Airbnb Style Guide | ES6 | Flow
| ---------- | :---: | :---: | :---: |
| address.js | <span style="color:red">✖</span> | <span style="color:red">✖</span> | <span style="color:red">✖</span> |
| bitcoincash.js | <span style="color:red">✖</span> | <span style="color:red">✖</span> | <span style="color:red">✖</span> |
| block/block.js | <span style="color:green">✔</span> | <span style="color:red">✖</span> | <span style="color:red">✖</span> |
| block/blockheader.js | <span style="color:green">✔</span> | <span style="color:red">✖</span> | <span style="color:red">✖</span> |
| block/index.js | <span style="color:green">✔</span> | <span style="color:red">✖</span> | <span style="color:red">✖</span> |
| block/merkleblock.js | <span style="color:green">✔</span> | <span style="color:red">✖</span> | <span style="color:red">✖</span> |
| crypto/bn.js | <span style="color:red">✖</span> | <span style="color:red">✖</span> | <span style="color:red">✖</span> |
| crypto/ecdsa.js | <span style="color:red">✖</span> | <span style="color:red">✖</span> | <span style="color:red">✖</span> |
| crypto/hash.js | <span style="color:red">✖</span> | <span style="color:red">✖</span> | <span style="color:red">✖</span> |
| crypto/point.js | <span style="color:red">✖</span> | <span style="color:red">✖</span> | <span style="color:red">✖</span> |
| crypto/random.js | <span style="color:red">✖</span> | <span style="color:red">✖</span> | <span style="color:red">✖</span> |
| crypto/signature.js | <span style="color:red">✖</span> | <span style="color:red">✖</span> | <span style="color:red">✖</span> |
| encoding/base58.js | <span style="color:red">✖</span> | <span style="color:red">✖</span> | <span style="color:red">✖</span> |
| encoding/base58check.js | <span style="color:red">✖</span> | <span style="color:red">✖</span> | <span style="color:red">✖</span> |
| encoding/bufferreader.js | <span style="color:red">✖</span> | <span style="color:red">✖</span> | <span style="color:red">✖</span> |
| encoding/bufferwriter.js | <span style="color:red">✖</span> | <span style="color:red">✖</span> | <span style="color:red">✖</span> |
| encoding/varint.js | <span style="color:red">✖</span> | <span style="color:red">✖</span> | <span style="color:red">✖</span> |
| errors/index.js | <span style="color:red">✖</span> | <span style="color:red">✖</span> | <span style="color:red">✖</span> |
| errors/spec.js | <span style="color:red">✖</span> | <span style="color:red">✖</span> | <span style="color:red">✖</span> |
| hdprivatekey.js | <span style="color:red">✖</span> | <span style="color:red">✖</span> | <span style="color:red">✖</span> |
| hdpublickey.js | <span style="color:red">✖</span> | <span style="color:red">✖</span> | <span style="color:red">✖</span> |
| message.js | <span style="color:red">✖</span> | <span style="color:red">✖</span> | <span style="color:red">✖</span> |
| mnemonic/index.js | <span style="color:red">✖</span> | <span style="color:red">✖</span> | <span style="color:red">✖</span> |
| mnemonic/mnemonic.js | <span style="color:red">✖</span> | <span style="color:red">✖</span> | <span style="color:red">✖</span> |
| mnemonic/pbkdf2.js | <span style="color:red">✖</span> | <span style="color:red">✖</span> | <span style="color:red">✖</span> |
| mnemonic/words/chinese.js | <span style="color:red">✖</span> | <span style="color:red">✖</span> | <span style="color:red">✖</span> |
| mnemonic/words/english.js | <span style="color:red">✖</span> | <span style="color:red">✖</span> | <span style="color:red">✖</span> |
| mnemonic/words/french.js | <span style="color:red">✖</span> | <span style="color:red">✖</span> | <span style="color:red">✖</span> |
| mnemonic/words/index.js | <span style="color:red">✖</span> | <span style="color:red">✖</span> | <span style="color:red">✖</span> |
| mnemonic/words/italian.js | <span style="color:red">✖</span> | <span style="color:red">✖</span> | <span style="color:red">✖</span> |
| mnemonic/words/japanese.js | <span style="color:red">✖</span> | <span style="color:red">✖</span> | <span style="color:red">✖</span> |
| mnemonic/words/spanish.js | <span style="color:red">✖</span> | <span style="color:red">✖</span> | <span style="color:red">✖</span> |
| networks.js | <span style="color:red">✖</span> | <span style="color:red">✖</span> | <span style="color:red">✖</span> |
| opcode.js | <span style="color:red">✖</span> | <span style="color:red">✖</span> | <span style="color:red">✖</span> |
| privatekey.js | <span style="color:red">✖</span> | <span style="color:red">✖</span> | <span style="color:red">✖</span> |
| publickey.js | <span style="color:red">✖</span> | <span style="color:red">✖</span> | <span style="color:red">✖</span> |
| script/index.js | <span style="color:red">✖</span> | <span style="color:red">✖</span> | <span style="color:red">✖</span> |
| script/interpreter.js | <span style="color:red">✖</span> | <span style="color:red">✖</span> | <span style="color:red">✖</span> |
| script/script.js | <span style="color:red">✖</span> | <span style="color:red">✖</span> | <span style="color:red">✖</span> |
| transaction/index.js | <span style="color:red">✖</span> | <span style="color:red">✖</span> | <span style="color:red">✖</span> |
| transaction/input/index.js | <span style="color:red">✖</span> | <span style="color:red">✖</span> | <span style="color:red">✖</span> |
| transaction/input/input.js | <span style="color:red">✖</span> | <span style="color:red">✖</span> | <span style="color:red">✖</span> |
| transaction/input/multisig.js | <span style="color:red">✖</span> | <span style="color:red">✖</span> | <span style="color:red">✖</span> |
| transaction/input/multisigscripthash.js | <span style="color:red">✖</span> | <span style="color:red">✖</span> | <span style="color:red">✖</span> |
| transaction/input/publickey.js | <span style="color:red">✖</span> | <span style="color:red">✖</span> | <span style="color:red">✖</span> |
| transaction/input/publickeyhash.js | <span style="color:red">✖</span> | <span style="color:red">✖</span> | <span style="color:red">✖</span> |
| transaction/input/scripthash.js | <span style="color:red">✖</span> | <span style="color:red">✖</span> | <span style="color:red">✖</span> |
| transaction/output.js | <span style="color:red">✖</span> | <span style="color:red">✖</span> | <span style="color:red">✖</span> |
| transaction/sighash.js | <span style="color:red">✖</span> | <span style="color:red">✖</span> | <span style="color:red">✖</span> |
| transaction/signature.js | <span style="color:red">✖</span> | <span style="color:red">✖</span> | <span style="color:red">✖</span> |
| transaction/transaction.js | <span style="color:green">✔</span> | <span style="color:red">✖</span> | <span style="color:red">✖</span> |
| transaction/unspentoutput.js | <span style="color:red">✖</span> | <span style="color:red">✖</span> | <span style="color:red">✖</span> |
| unit.js | <span style="color:red">✖</span> | <span style="color:red">✖</span> | <span style="color:red">✖</span> |
| uri.js | <span style="color:red">✖</span> | <span style="color:red">✖</span> | <span style="color:red">✖</span> |
| util/buffer.js | <span style="color:red">✖</span> | <span style="color:red">✖</span> | <span style="color:red">✖</span> |
| util/js.js | <span style="color:red">✖</span> | <span style="color:red">✖</span> | <span style="color:red">✖</span> |
| util/preconditions.js | <span style="color:red">✖</span> | <span style="color:red">✖</span> | <span style="color:red">✖</span> |



## License

Code released under [the MIT license](https://github.com/bitcoincashjs/bitcoincashjs/blob/master/LICENSE).
