import { FC, useContext, useState } from "react";
import Card from "../../../shared/components/UIElements/Card/Card";
import Button from "../../../shared/components/FormElements/Button/Button";
import Modal from "../../../shared/components/UIElements/Modal/Modal";
import Map from "../../../shared/components/UIElements/Map/Map";

import "./PlaceItem.css";
import { AuthContext } from "../../../shared/context/auth-context";
import { useHttpClient } from "../../../shared/hooks/http-hook";
import ErrorModal from "../../../shared/components/UIElements/ErrorModal/ErrorModal";
import LoadingSpinner from "../../../shared/components/UIElements/LoadingSpinner/LoadingSpinner";

export interface IPlaceItemProps {
  item: {
    id: string;
    image: string;
    title: string;
    description: string;
    address: string;
    creator: string;
    location: {
      lat: number;
      lng: number;
    };
  };
  onDelete: (deletedPlaceId: string) => void;
}

const PlaceItem: FC<IPlaceItemProps> = ({ item, onDelete }) => {
  const { id, image, title, address, description, location, creator } = item;

  const { isLoggedIn, userId, token } = useContext(AuthContext);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
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

  const confirmDeleteHandler = async () => {
    try {
      await sendRequest({
        url: `${import.meta.env.VITE_BACKEND_URL}/places/${id}`,
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      onDelete(id);
    } catch (err) {
      console.log(err);
    } finally {
      setShowConfirmModal(false);
    }
  };

  return (
    <>
      {error && <ErrorModal error={error} onClear={clearError} />}
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
        {isLoading && <LoadingSpinner asOverlay />}
      </Modal>
      <li className="place-item">
        <Card className="place-item__content">
          <div className="palce-item__image">
            <img
              src={`${import.meta.env.VITE_BACKEND_ASSET}/${image}`}
              alt={title}
              height={200}
              width="100%"
            />
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
            {isLoggedIn && userId === creator && (
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
