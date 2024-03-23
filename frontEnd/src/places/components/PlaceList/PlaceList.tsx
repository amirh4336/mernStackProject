import { FC, useContext } from "react";
import Card from "../../../shared/components/UIElements/Card/Card";
import "./PlaceList.css";
import PlaceItem, { IPlaceItemProps } from "../PlaceItem/PlaceItem";
import Button from "../../../shared/components/FormElements/Button/Button";
import { useParams } from "react-router-dom";
import { AuthContext } from "../../../shared/context/auth-context";

interface IPlaceListProps {
  items: IPlaceItemProps["item"][];
  onDelete: (deletedPlaceId: string) => void;
}

const PlaceList: FC<IPlaceListProps> = ({ items, onDelete }) => {
  const userIdSlug = useParams().userId;
  const { userId } = useContext(AuthContext);

  if (items.length === 0) {
    return (
      <div className="place-list center">
        <Card>
          <h2>No places found. Maybe create one?</h2>
          {userIdSlug === userId && (
            <Button to="/places/new">Share Place</Button>
          )}
        </Card>
      </div>
    );
  }

  return (
    <ul className="place-list">
      {items.map((item) => (
        <PlaceItem key={item.id} item={item} onDelete={onDelete} />
      ))}
    </ul>
  );
};

export default PlaceList;
