import UserCard from "../UserCard/UserCard";
import { User } from "../../types/types";

const users:User[] = [
  {
    _id: "65f9cac253bdkdkk49077183c395c",
    fullName: "Isaac Anasonye",
    email: "isaaconyes80@gmail.com",
    username:'maiki',
    avatar: "http://res.cloudinary.com/dbtjysxp1/image/upload/v1710869185/deck_task…",
    course: "Computer Science",
    bookCollection: [],
    role: "admin"
  },
  {
    _id: "65f9cac253b49077183c395c",
    fullName: "Isaac Anasonye",
    username:'kiri',
    email: "isaaconyes80@gmail.com",
    avatar: "http://res.cloudinary.com/dbtjysxp1/image/upload/v1710869185/deck_task…",
    course: "Computer Science",
    bookCollection: [],
    role: "admin"
  },

];

const UserTable = () => {

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
