import { useEffect, useState } from "react"
import Button from "../../Composants/Reusable/Button"
import { useBasket } from "../../Providers/BasketContext"
import { fetchWithoutAuth } from "../../Functions"

const OfferCard = ({ name = 'Name formula', placeIncluded = "X", description = 'A description', price = -1, color = "black", id }) => {
  const { addToBasket } = useBasket()
  const [isHasBeenAdded, setIsHasBeenAdded] = useState({})
  const handleAddToBasket = async () => {
    let tmp = { ...isHasBeenAdded }
    tmp[id] = true
    setIsHasBeenAdded(tmp)
    // 1s wait to simulate a request
    setTimeout(() => {
      let tmp = { ...isHasBeenAdded }
      delete tmp[id]
      setIsHasBeenAdded(tmp)
    }, 1000)
    addToBasket({ id, name, description, price })
  }

  return (
    <div className={`bg-${color}-500 rounded-lg shadow-lg p-6 flex flex-col items-center justify-center space-y-4`}>
      <h1 className="text-white font-bold text-2xl">{name}</h1>
      <h3 className="text-white text-lg">{description}</h3>
      <p className="text-white text-md">{placeIncluded} places incluses</p>
      <p className="text-white text-lg">{price}€</p>
      <Button
        text={isHasBeenAdded[id] ? 'A été ajouté' : 'Ajouter au panier'}
        onClick={async () => handleAddToBasket({ id, name, description })}
        mode='contained'
        color={color}
      />
    </div>
  )
}
function Offers() {

  const [offers, setOffers] = useState({})

  useEffect(() => {
    fetchWithoutAuth('/api/offers', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    })
      .then(data => {
        let tmp = {}
        data = data.map(item => {
          let eventID = item.eventID
          if (tmp[eventID] === undefined) tmp[eventID] = [item]
          else tmp[eventID].push(item)
        })
        setOffers(tmp)
      })
      .catch(err => console.error(err))
  }, [])
  return (
    <div className="p-10">
      <h1 className="text-center text-2xl text-red-500 pb-2">Nos offres disponibles</h1>
      <p className="text-center text-slate-400">Chaque billet vous offre un accès a un contenu exclusif</p>
      <div className="flex flex-row flex-wrap gap-10 pt-8 justify-evenly">
        {
          offers === undefined && <p>Chargement des offres...</p>
        }
        {
          Array.isArray(offers) && offers.length === 0 && <p>Aucune offre disponible</p>
        }
        {
          Object.keys(offers).length >= 1 && Object.keys(offers).map((event, i) =>

            <div>
              {Object.keys(offers).length > 1 && <h1 className="text-center">{offers[event][0].eventName}</h1>}
              <div className="flex flex-row flex-wrap gap-10 pt-8 justify-evenly ">
                {
                  offers[event].map((item) =>

                    <OfferCard key={i + 'offerskey'} id={item.id} price={item.price} color={item.color} placeIncluded={item.placeInclude} name={item.name} description={item.description} />
                  )
                }
              </div>
            </div>

          )

        }
      </div>
    </div >

  )
}
export default Offers