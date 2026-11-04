import http from 'http';
import fs from 'fs';
import { WebSocketServer } from 'ws';
import os from 'os';

function getMetrics() {
  return {
    loadAvg: os.loadavg(),
    freeMemMB: (os.freemem() / 1024 / 1024).toFixed(0),
    totalMemMB: (os.totalmem() / 1024 / 1024).toFixed(0),
    memUsagePct: (
      ((os.totalmem() - os.freemem()) / os.totalmem()) *
      100
    ).toFixed(1),
  };
}

const PORT = 3000;

const server = http.createServer((req, res) => {
  fs.readFile('./public/index.html', (err, file) => {
    if (err) {
      res.writeHead(500, { 'Content-Type': 'text/plain' });
      res.end('Error loading index.html');
      return;
    }
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(file);
  });
});

const wss = new WebSocketServer({ server });

wss.on("connection", (socket) => {
  const interval = setInterval(() => {
    socket.send(JSON.stringify(getMetrics()));
  }, 1000);

  console.log("Client connected");

  socket.on("message", (data) => {
    console.log("Received:", data.toString());
  });

  // Leçon 14 : Gestionnaire de l'événement 'close'
  socket.on("close", () => {
    clearInterval(interval);
    console.log("Client disconnected");
  });
});

server.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});