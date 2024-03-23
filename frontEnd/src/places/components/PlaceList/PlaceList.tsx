import { FC } from "react";
import Card from "../../../shared/components/UIElements/Card/Card";
import "./PlaceList.css";
import PlaceItem, { IPlaceItemProps } from "../PlaceItem/PlaceItem";
import Button from "../../../shared/components/FormElements/Button/Button";

interface IPlaceListProps {
  items: IPlaceItemProps["item"][];
  onDelete: (deletedPlaceId: string) => void;
}

const PlaceList: FC<IPlaceListProps> = ({ items, onDelete }) => {
  if (items.length === 0) {
    return (
      <div className="place-list center">
        <Card>
          <h2>No places found. Maybe create one?</h2>
          <Button to="/places/new">Share Place</Button>
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
