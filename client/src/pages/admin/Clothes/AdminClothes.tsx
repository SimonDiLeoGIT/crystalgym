import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { AdminClotheData, ClotheDataInterface } from "../../../interfaces/ClothesInterfaces"
import ClotheService from "../../../services/clothe.service"
import { ProductImg } from "./ClothesList"

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
  }

  return (
    <main className="max-w-screen overflow-x-hidden font-roboto lg:w-11/12 lg:m-auto xl:9/12">
      <section>
        {
          clothes && (
            clothes.clothes.map((clothe) => 
              clothe.colors.map((color) => {
                  return (
                    <article key={color.id}>
                      <ProductImg product={color} />
                    </article>
                )
              })
            )
          )
        }
      </section>
    </main>
  )
}

export default AdminClothes