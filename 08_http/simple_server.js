var     sys = require("sys"),
       http = require("http"),
        url = require("url"),
querystring = require("querystring");

http.createServer(function (request, response) {
  switch (url.parse(request.url).pathname) {
    case '/':
      show_index(request, response);
      break;
    default:
      show_404(request, response);
      break;
  }
}).listen(8000);

function show_index(request, response) {
  sys.puts("Serving index page");
  response.writeHead(200, {'Content-Type': 'text/html'});
  var output = '<html><head><title>node.js HTTP server example</title></head><body><b>Index output</b>';
  var url_request = url.parse(request.url).query;
  output += "<p>Request query: " + url_request + "</p>";
  if (url_request) sys.puts("Request query: " + JSON.stringify(querystring.parse(url_request)));
  output += '</body></html>';
  response.write(output);
  response.end();
}

function show_404(request, response) {
  sys.puts("Serving 404 error page");
  response.writeHead(404, {'Content-Type': 'text/plain'});
  response.write('404 - Please try again.');
  response.end();
}
