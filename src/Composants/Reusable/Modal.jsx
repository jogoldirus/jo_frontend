import React, { useEffect, useRef } from 'react'
// import { disableBodyScroll, enableBodyScroll, clearAllBodyScrollLocks } from 'body-scroll-lock';
import { AiFillHome } from 'react-icons/ai';

const disableBodyScroll = () => { }
const enableBodyScroll = () => { }
const clearAllBodyScrollLocks = () => { }

const uniqueId = Math.random()
function Modal({ openModal, isOpen, preformedModal, modalData, children, icon }) {

  let targetElement = null
  useEffect(() => {
    const modal = document.getElementById(uniqueId);
    if (isOpen === true) {
      targetElement = document.querySelector('#root')
      console.log(targetElement);
      disableBodyScroll(targetElement)
    }
    if (modal) window.onclick = (event) => {
      if (event.target === modal) {
        closeModal()
      }
    }

    // document.addEventListener("click", checkIfClickedOutside)
    return () => {
      // document.removeEventListener("click", checkIfClickedOutside)
    }
  }, [isOpen])
  const closeModal = () => {
    clearAllBodyScrollLocks()
    openModal(false)
  }
  const handleOnClick = (button, action) => {
    if (button.onClick) {
      // isLoading = 1
      try {
        Promise.resolve(button.onClick())
          .then(() => action())
          .catch(err => console.log(err))
      } catch (error) {
        console.log(error);
      }
      return
    } else {
      return action()
    }
  }
  const TheIcon = icon ? icon : AiFillHome
  var md = modalData
  if (!md) md = {}
  const modalOptions = {
    color: md.color ? md.color : '#FF0000',
    title: md.title ? md.title : 'DefaultTitle',
    message: md.message ? md.message : 'This is a default message',
    buttons: md.buttons ? md.buttons : md.noButton === true ? [] : [
      {
        text: 'No',
        onClick: () => { alert('Pressed no') }
      },
      {
        text: 'Yes',
        onClick: async () => { alert('Pressed Yes') }
      },
      {
        text: 'Maybe',
        onClick: () => { alert('Pressed Maybe') }
      },

    ]
  }
  if (!isOpen) return
  return (
    <div id={uniqueId} className="fixed inset-0 z-[100] flex justify-center items-center bg-black bg-opacity-50">
      {preformedModal ? (
        <>
          <div className="w-full max-w-lg mx-auto">
            <div className="bg-white shadow-xl rounded-lg overflow-hidden">
              <div className="flex justify-between items-center bg-gray-100 p-4">
                <div className="flex items-center ">
                  <span>
                    <TheIcon size='25' color={modalOptions.color} />
                  </span>
                  <h2 className="ml-2 text-lg font-semibold">{modalOptions.title}</h2>
                </div>
                <button className="p-2 rounded hover:bg-gray-200" onClick={openModal}>
                  X
                </button>
              </div>
              <div className="p-4">
                {modalOptions.message}
              </div>
              <div className="flex justify-end p-4 space-x-2">
                {modalOptions.buttons.map((row, index) => (
                  <button
                    type={row.type || ''}
                    key={index}
                    className={`px-4 py-2 text-white font-semibold rounded-lg ${index === 0 ? 'bg-gray-500 hover:bg-gray-600' : 'bg-red-500 hover:bg-red-600'}`}
                    onClick={() => handleOnClick(row, openModal)}
                    style={{ backgroundColor: index !== 0 ? modalOptions.color : '' }}
                  >
                    {row.text}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </>
      ) : (
        children
      )}
    </div>
  );

}

export default Modal