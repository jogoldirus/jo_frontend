import React, { useEffect, useMemo, useState } from 'react'
import InputTextSaveOnChange from '../Reusable/InputTextSaveOnChange'
import { fetchWithAuth } from '../../Functions'
import dayjs from 'dayjs'

function OfferView({ data, row, updateData }) {
  const [id, setId] = useState(data.id)
  const [name, setName] = useState(data.name)
  const [description, setDescription] = useState(data.description)
  const [price, setPrice] = useState(data.price)
  const [eventID, setEventID] = useState(data.eventID)
  const [placeInclude, setPlaceInclude] = useState(data.placeInclude)
  const [selectedEventID, setSelectedEventID] = useState(data.eventID)
  const [eventList, setEventList] = useState([])
  const saveName = async () => {
    if (name === data.Name) return Promise.resolve()
    return fetchWithAuth(`/api/offer/${data.id}/changename`, {
      method: "POST",
      body: { name }
    })
      .then(result => {
        updateData(row.id, "name", name)
        return Promise.resolve()
      })
      .catch(err => {
        console.error(err)
        return Promise.reject()
      })
  }
  const saveDescription = async () => {
    if (description === data.description) return Promise.resolve()
    return fetchWithAuth(`/api/offer/${data.id}/changedescription`, {
      method: "POST",
      body: { description }
    })
      .then(result => {
        updateData(row.id, "description", description)
        return Promise.resolve()
      })
      .catch(err => {
        console.error(err)
        return Promise.reject()
      })
  }
  const savePrice = async () => {
    if (price === data.price) return Promise.resolve()
    return fetchWithAuth(`/api/offer/${data.id}/changeprice`, {
      method: "POST",
      body: { price }
    })
      .then(result => {
        updateData(row.id, "price", price)
        return Promise.resolve()
      })
      .catch(err => {
        console.error(err)
        return Promise.reject()
      })
  }
  const saveEventID = async () => {
    if (selectedEventID === data.eventID) return Promise.resolve()
    return fetchWithAuth(`/api/offer/${data.id}/changeevent`, {
      method: "POST",
      body: { eventID: selectedEventID }
    })
      .then(result => {
        updateData(row.id, "eventID", selectedEventID)
        updateData(row.id, "eventName", eventList.find(event => Number(event.id) === Number(selectedEventID)).name)
        return Promise.resolve()
      })
      .catch(err => {
        console.error(err)
        return Promise.reject()
      })
  }
  const savePlaceInclude = async () => {
    if (placeInclude === data.placeInclude) return Promise.resolve()
    return fetchWithAuth(`/api/offer/${data.id}/changeplaceinclude`, {
      method: "POST",
      body: { placeInclude }
    })
      .then(result => {
        updateData(row.id, "placeInclude", placeInclude)
        return Promise.resolve()
      })
      .catch(err => {
        console.error(err)
        return Promise.reject()
      })
  }
  const getEventList = async () => {
    return fetchWithAuth(`/api/events`)
      .then(result => {
        setEventList(result)
        return Promise.resolve()
      })
      .catch(err => {
        console.error(err)
        return Promise.reject()
      })
  }
  useEffect(() => {
    getEventList()
  }, [])
  return (
    <div className='p-4 flex flex-col gap-5'>
      <InputTextSaveOnChange value={name} label="Nom" type="text" clickHandler={saveName} settterState={setName} placeholder='Enter event name..' color="red" />
      <InputTextSaveOnChange value={description} label="Description" type="text" clickHandler={saveDescription} settterState={setDescription} placeholder='Enter event description..' color="red" />
      <InputTextSaveOnChange value={price} label="Prix" type="number" clickHandler={savePrice} settterState={setPrice} placeholder='Enter event price..' color="red" />
      <InputTextSaveOnChange value={placeInclude} label="Nombre de place incluse" type="number" clickHandler={savePlaceInclude} settterState={setPlaceInclude} placeholder='Enter event place include..' color="red" />
      {/* Type select for change eventID */}
      {(eventList && Array.isArray(eventList)) && <InputTextSaveOnChange value={selectedEventID} label="Evenement" clickHandler={saveEventID} settterState={setSelectedEventID} placeholder='Enter event ID..' color="red" >
        {
          eventList.map(event => <option key={event.id} value={event.id}>{event.id} : {event.name}</option>)
        }
      </InputTextSaveOnChange>}
    </div>
  )
}

export default OfferView