import BookCard from '../BookCard/BookCard'
import { Book } from '../../types/types'
import { FaTimes } from 'react-icons/fa';

interface BooksDisplayProps{
    books:Book[];
    setBooks:React.Dispatch<React.SetStateAction<Book[]>>
}

const BooksDisplay:React.FC<BooksDisplayProps> = ({books,setBooks}) => {
     const handleCancel = () => {
        setBooks([])
     }
  return (
    <div className='mt-[2rem] max-w-[1200px] mx-auto'>
    <div className='font-bold w-full flex justify-between px-[1rem] font-600 text-[1rem]'>
        <span>
        Your search Result
        </span>
        <FaTimes onClick={handleCancel} className="cursor-pointer"/>
    </div>
    <div className='grid mx-auto max-w-[70rem] grid-cols-2 p-[1rem] sm:grid-cols-2 lg:grid-cols-4 gap-[1rem] flex-wrap'>
        {
            books && books.map((book)=>{
                return<BookCard book={book}  key={book._id}/>
            })
        }
    </div>
    </div>
  )
}

export default BooksDisplay