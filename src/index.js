var bitcoin = require("bitcoinjs-lib");

var __txs = {};

var Get = function(txids, cb) {
  var txs = [];
  txids.forEach(function(txid) {
    var tx = __txs[txid];
    txs.push(tx);
  });
  cb(false, txs);
};

var Unspents = function(addresses, cb) {
  var unspents_addresses = [];
  addresses.forEach(function() {
    var unspents = [{
      txid: '03af5bf0b3fe25db04b684ab41bea8cdd127e57822602b8545beaf06685967c8',
      vout: 0,
      value: 1000000
    }];
    unspents_addresses.push(unspents);
  });
  cb(false, unspents_addresses);
};

var transactionHexToJSON = function(hex) {
  var tx = bitcoin.Transaction.fromHex(hex);
  var txid = tx.getId();
  var vin = [];
  tx.ins.forEach(function(input) {
    var input_txid = input.hash.toString("hex");
    vin.push({
      txid: input_txid,
      txId: input_txid,
      vout: input.index,
      scriptSig: {
        hex: input.script.buffer.toString("hex")
      },
      sequence: input.sequence,
      addresses: ["msLoJikUfxbc2U5UhRSjc2svusBSqMdqxZ"]
    });
  });
  var vout = [];
  tx.outs.forEach(function(output, index) {
    var script_type = bitcoin.scripts.classifyOutput(output.script);
    var address = script_type == "pubkeyhash" ? bitcoin.Address.fromOutputScript(output.script, bitcoin.networks.testnet).toString() : null;
    vout.push({
      value: output.value,
      index: index,
      n: index,
      scriptPubKey: {
        hex: output.script.buffer.toString("hex"),
        asm: output.script.toASM(),
        type: script_type,
        addresses: [address]
      }
    });
  });
  return {
    confirmations: 0,
    blockindex: null,
    blocktime: null,
    blockhash: null,
    timeReceived: new Date().getTime(),
    txHex: hex,
    hex: hex,
    txid: txid,
    txId: txid,
    version: tx.version,
    locktime: tx.locktime,
    vin: vin,
    vout: vout
  }
};

var Propagate = function(txHex, cb) {
  var jsonTx = transactionHexToJSON(txHex);
  __txs[jsonTx.txid] = jsonTx;
  cb(false, {
    txid: jsonTx.txid,
    txId: jsonTx.txid
  });
};

var Transactions = {
  Get: Get,
  Propagate: Propagate
}

var Addresses = {
  Unspents: Unspents
}

module.exports = function(opts) {
  return {
    Transactions: Transactions,
    Addresses: Addresses
  }

}