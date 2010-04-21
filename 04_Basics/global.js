var sys = require("sys"),
    some_argument = process.ARGV[2];

// argument example
if (!some_argument) {
  return sys.puts("Usage: node " + __filename.replace(__dirname + "/", "") + " some_argument");
}

// require example
sys.puts("Default require.paths: " + require.paths);
sys.puts("Adding current directory to require.paths");
require.paths.unshift(__dirname);
sys.puts("Modified require.paths: " + require.paths);
