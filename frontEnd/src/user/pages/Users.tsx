import { useEffect, useState } from "react";
import UsersList from "../components/UsersList/UsersList";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner/LoadingSpinner";
import ErrorModal from "../../shared/components/UIElements/ErrorModal/ErrorModal";

const Users = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const sendRequest = async () => {
      setIsLoading(true);
      try {
        const res = await fetch("http://localhost:5000/api/users");

        const responseData = await res.json();
        if (!res.ok) {
          throw new Error(responseData.message);
        }
        setUsers(responseData.users);
      } catch (err: any) {
        setError(err.message || "Something went wrong, please try again");
      } finally {
        setIsLoading(false);
      }
    };
    sendRequest();
  }, []);

  const errorHandler = () => {
    setError(undefined);
  };

  return (
    <>
      {error && <ErrorModal error={error} onClear={errorHandler} />}
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
