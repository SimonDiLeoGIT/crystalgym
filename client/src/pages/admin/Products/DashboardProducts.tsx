import AdminLayout from "../AdminLayout";
import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { MoonLoader } from "react-spinners";
import show_icon from "../../../assets/icons/eye-svgrepo-com.svg"
import time_icon from "../../../assets/icons/time-svgrepo-com.svg"
import { PaginationInterface } from "../../../interfaces/Pagination";
import ProductService from "../../../services/product.service";
import { Product } from "../../../interfaces/ProductInterfaces";
import Pagination from "../../../components/Pagination/Pagination";

const DashboardProducts = () => {

  const [searchParams, setSearchParams] = useSearchParams();
  
  // read params
  const page = Number(searchParams.get("page")) || 1;
  const perPage = Number(searchParams.get("perPage")) || 10;
  const sortBy = searchParams.get("sortBy") || "id";
  const sortOrder = searchParams.get("sortOrder") || "asc";
  const search = searchParams.get("search") || "";

  const [products, setProducts] = useState<Product[]>([]);
  const [paginationData, setPaginationData] = useState<PaginationInterface>();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    document.title = "Dashboard Product | CrystalGym";
  }, [])

  useEffect (() => {
    getproducts()
  }, [])
  
  const getproducts = async (page: number = 1, perPage: number = 10, sortBy: string = 'id', sortOrder: string = 'asc', search: string = '') => {
    setLoading(true);
    try {
      const response = await ProductService.getProducts(page, perPage, sortBy, sortOrder, search);
      if (response.success) {
        setProducts(response.data.products);
        setPaginationData(response.data.pagination_data);
      } else {
        console.error(response.message);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }
    
  useEffect(() => {
    getproducts(page, perPage, sortBy, sortOrder, search);
  }, [page, perPage, sortBy, sortOrder, search]);
    
  const handleChangeOrder = (newSortBy: string) => {
    const newOrder = sortOrder === "asc" ? "desc" : "asc";
    setSearchParams({ page: String(page), perPage: String(perPage), sortBy: newSortBy, sortOrder: newOrder });
  };

  const handlePageChange = (newPage: number) => {
    setSearchParams({ page: String(newPage), perPage: String(perPage), sortBy, sortOrder });
  };

  return (
      <AdminLayout
        head={<>  <span className="opacity-70">Products</span> </>}
      >
        <section className="w-4/6 m-auto">
        <header className="flex items-center justify-between">
          <h1 className="font-semibold text-2xl">Products</h1>
          <Link to="/admin/products/create" className="p-2 px-8 bg-violet-600 font-semibold shadow-md text-white rounded-lg hover:opacity-90">
            + Add
          </Link>
        </header>
        <ul className="my-4 rounded-lg overflow-hidden border border-slate-300/50 border-b-0 shadow-md shadow-slate-300/50">
          <li className="grid grid-cols-7 p-4 bg-slate-200/60 text-slate-600 border-b">
            <p>
              <button 
                onClick={() => handleChangeOrder("name")}
              >
                Name
              </button>
            </p>
            <p>
              <button 
                onClick={() => handleChangeOrder("code")}
              >
                Code
              </button>
            </p>
            <p>
              <button 
                onClick={() => handleChangeOrder("description")}
              >
                Description
              </button>
            </p>
            <p>
              <button 
                onClick={() => handleChangeOrder("release_date")}
              >
                Release Date
              </button>
            </p>
            <p>
              <button 
                onClick={() => handleChangeOrder("gender")}
              >
                Gender
              </button>
            </p>
            <p>
              <button 
                onClick={() => handleChangeOrder("category")}
              >
                Category
              </button>
            </p>
            <p>Status</p>
          </li>
          {
            loading ?
            <li className="h-96 flex items-center justify-center flex-col gap-4 border-b border-slate-300/50 rounded-b-lg">
              <MoonLoader color="#7c3aed" size={40} />
            </li>
            :
            (
            products?.length === 0 ?
            <li className="h-96 flex items-center justify-center flex-col gap-4 border-b border-slate-300/50 rounded-b-lg">
              <p className="text-slate-600">There are no products.</p>
              <Link to="/admin/products/create" className="p-2 bg-violet-600 text-white font-semibold rounded-lg hover:opacity-90">
                Create Product +
              </Link>
            </li>
            :
            products?.map((product) => {
              return (
                <li key={product.id} className="grid grid-cols-7 p-4 text-slate-800 border-b border-slate-300/50">
                  <p>{product.name}</p>
                  <p>{product.code}</p>
                  <p>{product.description || "No description"}</p>
                  <p>{product.release_date}</p>
                  <p>{product.gender}</p>
                  <p>{product.category}</p>
                  <span className="text-xs border border-slate-300/70 shadow-sm w-fit px-2 rounded-full flex items-center gap-1 justify-center}">
                    <img src={time_icon} alt="Time icon" className="w-3" />
                    {/* <p>{product.status === 0 ? "Draft" : "Published"}</p> */}
                  </span>
                  <p className='flex items-end justify-end px-4'>  
                    <Link to={`/admin/products/edit/${product.id}`} className="">
                      <img src={show_icon} alt="Show icon" className="w-5" />
                    </Link>
                  </p>
                </li>
              )
            })
            )
          }
        </ul>
        {
          paginationData && paginationData?.total_pages > 0 &&
          <Pagination
            totalPages={paginationData?.total_pages}
            onPageChange={handlePageChange}
          />
        }
      </section>
      </AdminLayout>
  );
};

export default DashboardProducts;