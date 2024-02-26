import { FC } from "react";
import Card from "../../../shared/components/UIElements/Card/Card";
import "./PlaceList.css";
import PlaceItem, { IPlaceItemProps } from "../PlaceItem/PlaceItem";

interface IPlaceListProps {
  items : IPlaceItemProps[]
}

const PlaceList : FC<IPlaceListProps> = ({items}) => {

  if( items.length === 0)
  {
    return <div className="place-list center">
      <Card>
        <h2>No places found. Maybe create one?</h2>
        <button>Share Place</button>
      </Card>
    </div>;
  }

  return <ul className="place-list">
    {
      items.map(item => (
          <PlaceItem key={item.id} {...item} />
        )
      )
    }
  </ul>;
};

export default PlaceList;
