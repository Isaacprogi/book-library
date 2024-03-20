// src/context/AuthContext.tsx
import React, { createContext, useState } from 'react';
import { AuthContextType,LoginData,  RegisterData, authError,authLoading } from '../types/types';
import { loginApi, registerApi, refreshApi,logoutApi } from '../api/auth';
import { User } from '../types/types';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';


export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthContextProvider: React.FC<{ children: React.ReactElement }> = ({ children }) => {
  const [user, setUser] = useState<User>({ id: "", fullName: '', email: '', avatar: '',course:"" });
  const [token, setToken] = useState<string | undefined>(Cookies.get('token'));
  const [error, setError] = useState<authError>({ login: "", register: "",logout:"", refresh: "" })
  const [loading, setLoading] = useState<authLoading>({ login: false, register: false,logout:false, refresh:false })

  const navigate = useNavigate()

  const login = async (user: LoginData) => {
    setLoading(prev => ({ ...prev, login: true }))
    setError(prev => ({ ...prev, login:"" }))
    try {
      const { data } = await loginApi(user)
      const { accesstoken, ...others } = await data
      setUser(others)
      setToken(accesstoken)
      Cookies.set('token', accesstoken, {
        expires: 30 / (24 * 60),
        // secure: true,
        // sameSite: 'Strict',
      });
      setLoading(prev => ({ ...prev, login: false }))
      navigate('/')  
    } catch (error: any) {
      setLoading(prev => ({ ...prev, login: false }))
      setError(prev => ({ ...prev, login: error?.response?.data }))
    }
  };

  const register = async (user: RegisterData) => {
    setLoading(prev => ({ ...prev, register: true }))
    setError(prev => ({ ...prev, register:"" }))
    try {
      const { data } = await registerApi(user)
      const { accesstoken,...others } = await data
      setUser(others)
      setToken(accesstoken)
      Cookies.set('token', accesstoken, {
        expires: 30 / (24 * 60),
        // secure: true,
        // sameSite: 'Strict',
      });
      setLoading(prev => ({ ...prev, register: false }))
      navigate('/')
    } catch (error: any) {
      setLoading(prev => ({ ...prev, register: false }))
      setError(prev => ({ ...prev, register: error?.response?.data }))
    }
  };

  const logout = async () => {
    setLoading(prev => ({ ...prev, logout: true }))
    setError(prev => ({ ...prev, logout:"" }))
    try {
      await logoutApi()
      setUser({ id: "", fullName: '', email: '', avatar: '',course:"" })
      setToken('')
      Cookies.remove('token', {
        // secure: true,
        // sameSite: 'Strict',
      });
      setLoading(prev => ({ ...prev, logout: false }))
      navigate('/login')
    } catch (error: any) {
      setLoading(prev => ({ ...prev, logout: false }))
      setError(prev => ({ ...prev, logout: error?.response?.data }))
    }
  };


  const refresh = async () => {
    setLoading(prev => ({ ...prev, refresh: true }))
    setError(prev => ({ ...prev, refresh:"" }))
    try {
      const { data } = await refreshApi()
      const { accesstoken, ...others } = await data
      if (others) {
        setUser(others)
      }
      if(accesstoken){
        Cookies.set('token', accesstoken, {
          expires: 30 / (24 * 60),
          // secure: true,
          // sameSite: 'Strict',
        });
      }
      setLoading(prev => ({ ...prev, refresh: false }))
    } catch (error: any) {
      setLoading(prev => ({ ...prev, refresh: false }))
      setError(prev => ({ ...prev, refresh: error?.response?.data }))
    }
  };


  const contextValue: AuthContextType = {
    user,
    token,
    login,
    logout,
    setError,
    setLoading,
    register,
    refresh,
    error,
    loading
  };

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
};

