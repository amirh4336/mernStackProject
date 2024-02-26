import { FC } from "react";
import "./UsersList.css";
import UserItem, { IUserItemProps } from "../UserItem/UserItem";

interface IUsersListProps {
  items: IUserItemProps[];
}

const UsersList: FC<IUsersListProps> = ({ items }) => {
  if (items.length === 0) {
    return (
      <div className="center">
        <h2>No Users Found.</h2>
      </div>
    );
  }

  return (
    <ul>
      {items.map((user) => (
        <UserItem key={user.id} {...user} />
      ))}
    </ul>
  );
};

export default UsersList;
