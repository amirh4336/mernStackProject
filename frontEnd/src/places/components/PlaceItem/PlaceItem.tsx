import { FC, useContext, useState } from "react";
import Card from "../../../shared/components/UIElements/Card/Card";
import Button from "../../../shared/components/FormElements/Button/Button";
import Modal from "../../../shared/components/UIElements/Modal/Modal";
import Map from "../../../shared/components/UIElements/Map/Map";

import "./PlaceItem.css";
import { AuthContext } from "../../../shared/context/auth-context";

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
  location,
}) => {
  const { isLoggedIn } = useContext(AuthContext);

  const [showMap, setShowMap] = useState(false);

  const [showConfirimModal, setShowConfirmModal] = useState(false);

  const openMapHandler = () => {
    setShowMap(true);
  };

  const closeMapHandler = () => {
    setShowMap(false);
  };

  const showDeleteWarningHandler = () => {
    setShowConfirmModal(true);
  };

  const cancelDeleteHandler = () => {
    setShowConfirmModal(false);
  };

  const confirmDeleteHandler = () => {
    setShowConfirmModal(false);
    console.log("DELETING");
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
          <Map
            center={[location.lat, location.lng]}
            markerPos={[location.lat, location.lng]}
            zoom={16}
            title={title}
          />
        </div>
      </Modal>
      <Modal
        header="Are you sure?"
        show={showConfirimModal}
        onCancel={cancelDeleteHandler}
        footerClass="place-item__modal-actions"
        footer={
          <>
            <Button inverse onClick={cancelDeleteHandler}>
              CANCEL
            </Button>
            <Button danger onClick={confirmDeleteHandler}>
              DELETE
            </Button>
          </>
        }
      >
        <p>
          Do you want to delete this place? Please note that it can't be undone
          there after.
        </p>
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
            {isLoggedIn && (
              <>
                <Button to={`/places/${id}`}>Edit</Button>
                <Button danger onClick={showDeleteWarningHandler}>
                  Delete
                </Button>
              </>
            )}
          </div>
        </Card>
      </li>
    </>
  );
};

export default PlaceItem;
