/*
---
name: dbslayer.js
 
description: Interface to DBSlayer for Node.JS
 
author: [Guillermo Rauch](http://devthought.com)
updated: Andy Schuler (andy at leftshoedevevelopment dot com)
...
*/

var sys = require('sys');
var http = require('http');
var events = require('events');

var booleanCommands = ['STAT', 'CLIENT_INFO', 'HOST_INFO', 'SERVER_VERSION', 'CLIENT_VERSION'];

var Server = this.Server = function(host, port, timeout){
  this.host = host || 'localhost';
  this.port = port || 9090;
  this.timeout = timeout;
};

Server.prototype.fetch = function(object, key){
  var e = new events.EventEmitter();
  var connection = http.createClient(this.port, this.host);
  var request = connection.request("GET",'/db?' + escape(JSON.stringify(object)), {'host': this.host});
  request.addListener('response',
    function(response) {
      var data = [];
      response.addListener('data',
        function(chunk) {
          data.push(chunk);
        }
      );
      response.addListener('end',
        function() {
          try {
            var object = JSON.parse(data.join(''));
          }
          catch(err) {
            e.emit('error',err);
            return;
          }
          if (object.MYSQL_ERROR !== undefined){
            e.emit('error', object.MYSQL_ERROR, object.MYSQL_ERRNO);
            return;
          } 
          if (object.ERROR !== undefined){
            e.emit('error', object.ERROR);
            return;
          } 
          e.emit('success',key ? object[key] : object);
        }
      );
    }
  );
  request.end();
  return e;
}

Server.prototype.query = function(query){
  return this.fetch({SQL: query}, 'RESULT');
};

for (var i = 0, l = booleanCommands.length; i < l; i++){
  Server.prototype[booleanCommands[i].toLowerCase()] = (
    function(command){
      return function(){
        var obj = {};
        obj[command] = true;
        return this.fetch(obj, command);
      };
    }
  )(booleanCommands[i]);
}
