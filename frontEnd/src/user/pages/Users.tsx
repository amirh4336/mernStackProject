import UsersList from "../components/UsersList/UsersList"

const Users = () => {

  const USERS = [
    { id: 'u1', name: 'Max' , image : "img1" , places: 3},
    { id: 'u2', name: 'Manuel' , image : "img2" , places: 1},
    { id: 'u3', name: 'Julie' , image : "img3" , places: 2},
  ]


  return (
    <UsersList items={USERS} />
  )
}

export default Users