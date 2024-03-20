import { useNavigate } from 'react-router-dom'
import { Book } from '../../types/types'
import BookPlaceHolder from '../../assets/bookplaceholder.png'
import { FaPenAlt, FaTrashAlt } from 'react-icons/fa'
import { useAuthContext } from '../../hooks/useAuthContext'
import Modal from '../common/Modal/Modal'
import { useState } from 'react'

interface Props {
    book: Book
    type?: string
}


interface BookFormState {
    title: string;
    author: string;
    category: string;
    file: File | null;
  }

const BookCard: React.FC<Props> = (props) => {
    const navigate = useNavigate()
    const { user } = useAuthContext()

    const [showConfirmModal1, setShowConfirmModal1] = useState<boolean>(false)
    const [showConfirmModal2, setShowConfirmModal2] = useState<boolean>(false)

    const categories = ['Maths', 'Physics', 'Chemistry', 'Biology', 'Law', 'Computer Science']

    const handleDelete = (e: React.MouseEvent) => {
        e.stopPropagation()
        setShowConfirmModal1(false)
    }

    const handleEdit = (e: React.MouseEvent) => {
        e.stopPropagation()
        setShowConfirmModal2(false)
    }

    const handleCancel = () => {
        setShowConfirmModal1(false)
    }


    // Initialize form state with TypeScript type
    const [bookForm, setBookForm] = useState<BookFormState>({
        title: props.book.title,
        author: props.book.author,
        category: props.book.category,
        file: null,
    });

    // Handle input changes with TypeScript for typing the event
    const handleChange = (e: any) => {
        const { name, value, files } = e.target;
        if (name === 'file' && files) {
            setBookForm((prevForm) => ({ ...prevForm, file: files[0] }));
        } else {
            setBookForm((prevForm) => ({ ...prevForm, [name]: value }));
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setShowConfirmModal2(false); 
    };

    return (
        <>


            <Modal isOpen={showConfirmModal1} onClose={() => setShowConfirmModal1(false)}>
                <div className='w-full p-4 min-h-[20rem] flex flex-col gap-4 items-center justify-center max-w-[30rem] rounded-md bg-white'>
                    <h1 className='text-center text-black'>
                        Are you sure you want to delete "{props.book.title}"?
                    </h1>
                    <div className='flex gap-4'>
                        <button className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2" onClick={handleDelete}>
                            Confirm
                        </button>
                        <button className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2" onClick={handleCancel}>
                            Cancel
                        </button>
                    </div>
                </div>
            </Modal>

            <Modal isOpen={showConfirmModal2} onClose={() => setShowConfirmModal2(false)}>
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
                        {
                            categories.map((cat:string)=>{
                                return <option value={cat}>{cat}</option>
                            })
                        }
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

            <div className={`${props.type === 'books' ? "w-[14rem]" : ""} shadow-lg  text-center overflow-hidden`}>
                <div style={{ minHeight: props.type === 'books' ? "12rem" : "", maxWidth: props.type === "books" ? "14rem" : "" }} onClick={() => navigate(`/book/${props.book._id}`)} className='h-[17rem] rounded-t-md   overflow-hidden hover:opacity-[.7] duration-300'>
                    <img src={BookPlaceHolder} className='w-full h-full object-cover' alt="" />
                </div>
                <div className='font-[500] w-full whitspace-nowrap text-ellipsis'>{props.book?.author}</div>
                <div className='font-[400] text-[.9rem] w-full whitespace-nowrap text-ellipsis'>{props.book?.title}</div>

                {
                    user.role === 'admin' && <div className="flex justify-between items-start p-2 space-x-2">
                        <div onClick={() => setShowConfirmModal2(true)} className="w-[1.5rem] h-[1.5rem] cursor-pointer hover:bg-gray-200 rounded-full  text-black flex items-center justify-center overflow-hidden">
                            <FaPenAlt />
                        </div>

                        <div onClick={() => setShowConfirmModal1(true)} className="w-[1.5rem] h-[1.5rem] cursor-pointer hover:bg-gray-200  text-black flex items-center justify-center rounded-full overflow-hidden">
                            <FaTrashAlt />
                        </div>
                    </div>
                }
            </div>


        </>
    )
}

export default BookCard