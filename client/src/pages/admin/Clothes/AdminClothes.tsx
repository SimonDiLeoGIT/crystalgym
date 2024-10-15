import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { AdminClotheData, ClotheDataInterface } from "../../../interfaces/ClothesInterfaces"
import ClotheService from "../../../services/clothe.service"
import { ProductImg } from "./Clothe"

const AdminClothes = () => {

  const {categoryId} = useParams()

  const [clothes, setClothes] = useState<AdminClotheData>()
  const [name, setName] = useState<string>('');

  const [sortBy, setSortBy] = useState<keyof ClotheDataInterface>('id');
  const [sortOrder, setSortOrder] = useState<string>('asc');
  const [perPage, _setPerPage] = useState<number>(10);

  useEffect(() => {
    document.title = "Admin Clothes | CrystalGym";
  }, [])

  useEffect(() => {
    getClothes();    
  }, [sortBy, sortOrder, perPage, name]); // eslint-disable-line

  const getClothes = async () => {
    const response = await ClotheService.getClothesAdmin(Number(categoryId));
    if (response.code == 200) {
      setClothes(response.data);
    }
    console.log(response)
  }

  return (
    <main className="max-w-screen overflow-x-hidden font-roboto lg:w-11/12 lg:m-auto xl:9/12">
      <section className="grid grid-cols-2 gap-2 md:grid-cols-3 lg:grid-cols-4 lg:gap-4 xl:grid-cols-5">
        {
          clothes && (
            clothes.clothes.map((clothe) => {
              return (
                <article key={clothe.image.id} className="shadow-md">
                  <ProductImg product={clothe.image} />
                </article>
              )})
          )
        }
      </section>
    </main>
  )
}

export default AdminClothes