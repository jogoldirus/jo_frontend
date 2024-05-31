import React, { useState } from 'react'
import InputTextSaveOnChange from '../Reusable/InputTextSaveOnChange'
import { fetchWithAuth } from '../../Functions'
import Button from '../Reusable/Button'

function EventView({ data, row, updateData }) {
  const [id, setId] = useState(data.id)
  const [name, setName] = useState(data.name)
  const [city, setCity] = useState(data.city)
  const [adress, setAdress] = useState(data.adress)
  const [date, setDate] = useState(data.date)
  const [visibility, setVisibility] = useState(data.showOffers)
  const saveName = async () => {
    if (name === data.Name) return Promise.resolve()
    return fetchWithAuth(`/api/events/${data.id}/changename`, {
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
    return fetchWithAuth(`/api/events/${data.id}/changecity`, {
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
    return fetchWithAuth(`/api/events/${data.id}/changeadress`, {
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
    return fetchWithAuth(`/api/events/${data.id}/changedate`, {
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
  const savevisibility = async () => {
    if (visibility === data.showOffers) return Promise.resolve()
    return fetchWithAuth(`/api/events/${data.id}/changevisibility`, {
      method: "POST",
      body: { visibility }
    })
      .then(result => {
        updateData(row.id, "showOffers", Number(visibility))
        return Promise.resolve()
      })
      .catch(err => {
        console.error(err)
        return Promise.reject()
      })
  }
  const handleAction = async (value) => {
    let tmp = visibility
    setVisibility(value)
    savevisibility().catch(err => { console.log(err); setVisibility(tmp) })
  }
  return (
    <div className='p-4 flex flex-col gap-5'>
      <label className='flex flex-row gap-2 items-center'>
        <div className='flex flex-row items-center gap-2'>
          <input type="checkbox" checked={visibility} onChange={() => setVisibility(visibility === 1 ? 0 : 1)} />
        </div>
        Afficher les offres de cette évenement
        {visibility !== data.showOffers && <div className='w-min'><Button onClick={() => handleAction(visibility)} color='red' mode='outlined'>Save</Button></div>}
      </label>
      <InputTextSaveOnChange value={name} label="Nom" type="text" clickHandler={saveName} settterState={setName} placeholder='Enter event name..' color="red" />
      <InputTextSaveOnChange value={city} label="Ville" type="text" clickHandler={saveCity} settterState={setCity} placeholder='Enter event city..' color="red" />
      <InputTextSaveOnChange value={adress} label="Adresse" type="text" clickHandler={saveAdress} settterState={setAdress} placeholder='Enter event adress..' color="red" />
      <InputTextSaveOnChange value={date.split(".")[0]} label="Date" type="datetime-local" clickHandler={saveDate} settterState={setDate} placeholder='Enter event date.. (YEAR-MO-DATHH:MM:SS.sssZ)' color="red" />

    </div>
  )
}

export default EventView