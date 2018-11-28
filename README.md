# [BitcoinCash.js](https://bitcoincashjs.github.io/): The simple, safe, and powerful JavaScript library for Bitcoin Cash

[![NPM Package](https://img.shields.io/npm/v/bitcoincashjs.svg?style=flat-square)](https://www.npmjs.org/package/bitcoincashjs)
[![Build Status](https://img.shields.io/travis/bitcoincashjs/bitcoincashjs.svg?branch=master&style=flat-square)](https://travis-ci.org/bitcoincashjs/bitcoincashjs)
[![Coverage Status](https://img.shields.io/coveralls/bitcoincashjs/bitcoincashjs.svg?style=flat-square)](https://coveralls.io/r/bitcoincashjs/bitcoincashjs)

[![NPM Stats](https://nodei.co/npm/bitcoincashjs.png?downloads=true)](https://nodei.co/npm/bitcoincashjs/)

## About Bitcoin Cash

Bitcoin Cash is peer-to-peer electronic cash for the Internet. It is fully decentralized, has no central bank, and requires no trusted third-parties to operate. Bitcoin Cash is the continuation of the Bitcoin project, upgraded with consensus rules that allow it to grow and scale.

## About BitcoinCash.js

BitcoinCash.js is the first JavaScript library specifically made for Bitcoin Cash. It supports all major Bitcoin Cash uses cases right out of the box, keeping up-to-date with the latest network upgrades. This library can be used - and is thoroughly tested - both in the back-end (Node.js) and the front-end (web browsers).

BitcoinCash.js is a fork from [bitcore-lib](https://github.com/bitpay/bitcore-lib/), which is an extremely easy-to-use and well-tested JavaScript library for Bitcoin developed by Bitpay, Inc. However, as consensus rules between BTC and BCH become more and more incompatible, BitcoinCash.js will not add support for functionality specific to BTC, such as SegWit or the bech32 address format, and will continue to support all Bitcoin Cash uses cases as first-class citizens.

## Installation

### Using NPM

```s
$ npm install --save bitcoincashjs
```

### Using Bower

```s
$ bower install --save bitcoincashjs
```

### Manually

You may also download the distribution file manually and place it within your third-party scripts directory: [dist/bitcoincashjs.0.1.11.min.js](https://cdn.rawgit.com/bitcoincashjs/bitcoincashjs/master/dist/bitcoincashjs.0.1.11.min.js).

## Examples

You can find many useful, up-to-date examples to get you started right away on the [BitcoinCash.js](https://bitcoincashjs.github.io/#Examples) website or by following the next links:

* [Generate a random address](https://github.com/bitcoincashjs/bitcoincashjs/blob/master/docs/examples.md#generate-a-random-address)
* [Generate a address from a SHA256 hash](https://github.com/bitcoincashjs/bitcoincashjs/blob/master/docs/examples.md#generate-a-address-from-a-sha256-hash)
* [Translate an address to any Bitcoin Cash address format](https://github.com/bitcoincashjs/bitcoincashjs/blob/master/docs/examples.md#translate-an-address-to-any-bitcoin-cash-address-format)
* [Read an address from any Bitcoin Cash address format](https://github.com/bitcoincashjs/bitcoincashjs/blob/master/docs/examples.md#read-an-address-from-any-bitcoin-cash-address-format)
* [Import an address via WIF](https://github.com/bitcoincashjs/bitcoincashjs/blob/master/docs/examples.md#import-an-address-via-wif)
* [Create a Transaction](https://github.com/bitcoincashjs/bitcoincashjs/blob/master/docs/examples.md#create-a-transaction)
* [Verify a Bitcoin message](https://github.com/bitcoincashjs/bitcoincashjs/blob/master/docs/examples.md#verify-a-bitcoin-message)
* [Sign a Bitcoin message](https://github.com/bitcoincashjs/bitcoincashjs/blob/master/docs/examples.md#sign-a-bitcoin-message)
* [Create an OP RETURN transaction](https://github.com/bitcoincashjs/bitcoincashjs/blob/master/docs/examples.md#create-an-op-return-transaction)
* [Create a 2-of-3 multisig P2SH address](https://github.com/bitcoincashjs/bitcoincashjs/blob/master/docs/examples.md#create-a-2-of-3-multisig-p2sh-address)
* [Spend from a 2-of-2 multisig P2SH address](https://github.com/bitcoincashjs/bitcoincashjs/blob/master/docs/examples.md#spend-from-a-2-of-2-multisig-p2sh-address)

## Security

BitcoinCash.js is a fork from [bitcore-lib](https://github.com/bitpay/bitcore-lib/), which is used in production at Bitpay Inc., and many other [projects](http://bitcore.io#projects). If you find a security issue, please email [bitcoincashjs@tuta.io](mailto:bitcoincashjs@tuta.io).

## Contributing

This is an open-source project, and any form of contribution is welcome. Feel free to create an issue in case you would like to share ideas for improvement, or would like to report a bug. Also, please send pull requests for bug fixes or code optimization. For more information on how to contribute, please refer to our [CONTRIBUTING](https://github.com/bitcoincashjs/bitcoincashjs/blob/master/CONTRIBUTING.md) file.

## Development

To get started with development, you should first clone the repository and install any dependencies:

```s
$ git clone https://github.com/bitcoincashjs/bitcoincashjs
$ cd bitcoincashjs
$ npm install
```
Next, you can check everything is installed correctly by running the full test-suite and verifying that all tests are completed successfully.

```s
$ npm test
```

## License

Code released under [the MIT license](https://github.com/bitcoincashjs/bitcoincashjs/blob/master/LICENSE).
