// based on http://nodejs.org/api.html#net-server-177

var sys = require("sys"),
    net = require("net");

var server = net.createServer(function(stream) {
  stream.setEncoding("utf8");
  stream.addListener("connect", function() {
    sys.puts("Client connected");
    stream.write("hello\r\n");
  });
  stream.addListener("data", function(data) {
    sys.puts("Received from client: " + data);
    stream.write(data);
  });
  stream.addListener("end", function() {
    sys.puts("Client disconnected");
    stream.write("goodbye\r\n");
    stream.end();
  });
});
server.listen(8000, "localhost");

// stop the server after 10 secs
setTimeout(function() {
  server.close(); 
}, 10000);
