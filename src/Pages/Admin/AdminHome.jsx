import React, { useEffect, useState } from 'react'
import { fetchWithAuth } from '../../Functions'

function AdminHome() {
  const [offerStats, setOfferStats] = useState([])

  const fetchOfferStats = async () => {
    try {
      fetchWithAuth('/api/offer/stats', { method: "GET" })
        .then(data => setOfferStats(data))
        .catch(err => console.error(err))
    } catch (err) {
      console.error(err)
    }
  }
  useEffect(() => {
    fetchOfferStats()
  }, [])
  return (
    <div>
      {/* Display offer stats */}
      <h1 className="text-2xl text-red-500">Statistiques des offres</h1>
      <div className="flex flex-row flex-wrap gap-5">
        {offerStats.map(offer => (
          <div key={offer.id} className="bg-gray-100 p-4 rounded-lg grow min-w-96">
            <p className="text-lg text-red-500">{offer.name}</p>
            <p className="text-md">Nombre de ventes: {offer.ticketCount}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default AdminHome