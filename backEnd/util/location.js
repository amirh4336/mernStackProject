function getCoordsForAddress(address) {
  const lat1 = Math.random();
  const lng1 = Math.random();

  return { lat: lat1, lng: lng1 };
}

module.exports = getCoordsForAddress;
