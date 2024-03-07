const { v4: uuidv4 } = require("uuid");

const HttpError = require("../models/http-errors");

let DUMMY_PLACES = [
  {
    id: "p1",
    title: "Empire State Building",
    description: "One of the most famous sky scrapers in the world!",
    imageUrl: "https://cdn.zoomg.ir/2020/11/the-last-of-us-tv-series-1.jpg",
    address: "20 W 34th St, New York, NY 10001",
    location: {
      lat: 40.7484405,
      lng: -73.9878584,
    },
    creator: "u1",
  },
  {
    id: "p2",
    title: "Emp State Building",
    description: "One of the most famous sky scrapers in the world!",
    imageUrl: "https://cdn.zoomg.ir/2020/11/the-last-of-us-tv-series-1.jpg",
    address: "20 W 34th St, New York, NY 10001",
    location: {
      lat: 40.7484405,
      lng: -73.9878584,
    },
    creator: "u2",
  },
];

const getPlaceById = (req, res, next) => {
  const placeId = req.params.pid;

  const place = DUMMY_PLACES.find((p) => p.id === placeId);

  if (!place) {
    throw (error = new HttpError(
      "Could not find a place for the provided id.",
      404
    ));
  }

  res.json({ place });
};

const getPlaceByUserId = (req, res, next) => {
  const userId = req.params.uid;

  const place = DUMMY_PLACES.find((p) => p.creator === userId);

  if (!place) {
    return next(
      new HttpError("Could not find a place for the provided id.", 404)
    );
  }

  res.json({ place });
};

const createPlace = (req, res, next) => {
  const { title, description, coordinates, address, creator } = req.body;

  const createPlace = {
    id: uuidv4(),
    title,
    description,
    location: coordinates,
    address,
    creator,
  };

  DUMMY_PLACES.push(createPlace);

  res.status(201).json({ place: createPlace });
};

const updatePlace = (req, res, next) => {
  const placeId = req.params.pid;

  const { title, description, coordinates, address, creator } = req.body;

  let place = DUMMY_PLACES.find((p) => p.id === placeId);

  if (!place) {
    return next(
      new HttpError("Could not find a place for the provided id.", 404)
    );
  }

  const tempArray = DUMMY_PLACES.map((p) => {
    if (p.id === placeId) {
      const temp = {
        id: p.id,
        title: title || p.title,
        description: description || p.description,
        coordinates: coordinates || p.coordinates,
        address: address || p.address,
        creator: creator || p.creator,
      };

      place = temp;

      return temp;
    }
    return p;
  });

  DUMMY_PLACES = [...tempArray];

  res.status(201).json({ place });
};


const deletePlaceById = (req , res , next ) => {

  const placeId = req.params.pid;

  let place = DUMMY_PLACES.find((p) => p.id === placeId);

  if (!place) {
    return next(
      new HttpError("Could not find a place for the provided id.", 404)
    );
  }

  const tempArray = DUMMY_PLACES.filter((p) => p.id !== placeId)

  DUMMY_PLACES = [...tempArray];

  res.status(200).json({ message: "place success fully deleted" ,place });
}

exports.getPlaceById = getPlaceById;
exports.getPlaceByUserId = getPlaceByUserId;
exports.createPlace = createPlace;
exports.updatePlace = updatePlace;
exports.deletePlaceById = deletePlaceById;
