var txid = "8128c9132d019f02fcd1edcabfb293880d2ac842dc9c0de3a2500448b5b2808a"
var output_txid = "e5d648f59e1894f1c8c03d6f4da0b1c8b891343790305f9fc1ca4b0130b2fe8c";

module.exports.Get = function(test, common) {
  test('getting a transaction from mainnet', function(t) {
    common.setup(test, function(err, commonBlockchain) {
      commonBlockchain.Transactions.Get([txid], function(err, txs) {
        var tx = txs[0]
        t.equal(tx.txid, txid, "tx.txid should be txid")
        t.equal(tx.txId, txid, "tx.txId should be txid")
        t.equal(tx.vin.length, 2, "tx.vin.length should be 2")
        var vin = tx.vin[0]
        t.true(vin.txid === null || vin.txid === output_txid, "tx.vin[0].txid should be txid")
        t.true(vin.txId === null || vin.txId === output_txid, "tx.vin[0].txId should be txid")
        t.equal(vin.vout, 3, "tx.vin[0].vout should be 1")
        t.equal(vin.addresses[0], "1BCrWT2FYSDQgpRXMtDaygyaA96icSi7Uy", "tx.addresses[0] should be 1BCrWT2FYSDQgpRXMtDaygyaA96icSi7Uy")
        t.equal(tx.vout.length, 2, "tx.vout.length should be 2")
        var vout = tx.vout
        var output = vout[0]
        t.equal(output.value, 6980000, "output.value should be 6980000")
        t.true(output.index === null || output.index === 0, "output.index should be null or 0")
        t.true(output.n === null || output.n === 0, "output.n should be null or 0")
        t.true(output.scriptPubKey.type === null || output.scriptPubKey.type === 'pubkeyhash', "output.scriptPubKey.type should be pubkeyhash")
        t.true(output.scriptPubKey.hex === null || output.scriptPubKey.hex === "76a914b1f484a2202abcf00517f9c3f2fafe76b7b2cf0588ac", "output.scriptPubKey.hex should be 76a914b1f484a2202abcf00517f9c3f2fafe76b7b2cf0588ac")
        t.end()
      });
    })
  })
}

module.exports.Latest = function(test, common) {
  test('getting the latest transactions from mainnet', function(t) {
    common.setup(test, function(err, commonBlockchain) {
      commonBlockchain.Transactions.Latest(function(err, txs) {
        // TODO
        t.end()
      });
    })
  })
}

module.exports.Outputs = function(test, common) {
  test('getting outputs for a transaction from mainnet', function(t) {
    common.setup(test, function(err, commonBlockchain) {
      commonBlockchain.Transactions.Outputs([{txid: txid, vout: 0}, {txid: txid, vout: 1}], function(err, txos) {
        var output = txos[0]
        t.equal(output.txid, txid, "output.txid should be txid")
        t.equal(output.txId, txid, "output.txId should be txid")
        t.equal(output.value, 6980000, "output.value should be 6980000")
        t.equal(output.vout, 0, "output.vout should be 0")
        t.equal(output.scriptPubKey, '76a914b1f484a2202abcf00517f9c3f2fafe76b7b2cf0588ac', "output.scriptPubKey should be 76a914b1f484a2202abcf00517f9c3f2fafe76b7b2cf0588ac")
        var change_output = txos[1]
        t.equal(change_output.txid, txid, "change_output.txid should be txid")
        t.equal(change_output.txId, txid, "change_output.txId should be txid")
        t.equal(change_output.value, 21450000, "change_output.value should be 21450000")
        t.equal(change_output.vout, 1, "change_output.vout should be 1")
        t.end()
      });
    })
  })
}

module.exports.Propagate = function(test, common) {
  var txHex = "1234";
  test('propagating a transaction on mainnet', function(t) {
    common.setup(test, function(err, commonBlockchain) {
      commonBlockchain.Transactions.Propagate(txHex, function(err, resp) {
        // TODO
        console.log(err, resp);
        t.end()
      });
    })
  })
}

module.exports.Status = function(test, common) {
  test('propagating a transaction on mainnet', function(t) {
    common.setup(test, function(err, commonBlockchain) {
      commonBlockchain.Transactions.Status([txid], function(err, txs) {
        var tx = txs[0];
        t.equal(tx.txid, txid, "tx.txid should be txid")
        t.equal(tx.txId, txid, "tx.txId should be txid")
        t.true(tx.blockId === null || tx.blockId === '000000000000000013a3f14ca570747e100885a7d72af29be8c62621cf648014', "tx.blockId should be 000000000000000013a3f14ca570747e100885a7d72af29be8c62621cf648014");
        t.end()
      });
    })
  })
}

module.exports.all = function (test, common) {
  module.exports.Get(test, common)
  module.exports.Latest(test, common)
  module.exports.Outputs(test, common)
  module.exports.Propagate(test, common)
  module.exports.Status(test, common)
}