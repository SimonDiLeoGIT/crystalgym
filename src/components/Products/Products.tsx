import { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import left_arrow from '../../assets/icons/carousel/left-arrow.svg'
import right_arrow from '../../assets/icons/carousel/right-arrow.svg'
import { ProductImg } from "../ProductImg/ProductImg";
import ProductService from "../../services/product.service";
import { Pagination } from "../../interfaces/Pagination";
import { Link, useParams } from "react-router-dom";
import { Variants } from "../../interfaces/VariantInterfaces";


export const Products = () => {

  const {sex, category} = useParams();

  const [products, setProducts] = useState<Pagination<Variants>>({ count: 0, next: null, previous: null, results: [] })
  const [currentPage, setCurrentPage] = useState<number>(0);
  const totalArticles = 10;
  const [totalPages, setTotalPages] = useState<number>(0);

  const getProducts = async (page:number = 0) => {
    if (!sex) {
      return [false, 'Sex param does not exist']
    }
    if (!category) {
      return [false, 'Category param does not exist']
    }
    try {
      const data = await ProductService.getProductsByCategoryAndGender(page, sex, category)
      if (data) {
        setProducts(prev => (JSON.stringify(prev) === JSON.stringify(data) ? prev : data));
        const pages = Math.ceil(data.count / totalArticles);
        setTotalPages(prev => (prev === pages ? prev : pages));
        
        return [true, 'Products fetched succesfully']
      }
    } catch (e) {
      return [false, 'Error requesting products: ' + e]
    }

  }

  useEffect(() => {
    getProducts(currentPage)
  }, [currentPage, sex, category]);


  const handlePageClick = async (event: { selected: number }) => {
    const nextPage = event.selected + 1;
    
    if (nextPage <= totalPages) {
      setCurrentPage(nextPage);
      window.scrollTo(0, 0);
    }
  };


  return (
    <section className=" m-auto">
      <section className="grid grid-cols-2 gap-2 md:grid-cols-3 lg:grid-cols-4 lg:gap-4 xl:grid-cols-5">
        {
          products?.results && products.results.length > 0 &&
          products.results?.map((product) => {
            return (
              <article className="shadow-md">
                <ProductImg product={product}/>
              </article>
            )
          }
          )
        }
      </section>
      <footer className='w-full mt-6'>
        <ReactPaginate
          breakLabel="..."
          nextLabel={
            <Link to={products.next ? products.next : '#'} >
              <img src={right_arrow} className="w-4" alt="Next Page"/>
            </Link>
          }
          onPageChange={handlePageClick}
          pageRangeDisplayed={1}
          pageCount={totalPages}
          marginPagesDisplayed={2}
          previousLabel={
            <Link to={products.previous ? products.previous : '#'} >
              <img src={left_arrow} className="w-4" alt="Prev Page"/>
            </Link>
          }
          renderOnZeroPageCount={null}
          containerClassName=" flex justify-center hover:cursor-pointer  m-auto"
          pageLinkClassName="p-1 md:p-2"
          pageClassName="p-2 md:p-2 rounded-lg font-semibold -text--color-black hover:-bg--color-very-light-grey hover:opacity-60"
          activeClassName="-bg--color-light-grey-violet -text--color-white hover:-bg--color-light-grey-violet"
          previousClassName="h-8 w-4 md:w-8 flex items-center justify-center -bg--color-light-grey-violet rounded-lg m-auto mr-1 hover:opacity-60"
          nextClassName="h-8 w-4 md:w-8 flex items-center justify-center -bg--color-light-grey-violet rounded-lg m-auto ml-1 hover:opacity-60"
        />
      </footer>
    </section>
  )
}