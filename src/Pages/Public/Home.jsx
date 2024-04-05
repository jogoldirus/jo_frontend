import Button from "../../Composants/Reusable/Button"
function Home() {
  return (
    <div>

      <div className="w-full  bg-red-700 p-4 md:p-20 flex flex-col gap-4">
        <h1 className="text-4xl text-white uppercase">Prendre son billet </h1>
        <p className="md:w-1/2 w-full text-white">En 2024, Paris accueillera le plus grand évènement de son histoire. 100 ans après, les Jeux Olympiques et Paralympiques sont de retour pour vous faire vibrer dans la plus belle ville du monde, aux quatre coins de la France et sur des sites de compétition iconiques, pour des Jeux qui s’annoncent inoubliables.</p>
        <Button to="/offers" mode="contained" color="red" text="Voir les offres" />
      </div>

    </div>
  )
}

export default Home