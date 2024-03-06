const express = require("express")

const router = express.Router()

const DUMMY_PLACES = [
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

router.get("/:pid" , (req , res , next) => {

  const placeId = req.params.pid

  const place = DUMMY_PLACES.find(p => p.id === placeId)

  if(!place) {
    const error = new Error("Could not find a place for the provided id.")
    error.code = 404;
    throw error
    // return res.status(404).json({message: "Could not find a place for the provided id."})
  }

  console.log("Get Request in Places")
  res.json({place}) 
})

router.get("/user/:uid" , (req  , res , next) => {
  const userId = req.params.uid

  const place = DUMMY_PLACES.find(p => p.creator === userId)

  if (!place) {
    const error = new Error("Could not find a user for the provided id.")
    error.code = 404;
    return next(error)
  }

  res.json({place})
})

module.exports = router 