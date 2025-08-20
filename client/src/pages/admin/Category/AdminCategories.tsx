import { useEffect, useState } from "react";
import AdminLayout from "../AdminLayout";
import CategoryService from "../../../services/category.service";
import { Category} from "../../../interfaces/CategoryInterfaces";
import { Link } from "react-router-dom";
import Pagination from "../../../components/Pagination/Pagination";
import { PaginationInterface } from "../../../interfaces/Pagination";
import show_icon from "../../../assets/icons/eye-svgrepo-com.svg"
import time_icon from "../../../assets/icons/time-svgrepo-com.svg"
import { MoonLoader } from "react-spinners";

const AdminCategories = () => {

  const [categories, setCategories] = useState<Category[]>([]);
  const [paginationData, setPaginationData] = useState<PaginationInterface>();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    document.title = "Admin Category Home | CrystalGym";
  }, [])

  useEffect (() => {
    getCategories()
  }, [])
  
  const getCategories = async () => {
    try {
      const response = await CategoryService.getCategories();
      if (response.success) {
        setCategories(response.data.categories);
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

  return (
    <AdminLayout
      head={<>  <span className="opacity-70">Categories</span> </>}
    >
      <section className="w-4/6 m-auto">
        <header className="flex items-center justify-between">
          <h1 className="font-semibold text-2xl">Categories</h1>
          <Link to="/admin/categories/create" className="p-2 px-8 bg-violet-600 font-semibold shadow-md text-white rounded-lg hover:opacity-90">
            + Add
          </Link>
        </header>
        <ul className="my-4 rounded-lg overflow-hidden border border-slate-300/50 border-b-0 shadow-md shadow-slate-300/50">
          <li className="grid grid-cols-4 p-4 bg-slate-200/60 text-slate-600 border-b">
            <p>Name</p>
            <p>Description</p>
            <p>Status</p>
          </li>
          {
            loading ?
            <li className="h-96 flex items-center justify-center flex-col gap-4 border-b border-slate-300/50 rounded-b-lg">
              <MoonLoader color="#7c3aed" size={40} />
            </li>
            :
            (
            categories?.length === 0 ?
            <li className="h-96 flex items-center justify-center flex-col gap-4 border-b border-slate-300/50 rounded-b-lg">
              <p className="text-slate-600">There are no categories.</p>
              <Link to="/admin/categories/create" className="p-2 bg-violet-600 text-white font-semibold rounded-lg hover:opacity-90">
                Create Category +
              </Link>
            </li>
            :
            categories?.map((category) => {
              return (
                <li key={category.id} className="grid grid-cols-4 p-4 text-slate-800 border-b border-slate-300/50">
                  <p>{category.name}</p>
                  <p>{category.description || "No description"}</p>
                  <span className="text-xs border border-slate-300/70 shadow-sm w-fit px-2 rounded-full flex items-center gap-1 justify-center}">
                    <img src={time_icon} alt="Time icon" className="w-3" />
                    <p>{category.status === 0 ? "Draft" : "Published"}</p>
                  </span>
                  <p className='flex items-end justify-end px-4'>  
                    <Link to={`/admin/categories/edit/${category.id}`} className="">
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
            getData={getCategories}
          />
        }
      </section>
    </AdminLayout>
  );
}

export default AdminCategories