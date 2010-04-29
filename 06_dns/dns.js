// taken from http://nodejs.org/api.html#dns-204

var sys = require("sys"),
    dns = require("dns");

dns.resolve4("google.com", function(err, addresses) {
  if (err) throw err;

  sys.puts("addresses: " + JSON.stringify(addresses));

  for (var i = 0; i < addresses.length; i++) {
    var a = addresses[i];
    dns.reverse(a, function (err, domains) {
      if (err) {
        sys.puts("reverse for " + a + " failed: " + err.message);
      } else {
        sys.puts("reverse for " + a + ": " + JSON.stringify(domains));
      }
    });
  }
});
