const http = require("http");

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader("Content-Type", "text/plain");
  res.end("Hello World\n"); // <-- Permet à curl et au navigateur de recevoir la réponse
});

server.listen(3001, () => {
  console.log("Serveur démarré sur http://localhost:3001");
});