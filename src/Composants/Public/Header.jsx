import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
// import gsap from 'gsap';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../Providers/AuthContext';
import Button from '../Reusable/Button';
import { MdLogout } from "react-icons/md";
import { FaShoppingBasket } from "react-icons/fa";
const Header = () => {
  const { isLogged, logout, userPayload } = useAuth()
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const navigate = useNavigate();

  // useEffect(() => {
  //   gsap.set(menuRef.current, { autoAlpha: 0 });
  // }, []);

  // useEffect(() => {
  //   gsap.to(menuRef.current, { autoAlpha: menuOpen ? 1 : 0, duration: 0.3 });
  // }, [menuOpen]);

  return (
    <header className="bg-white py-2 md:px-0 px-4  shadow-md">
      <div className="container mx-auto flex items-center justify-between">
        <Link to="/" className="text-2xl font-semibold">
          JO
        </Link>
        <p>Welcome {userPayload.email} {userPayload.userID}</p>
        <div className="hidden md:flex items-center space-x-6">
          {/* <Link to="/features" className="text-lg">Découvrir</Link> */}
          <Link to="/offers" className="text-lg">Offres</Link>
        </div>
        <div className="hidden md:flex items-center space-x-6">
          {isLogged ? (
            <>
              <Button to="/admin-dashboard" color={"red"} mode="contained" >Adminboard</Button>
              <Button to="/dashboard" color={"red"} mode="contained" >Board</Button>

              <div className='cursor-pointer'><MdLogout size={25} onClick={() => { logout(); navigate('/') }} /></div>
            </>
          ) : (
            <div className='flex flex-row gap-3 justify-center items-center'>
              <Button to="/login" color={"red"} mode="outlined" >Connexion</Button>
              <Button to="/signup" color={"red"} mode="contained" >Nous rejoindre</Button>
              <div className='relative cursor-pointer'>
                <div className='absolute text-red-600 bg-slate-100 rounded-full  right-[-10px]'>

                  <p className='px-[4px] text-sm'>1</p>
                </div>
                <FaShoppingBasket size={30} color='red' />
              </div>
            </div>
          )}
        </div>


        <div className="md:hidden flex items-center relative">
          <button onClick={() => setMenuOpen(!menuOpen)}>
            <span className="text-2xl">☰</span>
          </button>

          {menuOpen && <div ref={menuRef} className="absolute top-full right-0 mt-2 bg-white rounded-lg shadow-lg p-4 space-y-2 z-10">
            <Link to="/features" className="block px-4 py-2">Découvrir</Link>
            <Link to="/pricing" className="block px-4 py-2">Offres</Link>
            {isLogged ? (
              <>
                <Link to="/dashboard" className="block px-4 py-2">Dashboard</Link>
                <button onClick={() => () => { logout(); navigate('/') }} className="block px-4 py-2">Déconnexion</button>
              </>
            ) : (
              <>
                <Link to="/login" className="block px-4 py-2">Connexion</Link>
                <Link to="/signup" className="block px-4 py-2">Nous rejoindre</Link>
              </>
            )}
          </div>}
        </div>
      </div>
    </header>
  );
};

export default Header;
