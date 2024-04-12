import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// import { Spinner as Loader } from 'phosphor-react'; // You can use any library for the loader
const colorClasses = {
  red: 'bg-red-600 text-red-500 hover:bg-red-700  focus:ring-red-500 border-red-700 ',
  yellow: 'bg-yellow-600 text-yellow-500 hover:bg-yellow-700 focus:ring-yellow-500 border-yellow-700 ',
  blue: ' bg-blue-600 text-blue-500 hover:bg-blue-700 focus:ring-blue-500 border-blue-700 ',
  green: ' bg-green-600 text-green-500 hover:bg-green-700 focus:ring-green-500 border-green-700 ',
  purple: ' bg-purple-600 text-purple-500 hover:bg-purple-700 focus:ring-purple-500 border-purple-700 ',
  indigo: ' bg-indigo-600 text-indigo-500 hover:bg-indigo-700 focus:ring-indigo-500 border-indigo-700 ',
  pink: ' bg-pink-600 text-pink-500 hover:bg-pink-700 focus:ring-pink-500 border-pink-700 ',
  orange: 'bg-orange-600 text-orange-500 hover:bg-orange-700 focus:ring-orange-500 border-orange-700 ',
  gray: ' bg-gray-600 text-gray-500 hover:bg-gray-700 focus:ring-gray-500 border-gray-700 ',
  teal: ' bg-teal-600 text-teal-500 hover:bg-teal-700 focus:ring-teal-500 border-teal-700 ',
  lime: ' bg-lime-600 text-lime-500 hover:bg-lime-700 focus:ring-lime-500 border-lime-700 ',
  cyan: ' bg-cyan-600 text-cyan-500 hover:bg-cyan-700 focus:ring-cyan-500 border-cyan-700 ',
  black: ' bg-black text-black hover:bg-gray-900 focus:ring-gray-800 border-black ',
  white: ' bg-white text-gray-800 hover:bg-gray-100 focus:ring-gray-200 border-gray-700 ', // Ici, la bordure est gris clair pour contraster avec le blanc
  brown: ' bg-brown-600 text-brown-500 hover:bg-brown-700 focus:ring-brown-500 border-brown-700 ',
  amber: ' bg-amber-600 text-amber-500 hover:bg-amber-700 focus:ring-amber-500 border-amber-700 ',
  deepOrange: ' bg-deep-orange-600 text-deep-orange-500 hover:bg-deep-orange-700 focus:ring-deep-orange-500 border-deep-orange-700 ',
  lightBlue: ' bg-light-blue-600 text-light-blue-500 hover:bg-light-blue-700 focus:ring-light-blue-500 border-light-blue-700 ',
  deepPurple: ' bg-deep-purple-600 text-deep-purple-500 hover:bg-deep-purple-700 focus:ring-deep-purple-500 border-deep-purple-700 ',
  // Ajoutez d'autres couleurs si nécessaire
};


const Button = ({ text, disabled = false, to, mode, color, onClick, icon, children, isLoadingForce, ...rest }) => {
  const [isLoading, setIsLoading] = useState(isLoadingForce || false);

  const navigate = useNavigate();
  const handleClick = async () => {
    try {

      if (to) {
        navigate(to);
        // navigate to to 
        return;
      }
      if (isLoadingForce === true) return;
      setIsLoading(true);
      await onClick();
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  };
  let classes = ' disabled:bg-slate-400 disabled:!border-0 border-2  whitespace-nowrap w-full h-full flex flex-row justify-center font-bold transition-all inline-flex items-center px-4 py-2 border rounded-md shadow-sm text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 ';
  const getButtonClass = () => {
    if (color) {
      if (colorClasses[color]) {
        classes += (colorClasses[color] + ' ');
      }
    }
    switch (mode) {
      case 'outlined':
        classes += ' transition-all bg-opacity-0  hover:text-white  focus:ring-indigo-500 ';
        break;
      case 'text':
        classes += ` bg-opacity-0 hover:bg-opacity-10 shadow-none border-0 `;
        break;
      case 'contained':
        classes += ` !text-white `;
        break;
      default:
        classes += ' border-gray-300 text-gray-700 focus:ring-indigo-500 ';
    }

    return classes;
  };

  return (
    <button disabled={disabled} className={getButtonClass()} onClick={handleClick} {...rest}>
      {(isLoading || isLoadingForce === true) && (
        <div
          className='animate-spin'
          style={{
            display: 'inline-block',
            width: '24px',
            height: '24px',
            borderWidth: '2px',
            borderStyle: 'solid',
            borderTopColor: 'transparent',
            borderRightColor: 'transparent',
            borderBottomColor: 'transparent',
            borderLeftColor: 'currentColor',
            borderRadius: '50%',
            marginRight: '2px',
          }}
        />
      )}
      {icon && <icon.icon size={24} className="mr-2 " />}
      {text ? <p className='!font-bold  !whitespace-nowrap'>{text}</p> : children}
    </button>
  );
};

Button.defaultProps = {
  mode: 'outlined',
  color: 'indigo',
  icon: null,
};

export default Button;