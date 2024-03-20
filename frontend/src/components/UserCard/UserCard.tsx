import React, { useState } from 'react'
import { User } from '../../types/types'
import { FaPencilAlt, FaTrash, FaUserCircle } from 'react-icons/fa'
import Modal from '../common/Modal/Modal'
import { useNavigate } from 'react-router-dom'

interface UserCardProps {
  user: User
}

interface UserForm {
  fullName: string;
  username: string;
  email: string;
  course: string;
  avatar: string;
  role: 'user' | 'admin';
  avatarFile: File | null
}

const UserCard: React.FC<UserCardProps> = (props) => {
   console.log(props.user)
  const [showConfirmModal1, setShowConfirmModal1] = useState<boolean>(false)
  const [showConfirmModal2, setShowConfirmModal2] = useState<boolean>(false)
  const navigate = useNavigate()

  const initalFormState = {
    ...props.user,
    avatarFile: null as File | null,
  }

  const [editedUser, setEditedUser] = useState<UserForm>(initalFormState);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setEditedUser({ ...editedUser, [e.target.name]: e.target.value });
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setEditedUser({ ...editedUser, avatarFile: file });
    }
  };

  const handleClick = () => {
    navigate(`profile/${props.user.username}`)
  }

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation()
    setShowConfirmModal1(false)
  }

  const handleEdit = (e: React.MouseEvent) => {
    e.stopPropagation()
    setShowConfirmModal2(true)
  }

  const handleCancel = () => {
    setShowConfirmModal1(false)
  }

  const handleEditSubmit = (e: React.MouseEvent) => {
    e.preventDefault();
    // Here you would handle the form submission, possibly updating the user in your backend
    console.log(editedUser);
    // After submission, close the modal
    setShowConfirmModal2(false);
  };




  return (
    <>

      <Modal isOpen={showConfirmModal1} onClose={() => setShowConfirmModal1(false)}>
        <div className='w-full p-4 min-h-[20rem] flex flex-col gap-4 items-center justify-center max-w-[30rem] rounded-md bg-white'>
          <h1 className='text-center text-black'>
            Are you sure you want to delete {props.user.username}?
          </h1>
          <div className='flex gap-4'>
            <button className='hover:bg-gray-200 w-[5rem] h-[2rem] flex items-center justify-center' onClick={handleDelete}>
              Confirm
            </button>
            <button className='hover:bg-gray-200 w-[5rem] h-[2rem] flex items-center justify-center' onClick={handleCancel}>
              Cancel
            </button>
          </div>
        </div>
      </Modal>

      <Modal isOpen={showConfirmModal2} onClose={() => setShowConfirmModal2(false)}>
        <form className='w-full p-4 min-h-[20rem] flex flex-col gap-4 items-center justify-center max-w-[30rem] rounded-md bg-white'>
          <h1 className='text-center text-[1.5rem] text-black'>{props.user.username} info</h1>
          <input
            type="file"
            id="avatar"
            name="avatar"
            onChange={handleAvatarChange}
            className="sr-only"
          />
          <label
            className='rounded-full w-10 h-10 overflow-hidden border'
            htmlFor="avatar"
          >
            {editedUser.avatarFile ? (
              <img
                src={URL.createObjectURL(editedUser.avatarFile)}
                alt="Avatar Preview"
                className="w-full h-full object-cover rounded-full mr-2"
              />
            ) : editedUser.avatar?
            <img
                src={props.user.avatar}
                alt="Avatar Preview"
                className="w-10 h-10 object-cover rounded-full mr-2"
              />:
             (
              <FaUserCircle className='text-3xl text-blue-500' />
            )}
          </label>
          <input
            type="text"
            name="fullName"
            value={editedUser.fullName}
            onChange={handleInputChange}
            placeholder="Full Name"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="email"
            name="email"
            value={editedUser.email}
            onChange={handleInputChange}
            placeholder="Email"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            name="course"
            value={editedUser.course}
            onChange={handleInputChange}
            placeholder="Course"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <select
            name="role"
            value={editedUser.role}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
          <button
            onClick={handleEditSubmit}
            className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Submit
          </button>
        </form>
      </Modal>


      <tr onClick={handleClick} className="bg-white relative hover:bg-gray-200 duration-300 cursor-pointer border-b" key={props.user._id}>
        <td  className="py-8 px-6"><img className='w-10 border rounded-full h-10' src={props.user.avatar}/></td>
        <td className="py-8 px-6">{props.user.fullName}</td>
        <td className="py-8 px-6">{props.user.email}</td>
        <td className="py-8 px-6">{props.user.course}</td>
        <td className="py-8 px-6">{props.user.role}</td>

        <div className="absolute left-0 px-[1rem] flex items-center gap-[1rem] bottom-[.2rem]">

          <div onClick={handleEdit} className="w-[1.5rem] h-[1.5rem] hover:bg-gray-100 rounded-full  text-black flex items-center justify-center overflow-hidden">
            <FaPencilAlt />
          </div>

          <div onClick={handleDelete} className="w-[1.5rem] h-[1.5rem] hover:bg-gray-100  text-black flex items-center justify-center rounded-full overflow-hidden">
            <FaTrash />
          </div>

        </div>
      </tr>

    </>
  )
}

export default UserCard