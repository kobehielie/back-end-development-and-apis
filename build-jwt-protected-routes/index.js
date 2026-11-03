import express from 'express';
import authRoutes from './routes/auth.js';
import adminRoutes from './routes/admin.js';

const app = express();

app.use(express.json());

// Montage des routes
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);

// Leçon 34 : Middleware global de gestion des erreurs
app.use((err, req, res, next) => {
  const status = err.status || err.statusCode || 500;
  res.status(status).json({ error: err.message });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default app;