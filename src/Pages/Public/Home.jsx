import Button from "../../Composants/Reusable/Button"
import Timer from "../../Composants/Reusable/Timer"
import Athle from "../../assets/athle.jpg"
import Bad from "../../assets/bad.webp"
import Surf from "../../assets/surf.jpeg"
import NatationImage from "../../assets/natation.jpg"
import Skate from "../../assets/skate.jpg"
import escalade from "../../assets/escalade.jpg"
const SportCard = ({ name = 'Sport', description = 'A description', color = "black", image, invert = false }) => {
  return <div className="flex flex-col gap-0  rounded ">
    <h1 className=" font-bold text-2xl text-center">{name}</h1>
    <div className={"flex " + (invert ? " flex-row-reverse " : ' flex-row ')}>

      <div style={{ backgroundImage: `url(${image})` }} className={`rounded hidden md:block w-1/3  border-2 bg-red-400 rounded-l bg-cover bg-center md:min-h-[300px]`}>

      </div>
      <div className='w-2/3  text-black gap-4 px-10 py-6 flex flex-col justify-center  items-center flex-1 rounded-r '>
        <h3 className='text-sm md:text-sm'>{description}</h3>
      </div>
    </div>

  </div >
}
function Home() {
  return (
    <div>

      <div className="w-full  bg-red-800 p-4 md:p-20 flex flex-col gap-4">
        <h1 className="text-4xl text-white uppercase">Prendre son billet </h1>
        <p className="md:w-1/2 w-full text-white">En 2024, Paris accueillera le plus grand évènement de son histoire. 100 ans après, les Jeux Olympiques et Paralympiques sont de retour pour vous faire vibrer dans la plus belle ville du monde, aux quatre coins de la France et sur des sites de compétition iconiques, pour des Jeux qui s’annoncent inoubliables.</p>
        <div className="md:w-1/3 w-full">
          <Button to="/offers" mode="contained" color="red" text="Voir les offres" />
        </div>
      </div>
      <div className="flex flex-col justify-center  items-center py-10 gap-10 px-4">
        <h1 className="text-4xl  uppercase text-center text-black ">Vivez le moment avec nous dans </h1>
        <Timer dateBeforeEvent='2024-07-26' />
      </div>
      <h1 className="text-center text-4xl uppercase pt-5">Nouveaux sports </h1>
      <div className="w-full flex flex-row justify-center">
        <div className="w-2/3 p-4 flex flex-col justify-center align-middle items-center content-center gap-4">
          {[
            {
              name: "Skateboard",
              description: "L’élite du skateboard mondial s’affrontera aux Jeux Olympiques dans deux des disciplines les plus populaires et spectaculaires du skateboard, le Park et le Street, où les athlètes devront réaliser les plus beaux tricks, répondant à des critères de technique, de vitesse ou encore d’amplitude de leurs figures.",
              color: "blue",
              image: Skate
            },
            {
              name: "Escalade Sportive",
              description: "Au programme olympique de l’escalade sportive, les épreuves regroupent trois disciplines, le bloc, la vitesse et la difficulté. Le « bloc » consiste à escalader des structures de 4,5m de hauteur, sans corde mais avec des tapis de réception, dans un temps contraint et avec le moins de tentatives possibles.",
              color: "red",
              image: escalade
            },
            {
              name: "Surf",
              description: "Les surfeurs effectuent des manœuvres et des figures sur une vague, et sont ensuite notés par cinq juges en fonction de la variété de leur enchaînement, du type de figures réalisées et de leur difficulté. La vitesse, la puissance et le flow des surfeurs entrent également en ligne de compte dans les notes délivrées par les juges.",
              color: "green",
              image: Surf
            }
          ].map((item, i) => <SportCard invert={i % 2 !== 0} key={i + 'sportkey'} color={item.color} image={item.image} name={item.name} description={item.description} />)
          }
        </div>
      </div>
      <h1 className="text-center text-4xl uppercase pt-5">Sports</h1>
      <div className="w-full flex flex-row justify-center">
        <div className="w-2/3 p-4 flex flex-col justify-center align-middle items-center content-center gap-4">
          {[
            {
              name: "Athlétisme",
              description: "Avec 48 épreuves, l’athlétisme est le sport individuel qui comporte le plus d’épreuves et de participants aux Jeux du fait de la quantité et de la diversité de ses épreuves. Du sprint au demi-fond, en passant par les concours de sauts et lancers ou encore épreuves combinées… Les épreuves d’athlétisme enflamment les travées du Stade Olympique comme les rues de la ville hôte, qui accueillent traditionnellement les épreuves du marathon et de la marche athlétique. Les Jeux de Paris 2024 seront paritaires et l’athlétisme aussi. ",
              color: "blue",
              image: Athle
            },
            {
              name: "Natation",
              description: "Aux Jeux Olympiques, les épreuves de natation comptent quatre types de nage, en individuel ou en relais : brasse, papillon, dos et nage libre.La variété des distances ne demande pas les mêmes qualités pour une course de 50m que pour un 1500m, l’explosivité tout comme l’endurance, la puissance et la technique sont indispensables pour les nageurs. ",
              color: "red",
              image: NatationImage
            },
            {
              name: "Badminton",
              description: "Le badminton arrive aux Jeux en 1972, en tant que sport de démonstration. 20 ans plus tard, ce sport de raquette pratiqué en intérieur est inscrit au programme des Jeux de Barcelone 1992. Dans le nouvel écrin de la Porte de La Chapelle, les meilleurs joueurs du monde s’affronteront dans les 5 tableaux : simple hommes, simple dames, double hommes, double dames et double mixte. La route vers les cinq titres olympiques débutera par une phase de poule et se terminera par des finales à élimination directe. Plus de 200 matchs sont au programme.",
              color: "green",
              image: Bad
            }
          ].map((item, i) => <SportCard invert={i % 2 === 0} key={i + 'sportkey'} color={item.color} image={item.image} name={item.name} description={item.description} />)
          }
        </div>
      </div>

    </div>
  )
}

export default Home