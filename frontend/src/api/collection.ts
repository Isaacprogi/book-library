import axios from "axios";
import { Book } from "../types/types";

const baseUrl:string = 'http://localhost:4000/api'

export const fetchCollectionApiCall = async (): Promise<any> => {
    return await axios.get(`${baseUrl}/collection`)
 }

 export const addToCollectionApiCall = async (book:Book): Promise<any> => {
   return await axios.post(`${baseUrl}/collection`, book);
 };
  
export const removeFromCollectionApiCall = async (bookId: string): Promise<void> => {
    return  await axios.delete(`${baseUrl}/collection/${bookId}`)
};
  