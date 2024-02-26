import { FC } from "react";
import "./UserItem.css";

export interface IUserItemProps {
  id: string;
  image: string;
  name: string;
  places: number;
}

const UserItem :FC<IUserItemProps> = () => {
  return <div>UserItem</div>;
};

export default UserItem;
