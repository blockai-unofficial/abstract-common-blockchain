# abstract-common-blockchain
A test suite and interface you can use to implement standard Bitcoin blockchain API calls for various backends and platforms.

Combines the [common-blockchain REST API](https://github.com/common-blockchain/common-blockchain) with [bitcoind JSON-RPC](https://bitcoin.org/en/developer-reference#getrawtransaction).

Create easy to consume APIs for building custom bitcoin transactions. Make it easy for bitcoin wallets to read and write custom public data embeded in the blockchain.

## Use

Create an SPV wallet with [BitcoinJS](https://github.com/bitcoinjs/bitcoinjs-lib), [CryptoCoinJS](https://github.com/cryptocoinjs/cryptocoin) or [Bitcore](https://github.com/bitpay/bitcore) to sign transactions and messages.

```javascript
var bitcoin = require("bitcoinjs-lib")

var address = "n3PDRtKoHXHNt8FU17Uu9Te81AnKLa7oyU"
var privateKeyWIF = "KyjhazeX7mXpHedQsKMuGh56o3rh8hm8FGhU3H6HPqfP9pA4YeoS"

var signFromPrivateKeyWIF = function(privateKeyWIF) {
  return function(tx, callback) {
    var key = bitcoin.ECKey.fromWIF(privateKeyWIF)
    tx.sign(0, key)
    callback(false, tx)
  }
};

var signTransaction = signFromPrivateKeyWIF(privateKeyWIF)

var signMessageBase64 = function (message, callback) {
  var key = bitcoin.ECKey.fromWIF(privateKeyWIF)
  var network = bitcoin.networks.testnet
  callback(false, bitcoin.Message.sign(key, message, network).toString('base64'))
}

var commonWallet = {
  signTransaction: signTransaction,
  signMessageBase64: signMessageBase64
}
```

Read and write data from the blockchain with a provider like Blocktrail, [Blockcypher](https://github.com/andrewmalta13/blockcypher-unoffical) or [Biteasy](https://github.com/howardwu/biteasy-unofficial).

```javascript
var commonBlockchain = biteasyAPI({ network: 'testnet' })

commonBlockchain.Addresses.Transactions({
  addresses: ["n3PDRtKoHXHNt8FU17Uu9Te81AnKLa7oyU"]
}, function (err, resp) {
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

### Addresses

#### commonBlockchain.Addresses.Summary
Summary returns a JSON of information regarding provided Bitcoin addresses.
```
  commonBlockchain.Addresses.Summary({
    addresses: ["1HUTmSsFp9Rg4FYRftp85GGyZFEndZSoeq", "1DmUeGjuQWLHxq5jhyn3uPCD9N16Ar9xGw"]
  }, function (err, resp) {
    console.log(resp);
  });
```

#### commonBlockchain.Addresses.Transactions
Transactions returns a JSON with a list of transactions associated with the provided Bitcoin addresses.
```
  commonBlockchain.Addresses.Transactions({
    addresses: ["1HUTmSsFp9Rg4FYRftp85GGyZFEndZSoeq", "1DmUeGjuQWLHxq5jhyn3uPCD9N16Ar9xGw"]
  }, function (err, resp) {
    console.log(resp);
  });

```

#### commonBlockchain.Addresses.Unspents
Unspents returns a JSON with a list of unspent outputs for the provided Bitcoin addresses.

```
  commonBlockchain.Addresses.Unspents({
    addresses: ["1HUTmSsFp9Rg4FYRftp85GGyZFEndZSoeq", "1DmUeGjuQWLHxq5jhyn3uPCD9N16Ar9xGw"]
  }, function (err, resp) {
    console.log(resp);
  });
```

### Blocks

#### commonBlockchain.Blocks.Get
Get returns a JSON of information for the provided block IDs.
```
  commonBlockchain.Blocks.Get({
    blockIds: [
      "00000000000000000216a936ebc1962e319a51bab8d3eae69335ac940284491d", 
      "00000000000000001034f207d3ce18f03054ddfb0e4dba712f5b76cb1cda9499"]
  }, function (err, resp) {
    console.log(resp);
  });
```

#### commonBlockchain.Blocks.Latest
Latest returns a JSON of the latest blocks to hit Biteasy's endpoint.
```
  commonBlockchain.Blocks.Latest(function (err, resp) {
    console.log(resp);
  });
```

#### commonBlockchain.Blocks.Propogate
Propogate is unsupported with Biteasy as of now. Any call to Propogate will return an error.
```
  commonBlockchain.Blocks.Propogate({
    blockHex: ''
  }, function (err, resp) {
    console.log(resp);
  });
```

#### commonBlockchain.Blocks.Transactions
Transactions returns a JSON of transactions for the provided block IDs.
```
  commonBlockchain.Blocks.Transactions({
    blockIds: [
      "00000000000000000216a936ebc1962e319a51bab8d3eae69335ac940284491d",
      "00000000000000001034f207d3ce18f03054ddfb0e4dba712f5b76cb1cda9499"]
  }, function (err, resp) {
    console.log(resp);
  });
```

### Transactions

#### commonBlockchain.Transactions.Get
Get returns a JSON with transaction data for provided transaction IDs.
```
  commonBlockchain.Transactions.Get({
    txIds: [
      "186efd8689fc403e5cc6faeef9497fcf177750b52afe55f407244d0c95625836",
      "9375818c85a6712416dac6edd403498180ee9ee0e604bd11ec35beaea384da51"]
  }, function (err, resp) {
    console.log(resp);
  });
```

#### commonBlockchain.Transactions.Latest
Latest returns a JSON of the latest transactions to hit Biteasy's endpoint (mostly unconfirmed).
```
  commonBlockchain.Transactions.Latest(function (err, resp) {
    console.log(resp);
  });
```

#### commonBlockchain.Transactions.Outputs
Outputs returns a JSON of output information for provided transaction IDs.
```
  commonBlockchain.Transactions.Outputs({
    outputs: [
      {
        vout: 0,
        txId: "186efd8689fc403e5cc6faeef9497fcf177750b52afe55f407244d0c95625836"
      }
    ]
  }, function (err, resp) {
    console.log(resp);
  });
```

#### commonBlockchain.Transactions.Propogate
Propogate is unsupported with Biteasy as of now. Any call to Propogate will return an error.
```
  commonBlockchain.Transactions.Propogate({
    hex: ''
  }, function (err, resp) {
    console.log(resp);
  });
```

#### commonBlockchain.Transactions.Status
Transactions returns a JSON of transactions for the provided transaction IDs.
```
  commonBlockchain.Transactions.Status({
    txIds: [
      "186efd8689fc403e5cc6faeef9497fcf177750b52afe55f407244d0c95625836",
      "9375818c85a6712416dac6edd403498180ee9ee0e604bd11ec35beaea384da51"]
  }, function (err, resp) {
    console.log(resp);
  });
```
