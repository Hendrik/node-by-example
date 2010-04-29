/* This example requires the websocket client addon available at
 * http://code.google.com/p/revhttp/source/browse/trunk/nodejs/node-ws-client.js
 */

var sys = require("sys"),
     ws = require("./lib/node-ws-client");

var wsClient = ws.createClient('ws://127.0.0.1:8000/');

wsClient.addListener('connect', function() {
  sys.puts("Connected!");
  wsClient.write("Testing");
});

wsClient.addListener('data', function(chunk) {
  sys.puts("Received data: " + chunk);
});

wsClient.addListener('close', function() {
  sys.puts("Disconnected!");
});

setTimeout(function() {
  for(var i = 0; i<10; i++) {
    setTimeout(function() {
      wsClient.write("Hello WS world! " + Math.random().toString());
      sys.debug('data sent');
    }, i*200);
  }
}, 2000);

setTimeout(function() {
  wsClient.close();
}, 10000);
