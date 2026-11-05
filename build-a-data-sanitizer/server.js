import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { inputCleaner, inputValidator } from './middleware.js';

const app = express();
const PORT = 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 1. Body parsers
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// 2. Route GET / (Redirection explicite)
app.get('/', (req, res) => {
    return res.redirect('/form');
});

// 3. Fichiers statiques (servis UNIQUEMENT si la route ne matche pas)
app.use(express.static(path.join(__dirname, 'public'), { index: false }));

// 4. Route GET /form
app.get('/form', (req, res) => {
    return res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// 5. Route POST /submit
app.post('/submit', inputCleaner, inputValidator, (req, res) => {
    return res.json({
        username: req.body.username,
        comment: req.body.comment
    });
});

// Démarrage du serveur
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});