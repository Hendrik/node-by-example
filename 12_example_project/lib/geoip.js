var sys = require('sys'),
  ceoip = require('./ceoip');

function Connection(dbpath, callback) {
  this.con = new ceoip.Connection();
  this.queue = [];
  this.connected = false;
  this.currentQuery = null;
  this.callback = callback;

  var self = this;

  this.con.addListener('closed', function() {
    self.connected = false;
    self.emit('closed');
  });

  this.con.addListener('connected', function() {
    self.connected = true;
    self.callback(self);
    self.processQueue();
  });

  this.con.addListener('result', function(result) {
    if (self.currentQuery != null) self.currentQuery[0](result);
    self.currentQuery = null;
    self.processQueue();
  });

  this.con.connect(dbpath);
}

sys.inherits(Connection, process.EventEmitter);

Connection.prototype.addJob = function(callback, ipAddress) {
  this.queue.push([callback, ipAddress]);
  this.processQueue();
};

Connection.prototype.query = function(ipAddress, callback) {
  this.addJob(callback, ipAddress);
};

Connection.prototype.processQueue = function () {
  if (!this.queue.length || !this.connected || this.currentQuery) {
    return;
  }
  this.currentQuery = this.queue.shift();
  this.con.query(this.currentQuery[1]);
};

Connection.prototype.close = function () {
  // Emit failure on all promises in queue?
  this.con.close();
};

exports.Connection = Connection;
