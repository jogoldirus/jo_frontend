import Button from "../../Composants/Reusable/Button"
import { useBasket } from "../../Providers/BasketContext"

const OfferCard = ({ name = 'Name formula', description = 'A description', color = "black", id }) => {
  const { addToBasket } = useBasket()
  return <div style={{ backgroundColor: color }} className='gap-4 px-10 py-6 flex flex-col justify-center  items-center flex-1 rounded'>
    <h1 className="text-white font-bold text-2xl">{name}</h1>
    <h3 className='text-white'>{description}</h3>
    <Button text='Réserver' onClick={async () => addToBasket({
      id,
      name,
      description
    })} mode='contained' color={color} />
  </div>
}
function Offers() {
  return (
    <div className="p-10">
      <h1 className="text-center text-2xl text-red-500 pb-2">Nos offres disponibles</h1>
      <p className="text-center text-slate-400">Chaque billet comporte un accès illimités a chaque scène & activités</p>
      <div className="flex flex-row flex-wrap gap-10 pt-8">
        {
          [
            {
              id: 1,
              name: "Solo",
              description: "Accès illimités - 1 place",
              color: "blue"
            },
            {
              id: 2,
              name: "Duo",
              description: "Accès illimités - 2 place",
              color: "red"
            },
            {
              id: 3,
              name: "Famille",
              description: "Accès illimités - 4 place",
              color: "green"
            },


          ].map((item, i) => <OfferCard key={i + 'offerskey'} id={item.id} color={item.color} name={item.name} description={item.description} />)
        }
      </div>
    </div>
  )
}

export default Offers