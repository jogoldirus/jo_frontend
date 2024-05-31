import React, { useState } from 'react'
import InputTextSaveOnChange from '../Reusable/InputTextSaveOnChange'
import { fetchWithAuth } from '../../Functions'
import dayjs from 'dayjs'

function EventView({ data, row, updateData }) {
  const [id, setId] = useState(data.id)
  const [name, setName] = useState(data.name)
  const [city, setCity] = useState(data.city)
  const [adress, setAdress] = useState(data.adress)
  const [date, setDate] = useState(data.date)
  const saveName = async () => {
    if (name === data.Name) return Promise.resolve()
    return fetchWithAuth(`/apiV2/events/${data.id}/changename`, {
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
  const saveCity = async () => {
    if (city === data.city) return Promise.resolve()
    return fetchWithAuth(`/apiV2/events/${data.id}/changecity`, {
      method: "POST",
      body: { city }
    })
      .then(result => {
        updateData(row.id, "city", city)
        return Promise.resolve()
      })
      .catch(err => {
        console.error(err)
        return Promise.reject()
      })
  }
  const saveAdress = async () => {
    if (adress === data.adress) return Promise.resolve()
    return fetchWithAuth(`/apiV2/events/${data.id}/changeadress`, {
      method: "POST",
      body: { adress }
    })
      .then(result => {
        updateData(row.id, "adress", adress)
        return Promise.resolve()
      })
      .catch(err => {
        console.error(err)
        return Promise.reject()
      })
  }
  const saveDate = async () => {
    if (date === data.date) return Promise.resolve()
    return fetchWithAuth(`/apiV2/events/${data.id}/changedate`, {
      method: "POST",
      body: { date }
    })
      .then(result => {
        updateData(row.id, "date", date)
        return Promise.resolve()
      })
      .catch(err => {
        console.error(err)
        return Promise.reject()
      })
  }
  return (
    <div className='p-4 flex flex-col gap-5'>
      <InputTextSaveOnChange value={name} label="Nom" type="text" clickHandler={saveName} settterState={setName} placeholder='Enter event name..' color="red" />
      <InputTextSaveOnChange value={city} label="Ville" type="text" clickHandler={saveCity} settterState={setCity} placeholder='Enter event city..' color="red" />
      <InputTextSaveOnChange value={adress} label="Adresse" type="text" clickHandler={saveAdress} settterState={setAdress} placeholder='Enter event adress..' color="red" />
      <InputTextSaveOnChange value={date.split(".")[0]} label="Date" type="datetime-local" clickHandler={saveDate} settterState={setDate} placeholder='Enter event date.. (YEAR-MO-DATHH:MM:SS.sssZ)' color="red" />

    </div>
  )
}

export default EventView