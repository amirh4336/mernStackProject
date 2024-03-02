import { useParams } from "react-router-dom";
import PlaceList from "../components/PlaceList/PlaceList";

export const DUMMY_PLACES = [
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

const UserPlaces = () => {
  const userId = useParams().userId;
  const loadedPlaces = DUMMY_PLACES.filter((palce) => palce.creator === userId);
  return <PlaceList items={loadedPlaces} />;
};

export default UserPlaces;
