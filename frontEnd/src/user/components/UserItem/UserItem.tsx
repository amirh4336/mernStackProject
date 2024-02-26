import { FC } from "react";
import "./UserItem.css";
import Avatar from "../../../shared/components/UIElements/Avatar/Avatar";
import { Link } from "react-router-dom";
import Card from "../../../shared/components/UIElements/Card/Card";

export interface IUserItemProps {
  id: string;
  image: string;
  name: string;
  places: number;
}

const UserItem: FC<IUserItemProps> = ({ id, image, name, places }) => {
  return (
    <li className="user-item">
      <Card className="user-item__content">
        <Link to={`/${id}/places`}>
          <div className="user-item__image">
            <Avatar image={image} alt={name} />
          </div>
          <div className="user-item__info">
            <h2>{name}</h2>
            <h3>
              {places} {places === 1 ? "Place" : "Places"}
            </h3>
          </div>
        </Link>
      </Card>
    </li>
  );
};

export default UserItem;
