import axios from "axios";
import { User } from "../types/types";

const baseUrl:string = 'http://localhost:4000/api'

export const fetchUsersApiCall = async (): Promise<any> => {
    return await axios.get(`${baseUrl}/user`)
 }

 export const addUserApiCall = async (user:Omit<User, '_id'>): Promise<any> => {
   return await axios.post(`${baseUrl}/user`,user);
 };


 export const getUserApiCall = async (userId: string): Promise<any> => {
   return await axios.get(`${baseUrl}/user/${userId}`);
 };
  
export const deleteUserApiCall = async (userId: string): Promise<void> => {
    return  await axios.delete(`${baseUrl}/user/${userId}`)
};

export const updateUserCall = async (userId: string,user:Partial<User>): Promise<any> => {
    return  await axios.put(`${baseUrl}/user/${userId}`,user)
};
  