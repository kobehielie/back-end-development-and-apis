const express = require('express');

const app = express();
const PORT = 3000;

// Route GET /
app.get('/', (req, res) => {
  res.send("Welcome to Camper Bot's homepage!");
});

// Route GET /hobbies
app.get('/hobbies', (req, res) => {
  res.send("I cycle, go boating, and play guitar.");
});

// Route GET /skills
app.get('/skills', (req, res) => {
  res.send("JavaScript, Node.js, and Express.js!");
});

// Route GET /api/profile
app.get('/api/profile', (req, res) => {
  res.json({
    name: "Camper Bot",
    hobbies: ['cycling', 'boating', 'guitar'],
    skills: ['JavaScript', 'Node.js', 'Express.js']
  });
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});