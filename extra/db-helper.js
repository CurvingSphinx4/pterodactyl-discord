const quickdb = require('quick.db')
let tables = {
    tokens: new quickdb.table('tokens'),
    hosts: new quickdb.table('hosts')
}


module.exports = {
    tables: tables
}