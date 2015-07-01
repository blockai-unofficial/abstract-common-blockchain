var blockId = "00000000000d8087a4cea66ad90d890ed05c9059a0323d20463d0635aff6056f"
var txid = "03af5bf0b3fe25db04b684ab41bea8cdd127e57822602b8545beaf06685967c8"

module.exports.Get = function(test, common) {
  test('getting a block on testnet', function(t) {
    common.setup(test, function(err, commonBlockchain) {
      commonBlockchain.Blocks.Get([blockId], function(err, blocks) {
        t.equal(blocks.length, 1, "blocks.length should be 1")
        var block = blocks[0];
        t.equal(block.blockId, blockId, "block.blockId should be blockId")
        t.ok(typeof(block.blockHex) != "undefined", "block.blockHex should be defined")
        t.end()
      });
    })
  })
}

module.exports.Latest = function(test, common) {
  test('getting latest block on testnet', function(t) {
    common.setup(test, function(err, commonBlockchain) {
      commonBlockchain.Blocks.Latest(function(err, block) {
        t.ok(block.blockId, "block.blockId exists")
        t.ok(typeof(block.blockHex) != "undefined", "block.blockHex should be defined")
        t.end()
      });
    })
  })
}

module.exports.Propagate = function(test, common) {
  var blockHex = "1234";
  test('propagating a block on testnet', function(t) {
    common.setup(test, function(err, commonBlockchain) {
      commonBlockchain.Blocks.Propagate(blockHex, function(err, resp) {
        // TODO
        t.end()
      });
    })
  })
}

module.exports.Transactions = function(test, common) {
  test('getting all transaction by blocks on testnet', function(t) {
    common.setup(test, function(err, commonBlockchain) {
      commonBlockchain.Blocks.Transactions([blockId], function(err, blocks) {
        t.equal(blocks.length, 1, "blocks.length should be 1")
        var txs = blocks[0];
        t.equal(txs.length, 6, "txs.length should be 6")
        var tx = txs[1]
        t.equal(tx.blockId, blockId, "tx.blockId should be blockId")
        t.equal(tx.txid, txid, "tx.txid should be txid")
        t.equal(tx.txId, txid, "tx.txId should be txid")
        t.end()
      });
    })
  })
}

module.exports.all = function (test, common) {
  module.exports.Get(test, common)
  module.exports.Latest(test, common)
  module.exports.Propagate(test, common)
  module.exports.Transactions(test, common)
}