import {useContext} from 'react'
import { BookContext } from "../context/BookContext";

export const useBookContext = () => {
    const context = useContext(BookContext);
    if (!context) {
      throw new Error('bookAuth must be used within an BookProvider');
    }
    return context;
  };
  