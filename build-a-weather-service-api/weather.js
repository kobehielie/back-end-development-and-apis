import { Router } from 'express';

const router = Router();

const SUPPORTED_CITIES = ['London', 'Tokyo', 'Abidjan', 'Paris', 'New York'];

// Route GET / pour renvoyer la liste des villes (Leçon 11)
router.get('/', (req, res) => {
    res.json(SUPPORTED_CITIES);
});

// Route GET /:city mise à jour avec fetch (Leçon 15)
router.get("/:city", async (req, res) => {
    const { city } = req.params;
    
    // Appel machine-à-machine vers le proxy météo
    try {
         const response = await fetch(
        `https://weather-proxy.freecodecamp.rocks/api/city/${city}`
    );
    const data = await response.json();
    
    // Réponse JSON structurée avec les données de l'API externe
    res.json({
        city: data.name,
        temperature: data.main.temp,
        description: data.weather[0].description,
    });
    } catch (err) {
        res.status(404).json({error: `Could not fetch weather data for "${city}".` })
    }
   
});

export default router;