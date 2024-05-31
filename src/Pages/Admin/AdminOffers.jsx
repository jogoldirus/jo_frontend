import React from 'react'
import MagicArray from '../../Composants/Reusable/MagicArray'
import EventView from '../../Composants/Admin/EventView'
import { FaFilePdf } from 'react-icons/fa'
import { renderDate } from '../../Functions'
import OfferView from '../../Composants/Admin/OfferView'
function AdminOffers() {

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
  return (
    <div>
      <MagicArray color={"red"} height={450} primaryKey='id' deleteUrl={"/apiV2/offer/:id"} selectionActions={[{ text: 'Sample', icon: <FaFilePdf />, action: async (rows) => { } }]} ExpandedComp={<OfferView />} fetchMethod='GET' selectable fetchUrl="/apiV2/offers" columns={columnForOffers} />
    </div>
  )
}

export default AdminOffers