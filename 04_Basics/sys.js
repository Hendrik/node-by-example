var sys = require("sys");

// sys output examples
sys.puts("Output with trailing newline");
sys.print("Output without ");
sys.print("new line");
sys.puts("\nAdd newline to begining and extra one at the end.\n");
sys.debug("Some debug output");
sys.log("Some log output");

// simple sys.inspect example
var process_memory = process.memoryUsage();
sys.puts("\nprocess.memoryUsage():");
sys.puts(sys.inspect(process_memory));
