import { verifyToken } from '../utils/jwt.js';
import { isBlacklisted } from '../utils/token-blacklist.js';

function authenticate(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "No token provided" });
  }

  const token = authHeader.split(" ")[1];

  // Vérification de la liste noire
  if (isBlacklisted(token)) {
    return res.status(401).json({ error: "Token has been invalidated. Log in again." });
  }

  const user = verifyToken(token);

  if (!user) {
    return res.status(401).json({ error: "Invalid token" });
  }

  req.user = user;
  next();
}

export default authenticate;