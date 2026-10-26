function isPrime(n) {
  if (typeof n !== "number" || n <= 1) {
    return false;
  }

  const racine = Math.sqrt(n);

  for (let i = 2; i <= racine; i++) {
    if (n % i === 0) {
      return false; // Trouvé un diviseur -> pas premier
    }
  }

  return true; // Aucun diviseur trouvé -> premier
}


module.exports = {
  isPrime
}
