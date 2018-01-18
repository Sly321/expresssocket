const express = require('express');
const http = require('http');
const WebSocket = require('ws');

const app = express();

let color = "green"

app.use(express.static(__dirname));

const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

wss.on('connection', function connection(ws, req) {
  console.log("connection")

  ws.on('message', function incoming(message) {
    console.log('received: %s', message);
  });

  // console.log("wss.clients.size")
  // console.log(wss.clients.size)
  
  // wss.clients.forEach(client => console.log(client))
  setInterval(() => {
    color = color === "green" ? "yellow" : "green"
    ws.send(JSON.stringify({ context: "css", value: `body { background: ${color} }`}));
  }, 1000);
});

wss.on('open', function open() {
  console.log('connected/open');
  ws.send(Date.now());
});

wss.on('close', function close() {
  console.log('disconnected');
});

wss.on('message', function incoming(data) {
  console.log(`Roundtrip time: ${Date.now() - data} ms`);

  setTimeout(function timeout() {
    ws.send(Date.now());
  }, 500);
});

server.listen(8080, function listening() {
  console.log('Listening on %d', server.address().port);
});

// setTimeout(() => console.log(3), 1000)
// setTimeout(() => console.log(2), 2000)
// setTimeout(() => console.log(1), 3000)
// setTimeout(() => {
//   wss.clients.forEach(function each (client) {
//     if (client.readyState === WebSocket.OPEN) {
//       client.send("hello darkness my old friend")
//     }
//   })
// }, 4000)