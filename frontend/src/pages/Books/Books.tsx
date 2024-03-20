import BookCard from "../../components/BookCard/BookCard"
import { useBookContext } from "../../hooks/useBookContext"
import { useEffect } from "react"
import { Book } from "../../types/types"
import { MoonLoader } from 'react-spinners';


const Books = () => {
  const {getBooks,state,loading} = useBookContext()

  useEffect(()=>{
     getBooks()
  },[])
   

  return (
    <div className="w-full flex flex-wrap p-[1rem] gap-[1rem] justify-center flex-wrap min-h-[calc(100%-4rem)]">
       {state.books && state.books.map((book:Book) => (
       <BookCard key={book._id} type="books" book={book} />
       ))}
       {
        loading.getBooks && state.books.length <1 && <MoonLoader color='black' size={30}/>
       }
    </div>
  )
}

export default Books