export default function authorizeRole(role) {
  return (req, res, next) => {
    // Vérification de la présence de req.user et de la correspondance du rôle
    if (!req.user || req.user.role !== role) {
      return res.status(403).json({ error: "Access denied" });
    }

    next();
  };
}