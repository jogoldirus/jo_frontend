import React, { useState } from 'react'
import MagicArray from '../../Composants/Reusable/MagicArray'
import EventView from '../../Composants/Admin/EventView'
import { FaFilePdf } from 'react-icons/fa'
import { fetchWithAuth, renderDate } from '../../Functions'
import Button from '../../Composants/Reusable/Button'
import Modal from '../../Composants/Reusable/Modal'
function AdminEvents() {
  const [visible, setVisible] = useState(false)
  const columnForEvents = [
    {
      accessorKey: 'id', // Assurez-vous que les clés correspondent aux données de votre objet
      id: 'id',
      header: 'ID',
      // Sort by default
      accessorFn: info => String(info.id),
      cell: info => info.getValue(),
    },
    {
      accessorKey: 'showOffers', // Assurez-vous que les clés correspondent aux données de votre objet
      id: 'showOffers',
      header: 'Visible',
      // Sort by default
      accessorFn: info => info.showOffers === 1 ? '✅' : info.showOffers === 0 ? '❌' : "NO DATA",
      cell: info => info.getValue(),
    },
    {
      accessorKey: 'name', // Assurez-vous que les clés correspondent aux données de votre objet
      id: 'name',
      header: 'Name',
      cell: info => info.getValue(),
    },
    {
      accessorKey: 'city', // Assurez-vous que les clés correspondent aux données de votre objet
      id: 'city',
      header: 'Ville',
      cell: info => info.getValue(),
    },
    {
      accessorKey: 'adress', // Assurez-vous que les clés correspondent aux données de votre objet
      id: 'adress',
      header: 'Adresse',
      cell: info => info.getValue(),
    },
    {
      accessorKey: 'date', // Assurez-vous que les clés correspondent aux données de votre objet
      id: 'date',
      accessorFn: info => renderDate(info.date),
      header: 'Date',
      cell: info => info.getValue()
      //   wantedValue: 'IDGroup',
    },
    // {
    //   accessorKey: 'Delete', // Assurez-vous que les clés correspondent aux données de votre objet
    //   header: 'Delete',
    //   cell: info => <p onClick={() => submitDelete(info.getValue(), "measure_group", "Measure Group")} className="bg-red-500 text-white mx-3 cursor-pointer w-fit px-2 py-1 rounded hover:bg-red-700" > x</p>,
    // }


  ]
  const [loading, setLoading] = useState(false)


  const [data, setData] = useState({ name: '', city: '', adress: '', date: '', showOffers: 0 })
  const createEvent = async () => {
    setLoading(true)
    const name = data.name
    const city = data.city
    const adress = data.adress
    const date = data.date
    if (!name || !city || !adress || !date) return console.error('Missing data')
    fetchWithAuth('/api/events/create', {
      method: 'POST',
      body: { name, city, adress, date }
    }).then(data => {
      console.log(data)
      setLoading(false)
      setVisible(false)
    }).catch(err => {
      console.error(err)
      setLoading(false)
    })
  }
  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value })
  }
  return (
    <div>
      <div className='w-min'>

        <Button color={"red"} mode="contained" onClick={() => setVisible(!visible)} >Crée un évement</Button>
        <Modal isOpen={visible} openModal={setVisible} >
          <div className='bg-white shadow-md rounded-lg p-6'>
            <h2 className='text-2xl font-bold border-b-2 border-gray-300 pb-2 mb-4'>Crée un évenement</h2>
            <div className='flex flex-wrap -mx-2'>

              <div className='w-full px-2'>
                <label htmlFor="name" className="text-sm font-bold text-gray-600 block">Nom de l'évenement</label>
                <input onChange={handleChange} type="text" id="name" name="name" className="w-full border-2 border-gray-300 p-2 rounded-md focus:outline-none focus:border-red-500" />
              </div>
              <div className='w-full px-2'>
                <label htmlFor="date" className="text-sm font-bold text-gray-600 block">Date</label>
                <input onChange={handleChange} type="date" id="date" name="date" className="w-full border-2 border-gray-300 p-2 rounded-md focus:outline-none focus:border-red-500" />
              </div>
              <div className='w-full px-2'>
                <label htmlFor="city" className="text-sm font-bold text-gray-600 block">Ville</label>
                <input onChange={handleChange} type="text" id="city" name="city" className="w-full border-2 border-gray-300 p-2 rounded-md focus:outline-none focus:border-red-500" />
              </div>
              <div className='w-full px-2'>
                <label htmlFor="adress" className="text-sm font-bold text-gray-600 block">Adresse</label>
                <input onChange={handleChange} type="text" id="adress" name="adress" className="w-full border-2 border-gray-300 p-2 rounded-md focus:outline-none focus:border-red-500" />
              </div>

            </div>
            <div className='flex flex-wrap -mx-2 pt-5'>
              <div className='flex flex-wrap -mx-2 w-full'>
                <Button isLoadingForce={loading} text='Crée' onClick={async () => await createEvent()} color="red" />
              </div>
            </div>
          </div>
        </Modal>
      </div>
      <MagicArray color={"red"} height={450} primaryKey='id' deleteUrl={"/api/events/:id"} selectionActions={[]} ExpandedComp={<EventView />} fetchMethod='GET' selectable fetchUrl="/api/events" columns={columnForEvents} />
    </div>
  )
}

export default AdminEvents