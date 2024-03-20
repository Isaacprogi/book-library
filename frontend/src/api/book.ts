import axios from "axios";

const baseUrl:string = 'http://localhost:4000/api'

export const fetchBooksApiCall = async (category?:string,searchValue?:string): Promise<any> => {
    return await axios.get(`${baseUrl}/book?${category ?`category=${category}`:""}${searchValue?`&search=${searchValue}`:""}`)
 }

 export const addToCollectionApiCall = async (bookId: string,config:Object): Promise<any> => {
   return await axios.post(`${baseUrl}/book`, bookId,config);
 };
  
export const removeFromCollectionApiCall = async (bookId: string,config:Object): Promise<void> => {
    return  await axios.delete(`${baseUrl}/book/${bookId}`,config)
};

export const getBookApiCall = async (bookId: string): Promise<any> => {
    return  await axios.get(`${baseUrl}/book/${bookId}`)
};
  