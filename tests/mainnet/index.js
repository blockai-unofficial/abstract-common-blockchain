module.exports = function(test, common) {
  require('./transactions.js').all(test, common)
  require('./blocks.js').all(test, common)
  require('./addresses.js').all(test, common)
}