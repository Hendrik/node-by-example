var sys = require("sys"),
   exec = require("child_process").exec;

exec("ls /", function (err, stdout, stderr) {
  if (err) throw err;
  sys.puts(stdout);
});