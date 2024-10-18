import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import ClotheService from "../services/clothe.service"
import { ProductImg } from "../components/ProductImg/ProductImg"
import { ClotheDataInterface, ClothesCategory } from "../interfaces/ClothesInterfaces"

const Clothes = () => {

  const {id_category} = useParams()

  const [clothes, setClothes] = useState<ClothesCategory>()
  const [name, setName] = useState<string>('');

  const [sortBy, setSortBy] = useState<keyof ClotheDataInterface>('id');
  const [sortOrder, setSortOrder] = useState<string>('asc');
  const [perPage, _setPerPage] = useState<number>(10);

  useEffect(() => {
    document.title = "Clothes | CrystalGym";
  }, [])

  useEffect(() => {
    getClothes();
    document.title = `${clothes?.category} ${clothes?.gender} | CrystalGym`;
  }, [sortBy, sortOrder, perPage, name]); // eslint-disable-line

  const getClothes = async () => {
    const response = await ClotheService.getClothes(Number(id_category));
    if (response.code == 200) {
      setClothes(response.data);
    }
  }

  return (
    <main className="max-w-screen overflow-x-hidden font-roboto lg:w-11/12 lg:m-auto xl:9/12">
      <header className="py-2">
        <h1 className="font-semibold text-xl md:font-bold md:text-3xl"> {clothes?.category?.name.toUpperCase()} <span className="-text--color-grey text-sm md:text-lg"> {clothes?.gender?.toUpperCase()} </span> </h1>
      </header>
      <section className="grid grid-cols-2 gap-2 md:grid-cols-3 lg:grid-cols-4 lg:gap-4 xl:grid-cols-5">
        {
          clothes && (
            clothes.clothes.map((clothe) => {
              return (
                <article key={clothe.image.id} className="shadow-md">
                  <ProductImg product={clothe} category={clothes.category}/>
                </article>
              )})
          )
        }
      </section>
    </main>
  )
}

export default Clothes