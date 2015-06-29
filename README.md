# abstract-common-blockchain
A test suite and interface you can use to implement standard Bitcoin blockchain API calls for various backends and platforms.

Based on bitcoind JSON and the common blockchain standard.

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
