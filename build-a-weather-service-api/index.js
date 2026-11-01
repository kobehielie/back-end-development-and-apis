import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import weatherRouter from './weather.js';

const app = express();

// Configuration de __dirname avec ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middlewares globaux
app.use(express.json());

// Middleware pour servir les fichiers statiques du dossier public (Leçon 17)
app.use(express.static(path.join(__dirname, 'public')));

// 18. Route GET / mise à jour avec res.sendFile() pour servir index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Route GET /api/info (Leçon 3)
app.get('/api/info', (req, res) => {
    res.json({
        name: "Weather Service API",
        version: "1.0.0",
        description: "API de service météorologique"
    });
});

// Route GET /api/status (Leçon 5)
app.get('/api/status', (req, res) => {
    res.status(200).json({
        status: "OK",
        message: "Server is running smoothly"
    });
});

// Route GET /docs (Leçon 6)
app.get('/docs', (req, res) => {
    res.redirect('/api/info');
});

// Route GET /api/greet/:name (Leçon 7)
app.get('/api/greet/:name', (req, res) => {
    const userName = req.params.name;
    res.json({
        greeting: `Hello, ${userName}! Welcome to the Weather Service API.`
    });
});

// Routes groupées avec app.route (Leçons 8 & 9)
app.route('/api/data')
    .get((req, res) => {
        res.json({
            temperature: "28°C",
            condition: "Ensoleillé",
            location: "Abidjan"
        });
    })
    .post((req, res) => {
        res.status(201).json({
            message: "Data created successfully",
            data: req.body
        });
    });

// Montage du routeur weather sur /api/weather (Leçon 13)
app.use('/api/weather', weatherRouter);

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});