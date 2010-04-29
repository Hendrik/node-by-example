var    sys = require("sys"),
  filename = process.ARGV[2];

if (!filename)
  return sys.puts("Usage: node " + __filename.replace(__dirname + "/", "") + " filename");

// create child process and add a listener for its "output" event
var tail = require("child_process").spawn("tail", ["-f", filename]);
tail.stdout.addListener("data", function(data) {
  sys.puts(data);
});
tail.addListener("exit", function(code) {
  sys.puts("Child process stopped with exit code: " + code);
});

// add a timer to kill the child proces after 10 seconds
setTimeout(function() {
  tail.kill();
}, 10000);
