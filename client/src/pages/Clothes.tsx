import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { ProductImg } from "../components/ProductImg/ProductImg"
import { ClothesCategory } from "../interfaces/ClothesInterfaces"
import Filters from "../components/Clothes/Filters"

const Clothes = () => {

  const {id_category} = useParams()

  const [data, setData] = useState<ClothesCategory | null>(null)

  useEffect(() => {
    document.title = `${data ? data.category.name : 'Clothes'} ${data?.gender ? data.gender : ''} | CrystalGym`;
  }, [data])

  return (
    <main className="max-w-screen overflow-x-hidden font-roboto lg:w-11/12 lg:m-auto xl:9/12">
      <header className="py-2">
        <h1 className="font-semibold text-xl md:font-bold md:text-3xl"> {data?.category?.name.toUpperCase()} <span className="-text--color-grey text-sm md:text-lg"> {data?.gender?.toUpperCase()} </span> </h1>
      </header>
      {id_category && <Filters id_category={id_category} setData={setData} />}
      <section className="grid grid-cols-2 gap-2 md:grid-cols-3 lg:grid-cols-4 lg:gap-4 xl:grid-cols-5">
        {
          data && (
            data.clothes.length !== 0 ?
              (data.clothes.map((clothe) => {
                return (
                  <article key={clothe.image.id} className="shadow-md">
                    <ProductImg product={clothe} category={data.category}/>
                  </article>
              )}))
              :
              (
                <>
                  No hay nada
                </>
              )
          )
        }
      </section>
    </main>
  )
}

export default Clothes