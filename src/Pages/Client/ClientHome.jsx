import React, { useEffect, useState } from 'react'
import { fetchWithAuth } from '../../Functions'
import Button from '../../Composants/Reusable/Button';
import { useAuth } from '../../Providers/AuthContext';
import TicketCard from '../../Composants/Client/TicketCard';
function ClientHome() {
  const [tickets, setTickets] = useState([])
  const [activeTab, setActiveTab] = useState(0)
  const { isLogged, logout, userPayload, deleteAccount } = useAuth()
  useEffect(() => {
    if (!isLogged) return
    if (activeTab === 1) fetchWithAuth('/api/user/tickets')
      .then(data => setTickets(data))
      .catch(err => console.error(err))
  }, [activeTab])

  const renderTicketList = (tickets) => {
    if (!Array.isArray(tickets)) return (
      <div className='flex flex-row justify-center items-center content-center'>
        <p className='text-3xl text-red-500'>Erreur lors de la récuperation de vos billets</p>
      </div>
    )
    if (tickets.length === 0) return (
      <div className='flex flex-row justify-center items-center content-center'>
        <p className='text-3xl text-red-500'>Vous n'avez pas encore de billets</p>
      </div>
    )
    return tickets.sort((a, b) => new Date(b.orderDate) - new Date(a.orderDate)).map(ticket => {
      return (
        <TicketCard key={ticket.id} ticket={ticket} />
      )
    })
  }
  return (
    <div className='md:px-20 px-2 flex flex-col md:flex-row gap-5 my-5 h-full grow'>
      <div className='flex flex-col md:w-1/3 gap-5 h-full'>
        <h1 className='text-4xl text-red-500 text-center'>Bienvenue sur votre espace personnel</h1>
        <div className='flex flex-col gap-5 '>
          <Button onClick={() => setActiveTab(0)} color='red' mode='contained'>Mon compte</Button>
          <Button onClick={() => setActiveTab(1)} color='red' mode='contained'>Mes billets et réversation</Button>
        </div>
      </div>
      {activeTab === 0 && <div className='flex flex-col gap-4 flex-1 '>
        <h1 className='text-4xl text-red-500 text-center'>Mon compte</h1>
        <div className='flex flex-col gap-5 justify-between'>
          <div className='flex flex-row justify-between items-center'>
            <p>Prénom</p>
            <p className='capitalize'>{userPayload.name}</p>
          </div>
          <div className='flex flex-row justify-between items-center'>
            <p>Nom</p>
            <p className='capitalize'>{userPayload.forename}</p>
          </div>
          <div className='flex flex-row justify-between items-center'>
            <p>Email</p>
            <p>{userPayload.email}</p>
          </div>

          {/* Bouton pour supprimer son compte s'il le souhaite */}
          <div className='flex flex-row justify-center'>
            <div className='w-1/2 '>
              <Button color='red' mode='outlined' onClick={deleteAccount}>Supprimer mon compte et mes données</Button>
            </div>
          </div>
        </div>
      </div>
      }
      {activeTab === 1 && <div className='flex flex-col gap-4 flex-1'>
        <h1 className='text-4xl text-red-500 text-center'>Mes billets</h1>

        <div className='flex flex-col gap-5'>
          {
            renderTicketList(tickets)
          }
        </div>
      </div>
      }
    </div>
  )
}

export default ClientHome