var sys = require('sys'),
    ws = require('./lib/ws');
    geoip = require('./lib/geoip'),
    dbpath = '/usr/local/share/GeoIP/GeoLiteCity.dat',
    ip_cache = [],
    filename = process.ARGV[2];

if (!filename)
    return sys.puts('Usage: node " + __filename + " filename');

function result_output(result, websocket) {
  var json_result = {};
  for (var key in result) json_result[key] = result[key];
  websocket.write(JSON.stringify(json_result));
}

function db_connect(ip, websocket) {
  var con = new geoip.Connection(dbpath, function(con) {
    con.query(ip, function(result) {
      result_output(result, websocket);
      con.close();
    });
  });
}

var tail = require('child_process').spawn('tail', ['-f', filename]);
sys.debug('start tailing logfile');

ws.createServer(function(websocket) {
  websocket.addListener('connect', function(response) {
    sys.debug('connect: ' + response);

    tail.stdout.addListener('data', function(data) {
      ip = data.toString().split(" ")[0];
      if (!ip_cache[ip]) {
        sys.debug(ip);
        ip_cache[ip] = true;
        db_connect(ip, websocket);
      }
    });

  }).addListener('data', function(data) {
    sys.debug(data);
  }).addListener('close', function() {
    sys.debug('close');
  });
}).listen(8000);
