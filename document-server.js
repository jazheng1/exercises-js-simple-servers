let net = require('net');

let fs = require('fs');

let serverLog = require('./lib/serverLog');

let SERVER_PORT = 2004;

let server = net.createServer(function(connection) {
  let clientAddress = connection.remoteAddress;

  serverLog('CONNECT', `Client at ${clientAddress} connected`);

  connection.on('data', function(clientData) {
    let file = clientData.slice(0, -1);
    let text = fs.readFileSync(`./files/${file}`, 'utf-8');
    console.log(text);
    connection.write(text);
  });
  connection.on('end', function() {
    serverLog('DISCONNET', `Client ${clientAddress} disconnected`);
  });
});

server.listen(SERVER_PORT, function() {
  serverLog('LISTENING', `MOTD server listening on port ${SERVER_PORT}`);
});
