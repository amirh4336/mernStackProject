import { FC } from "react";

import Card from "../../../shared/components/UIElements/Card/Card";
import UserItem, { IUserItemProps } from "../UserItem/UserItem";
import "./UsersList.css";

interface IUsersListProps {
  items: IUserItemProps[];
}

const UsersList: FC<IUsersListProps> = ({ items }) => {
  if (items.length === 0) {
    return (
      <div className="center">
        <Card>
          <h2>No Users Found.</h2>
        </Card>
      </div>
    );
  }

  return (
    <ul className="users-list">
      {items.map((user) => (
        <UserItem key={user.id} {...user} />
      ))}
    </ul>
  );
};

export default UsersList;
