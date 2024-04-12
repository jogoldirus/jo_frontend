import { useEffect, useState } from "react"
import Button from "../../Composants/Reusable/Button"
import { useBasket } from "../../Providers/BasketContext"
import { fetchWithoutAuth } from "../../Functions"

const OfferCard = ({ name = 'Name formula', placeIncluded = "X", description = 'A description', color = "black", id }) => {
  const { addToBasket } = useBasket()
  return <div style={{ backgroundColor: color }} className='gap-4 px-10 py-6 flex flex-col justify-center  items-center flex-1 rounded'>
    <h1 className="text-white font-bold text-2xl">{name}</h1>
    <h3 className='text-white'>{description}</h3>
    <p className='text-white'>{placeIncluded} places incluses</p>
    <Button text='Réserver' onClick={async () => addToBasket({
      id,
      name,
      description
    })} mode='contained' color={color} />
  </div>
}
function Offers() {

  const [offers, setOffers] = useState()

  useEffect(() => {
    fetchWithoutAuth('/apiV2/offers', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    })
      .then(data => setOffers(data))
      .catch(err => console.error(err))
  })
  return (
    <div className="p-10">
      <h1 className="text-center text-2xl text-red-500 pb-2">Nos offres disponibles</h1>
      <p className="text-center text-slate-400">Chaque billet comporte un accès illimités a chaque scène & activités</p>
      <div className="flex flex-row flex-wrap gap-10 pt-8">
        {
          offers === undefined && <p>Chargement des offres...</p>
        }
        {
          Array.isArray(offers) && offers.length === 0 && <p>Aucune offre disponible</p>
        }
        {
          Array.isArray(offers) && offers.map((item, i) => <OfferCard key={i + 'offerskey'} id={item.id} color={item.color} placeIncluded={item.placeInclude} name={item.name} description={item.description} />)
        }
      </div>
    </div>
  )
}

export default Offers