import React from 'react'
import Header from './Header';
import Footer from './Footer';
import { Outlet } from 'react-router-dom';
const HeaderAndFooter = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header noMoreOutlet={true} />
      <div className="flex-grow">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default HeaderAndFooter