import { useEffect, useState } from "react";
import UsersList from "../components/UsersList/UsersList";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner/LoadingSpinner";
import ErrorModal from "../../shared/components/UIElements/ErrorModal/ErrorModal";
import { useHttpClient } from "../../shared/hooks/http-hook";

const Users = () => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const sendHandler = async () => {
      try {
        const resData = await sendRequest({
          url: "http://localhost:5000/api/users",
        });

        setUsers(resData.users);
      } catch (err: any) {
        console.log(err);
      }
    };
    sendHandler();
  }, [sendRequest]);

  return (
    <>
      {error && <ErrorModal error={error} onClear={clearError} />}
      {isLoading && (
        <div className="center">
          <LoadingSpinner />
        </div>
      )}
      {!isLoading && users && <UsersList items={users} />}
    </>
  );
};

export default Users;
