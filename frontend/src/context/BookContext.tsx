import React, { createContext, ReactElement, useEffect, useReducer } from "react";
import {BookAction, BookContextProps,Book, BookState, bookError, bookLoading } from "../types/types";
import {fetchBooksApiCall,getBookApiCall } from "../api/book";
import { useState } from "react"

export const BookContext = createContext<any>(null);

const bookReducer = (state: BookState, action: BookAction): BookState => {
  switch (action.type) {
    case "SET":
      return { ...state, books: action.payload };
    case "GET_BOOK":
      return { ...state, currentBook: action.payload };
    default:
      return state;
  }
};

const BookContextProvider: React.FC<{ children: ReactElement }> = ({ children }) => {

  const [state, dispatch] = useReducer(bookReducer, { books: [], currentBook:null,});
  const [loading, setLoading] = useState<bookLoading>({
    getBooks:false,
    searchBooks:false,
    getBook:false,
  })


  
  const [error, setError] = useState<bookError>({
    getBooks:"",
    searchBooks:"",
    getBook:'',
  })

  const getBooks = async () => {
    setLoading(prev => ({ ...prev, getBooks: true }))
    setError(prev => ({ ...prev, getBooks: '' }))
    try {
      const { data }:{data:Book[]} = await fetchBooksApiCall();
      dispatch({ type: "SET", payload: data });
      setLoading(prev => ({ ...prev, getBooks: false }))
    } catch (error: any) {
      console.error("Error:", error.message);
      setError(prev => ({ ...prev, getBooks: error?.response?.data }))
      setLoading(prev => ({ ...prev, getBooks: false }))
    }
};

  const getBook = async (id:string) => {
    setLoading(prev => ({ ...prev, getBook: true }))
    setError(prev => ({ ...prev, getBook: '' }))
    try {
      const { data }:{data:Book} = await getBookApiCall(id);
      console.log(data)
      dispatch({ type: "GET_BOOK", payload: data });
      setLoading(prev => ({ ...prev, getBook: false }))
    } catch (error: any) {
      console.error("Error:", error.message);
      setError(prev => ({ ...prev, getBook: error?.response?.data }))
      setLoading(prev => ({ ...prev, getBook: false }))
    }
};

    const searchBooks = async ({category,searchValue}:{category?:string,searchValue?:string}) => {
    setLoading(prev => ({ ...prev, searchBooks: true }))
    setError(prev => ({ ...prev, searchBooks: '' }))
    try {
      const { data }:{data:Book[]} = await fetchBooksApiCall(category,searchValue);
      setLoading(prev => ({ ...prev, searchBooks: false }))
      return data
    } catch (error: any) {
      console.error("Error:", error.message);
      setError(prev => ({ ...prev, searchBooks: error?.response?.data }))
      setLoading(prev => ({ ...prev, searchBooks: false }))
    }
};


  const contextValue: BookContextProps = {
    state,
    loading,
    error,
    dispatch,
    getBooks,
    getBook,
    searchBooks,
  };


  return (
    <BookContext.Provider value={contextValue}>
      {children}
    </BookContext.Provider>
  )
};

export default BookContextProvider;
