# abstract-common-blockchain
A test suite and interface you can use to implement standard Bitcoin blockchain API calls for various backends and platforms.

Combines the [common-blockchain REST API](https://github.com/common-blockchain/common-blockchain) with [bitcoind JSON-RPC](https://bitcoin.org/en/developer-reference#getrawtransaction).

The goal of this module is to define a de-facto standard blockchain API. Inspired by the [abstract-blob-store](https://github.com/maxogden/abstract-blob-store) and [abstract-leveldown](https://github.com/rvagg/abstract-leveldown) modules, which have [test suites that are usable as modules](https://github.com/rvagg/abstract-leveldown/tree/master/abstract).

Publishing a test suite as a module lets multiple modules all ensure compatibility since they use the same test suite. For example, [s3-blob-store uses abstract-blob-store](https://github.com/jb55/s3-blob-store), and so does [torrent-blob-store](https://github.com/mafintosh/torrent-blob-store), [bitstore-blob-store](https://github.com/blockai/bitstore-blob-store) and [many others](https://github.com/maxogden/abstract-blob-store#some-modules-that-use-this).

Using this module will help to create easy to consume APIs for building custom bitcoin transactions.

## How to use

To use the test suite from this module you can `require('abstract-common-blockchain/tests/testnet')` or `require('abstract-common-blockchain/tests/mainnet')` 

An example of this can be found in the [chain-unofficial](https://github.com/andrewmalta13/chain-unofficial/blob/master/test/index.js) test suite. There is also an example in `tests/run.js` in this repo.

You have to implement a setup and teardown function:

```js
var common = {
  setup: function(t, cb) {
    // setup takes a tap/tape compatible test instance in and a callback
    // this method should construct a new commonBlockchain instance and pass it to the callback:
    var commonBlockchain = biteasyAPI({ network: 'testnet' })
    cb(null, commonBlockchain)
  },
  teardown: function(t, commonBlockchain, cb) {
    // teardown takes in the test instance, as well as the commonBlockchain instance
    else cb()
    // be sure to call cb() when you are done with teardown
  }
}
```

To run the tests simply pass your test module (`tap` or `tape` or any other compatible modules are supported) and your `common` methods in:

```js
var abstractCommonBlockchainTests = require('abstract-common-blockchain/tests/testnet')
abstractCommonBlockchainTests(test, common)
```

## How to build blockchain software

Create an SPV wallet with [BitcoinJS](https://github.com/bitcoinjs/bitcoinjs-lib), [CryptoCoinJS](https://github.com/cryptocoinjs/cryptocoin) or [Bitcore](https://github.com/bitpay/bitcore) to sign transactions and messages.

```javascript
var bitcoin = require("bitcoinjs-lib")

var address = "n3PDRtKoHXHNt8FU17Uu9Te81AnKLa7oyU"
var privateKeyWIF = "KyjhazeX7mXpHedQsKMuGh56o3rh8hm8FGhU3H6HPqfP9pA4YeoS"

var signFromPrivateKeyWIF = function(privateKeyWIF) {
  return function(txHex, callback) {
    var tx = bitcoin.Transaction.fromHex(txHex);
    var key = bitcoin.ECKey.fromWIF(privateKeyWIF)
    tx.sign(0, key)
    callback(false, tx)
  }
};

var signRawTransaction = signFromPrivateKeyWIF(privateKeyWIF)

var signMessage = function (message, callback) {
  var key = bitcoin.ECKey.fromWIF(privateKeyWIF)
  var network = bitcoin.networks.testnet
  callback(false, bitcoin.Message.sign(key, message, network).toString('base64'))
}

var commonWallet = {
  signRawTransaction: signRawTransaction,
  signMessage: signMessage
}
```

Read and write data from the blockchain with a provider like Blocktrail, [Blockcypher](https://github.com/andrewmalta13/blockcypher-unoffical), [Biteasy](https://github.com/howardwu/biteasy-unofficial) or various others.


## Example (Biteasy)
```javascript
var biteasyAPI = require('biteasy-unofficial')

var commonBlockchain = biteasyAPI({ network: 'testnet' })

commonBlockchain.Addresses.Transactions([
  "n3PDRtKoHXHNt8FU17Uu9Te81AnKLa7oyU"
], function (err, resp) {
  console.log(resp)
});
```

Create custom bitcoin transactions and data formats to embed in the blockchain with Blocksign, Blockcast, and Open Publish.

```javascript
var openpublish = require('openpublish')

var sha1 = "dc724af18fbdd4e59189f5fe768a5f8311527050"

openpublish.register({
  sha1: sha1,
  address: address,
  commonBlockchain: commonBlockchain,
  commonWallet: commonWallet
}, function(err, receipt) {

})
```

## API

A valid common blockchain interface should implement the following APIs. There is a public-access CORS-enabled testnet implementation hosted by [Blockai](https://www.blockai.com) available at `index.js` in this repo.

Be sure to check out `types.json` in this repo for information about inputs and ouputs of common blockchain functions.

### Addresses

#### commonBlockchain.Addresses.Summary
Summary returns a JSON of information regarding provided Bitcoin addresses.
```javascript
commonBlockchain.Addresses.Summary([
  "1HUTmSsFp9Rg4FYRftp85GGyZFEndZSoeq",
  "1DmUeGjuQWLHxq5jhyn3uPCD9N16Ar9xGw"
], function (err, resp) {
  console.log(resp);
});
```

#### commonBlockchain.Addresses.Transactions
Transactions returns a JSON with a list of transactions associated with the provided Bitcoin addresses.
```javascript
commonBlockchain.Addresses.Transactions([
  "1HUTmSsFp9Rg4FYRftp85GGyZFEndZSoeq",
  "1DmUeGjuQWLHxq5jhyn3uPCD9N16Ar9xGw"
], function (err, resp) {
  console.log(resp);
});
```

#### commonBlockchain.Addresses.Unspents
Unspents returns a JSON with a list of unspent outputs for the provided Bitcoin addresses.

```javascript
commonBlockchain.Addresses.Unspents([
  "1HUTmSsFp9Rg4FYRftp85GGyZFEndZSoeq",
  "1DmUeGjuQWLHxq5jhyn3uPCD9N16Ar9xGw"
], function (err, resp) {
  console.log(resp);
});
```

### Blocks

#### commonBlockchain.Blocks.Get
Get returns a JSON of information for the provided block IDs.
```javascript
commonBlockchain.Blocks.Get([
  "00000000000000000216a936ebc1962e319a51bab8d3eae69335ac940284491d",
  "00000000000000001034f207d3ce18f03054ddfb0e4dba712f5b76cb1cda9499"
], function (err, resp) {
  console.log(resp);
});
```

#### commonBlockchain.Blocks.Latest
Latest returns a JSON of the latest blocks to hit a commonBlockChainAPI's endpoint.
```javascript
commonBlockchain.Blocks.Latest(function (err, resp) {
  console.log(resp);
});
```

#### commonBlockchain.Blocks.Propogate
Propogate takes in raw block hex and will propogate it to the common blockchain API's network (NOTE: not supported by most providers)
```javascript
commonBlockchain.Blocks.Propogate(blockHex, function (err, resp) {
  console.log(resp);
});
```

#### commonBlockchain.Blocks.Transactions
Transactions returns a JSON of transactions for the provided block IDs.
```javascript
commonBlockchain.Blocks.Transactions([
  "00000000000000000216a936ebc1962e319a51bab8d3eae69335ac940284491d",
  "00000000000000001034f207d3ce18f03054ddfb0e4dba712f5b76cb1cda9499"
], function (err, resp) {
  console.log(resp);
});
```

### Transactions

#### commonBlockchain.Transactions.Get
Get returns a JSON with transaction data for provided transaction IDs.
```javascript
commonBlockchain.Transactions.Get([
  "186efd8689fc403e5cc6faeef9497fcf177750b52afe55f407244d0c95625836",
  "9375818c85a6712416dac6edd403498180ee9ee0e604bd11ec35beaea384da51"
], function (err, resp) {
  console.log(resp);
});
```

#### commonBlockchain.Transactions.Latest
Latest returns a JSON of the latest transactions to hit a common blockchain API's endpoint.
```javascript
commonBlockchain.Transactions.Latest(function (err, resp) {
  console.log(resp);
});
```

#### commonBlockchain.Transactions.Outputs
Outputs returns a JSON of output information for provided transaction IDs.
NOTE: "txid" and "txId" can be used interchangebly in this context to support the union of both bitcoind
and common blockchain's standards.
```javascript
commonBlockchain.Transactions.Outputs([
  {
    vout: 0,
    txId: "186efd8689fc403e5cc6faeef9497fcf177750b52afe55f407244d0c95625836"
  }
], function (err, resp) {
  console.log(resp);
});
```

#### commonBlockchain.Transactions.Propogate
Propogates the transaction supplied via raw hex.
```javascript
commonBlockchain.Transactions.Propogate(hex, function (err, resp) {
  console.log(resp);
});
```

#### commonBlockchain.Transactions.Status
Transactions returns a JSON of transactions for the provided transaction IDs.
```javascript
commonBlockchain.Transactions.Status([
  "186efd8689fc403e5cc6faeef9497fcf177750b52afe55f407244d0c95625836",
  "9375818c85a6712416dac6edd403498180ee9ee0e604bd11ec35beaea384da51"
], function (err, resp) {
  console.log(resp);
});
```
