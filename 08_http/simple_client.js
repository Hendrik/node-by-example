var sys = require("sys"),
   http = require("http");

var client = http.createClient(8000, "127.0.0.1");
var request = client.request("GET", "/?query_arg=testing", {"host": "127.0.0.1"});

sys.puts("Connecting to http://127.0.0.1:8000/?query_arg=testing");

request.addListener("response", function(response) {
  sys.puts("STATUS: " + response.statusCode);
  sys.puts("HEADERS: " + JSON.stringify(response.headers));
  response.setBodyEncoding("UTF8");
  response.addListener("data", function(chunk) {
    sys.puts("BODY: " + chunk);
  });
  response.addListener("end", function() {
    sys.puts("End of response");
  });
});
request.end();
