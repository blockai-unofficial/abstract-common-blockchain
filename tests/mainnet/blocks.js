var blockId = "0000000000000c7f878cf71e5a6c87592c7c1982748e4f54b968b7b0c4cd324d"
var txid = "96d99f7ea200c28f0b104977e749891e34a0b5579200872cad164d91f6ba867a"

module.exports.Get = function(test, common) {
  test('getting a block on mainnet', function(t) {
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
  test('getting latest block on mainnet', function(t) {
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
  test('propagating a block on mainnet', function(t) {
    common.setup(test, function(err, commonBlockchain) {
      commonBlockchain.Blocks.Propagate(blockHex, function(err, resp) {
        // TODO
        t.end()
      });
    })
  })
}

module.exports.Transactions = function(test, common) {
  test('getting all transaction by blocks on mainnet', function(t) {
    common.setup(test, function(err, commonBlockchain) {
      commonBlockchain.Blocks.Transactions([blockId], function(err, blocks) {
        t.equal(blocks.length, 1, "blocks.length should be 1")
        var txs = blocks[0];
        t.equal(txs.length, 70, "txs.length should be 70")
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