import React, { useState, useRef, useEffect } from 'react';
import { FaSpinner } from 'react-icons/fa';

const MagicDropdown = ({ text, actions = [], selectedRows }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isProcessing, setIsProcessing] = useState({});
  const dropdownRef = useRef(null);

  const toggleDropdown = () => setIsOpen(!isOpen);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [dropdownRef]);

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <div>
        <button
          type="button"
          onMouseEnter={toggleDropdown}
          onClick={toggleDropdown}
          className="whitespace-nowrap overflow-hidden inline-flex items-center justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-200 ease-in-out"
        >
          {text} <span className="ml-2 ">{isOpen ? '▲' : '▼'}</span> {/* Chevron ici */}
        </button>
      </div>

      {isOpen && (
        <div className="origin-top-left absolute left-0 mt-2 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 transition duration-200 ease-in-out">
          <div role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
            {actions.map((action, index) => {
              const isDeleteButton = (action.text && action.text.toLowerCase().includes("delete"))
              return <div
                key={index}
                className={`flex select-none  items-center whitespace-nowrap cursor-pointer px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition duration-150 ease-in-out ${index < actions.length - 1 ? 'border-b border-gray-200' : ' rounded-b-md'} ${isDeleteButton ? ' text-white !bg-red-400 ' : ''}`}
                role="menuitem"
                onClick={async () => {
                  if (isProcessing[index]) return;
                  setIsProcessing({ ...isProcessing, [index]: true });
                  await action.action(selectedRows);
                  setIsProcessing({ ...isProcessing, [index]: false });
                  setIsOpen(false);
                }}
              >
                {isProcessing[index] === true && <FaSpinner className='animate-spin mr-2' show={isProcessing[index]} />}
                {action.icon && <span className="mr-3">{action.icon}</span>}
                {action.text}
              </div>
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default MagicDropdown;
