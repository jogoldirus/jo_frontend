import React, { useState } from 'react'
import { Outlet } from 'react-router-dom';
import Sidebar from '../../Composants/Admin/Sidebar';
const AdminBoard = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const toggleSidebar = () => setIsExpanded(!isExpanded);
  return (
    <div className="flex min-h-screen">
      <Sidebar isExpanded={isExpanded} toggleSidebar={toggleSidebar} />
      <div className={`flex-1  ${isExpanded ? 'ml-[20%]' : 'ml-20'}  transition-all duration-300`}>
        <div className="w-full min-h-screen sm:p-8">
          <h1 className="text-lg text-center md:text-left md:text-2xl font-semibo ld mb-3 md:mb-6">Bienvenue sur votre Dashboard</h1>
          {/* Votre contenu de dashboard ici */}
          <div className="space-y-6 h-full grow">
            <Outlet />  {/* Affiche le contenu de la route enfant */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminBoard