import dayjs from 'dayjs'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'

function Timer({ dateBeforeEvent = "2024-01-01" }) {
  const dateBefore = new dayjs(dateBeforeEvent)
  const [time, setTime] = useState(dateBefore.diff(dayjs(), 'second'))
  useEffect(() => {
    // Each seconds 
    const interval = setInterval(() => {
      console.log('interval');
      setTime(dateBefore.diff(dayjs(), 'second'))
    }, 1000)
    return () => {
      clearInterval(interval)
    }
  }, [])

  const seconds = time % 60
  const minutes = Math.floor(time / 60) % 60
  const hours = Math.floor(time / 3600) % 24
  const days = Math.floor(time / 86400)

  return (
    <div className='flex flex-row justify-evenly uppercase font-bold text-3xl text-white'>
      <p className='text-blue-500'>{days} jours</p>
      <p className='hidden md:block'>:</p>
      <p className='text-yellow-500'>{hours} heures</p>
      <p className='hidden md:block'>:</p>
      <p className='text-green-500'>{minutes} mins</p>
      <p className='hidden md:block'>:</p>
      <p className='text-red-500'>{seconds} sec</p>
    </div>
  )
}

export default Timer