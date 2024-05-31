import React, { cloneElement, useEffect, useMemo, useState } from 'react';
import { useReactTable, getCoreRowModel, flexRender, getPaginationRowModel, getSortedRowModel, getFilteredRowModel, getExpandedRowModel } from '@tanstack/react-table';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import MagicDropdown from './MagicDropdown';
import { fetchWithAuth } from '../../Functions';
import { ImCross } from "react-icons/im";
import { FaArrowDown } from "react-icons/fa6";
import { IoIosArrowForward } from "react-icons/io";
// import ArbitrageTableExpandedDetails from './ArbitrageTableExpandedDetails';
dayjs.extend(relativeTime);



function MagicArray({ color = "#c0c0c0", selectionActions, columns, primaryKey = "id", deleteUrl, fetchUrl, fetchMethod, dataArray, ExpandedComp, selectable }) {
  const [sorting, setSorting] = useState([]);
  const [filterValue, setFilterValue] = useState('');
  const [filterColumnId, setFilterColumnId] = useState('');
  const [expanded, setExpanded] = useState({}); // État pour gérer les lignes étendues
  const [data, setData] = useState([]); // Données pour le tableau
  const [fetched, setFetched] = useState(false); // Données pour le tableau
  const fetchDatas = async () => {
    if (dataArray) {
      setData(dataArray)
      setFetched(true)
      return Promise.resolve()
    }
    if (!dataArray && !fetchMethod) return Promise.resolve()
    const response = await fetchWithAuth(fetchUrl, { method: fetchMethod })
    setFetched(true)
    setData(response)
  }
  // Update data from row 
  const updateData = (rowIndex, columnId, value) => {
    setData(old =>
      old.map((row, index) => {
        if (Number(index) === Number(rowIndex)) {
          return {
            ...old[rowIndex],
            [columnId]: value,
          };
        }
        return row;
      })
    );
  };
  // Add a new row
  const addRow = (row) => {
    setData((prev) => [...prev, row])
  }
  useEffect(() => {
    fetchDatas();
  }, [dataArray]); // Le tableau vide signifie que l'effet s'exécute une seule fois après le montage du composant

  // Ajouter une colonne pour les boutons d'expansion
  const expansionColumn = {
    id: 'expansion',
    header: () => null, // Pas d'en-tête pour cette colonne
    cell: ({ row }) => (
      row.getCanExpand() ? <div>
        <button className={"text-2xl " + (row.getIsExpanded() && 'rotate-90')} onClick={row.getToggleExpandedHandler()}>
          <IoIosArrowForward className='text-slate-400' />
        </button>
      </div>
        : <p>🔵</p>
    )
  };
  const columnFilters = useMemo(() => {
    if (!filterValue || !filterColumnId) {
      return [];
    }
    return [{ id: filterColumnId, value: filterValue }];
  }, [filterValue, filterColumnId]);
  const table = useReactTable({
    data,
    enableExpanding: true,
    enableSorting: true,
    enableFiltering: true,
    enableRowSelection: true,
    enableMultiRowSelection: true,
    columnResizeMode: 'onChange',
    columns: useMemo(() => {
      // Sort by default by first column
      if (sorting.length === 0 && columns.length > 0 && primaryKey) {
        setSorting([{ id: columns[0].id, desc: true }]);
      }
      // console.log({ columns });
      let array = columns
      if (selectable && selectionActions && deleteUrl) {
        selectionActions = [...selectionActions, {
          text: 'Delete selected', icon: <ImCross color='red' size={12} />, action: async (rows) => {

            const ids = rows.map(row => row[primaryKey])
            if (ids.length === 0) return
            const deleteUrlWithIds = deleteUrl.replace(':id', ids.join('|')) // Remplacer :id par les ids des lignes sélectionnées
            console.log({ deleteUrlWithIds });
            const response = await fetchWithAuth(deleteUrlWithIds, { method: 'DELETE', body: ids })
            if (response) {
              // Unexpand all rows
              table.setExpanded(!ids, false)
              // Unselect all rows
              table.setRowSelection(!ids, false)
              // Update table
              setData((prev) => prev.filter(row => !ids.includes(row[primaryKey])))

            }
          }
        }]
      }
      if (selectable) array = [{ id: 'select', enableResizing: true, width: 40, minWidth: 0, header: () => <div className='flex flex-col md:flex-row mr-6 align-middle gap-2 px-2 items-center'>{<input type='checkbox' checked={table.getIsAllRowsSelected()} onChange={table.getToggleAllRowsSelectedHandler()} className=" cursor-pointer" style={{ accentColor: color }} />}<MagicDropdown text={table.getSelectedRowModel().flatRows.length + " selected"} selectedRows={getSelectedRows()} actions={selectionActions} />  </div>, cell: ({ row }) => <input type="checkbox" style={{ accentColor: color }} disabled={!row.getCanSelect()} checked={row.getIsSelected()} onChange={row.getToggleSelectedHandler()} /> }, ...array]
      if (ExpandedComp) { array = [expansionColumn, ...array] }
      return array
    },
      [columns, ExpandedComp]
    ),
    state: {
      sorting,
      columnFilters,
      expanded,
    },
    onSortingChange: setSorting,
    onfilterColumnIdChange: setFilterColumnId,
    onExpandedChange: setExpanded, // Gestion des changements d'état expanded
    getExpandedRowModel: getExpandedRowModel(),
    getToggleAllRowsSelectedHandler: () => table.getToggleAllRowsSelectedHandler(),
    getRowCanExpand: (row) => ExpandedComp ? true : false,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  }, [data]);
  // Puis, afficher la table ici
  const getSelectedRows = () => {
    return table.getSelectedRowModel().flatRows.map(row => row.original)
  }

  // const expandedCompWrapper = (component,) cloneElement(ExpandedComp, { data: table.getSelectedRowModel().flatRows.map(row => row.original) })
  return (
    <div className="overflow-x-auto min-h-72">
      {/* <p onClick={() => console.log(getSelectedRows())}>CLICK</p> */}
      <div className="flex flex-wrap gap-4 mb-4 m-1">
        <div className='w-full sm:w-auto'>
          <input
            type="text"
            value={filterValue}
            onChange={e => setFilterValue(e.target.value)}
            placeholder="Filtrer..."
            className="p-3 w-full h-full border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-slate-500"
          />
        </div>
        <select
          value={filterColumnId}
          onChange={e => setFilterColumnId(e.target.value)}
          className="p-3 w-full sm:w-auto border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-slate-500"
        >
          <option value="">Choisir une colonne</option>
          {columns.map(column => (
            <option key={column.id} value={column.id}>
              {column.header}
            </option>
          ))}
        </select>
      </div>


      <div className="flex items-center gap-4 mb-4 justify-between">
        {/* Boutons de pagination */}
        <div className='flex flex-row gap-1 '>
          <div style={{ backgroundColor: color }} className='rounded'>
            <button
              onClick={() => table.setPageIndex(0)}
              disabled={!table.getCanPreviousPage()}
              className="px-4 py-2 text-sm font-medium text-white  bg-black bg-opacity-0 hover:bg-opacity-30 rounded disabled:bg-gray-300"
            >
              {'<<'}
            </button>
          </div>
          <div style={{ backgroundColor: color }} className='rounded'>
            <button
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
              className="px-4 py-2 text-sm font-medium text-white  bg-black bg-opacity-0 hover:bg-opacity-30 rounded disabled:bg-gray-300"
            >
              {'<'}
            </button>
          </div>
          <div style={{ backgroundColor: color }} className='rounded'>
            <button
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
              className="px-4 py-2 text-sm font-medium text-white  bg-black bg-opacity-0 hover:bg-opacity-30 rounded disabled:bg-gray-300"
            >
              {'>'}
            </button>
          </div>
          <div style={{ backgroundColor: color }} className='rounded'>
            <button
              onClick={() => table.setPageIndex(table.getPageCount() - 1)}
              disabled={!table.getCanNextPage()}
              className="px-4 py-2 text-sm font-medium text-white  bg-black bg-opacity-0 hover:bg-opacity-30 rounded disabled:bg-gray-300"
            >
              {'>>'}
            </button>
          </div>
          <div style={{ backgroundColor: color }} className='rounded'>
            <button
              onClick={fetchDatas}
              className="px-4 py-2 text-sm font-medium text-white  bg-black bg-opacity-0 hover:bg-opacity-30 rounded disabled:bg-gray-300"
            >
              Refresh
            </button>
          </div>
        </div>

        {/* Affichage de la page courante */}
        <span className="text-sm whitespace-nowrap">
          Page {table.getState().pagination.pageIndex + 1} sur {table.getPageCount()}
        </span>

        {/* Sélection de la taille de page */}
        <select
          className="p-2 text-sm font-medium text-gray-700 bg-white border border-slate-300 rounded hover:border-slate-400"
          value={table.getState().pagination.pageSize}
          onChange={e => {
            table.setPageSize(Number(e.target.value));
          }}
        >
          {[10, 20, 30, 40, 50].map(pageSize => (
            <option key={pageSize} value={pageSize}>
              Afficher {pageSize}
            </option>
          ))}
        </select>
      </div>

      <table className="min-w-full text-sm text-left border-collapse border-2 border-gray-50">
        <thead className="bg-gray-100">
          {table.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id} >
              {headerGroup.headers.map(header => (
                <th onClick={header.column.getToggleSortingHandler()} key={header.id} colSpan={header.colSpan} style={{ width: header.getSize() }} className={"py-3 border-b border-gray-300 text-gray-500 font-normal " + (header.column.getCanSort() ? ' cursor-pointer select-none px-2 py-3 ' : ' w-fit px-4 ')}>
                  <div className='flex flex-row justify-left px-0 gap-1'>

                    {flexRender(header.column.columnDef.header, header.getContext())}
                    <div className='flex flex-row items-center'>
                      {header.column.getIsSorted() === 'asc' ? <FaArrowDown className='rotate-180' /> : header.column.getIsSorted() === 'desc' ? <FaArrowDown /> : null}
                    </div>
                  </div>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody className='w-full'>
          {table.getRowModel().rows.map((row, i) => {
            let rowColor = 'bg-white';
            if (i % 2 === 0) {
              rowColor = 'bg-gray-100';
            }
            return <>
              <tr className={`${rowColor} hover:bg-gray-200`}>
                {row.getVisibleCells().map(cell => (
                  <td key={cell.id} style={{ width: cell.column.getSize() }} className={"py-2 whitespace-nowrap text-left " + (cell.id.includes("select") ? " px-6  " : " px-2 ")}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
              {row.getIsExpanded() && (
                <tr className="border-b-2 border-gray-200 w-full">
                  <td colSpan={`${columns.length + (ExpandedComp && 1) + (selectable && 1)}`} className='w-full'>

                    {
                      ExpandedComp && cloneElement(ExpandedComp, { data: row.original, row, updateData, addRow })
                    }

                    {/* <ArbitrageTableExpandedDetails row={row} /> */}
                  </td>
                </tr>
              )}
            </>
          })}
          {fetched && table.getRowModel().rows.length === 0 && (
            <tr>
              <td
                colSpan={columns.length + 1}
                className="text-center py-4 text-gray-500 text-lg font-semibold"
              >
                Aucun résultat
              </td>
            </tr>
          )
          }
        </tbody>
      </table>


    </div >
  );
}

export default MagicArray;
