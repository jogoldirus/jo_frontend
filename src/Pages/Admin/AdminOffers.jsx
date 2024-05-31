import React, { useEffect, useState } from 'react'
import MagicArray from '../../Composants/Reusable/MagicArray'
import EventView from '../../Composants/Admin/EventView'
import { FaFilePdf } from 'react-icons/fa'
import { fetchWithAuth, fetchWithoutAuth, renderDate } from '../../Functions'
import OfferView from '../../Composants/Admin/OfferView'
import Button from '../../Composants/Reusable/Button'
import Modal from '../../Composants/Reusable/Modal'
function AdminOffers() {
  const [loading, setLoading] = useState(false)
  const [visible, setVisible] = useState(false)
  const [events, setEvents] = useState([])
  const [data, setData] = useState({ name: "", description: "", price: 0, placeInclude: 0, color: "gray", eventID: 0 })
  const columnForOffers = [
    {
      accessorKey: 'id', // Assurez-vous que les clés correspondent aux données de votre objet
      id: 'id',
      header: 'ID',
      // Sort by default
      accessorFn: info => String(info.id),
      cell: info => info.getValue(),
    },
    {
      accessorKey: 'eventID', // Assurez-vous que les clés correspondent aux données de votre objet
      id: 'eventID',
      header: 'ID de l\'événement',
      // Sort by default
      accessorFn: info => String(info.eventID),
      cell: info => info.getValue(),
    },

    {
      accessorKey: 'eventName', // Assurez-vous que les clés correspondent aux données de votre objet
      id: 'eventName',
      header: 'Nom de l\'événement',
      cell: info => info.getValue(),
    },
    {
      accessorKey: 'name', // Assurez-vous que les clés correspondent aux données de votre objet
      id: 'name',
      header: 'Name',
      cell: info => info.getValue(),
    },
    {
      accessorKey: 'description', // Assurez-vous que les clés correspondent aux données de votre objet
      id: 'description',
      header: 'Description',
      cell: info => info.getValue(),
    },
    {
      accessorKey: 'price', // Assurez-vous que les clés correspondent aux données de votre objet
      id: 'price',
      header: 'Prix',
      accessorFn: info => info.price + "€",
      cell: info => info.getValue(),
    },

    // {
    //   accessorKey: 'Delete', // Assurez-vous que les clés correspondent aux données de votre objet
    //   header: 'Delete',
    //   cell: info => <p onClick={() => submitDelete(info.getValue(), "measure_group", "Measure Group")} className="bg-red-500 text-white mx-3 cursor-pointer w-fit px-2 py-1 rounded hover:bg-red-700" > x</p>,
    // }


  ]
  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value })
  }
  useEffect(() => {
    getEvents()
  }, [])
  const getEvents = async () => {
    fetchWithoutAuth('/api/events').then(result => {
      setEvents(result)
    })
  }
  const createOffer = async () => {
    setLoading(true)
    const name = data.name
    const description = data.description
    const price = data.price
    const placeInclude = data.placeInclude
    const color = data.color
    const eventID = data.eventID

    fetchWithAuth('/api/offer/create', {
      method: 'POST',
      body: { name, description, price, placeInclude, color, eventID }
    }).then(data => {
      console.log(data)
      setLoading(false)
      setVisible(false)
    }).catch(err => {
      console.error(err)
      setLoading(false)
    })
  }
  return (
    <div>
      <div className='w-min'>

        <Button color={"red"} mode="contained" onClick={() => setVisible(!visible)} >Crée une offre</Button>
      </div>
      <Modal isOpen={visible} openModal={setVisible} >
        <div className='bg-white shadow-md rounded-lg p-6'>
          {JSON.stringify(data)}
          <h2 className='text-2xl font-bold border-b-2 border-gray-300 pb-2 mb-4'>Crée une offre</h2>
          <div className='flex flex-wrap -mx-2'>

            <div className='w-full px-2'>
              <label htmlFor="name" className="text-sm font-bold text-gray-600 block">Nom de l'offre</label>
              <input onChange={handleChange} type="text" id="name" name="name" className="w-full border-2 border-gray-300 p-2 rounded-md focus:outline-none focus:border-red-500" />
            </div>
            <div className='w-full px-2'>
              <label htmlFor="description" className="text-sm font-bold text-gray-600 block">Descriptipn</label>
              <input onChange={handleChange} type="text" id="description" name="description" className="w-full border-2 border-gray-300 p-2 rounded-md focus:outline-none focus:border-red-500" />
            </div>
            <div className='w-full px-2'>
              <label htmlFor="placeInclude" className="text-sm font-bold text-gray-600 block">Nombre de places</label>
              <input onChange={handleChange} type="number" id="placeInclude" name="placeInclude" className="w-full border-2 border-gray-300 p-2 rounded-md focus:outline-none focus:border-red-500" />
            </div>
            <div className='w-full px-2'>
              <label htmlFor="price" className="text-sm font-bold text-gray-600 block">Prix</label>
              <input onChange={handleChange} type="number" id="price" name="price" className="w-full border-2 border-gray-300 p-2 rounded-md focus:outline-none focus:border-red-500" />
            </div>
            {/* Select with good choose of color */}
            <div className='w-full px-2'>
              <label htmlFor="color" className="text-sm font-bold text-gray-600 block">Couleur</label>
              <select onChange={handleChange} id="color" name="color" className="w-full border-2 border-gray-300 p-2 rounded-md focus:outline-none focus:border-red-500">
                <option value="gray">Gris</option>
                <option value="red">Rouge</option>
                <option value="green">Vert</option>
                <option value="blue">Bleu</option>
                <option value="yellow">Jaune</option>
              </select>
            </div>
            <div className='w-full px-2'>
              <label htmlFor="eventID" className="text-sm font-bold text-gray-600 block">Evenement</label>
              <select onChange={handleChange} id="eventID" name="eventID" className="w-full border-2 border-gray-300 p-2 rounded-md focus:outline-none focus:border-red-500">
                <option value={0}>Choisir un évenement</option>
                {
                  events.map(event => {
                    return <option key={event.id} value={event.id}>{event.name}</option>
                  })
                }
              </select>
            </div>

          </div>
          <div className='flex flex-wrap -mx-2 pt-5'>
            <div className='flex flex-wrap -mx-2 w-full'>
              <Button isLoadingForce={loading} text='Crée' onClick={async () => await createOffer()} color="red" />
            </div>
          </div>
        </div>
      </Modal>
      <MagicArray color={"red"} height={450} primaryKey='id' deleteUrl={"/api/offer/:id"} selectionActions={[]} ExpandedComp={<OfferView />} fetchMethod='GET' selectable fetchUrl="/api/offers" columns={columnForOffers} />
    </div>
  )
}

export default AdminOffers