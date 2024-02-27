import { FC, useState } from "react";
import "./PlaceItem.css";
import Card from "../../../shared/components/UIElements/Card/Card";
import Button from "../../../shared/components/FormElements/Button";
import Modal from "../../../shared/components/UIElements/Modal/Modal";

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
  const [showMap, setShowMap] = useState(false);

  const openMapHandler = () => {
    setShowMap(true);
  };

  const closeMapHandler = () => {
    setShowMap(false);
  };

  return (
    <>
      <Modal
        show={showMap}
        onCancel={closeMapHandler}
        header={address}
        contentClass="place-item__modal-content"
        footerClass="place-item__modal-actions"
        footer={<Button onClick={closeMapHandler}>CLOSE</Button>}
      >
        <div className="map-container">
          <h2>the map!</h2>
        </div>
      </Modal>
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
            <Button inverse onClick={openMapHandler}>
              View on map
            </Button>
            <Button to={`/places/${id}`}>Edit</Button>
            <Button danger>Delete</Button>
          </div>
        </Card>
      </li>
    </>
  );
};

export default PlaceItem;
