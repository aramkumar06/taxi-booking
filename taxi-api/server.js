const express = require("express");
const http = require("http");
const webSocketServer = require('websocket').server;
const TaxiNotFoundError = require("./CustomError").TaxiNotFoundError;
const PORT = 5000;
const app = express()
  .use(express.json())

const server = http.createServer(app);

const wsServer = new webSocketServer({
  httpServer: server
});

// Generates unique ID for every new connection
const getUniqueID = () => {
  const s4 = () => Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
  return s4() + s4() + '-' + s4();
};

const clients = {};

const sendMessage = (json) => {
  // We are sending the current data to all connected clients
  Object.keys(clients).map((client) => {
    clients[client].sendUTF(json);
  });
}

wsServer.on('request', function (request) {
  var userID = getUniqueID();
  console.log((new Date()) + ' Recieved a new connection from origin ' + request.origin + '.');
  const connection = request.accept(null, request.origin);
  clients[userID] = connection;
  console.log('connected: ' + userID + ' in ' + Object.getOwnPropertyNames(clients));
  connection.on('message', function (message) {
    if (message.type === 'utf8') {
      sendMessage(JSON.stringify({}));
    }
  });
  // user disconnected
  connection.on('close', function (connection) {
    console.log((new Date()) + " Peer " + userID + " disconnected.");
    delete clients[userID];
  });
});

let taxiList = [
  {
    id: 12,
    name: 'PY-01-B-233',
    lat: 9.3926784,
    lng: 77.4968582,
    available: true,
  },
  {
    id: 13,
    name: 'PY-01-A-2033',
    lat: 9.3933459,
    lng: 77.4969123,
    available: true,
  },
  {
    id: 14,
    name: 'PY-02-A-1033',
    lat: 9.392803,
    lng: 77.4920972,
    available: true,
  },
  {
    id: 15,
    name: 'PY-04-D-6666',
    lat: 9.39392,
    lng: 77.4877529,
    available: true,
  },
  {
    id: 16,
    name: 'PY-06-D-7766',
    lat: 9.39374,
    lng: 77.4898229,
    available: true,
  },
];

const cors = require("cors");
app.use(cors());

app.get("/api/rides", (req, res) => {
  return res.send(taxiList);
});

const changeTaxiStatus = (taxiId, isAvailable) => {
  const taxiIndex = taxiList.map((taxi) => taxi.id).indexOf(Number(taxiId))
  if (taxiIndex >= 0) {
    taxiList[taxiIndex]['available'] = isAvailable;
    sendMessage(JSON.stringify({}));
  } else {
    throw new TaxiNotFoundError(taxiId)
  }
}

app.put("/api/book/:id", (req, res) => {
  changeTaxiStatus(req.params.id || '', false)
  return res.send({ success: true });
});

app.put("/api/unbook/:id", (req, res) => {
  changeTaxiStatus(req.params.id || '', true)
  return res.send({ success: true });
});

app.use((error, req, res, next) => {
  res.header("Content-Type", 'application/json')
  res.status(400).send({ message: error.message }) // pretty print
})

server.listen(PORT, () => {
  console.log(`Server is listening on ${PORT}`);
});
