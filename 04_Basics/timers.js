var sys = require("sys");

// simple timout example - waits for 2sec before continuing with the next step
var start_time = new Date();
sys.puts("Starting 2 second timer");
setTimeout(function() {
  var end_time = new Date();
  var difference = end_time.getTime() - start_time.getTime();
  sys.puts("Stopped timer after " + Math.round(difference/1000) + " seconds");
  cleartimeout_example();
}, 2000);

// clearTimeout example - timout set for 30secs, gets cancelled via clearTimeout right away, no output
function cleartimeout_example() {
  var start_time = new Date();
  sys.puts("\nStarting 30 second timer and stopping it immediately without triggering callback");
  var timeout = setTimeout(function() {
    var end_time = new Date();
    var difference = end_time.getTime() - start_time.getTime();
    sys.puts("Stopped timer after " + Math.round(difference/1000) + " seconds");
  }, 30000);
  clearTimeout(timeout);
  interval_example();
}

// interval example - 5x output every 2secs using setInterval
function interval_example() {
  var start_time = new Date();
  sys.puts("\nStarting 2 second interval, stopped after 5th tick");
  var count = 1;
  var interval = setInterval(function() {
    if (count == 5) clearInterval(this);
    var end_time = new Date();
    var difference = end_time.getTime() - start_time.getTime();
    sys.puts("Tick no. " + count + " after " + Math.round(difference/1000) + " seconds");
    count++;
  }, 2000);
}
