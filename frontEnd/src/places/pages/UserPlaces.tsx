import { useParams } from "react-router-dom";
import PlaceList from "../components/PlaceList/PlaceList";
import { useEffect, useState } from "react";
import { useHttpClient } from "../../shared/hooks/http-hook";
import ErrorModal from "../../shared/components/UIElements/ErrorModal/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner/LoadingSpinner";
import { IPlaceItemProps } from "../components/PlaceItem/PlaceItem";

const UserPlaces = () => {
  const userId = useParams().userId;

  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [loadedPlaces, setLoadedPlaces] = useState([]);

  useEffect(() => {
    const sendHandler = async () => {
      try {
        const resData = await sendRequest({
          url: `http://localhost:5000/api/places/user/${userId}`,
        });

        setLoadedPlaces(resData.places);
      } catch (err: any) {
        console.log(err);
      }
    };
    sendHandler();
  }, [sendRequest, userId]);

  const placeDeleteHandler = (deletedPlaceId: string) => {
    setLoadedPlaces((prevPlaces) =>
      prevPlaces.filter(
        (place: IPlaceItemProps["item"]) => place.id !== deletedPlaceId
      )
    );
  };

  return (
    <>
      {error && <ErrorModal error={error} onClear={clearError} />}
      {isLoading && (
        <div className="center">
          <LoadingSpinner />
        </div>
      )}
      {!isLoading && loadedPlaces && (
        <PlaceList items={loadedPlaces} onDelete={placeDeleteHandler} />
      )}
    </>
  );
};

export default UserPlaces;
