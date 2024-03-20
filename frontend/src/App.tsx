import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home/Home';
import Books from './pages/Books/Books';
import Category from './pages/Category/Category';
import Profile from './pages/Profile/Profile';
import NavBar from './components/NavBar/NavBar';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import { useAuthContext } from './hooks/useAuthContext';
import { useEffect } from 'react'
import useTaskContext from './hooks/useTaskContext';
import BookDetails from './pages/BookDetails/BookDetails';
import AdminDashboard from './pages/AdminDashBoard/AdminDashboard';
import Users from './pages/Users/Users';

const PrivateRoute = ({ element }: { element: React.ReactNode }) => {
  const { token } = useAuthContext();
  if (!token) {
    return <Navigate to="/login" />;
  }
  return element;
};

const PublicRoute = ({ element }: { element: React.ReactNode }) => {
  const { token } = useAuthContext();
  if (token) {
    return <Navigate to="/" />;
  }
  return element;
};


const AdminRoute = ({ element }: { element: React.ReactNode }) => {
  const { token, user } = useAuthContext();
  if (!token || user.role !== 'admin') {
    return <Navigate to="/login" />;
  }
  return element;
};


const App = () => {
  const { token, refresh,user } = useAuthContext();
  const {getTasks} = useTaskContext()

  useEffect(()=>{
    refresh()
  },[])

  useEffect(()=>{
   getTasks()
  },[token])

  return (
    <div className='w-full transition-all   duration-300 h-screen overflow-y-auto'>
      {token && <NavBar />}
      <Routes>
        <Route path='/' element={<PrivateRoute element={<Home />} />} />
        <Route path='/books' element={<PrivateRoute element={<Books />} />} />
        <Route path='/books/:id' element={<PrivateRoute element={<BookDetails />} />} />
        <Route path='/category' element={<PrivateRoute element={<Category />} />} />
        <Route path='/profile/:id' element={<PrivateRoute element={<Profile />} />} />
       {
        user.role === 'admin' &&  <Route path='/admin' element={<PrivateRoute element={<AdminDashboard />} />} >
          <Route index element={<Users/>}/>
          <Route path='books' element={<Books/>}/>
        </Route>
       }
        <Route path='/login' element={<PublicRoute element={<Login />} />} />
        <Route path='/register' element={<PublicRoute element={<Register />} />} />
      </Routes>
    </div>
  );
};

export default App;
