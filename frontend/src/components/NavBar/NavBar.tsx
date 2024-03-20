import { useAuthContext } from '../../hooks/useAuthContext';
import { Link } from 'react-router-dom';
import NavItem from '../common/NavItem/NavItem';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { NavLinks } from '../../types/types';

const NavBar = () => {
  const { logout, user } = useAuthContext()
  const [active, setActive] = useState<Boolean>(false)
  const navigate = useNavigate()
  const [scrolledDown, setScrolledDown] = useState<Boolean>(false)


  const handleProfileView = () => {
    navigate('profile')
    setActive(false)
  }

  const handleLogout = () => {
    logout()
  }


  const navLinks:NavLinks[] = [
    { id: "1", path:'/', value: 'Home' },
    { id: "2", path:'/books', value: 'books' },
    { id: "3", path:'/category', value: "category" }
  ]

  const handleDisplay = () => {
    return setTimeout(() => {
      setActive(!active)
    }, 200)
  }

  useEffect(() => {
    const handleScroll = () => {
      console.log('hello')
      setScrolledDown(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [window]);

  return (

    <div className={`top-0 sticky z-[900] w-full ${scrolledDown ? 'bg-yellow-100' : 'bg-gray-900'}`}>


      <div className='w-full h-[4rem] max-w-[1200px] mx-auto flex items-center px-[1rem] justify-between'>
        <Link to='/' className='font-bold text-lg text-neutral-200'>Yupi</Link>
        <div className='flex items-center  justify-start gap-x-[1rem]'>
          {
            navLinks.map((link) => {
              return <NavItem key={link.id} {...link} />
            })
          }

          {
           user.role === 'admin' && <NavItem id='nav-link' path='/admin' value='admin'  />
          }
          <div className='relative'>
            <div onClick={handleDisplay} className='h-[2rem] cursor-pointer w-[2rem] border border-2 rounded-full overflow-hidden'>
              <img className='w-full h-full' src={user.avatar} alt="" />
            </div>

            <div className={`w-[13rem]  overflow-hidden flex flex-col ${active ? "block" : "hidden"} top-[2.2rem] right-[1rem] rounded-md absolute  bg-white border-gray-400  h-[10rem]`}>
              <div className='p-[.5rem]'>
                <div onClick={handleProfileView} className='h-[3rem] cursor-pointer w-[3rem] border border-2 rounded-full overflow-hidden'>
                  <img className='w-full h-full' src={user.avatar} alt="" />
                </div>
              </div>

              <div className='min-h-[3rem] flex flex-col'>
              <span className='border-b px-[.5rem] font-[600]'>{user.fullName}</span>
              <span className='border-b px-[.5rem] text-[.9rem]'>{user.course}</span>
              </div>

              <span onClick={handleLogout} className=' h-[4rem]  flex items-center justify-center hover:bg-black hover:text-white cursor-pointer'>Logout</span>
            </div>
          </div>


        </div>
      </div>
    </div>
  );
};

export default NavBar;
