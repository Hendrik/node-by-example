/*  This example requires the GeoIP addon available at 
 *  http://github.com/strange/node-geoip
 */

var sys = require("sys"),
  geoip = require("./lib/geoip");

var dbpath = "/usr/local/share/GeoIP/GeoLiteCity.dat";
var ip = "216.236.135.152";

sys.puts("Looking up IP: " + ip);
var con = new geoip.Connection(dbpath, function(con) {
  con.query(ip, function(result) {
    for (var attr in result) {
      sys.puts(attr + " : " + result[attr]);
    }
  });
});
