var sys = require("sys");

// display all command line arguments
sys.puts("Provided arguments:");
for (var key in process.argv) {
  sys.puts(key + ": " + process.argv[key]);
}

// process details (PID, platform, memory usage)
sys.puts("\nPID: " + process.pid);
sys.puts("Platform: " + process.platform);
sys.puts("Memory usage: " + process.memoryUsage().rss);

// display user environment
sys.puts("\nUser Environment:");
for (var key in process.env) {
  sys.puts(key + ": " + process.env[key]);
}

// process exit code - default: success code 0
process.exit(0);
