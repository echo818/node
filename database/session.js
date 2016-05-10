var settings = require('./settings');
var Db = require('mongodb').Db;
var Server = require('mongodb').Server;
var db = new Db(settings.DB,new Server(settings.HOST,settings.PORT,{auto_reconnect:true,native_parser:true}),{safe:false});

module.exports = db;