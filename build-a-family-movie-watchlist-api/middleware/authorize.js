export const authorizeModification = (req, res, next) => {
  const { role, id } = req.user;
  const { userId } = req.params;

  // Conversion explicite en String pour la comparaison d'identifiants
  if (role === 'parent' || (role === 'child' && String(id) === String(userId))) {
    return next();
  }

  return res.status(403).json({ error: 'Access denied' });
};