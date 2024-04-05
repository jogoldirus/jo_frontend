import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../Providers/AuthContext';
import { FaHome, FaArrowLeft, FaUser, FaUserFriends, FaBalanceScale } from 'react-icons/fa';  // Import icons
import { FaGear } from "react-icons/fa6";
import { BiAnalyse } from "react-icons/bi";
import { MdDevicesOther, MdLogout } from "react-icons/md";
import { VscSettings } from "react-icons/vsc";
import { AiFillCalculator } from "react-icons/ai";
const Sidebar = ({ isExpanded, toggleSidebar }) => {
  const location = useLocation();
  const { logout, userPayload } = useAuth();
  const navigate = useNavigate();
  const isActive = (path) => location.pathname.includes(path);

  return (
    <div className={`fixed h-screen ${isExpanded ? 'w-1/5' : 'w-20'} p-4 shadow-lg transition-all duration-300 flex flex-col`}>
      <button
        onClick={() => toggleSidebar()}
        className={`text-2xl mb-4 ${isExpanded ? 'self-start' : 'self-center'}`}
        aria-label="Toggle Sidebar"
      >
        ☰
      </button>
      <h1 className={`text-center text-2xl font-semibold mb-4 ${isExpanded ? 'block' : 'hidden'}`}>Admin board</h1>
      {isExpanded && <h2 className='text-center'>{userPayload?.email}</h2>}
      <nav className="flex flex-col space-y-4 grow flex-1">

        <Link
          to="/dashboard"
          className={`flex ${!isExpanded && 'justify-center'} my-4 px-4 py-2 rounded transition duration-200 ease-in-out text-white bg-[var(--"red")] `}
        >
          <FaHome className={`text-center w-6 h-6  ${isExpanded && 'mr-2'} `} />
          <span className={isExpanded ? 'inline' : 'hidden'}>Dashboard</span>
        </Link>
        {[
          [{ name: 'Mesures', path: '/admin-dashboard/az', icon: <BiAnalyse size={25} /> },
          { name: 'Patients', path: '/admin-dashboard/analyse', icon: <FaUser size={20} /> },
            // { name: 'Produits', path: '/dashboard/analyse/products', icon: <GiLiquidSoap size={25} /> },
            // { name: 'OnFly', path: '/dashboard/onfly', icon: <GrSend size={20} /> }
          ],
          [{ name: 'Entreprises', path: '/admin-dashboard/users', icon: <FaUserFriends size={25} /> }],
          [{ name: 'Droits', path: '/admin-dashboard/rights', icon: <FaBalanceScale size={25} /> }],
          [{ name: 'Options', path: '/admin-dashboard/az', icon: <FaGear size={25} /> },
          { name: 'Appareils', path: '/admin-dashboard/devices', icon: <MdDevicesOther size={25} /> },
          { name: 'Paramètres', path: '/admin-dashboard/parameters', icon: <VscSettings size={25} /> },
          { name: 'Méthodes', path: '/admin-dashboard/methods', icon: <AiFillCalculator size={25} /> },
            // { name: 'Questionnaires', path: '/dashboard/survey', icon: < RiSurveyFill size={25} /> },
            // { name: 'Nouveaux', path: '/dashboard/acceptation', icon: <RiPassValidFill size={25} /> }
          ],
          // Add more items here
        ].map((item) => {
          if (Array.isArray(item)) {
            const mainItem = item[0]
            const subItem = item.slice(1)
            return <div className={`hover:shadow-lg relative flex flex-col group hover:bg-[var(--"red")] select-none ${subItem.length > 0 ? 'rounded-t' : 'rounded'}`}>
              <Link style={{ backgroundColor: isActive(mainItem.path) && "red", color: isActive(mainItem.path) ? 'white' : "red" }} key={mainItem.name} to={subItem.length === 0 && mainItem.path} className={` flex ${!isExpanded && 'justify-center'} px-4 py-2 rounded  ease-in-out group-hover:!text-white`}
                aria-current={isActive(mainItem.path) ? 'page' : undefined}
              >
                <span className={`text-center w-6 ${isExpanded && 'mr-2'}`}>{mainItem.icon}</span>
                <span className={isExpanded ? 'inline' : 'hidden'}>{mainItem.name}</span>
              </Link>
              <div style={{ backgroundColor: "red" }} className='text-white flex flex-col absolute top-full  z-30 w-full rounded-b'>

                {
                  subItem.length > 0 && subItem.map(sub => (
                    <p className={' group-hover:inline hover:underline cursor-pointer hidden ' + (isExpanded ? ' px-16 pt-3 pb-3  ' : '  text-center')}>
                      {
                        isExpanded ?
                          <Link to={sub.path} className='flex flex-row '>
                            <span className={` w-6 ${isExpanded && 'mr-2'}`}>
                              {sub.icon}
                            </span>
                            <span>{sub.name}</span>

                          </Link>
                          :
                          <Link to={sub.path} className={`py-2 flex flex-row w-full items-center justify-center content-center justify-items-center ${isExpanded && 'mr-2'}`}>
                            {sub.icon}
                          </Link>
                      }
                    </p>
                  ))
                }
              </div>
            </div>
          }
          return <Link
            key={item.name}
            to={item.path}
            className={`flex ${!isExpanded && 'justify-center'} px-4 py-2 rounded transition duration-200 ease-in-out 
          ${isActive(item.path) ? 'bg-indigo-500 text-white' : 'hover:bg-gray-200'}`}
            aria-current={isActive(item.path) ? 'page' : undefined}
          >
            <span className={`text-center w-6 ${isExpanded && 'mr-2'}`}>{item.icon}</span>
            <span className={isExpanded ? 'inline' : 'hidden'}>{item.name}</span>
          </Link>

        })}
      </nav>
      <button
        onClick={() => {
          navigate('/')
        }}
        className={`flex items-center justify-center px-4 py-2 rounded transition duration-200 ease-in-out hover:bg-gray-200`}
      >
        <FaArrowLeft size={20} className={`text-center  ${isExpanded && 'mr-2'} `} />
        <span className={isExpanded ? 'inline' : 'hidden'}></span>
      </button>
      <button
        onClick={() => {
          logout();
          navigate('/')
        }}
        className={`flex items-center justify-center px-4 py-2 rounded transition duration-200 ease-in-out hover:bg-gray-200`}
      >
        <MdLogout size={25} className={`text-center  ${isExpanded && 'mr-2'} `} />
        <span className={isExpanded ? 'inline' : 'hidden'}>Déconnexion</span>
      </button>

    </div>
  );

};

export default Sidebar;
