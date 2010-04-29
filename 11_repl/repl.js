var sys = require("sys"),
    net = require("net"),
   repl = require("repl");

no_connections = 0;
some_var = "Hello";
net.createServer(function(socket) {
  sys.puts("Connection!");
  no_connections += 1;
  socket.end();
}).listen(8000);

repl.start("repl.js prompt> ");

