import UserCard from "../UserCard/UserCard";
import { User } from "../../types/types";
import { useUserContext } from "../../hooks/useUserContext";
import { useEffect } from "react";

const UserTable = () => {
     const {users,getUsers}:{users:User[],getUsers:()=>void} = useUserContext()

     useEffect(()=>{
          getUsers()
     },[])
     

  return (
    <div className="overflow-x-auto mt-[2rem] relative ">
      <table className="w-full text-sm text-left text-gray-500">
        <thead className="text-xs  text-gray-700 uppercase bg-gray-700 text-white">
          <tr>
            <th scope="col" className="py-3 px-6">
              Full Name
            </th>
            <th scope="col" className="py-3 px-6">
              Email
            </th>
            <th scope="col" className="py-3 px-6">
              Course
            </th>
            <th scope="col" className="py-3 px-6">
              Role
            </th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <UserCard user={user}/>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;
