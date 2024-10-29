import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { ProductImg } from "../components/ProductImg/ProductImg"
import { ClothesCategory } from "../interfaces/ClothesInterfaces"
import Filters from "../components/Clothes/Filters"
import EmptyResult from "../components/Clothes/EmptyResult"

const Clothes = () => {

  const {id_category} = useParams()

  const [data, setData] = useState<ClothesCategory | null>(null)

  useEffect(() => {
    document.title = `${data ? data.category.name : 'Clothes'} ${data?.gender ? data.gender : ''} | CrystalGym`;
  }, [data])

  return (
    <main className="max-w-screen overflow-x-hidden font-roboto p-4 max-w-[1900px] m-auto">
      <header className="py-2">
        <h1 className="font-semibold text-xl md:font-bold md:text-3xl"> {data?.category?.name.toUpperCase()} <span className="-text--color-grey text-sm md:text-lg"> {data?.gender?.toUpperCase()} </span> </h1>
      </header>
      <div className="lg:flex gap-4 relative">
        {id_category && <Filters id_category={id_category} setData={setData} />}
        {
          data?.clothes.length !== 0 ?
          (<section className="grid grid-cols-2 gap-2 md:grid-cols-3 2xl:grid-cols-4 lg:w-full">
                  {
                    (data?.clothes.map((clothe) => {
                      return (
                        <article key={clothe.image.id} className="shadow-md">
                          <ProductImg product={clothe} category={data.category}/>
                        </article>
                    )}))
                  }    
            </section>)
          : 
          (<EmptyResult />)
        }
      </div>
    </main>
  )
}

export default Clothes