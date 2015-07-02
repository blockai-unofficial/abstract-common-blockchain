var address = "n3PDRtKoHXHNt8FU17Uu9Te81AnKLa7oyU"

module.exports.Summary = function(test, common) {
  test('getting a summary of an address on testnet', function(t) {
    common.setup(test, function(err, commonBlockchain) {
      commonBlockchain.Addresses.Summary([address], function(err, summaries) {
        t.equal(summaries.length, 1, "summaries.length should be 1")
        var summary = summaries[0]
        t.equal(summary.address, address, "summary.address should be address")
        t.end()
      });
    })
  })
}

module.exports.Transactions = function(test, common) {
  test('getting all transactions for an address on testnet', function(t) {
    common.setup(test, function(err, commonBlockchain) {
      commonBlockchain.Addresses.Transactions([address], function(err, addresses_txs) {
        var txs = addresses_txs[0];
        var tx = txs[0];
        t.ok(typeof(tx.blockHeight) != "undefined", "tx.blockHeight should be defined")
        t.ok(typeof(tx.blockId) != "undefined", "tx.blockId should be defined")
        t.ok(typeof(tx.txid) != "undefined", "tx.txid should be defined")
        t.ok(typeof(tx.txId) != "undefined", "tx.txId should be defined")
        t.end()
      });
    })
  })
}

module.exports.Unspents = function(test, common) {
  test('getting unspents for an address on testnet', function(t) {
    common.setup(test, function(err, commonBlockchain) {
      commonBlockchain.Addresses.Unspents([address], function(err, addresses_utxos) {
        var utxos = addresses_utxos[0];
        var utxo = utxos[0];
        t.equal(utxo.address, address, "utxo.address should be address")
        t.ok(typeof(utxo.txid) != "undefined", "utxo.txid should be defined")
        t.ok(typeof(utxo.txId) != "undefined", "utxo.txId should be defined")
        t.ok(typeof(utxo.scriptPubKey) != "undefined", "utxo.scriptPubKey should be defined")
        t.ok(typeof(utxo.vout) == "number", "utxo.vout should be a number")
        t.ok(typeof(utxo.value) == "number", "utxo.txid should be a number")
        t.ok(typeof(utxo.amount) == "number", "utxo.amount should be a number")
        t.true((typeof(utxo.confirmations) == "object") || typeof(utxo.confirmations) == "number", "utxo.confirmations should be object(null) or a number")
        t.end()
      });
    })
  })
}

module.exports.all = function (test, common) {
  module.exports.Summary(test, common)
  module.exports.Transactions(test, common)
  module.exports.Unspents(test, common)
}