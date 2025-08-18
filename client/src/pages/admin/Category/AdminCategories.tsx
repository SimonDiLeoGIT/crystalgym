import { useEffect, useState } from "react";
import AdminLayout from "../AdminLayout";
import CategoryService from "../../../services/category.service";
import { Category} from "../../../interfaces/CategoryInterfaces";
import { Link } from "react-router-dom";
import Pagination from "../../../components/Pagination/Pagination";
import { PaginationInterface } from "../../../interfaces/Pagination";
import show_icon from "../../../assets/icons/open.svg"

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
        console.log(response.data)
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
    <AdminLayout>
      <section className="w-5/6 m-auto">
        <header className="flex items-center justify-between">
          <h1 className="font-semibold text-2xl">Categories</h1>
          <Link to="/admin/categories/create" className="p-2 -bg--color-black -text--color-white rounded-lg hover:opacity-90 hover:scale-105 transition-transform duration-150">
            Create Category +
          </Link>
        </header>
        <ul className="my-4 -bg--color-light-grey-violet rounded-t-lg -text--color-dark-grey-violet shadow-md -shadow--color-black/10">
          <li className="grid grid-cols-3 p-2 px-4 font-semibold">
            <p>Name</p>
            <p>Description</p>
            <p>Actions</p>
          </li>
          {
            loading ?
            <li className="-bg--color-lightest-grey h-96 flex items-center justify-center flex-col gap-4">
              <p>Loading...</p>
            </li>
            :
            (
            categories?.length === 0 ?
            <li className="-bg--color-lightest-grey h-96 flex items-center justify-center flex-col gap-4">
              <p>There are no categories.</p>
              <Link to="/admin/category/create" className="p-2 -bg--color-black -text--color-light-grey-violet font-semibold rounded-lg hover:opacity-90 hover:scale-105 transition-transform duration-150">
                Create Category +
              </Link>
            </li>
            :
            categories?.map((category) => {
              return (
                <li key={category.id} className="-bg--color-lightest-grey grid grid-cols-3 p-4  ">
                  <p>{category.name}</p>
                  <p>{category.description || "No description"}</p>
                  <p>  
                    <Link to={`/admin/categories/edit/${category.id}`}>
                      <img src={show_icon} alt="Show icon" className="w-6" />
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