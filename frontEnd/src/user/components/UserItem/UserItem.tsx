import { FC } from "react";
import "./UserItem.css";
import Avatar from "../../../shared/components/UIElements/Avatar/Avatar";
import { Link } from "react-router-dom";
import Card from "../../../shared/components/UIElements/Card/Card";

export interface IUserItemProps {
  id: string;
  image: string;
  name: string;
  places: string[];
}

const UserItem: FC<IUserItemProps> = ({ id, image, name, places }) => {
  return (
    <li className="user-item">
      <Card className="user-item__content">
        <Link to={`/${id}/places`}>
          <div className="user-item__image">
            <Avatar
              image={`${import.meta.env.VITE_BACKEND_ASSET}/${image}`}
              alt={name}
            />
          </div>
          <div className="user-item__info">
            <h2>{name}</h2>
            <h3>
              {places.length} {places.length === 1 ? "Place" : "Places"}
            </h3>
          </div>
        </Link>
      </Card>
    </li>
  );
};

export default UserItem;
