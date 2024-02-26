import UsersList from "../components/UsersList/UsersList";

const Users = () => {
  const USERS = [
    {
      id: "u1",
      name: "Max",
      image:
        "https://cdn.zoomg.ir/2020/6/ce342d49-d8ba-4d79-b41f-f995d26ea0fb.jpg",
      places: 3,
    },
    {
      id: "u2",
      name: "Manuel",
      image:
        "https://cdn.zoomg.ir/2020/6/ce342d49-d8ba-4d79-b41f-f995d26ea0fb.jpg",
      places: 1,
    },
    {
      id: "u3",
      name: "Julie",
      image:
        "https://cdn.zoomg.ir/2020/6/ce342d49-d8ba-4d79-b41f-f995d26ea0fb.jpg",
      places: 2,
    },
  ];

  return <UsersList items={USERS} />;
};

export default Users;
