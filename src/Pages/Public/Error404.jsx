import React from 'react';
import { Link } from 'react-router-dom';
// import monsterSVG from '../../src/assets/404.svg';
const Error404 = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8 space-y-8">
      <div className="text-6xl font-extrabold text-gray-900">
        404
      </div>
      <div className="text-xl text-gray-700">
        Oops! Page non trouvée.
      </div>
      <div className="w-full max-w-md text-center bg-white rounded-lg shadow-lg p-8 space-y-4">
        {/* <img src={monsterSVG} alt="Funny 404" className="rounded-lg" /> */}
        <p className="text-gray-700">
          Il semble que vous ayez perdu votre chemin. Retournez à la page d'accueil pour retrouver votre route.
        </p>
        <Link to="/" className="text-lg font-medium text-indigo-600 hover:text-indigo-500">
          Retour à la page d'accueil
        </Link>
      </div>
    </div>
  );
};

export default Error404;
