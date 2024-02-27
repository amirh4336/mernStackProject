import { FC } from "react";
import "./PlaceItem.css";
import Card from "../../../shared/components/UIElements/Card/Card";
import Button from "../../../shared/components/FormElements/Button";

export interface IPlaceItemProps {
  id: string;
  imageUrl: string;
  title: string;
  description: string;
  address: string;
  creator: string;
  location: {
    lat: number;
    lng: number;
  };
}

const PlaceItem: FC<IPlaceItemProps> = ({
  id,
  imageUrl,
  title,
  address,
  description,
}) => {
  return (
    <li className="place-item">
      <Card className="place-item__content">
        <div className="palce-item__image">
          <img src={imageUrl} alt={title} height={200} width="100%" />
        </div>
        <div className="place-item__info">
          <h2>{title}</h2>
          <h3>{address}</h3>
          <p>{description}</p>
        </div>
        <div className="place-item__actions">
          <Button inverse>View on map</Button>
          <Button to={`/places/${id}`}>Edit</Button>
          <Button danger>Delete</Button>
        </div>
      </Card>
    </li>
  );
};

export default PlaceItem;
