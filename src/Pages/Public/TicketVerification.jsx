import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { fetchWithoutAuth } from '../../Functions'
import { LuLoader2 } from 'react-icons/lu'
import { FaCheck } from 'react-icons/fa'
function TicketVerification() {

  const { completeKey } = useParams()
  const [ticket, setTicket] = useState({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const checkTicket = async () => {
    const isValid = fetchWithoutAuth(`/apiV2/user/ticket/verify/${completeKey}`, { method: "POST" }).then(data => {
      setTicket(data)
      setLoading(false)
    })
      .catch(err => {
        console.error(err)
        setLoading(false)
        setError(err.message)
      })
  }
  useEffect(() => {
    checkTicket()
  }, [])
  if (error) return (
    <div className='flex flex-col justify-center items-center content-center w-screen h-screen text-red-500 gap-4'>
      <p className='text-3xl text-red-500'>Erreur lors de la vérification du ticket</p>
      <p>{error}</p>
    </div>
  )
  if (loading) return (
    <div className='flex flex-row justify-center items-center content-center w-screen h-screen text-red-500 gap-4'>
      <LuLoader2 className='animate-spin' size={48} />
      <p className='text-3xl text-red-500'>Vérification du ticket en cours...</p>
    </div>
  )
  return (
    <div className='w-full h-full'>

      <div className='flex flex-col justify-center items-center content-center w-screen h-screen text-red-500 gap-4'>
        <FaCheck size={48} />
        <p className='text-3xl text-red-500'>Ticket valide</p>
        <div>
          <p>Evenement : {ticket.eventName}</p>
          <p>{ticket.description}</p>
          <p>Offre : {ticket.offerName}</p>
          <p>Nombre de places : {ticket.placeInclude}</p>
          <p>Prix : {ticket.price}€</p>
        </div>
      </div>
      <p className='text-gray-400 text-center'>Id : {ticket.id}</p>
    </div>
  )
}

export default TicketVerification