/*  This example requires the DBSlayer addon available at
 *  http://github.com/shoeman22/node.dbslayer.js
 *
 *  dbslayer -c /etc/dbslayer.conf -s lokidan -h 127.0.0.1
 */

/*
---
name: test.js
 
description: <
This is a demonstration of how dbslayer.js can be used.
It takes three parameters from the SQL query, a host
 
author: [Guillermo Rauch](http://devthought.com)
updated: [Andy Schuler](andy at leftshoedevelopment dot com)
...
*/

var sys = require('sys');
var dbslayer = require('./lib/dbslayer');
var sql = process.ARGV[2];
var db = new dbslayer.Server();
    
if (!sql){
  sys.puts('Usage: node dbslayer.js sql_query');
  return;
}

//basic query
var query = db.query(sql);
query.addListener("success", 
  function(result) {
    sys.puts('-------------------------');
    for (var i = 0, l = result.ROWS.length; i < l; i++){
      sys.puts('Row ' + i + ': ' + result.ROWS[i].join(' '));
    }
  }
);

query.addListener("error", 
  function(error, errno) {
    sys.puts('-------------------------');
    sys.puts('MySQL error (' + (errno || '') + '): ' + error);
  }
);

['stat', 'client_info', 'host_info', 'server_version', 'client_version'].forEach(
  function(command){
    var el = db[command]();
    el.addListener("success",
      function(results) {
        sys.puts('-------------------------');    
        sys.puts(command.toUpperCase() + ' ' + results);
      }
    );
    
    el.addListener("error",
      function(results) {
        sys.puts('-------------------------');    
        sys.puts(command.toUpperCase() + ' ' + results);
      }
    );
  }
);
