function getCoordsForAddress(address) {
  const lat1 = Math.random();
  const lng1 = Math.random();

  return { lat: lat1*100, lng: lng1*100 };
}

module.exports = getCoordsForAddress;
