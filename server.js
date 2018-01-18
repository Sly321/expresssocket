"usestrict"

const p = require("path")
const e = require("express")
const ws = require("ws")
const app = e()

const wsServer = ws.Server

/*
app.get("/", (req, res, next) => {
	res.sendFile(p.join(__dirname, "index.html"))
})

app.get("/style.css", (req, res) => {
	res.sendFile(p.join(__dirname, "style.css"))
})
*/

app.use(e.static(__dirname));

//console.log(arguments)
//setInterval(() => {
	
//}, 3000);


app.use((req, res) => res.send({msg: "helloworld"}))

server = require("http").createServer(app)

//console.log(wss)

const WebSocket = require('ws');

const wss = new WebSocket.Server({ server });

wss.on('connection', function connection(ws) {
  console.log("connection")
  ws.on('message', function incoming(message) {
    console.log('received: %s', message);
  });

  ws.send('something');
});

server.listen(3000);
