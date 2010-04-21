var sys = require("sys"),
    dns = require("dns"),
 domain = process.ARGV[2];

if (!domain)
  return sys.puts("Usage: node " + __filename.replace(__dirname + "/", "") + " domainname");

// resolve A entries
dns.resolve(domain, 'A', function(err, addresses) {
  if (err) {
    if (err.errno == dns.NODATA) sys.puts("No A entry for " + domain);
    else throw err;
  } else {
    sys.puts("addresses: " + JSON.stringify(addresses));
  }
});

// resolve TXT entries
dns.resolve(domain, 'TXT', function(err, addresses) {
  if (err) {
    if (err.errno == dns.NODATA) sys.puts("No TXT entry for " + domain);
    else throw err;
  } else {
    sys.puts("addresses: " + JSON.stringify(addresses));
  }
});