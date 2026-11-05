import http from 'http';
import fs from 'fs';
import { WebSocketServer, WebSocket } from 'ws';

const PORT = 3001;

// 1. Créer le serveur HTTP qui sert public/index.html
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

// 2. Créer le WebSocketServer attaché au serveur HTTP
const wss = new WebSocketServer({ server });

// Fonction de diffusion (broadcast) à tous les clients connectés et ouverts
function broadcast(data) {
  const message = JSON.stringify(data);
  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(message);
    }
  });
}

// 3. Écouteur d'événement 'connection'
wss.on('connection', (socket, req) => {
  // 4. Extraire le nom d'utilisateur depuis la chaîne de requête (query string)
  const username = new URL(req.url, "http://localhost").searchParams.get("username");

  // Diffuser le message système d'arrivée
  broadcast({ type: "system", text: `${username} joined` });

  // 5. Écouteur d'événement 'message'
  socket.on('message', (data) => {
    const { username: msgUsername, text } = JSON.parse(data);
    broadcast({ type: 'chat', username: msgUsername, text });
  });

  // 6. Écouteur d'événement 'close'
  socket.on('close', () => {
    broadcast({ type: 'system', text: `${username} left` });
  });
});

// 7. Démarrer le serveur sur le port 3001
server.listen(PORT, () => {
  console.log(`Chat server running at http://localhost:3001`);
});