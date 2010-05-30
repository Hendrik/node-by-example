// based on http://debuggable.com/posts/streaming-file-uploads-with-node-js:4ac094b2-b6c8-4a7f-bd07-28accbdd56cb

var   sys = require("sys"),
       fs = require('fs'),
      url = require('url'),
     http = require("http"),
multipart = require("./multipart_old");

var name, filename, file;

http.createServer(function (request, response) {
  switch (url.parse(request.url).pathname) {
    case '/':
      display_form(request, response);
      break;
    case '/upload':
      upload_file(request, response);
      break;
    default:
      show_404(request, response);
      break;
  }
}).listen(8000);

function display_form(request, response) {
  response.writeHead(200, {'Content-Type': 'text/html'});
  response.write(
    '<form action="/upload" method="POST" enctype="multipart/form-data">' +
    '<input type="file" name="upload-file">' +
    '<input type="submit" value="Upload">' +
    '</form>'
  );
  response.end();
}

function upload_file(request, response) {
  request.setEncoding('binary');

  var stream = new multipart.Stream(request);

  stream.addListener('partBegin', function(part) {
//    sys.debug(sys.inspect(part));
    name = part.name;
    filename = part.filename;
    file = fs.createWriteStream("./upload/" + filename);
  });

  stream.addListener('body', function(chunk) {
    file.write(chunk, function(err, bytesWritten) {
      sys.debug('bytes written: ' + bytesWritten);
    });
  });

  stream.addListener('partEnd', function(part) {
    file.end();
  });

  stream.addListener('complete', function() {
    return;
  });

  response.writeHead(200, {'Content-Type': 'text/plain'});
  response.write('Thanks for the upload');
  response.end();
}

function show_404(request, response) {
  response.writeHead(404, {'Content-Type': 'text/plain'});
  response.write('404 - Please try again.');
  response.end();
}
