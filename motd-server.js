let net = require('net');

let fs = require('fs');

let serverLog = require('./lib/serverLog');

let SERVER_PORT = 2003;

let server = net.createServer(function(connection) {
  let clientAddress = connection.remoteAddress;

  serverLog('CONNECT', `Client at ${clientAddress} connected`);

  /*
    1. Read the contents of data/motd.txt into memory
    2. Send the contents do the client using connection.write(...)
    3. Close the connection
  */
  let text = fs.readFileSync('./data/motd.txt');
  connection.write(text);
});

server.listen(SERVER_PORT, function() {
  serverLog('LISTENING', `MOTD server listening on port ${SERVER_PORT}`);
});
