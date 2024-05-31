import React from 'react'
import MagicArray from '../../Composants/Reusable/MagicArray'
import EventView from '../../Composants/Admin/EventView'
import { FaFilePdf } from 'react-icons/fa'
import { renderDate } from '../../Functions'
function AdminEvents() {

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
  return (
    <div>
      <MagicArray color={"red"} height={450} primaryKey='id' deleteUrl={"/apiV2/events/:id"} selectionActions={[{ text: 'Sample', icon: <FaFilePdf />, action: async (rows) => { } }]} ExpandedComp={<EventView />} fetchMethod='GET' selectable fetchUrl="/apiV2/events" columns={columnForEvents} />
    </div>
  )
}

export default AdminEvents