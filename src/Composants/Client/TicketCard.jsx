import dayjs from 'dayjs'
import React, { useRef, useState } from 'react'
import { FaDownload, FaUser } from 'react-icons/fa'
import { FaChevronLeft } from "react-icons/fa";
import Button from '../Reusable/Button';
import jsPDF from 'jspdf';
import JPEG from 'jpeg-js';
import html2canvas from 'html2canvas';
import PdfTicketTemplate from './PdfTicketTemplate';
function TicketCard({ ticket }) {
  const componentRef = useRef(null)
  const generatePdf = async (componentRef) => {
    const input = componentRef.current;
    if (!input) return console.error('No ref provided');
    // Convert the component to a canvas, then to an image
    const canvas = await html2canvas(input, {
      allowTaint: true, // Autoriser le chargement des images externes
      scale: 4, // Ajustez cette valeur pour améliorer la qualité (2, 3, 4, etc.)
      useCORS: true, // Nécessaire pour les images externes
    });

    // Convertir le canvas en image JPEG compressée
    const imgData = canvas.toDataURL('image/jpeg', 0.8); // 0.8 est le facteur de qualité (entre 0 et 1)

    // Convertir l'image JPEG en format Uint8Array pour jsPDF
    const jpegData = atob(imgData.split(',')[1]);
    const jpegArray = new Uint8Array(jpegData.length);

    for (let i = 0; i < jpegData.length; i += 1) {
      jpegArray[i] = jpegData.charCodeAt(i);
    }

    const jpegImage = JPEG.decode(jpegArray, { useTArray: true }); // Définir useTArray sur true

    const pdf = new jsPDF('p', 'mm', 'a4');
    const imgWidth = pdf.internal.pageSize.getWidth();
    const imgHeight = (jpegImage.height * imgWidth) / jpegImage.width;

    pdf.addImage(jpegArray, 'JPEG', 0, 0, imgWidth, imgHeight);
    pdf.save('document.pdf');
  };
  const handleGeneratePdf = () => {
    generatePdf(componentRef)
  }
  return (
    <div className='relative overflow-hidden'>
      <div className='absolute -left-[-9999px] -top[-9999px]'>

        <PdfTicketTemplate theRef={componentRef} ticket={ticket} />
      </div>
      <div className=' group hover:bg-slate-100  flex flex-row justify-between text-red-500 items-center content-center'>
        <div className='flex flex-row gap-5 items-center'>

          <div className='flex flex-row items-center text-white bg-red-500 rounded py-2 px-1'>
            <p className='text-4xl'>{ticket.placeInclude}</p>
            <FaUser size={32} />
          </div>
          <div>
            <p className='text-3xl'>{ticket.offerName}</p>
            <p>{ticket.description}</p>
          </div>
        </div>
        <div>
          {/* Format date to readable format */}
        </div>
        <div className='flex flex-col justify-center items-left'>
          <p>Acheté le {dayjs(ticket.orderDate).format('DD/MM/YYYY - HH[h]m')}</p>
          <p>Lieu : {ticket.city} - {ticket.adress}</p>
        </div>
        <div className='group-hover:flex hidden'>
          <div className='flex flex-col size-8 transition-all cursor-pointer'>
            <div className='flex flex-row gap-5 h-full w-full'>
              <FaDownload onClick={handleGeneratePdf} color="#ef4444" size={32} />
            </div>
          </div>
        </div>
      </div>
      <div className=' border-b-2 border-slate-100' />
    </div>
  )
}

export default TicketCard