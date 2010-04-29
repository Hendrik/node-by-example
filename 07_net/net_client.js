var sys = require("sys"),
    net = require("net");

var client = net.createConnection(8000);
client.setEncoding("UTF8");

client.addListener("connect", function() {
  sys.puts("Client connected.");
  // close connection after 2sec
  setTimeout(function() {
    sys.puts("Sent to server: close");
    client.write("close", "UTF8");
  }, 2000);
});

client.addListener("data", function(data) {
  sys.puts("Response from server: " + data);
  if (data == "close") client.end();
});

client.addListener("close", function(data) {
  sys.puts("Disconnected from server");
});
