/* This example requires the websocket addon available at
 * http://github.com/ncr/node.ws.js
 */

var sys = require("sys"),
     ws = require("./lib/ws");

ws.createServer(function (websocket) {
  websocket.addListener("connect", function (resource) { 
    sys.debug("connect: " + resource);
    websocket.write("test");
    setTimeout(websocket.end, 10 * 1000);
  });
  websocket.addListener("data", function (data) { 
    sys.debug('DATA: ' + data);
    websocket.write("Thanks!"); 
  });
  websocket.addListener("close", function () { 
    sys.debug("close");
  });
}).listen(8000);
