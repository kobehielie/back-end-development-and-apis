import express from 'express';
import apiRouter from './routes/api.routes.js';
import { notFoundHandler, finalErrorHandler } from './middleware/error.middleware.js';

const app = express();

// Parsing du corps des requêtes
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Middleware de journalisation
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});

// Routeur API
app.use('/api', apiRouter);

// Gestion des erreurs (placée à la fin)
app.use(notFoundHandler);
app.use(finalErrorHandler);

app.listen(3000, () => {
    console.log('Server running on port 3000');
});