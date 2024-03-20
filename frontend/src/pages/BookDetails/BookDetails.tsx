import { useParams } from "react-router-dom"
import { useBookContext } from "../../hooks/useBookContext"
import { useEffect } from "react"
import { ClipLoader } from "react-spinners"
import BookPlaceholder from '../../assets/bookplaceholder.png'
import { useCollectionContext } from "../../hooks/useCollectionContext"

const BookDetails = () => {
    const { id } = useParams()
    const { getBook, currentBook } = useBookContext()
    const { addToCollection, removeFromCollection, loading,error } = useCollectionContext()

    useEffect(() => {
        getBook(id)
    }, [])

    function handleAdd() {
        addToCollection()
    }

    function handleRemove() {
        removeFromCollection()
    }

    return (
        <div className="flex flex-col w-full">

            <div className="w-full">
                <div className="w-full max-w-[20rem] h-[40rem]">
                    <img src={BookPlaceholder} alt="" />
                </div>
                <div className="flex flex-col gap-y-[1rem]">
                    <span>
                        {currentBook.title}
                    </span>
                    <span>
                        {currentBook.author}
                    </span>
                    <span>
                        {currentBook.category}
                    </span>
                </div>
            </div>
            <div className="flex gap-[1rem]">
                <span onClick={handleAdd} className="h-[2rem] bg-blue-500 flex items-center justify-center hover:bg-blue-600 duration-300  w-[8rem]">
                    {loading.addToCollection ? <ClipLoader size={18} color="white" /> : 'Add to Collection'}
                </span>
                <span onClick={handleRemove} className="h-[2rem] bg-blue-500 flex items-center justify-center hover:bg-blue-600 duration-300 w-[8rem]">
                    {loading.removeFromCollection ? <ClipLoader size={18} color="white" /> : 'Remove from Collection'}
                </span>

            </div>

            <div className="w-full h-[2rem] ">
                {
                  error.addToCollection && error.addToCollection
                }
            </div>

        </div>
    )
}

export default BookDetails