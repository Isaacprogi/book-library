import React, { createContext, useState } from 'react';
import { UserContextType, userError, userLoading, User } from '../types/types';
import { getUserApiCall, fetchUsersApiCall, addUserApiCall, deleteUserApiCall, updateUserCall } from '../api/user';

export const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserContextProvider: React.FC<{ children: React.ReactElement }> = ({ children }) => {
  const [users, setUsers] = useState<User[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<userError>({ getUsers: "", getUser: "", addUser: "", deleteUser: "", updateUser: "" });
  const [loading, setLoading] = useState<userLoading>({ getUsers: false, getUser: false, addUser: false, deleteUser: false, updateUser: false });


  const getUsers = async () => {
    setLoading(prev => ({ ...prev, getUsers: true }));
    try {
      const { data } = await fetchUsersApiCall();
      setUsers(data);
    } catch (error: any) {
      setError(prev => ({ ...prev, getUsers: error?.response?.data || 'Failed to fetch users' }));
    } finally {
      setLoading(prev => ({ ...prev, getUsers: false }));
    }
  };

  const getUser = async (userId: string) => {
    setLoading(prev => ({ ...prev, getUser: true }));
    try {
      const { data } = await getUserApiCall(userId);
      setUser(data);
    } catch (error: any) {
      setError(prev => ({ ...prev, getUser: error?.response?.data || 'Failed to fetch user' }));
    } finally {
      setLoading(prev => ({ ...prev, getUser: false }));
    }
  };

  const addUser = async (newUser: Omit<User, '_id'>) => {
    setLoading(prev => ({ ...prev, addUser: true }));
    try {
      const { data } = await addUserApiCall(newUser);
      setUsers(prev => [...prev, data]);
    } catch (error: any) {
      setError(prev => ({ ...prev, addUser: error?.response?.data || 'Failed to add user' }));
    } finally {
      setLoading(prev => ({ ...prev, addUser: false }));
    }
  };

  const deleteUser = async (userId: string) => {
    setLoading(prev => ({ ...prev, deleteUser: true }));
    try {
      await deleteUserApiCall(userId);
      setUsers(prev => prev.filter(user => user._id !== userId));
    } catch (error: any) {
      setError(prev => ({ ...prev, deleteUser: error?.response?.data || 'Failed to delete user' }));
    } finally {
      setLoading(prev => ({ ...prev, deleteUser: false }));
    }
  };

  const updateUser = async (userId: string, updatedInfo: Partial<User>) => {
    setLoading(prev => ({ ...prev, updateUser: true }));
    try {
      const { data } = await updateUserCall(userId, updatedInfo);
      setUsers(prev => prev.map(user => user._id === userId ? { ...user, ...data } : user));
    } catch (error: any) {
      setError(prev => ({ ...prev, updateUser: error?.response?.data || 'Failed to update user' }));
    } finally {
      setLoading(prev => ({ ...prev, updateUser: false }));
    }
  };

  const contextValue: UserContextType = {
    users,
    user,
    getUsers,
    getUser,
    addUser,
    deleteUser,
    updateUser,
    setError,
    setLoading,
    error,
    loading,
  };

  return <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>;
};
