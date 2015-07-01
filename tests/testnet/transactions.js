var txid = "03af5bf0b3fe25db04b684ab41bea8cdd127e57822602b8545beaf06685967c8"
var output_txid = "d7eadd6e47e32ff50682288d1aff5fc046e6b591d9be567eb677f379675742c5";

module.exports.Get = function(test, common) {
  test('getting a transaction from testnet', function(t) {
    common.setup(test, function(err, commonBlockchain) {
      commonBlockchain.Transactions.Get({txids: [txid]}, function(err, txs) {
        var tx = txs[0]
        t.equal(tx.txid, txid, "tx.txid should be txid")
        t.equal(tx.txId, txid, "tx.txId should be txid")
        t.equal(tx.vin.length, 1, "tx.vin.length should be 1")
        var vin = tx.vin[0];
        t.equal(vin.txid, output_txid, "tx.vin[0].txid should be txid")
        t.equal(vin.txId, output_txid, "tx.vin[0].txId should be txid")
        t.equal(vin.vout, 1, "tx.vin[0].vout should be 1")
        t.equal(tx.vout.length, 2, "tx.vin.length should be 2")
        var vout = tx.vout
        var op_return_output = vout[0]
        t.equal(op_return_output.value, 0, "op_return_output.value should be 0")
        t.true(op_return_output.index === null || op_return_output.index === 0, "op_return_output.index should be null or 0")
        t.true(op_return_output.n === null || op_return_output.n === 0, "op_return_output.n should be null or 0")
        t.equal(op_return_output.scriptPubKey.type, 'nulldata', "op_return_output.scriptPubKey.type should be nulldata")
        t.equal(op_return_output.scriptPubKey.hex, '6a281f00042d8ccd0e823010845fa5e99968ff96166f3e4aa15b6d4420b089a0f1dd5dd4cbce6666be79', "op_return_output.scriptPubKey.hex should be 6a281f00042d8ccd0e823010845fa5e99968ff96166f3e4aa15b6d4420b089a0f1dd5dd4cbce6666be79")
        var change_output = vout[1]
        t.equal(change_output.value, 9369000, "change_output.value should be 9369000")
        t.true(change_output.index === null || change_output.index === 1, "change_output.index should be 1")
        t.true(change_output.n === null || change_output.n === 1, "change_output.n should be 1")
        t.equal(change_output.scriptPubKey.type, 'pubkeyhash', "change_output.scriptPubKey.type should be pubkeyhash")
        t.equal(change_output.scriptPubKey.hex, '76a914efdc12d9bd12a9a599d6d44706dd2328760c500188ac', "change_output.scriptPubKey.hex should be 76a914efdc12d9bd12a9a599d6d44706dd2328760c500188ac")
        t.equal(change_output.scriptPubKey.addresses[0], 'n3PDRtKoHXHNt8FU17Uu9Te81AnKLa7oyU', "change_output.scriptPubKey.addresses[0] should be n3PDRtKoHXHNt8FU17Uu9Te81AnKLa7oyU")
        t.true(change_output.spentTxid === null || change_output.spentTxid === '9e4a932d27851a254715b30742de3eca379cdb1ffdadb0f9896f2df90c44a72e', "if not null, change_output.spentTxid should be 9e4a932d27851a254715b30742de3eca379cdb1ffdadb0f9896f2df90c44a72e")
        t.end()
      });
    })
  })
}

module.exports.Latest = function(test, common) {
  test('getting the latest transactions from testnet', function(t) {
    common.setup(test, function(err, commonBlockchain) {
      commonBlockchain.Transactions.Latest(function(err, txs) {
        // TODO
        t.end()
      });
    })
  })
}

module.exports.Outputs = function(test, common) {
  test('getting outputs for a transaction from testnet', function(t) {
    common.setup(test, function(err, commonBlockchain) {
      commonBlockchain.Transactions.Outputs([{txid: txid, vout: 0}, {txid: txid, vout: 1}], function(err, txos) {
        var op_return_output = txos[0]
        t.equal(op_return_output.txid, txid, "op_return_output.txid should be txid")
        t.equal(op_return_output.txId, txid, "op_return_output.txId should be txid")
        t.equal(op_return_output.value, 0, "op_return_output.value should be 0")
        t.equal(op_return_output.vout, 0, "op_return_output.vout should be 0")
        t.equal(op_return_output.scriptPubKey, '6a281f00042d8ccd0e823010845fa5e99968ff96166f3e4aa15b6d4420b089a0f1dd5dd4cbce6666be79', "op_return_output.scriptPubKey should be 6a281f00042d8ccd0e823010845fa5e99968ff96166f3e4aa15b6d4420b089a0f1dd5dd4cbce6666be79")
        var change_output = txos[1]
        t.equal(change_output.txid, txid, "change_output.txid should be txid")
        t.equal(change_output.txId, txid, "change_output.txId should be txid")
        t.equal(change_output.value, 9369000, "change_output.value should be 9369000")
        t.equal(change_output.vout, 1, "change_output.vout should be 1")
        t.end()
      });
    })
  })
}

module.exports.Propagate = function(test, common) {
  var txHex = "1234";
  test('propagating a transaction on testnet', function(t) {
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
  test('propagating a transaction on testnet', function(t) {
    common.setup(test, function(err, commonBlockchain) {
      commonBlockchain.Transactions.Status([txid], function(err, txs) {
        var tx = txs[0];
        t.equal(tx.txid, txid, "tx.txid should be txid")
        t.equal(tx.txId, txid, "tx.txId should be txid")
        t.equal(tx.blockId, '00000000000d8087a4cea66ad90d890ed05c9059a0323d20463d0635aff6056f', "tx.blockId should be 00000000000d8087a4cea66ad90d890ed05c9059a0323d20463d0635aff6056f");
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