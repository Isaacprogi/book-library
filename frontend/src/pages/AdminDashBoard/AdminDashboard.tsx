import { FaPlus } from 'react-icons/fa';
import { Outlet, Link, useLocation } from 'react-router-dom';
import Modal from '../../components/common/Modal/Modal';
import { useState, ChangeEvent, FormEvent } from 'react';

// Define a type for the form state
interface BookFormState {
  title: string;
  author: string;
  category: string;
  file: File | null;
}

const AdminDashboard: React.FC = () => {
  const [showConfirmModal, setShowConfirmModal] = useState<boolean>(false);
  const { pathname } = useLocation();

  // Initialize form state with TypeScript type
  const [bookForm, setBookForm] = useState<BookFormState>({
    title: '',
    author: '',
    category: '',
    file: null,
  });

  // Handle input changes with TypeScript for typing the event
  const handleChange = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>) => {
    const { name, value, files } = e.target;
    if (name === 'file' && files) {
      setBookForm((prevForm) => ({ ...prevForm, file: files[0] }));
    } else {
      setBookForm((prevForm) => ({ ...prevForm, [name]: value }));
    }
  };

  // Handle form submission with TypeScript for typing the event
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log(bookForm);
    // Handle form submission logic here
    setShowConfirmModal(false); // Close the modal on successful submission
  };

  return (
    <>
      <Modal isOpen={showConfirmModal} onClose={() => setShowConfirmModal(false)}>
        <form 
          className='w-full p-6 flex flex-col gap-4 items-center justify-center max-w-md rounded-lg bg-white shadow-md' 
          onSubmit={handleSubmit}
        >
          <input 
            type="text" 
            name="title" 
            placeholder="Title" 
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" 
            value={bookForm.title}
            onChange={handleChange}
            required 
          />
          <input 
            type="text" 
            name="author" 
            placeholder="Author" 
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" 
            value={bookForm.author}
            onChange={handleChange}
            required 
          />
          <select 
            name="category" 
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" 
            value={bookForm.category}
            onChange={handleChange as React.ChangeEventHandler<HTMLSelectElement>}
            required
          >
            <option value="">Select Category</option>
            <option value="fiction">Fiction</option>
            <option value="non-fiction">Non-fiction</option>
            <option value="educational">Educational</option>
            {/* Add more categories as needed */}
          </select>
          <input 
            type="file" 
            name="file" 
            accept=".pdf"
            className="w-full px-4 py-2 file:border file:border-gray-300 file:rounded-md file:px-4 file:py-2 file:text-sm file:bg-white file:text-gray-700 hover:file:bg-gray-50" 
            onChange={handleChange}
            required 
          />
          <button 
            type="submit" 
            className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Add Book
          </button>
        </form>
      </Modal>

      <div className="min-h-screen bg-gray-100 p-8">
        <div className="flex gap-4">
          <Link to='' className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            View Users
          </Link>
          <Link to='books' className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
            View Books
          </Link>

          {pathname === '/admin/books' && (
            <button
              onClick={() => setShowConfirmModal(true)}
              className="flex items-center justify-center bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
            >
              <FaPlus />
            </button>
          )}
        </div>

        <Outlet />
      </div>
    </>
  );
};

export default AdminDashboard;
