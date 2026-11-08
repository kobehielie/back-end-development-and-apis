import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(cors({ optionsSuccessStatus: 200 }));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

const timestampHandler = (req, res) => {
  const { date } = req.params;
  let parsed;

  if (!date) {
    parsed = new Date();
  } else if (/^-?\d+$/.test(date)) {
    parsed = new Date(Number(date));
  } else {
    parsed = new Date(date);
  }

  if (isNaN(parsed.getTime())) {
    return res.json({ error: 'Invalid Date' });
  }

  res.json({ unix: parsed.getTime(), utc: parsed.toUTCString() });
};

app.get(['/api', '/api/{:date}'], timestampHandler);

const PORT = 8000;
const listener = app.listen(PORT, (err) => {
  if (err) {
    console.error('Impossible de démarrer :', err.message);
    return;
  }
  console.log('Your app is listening on port ' + listener.address().port);
});

export default app;