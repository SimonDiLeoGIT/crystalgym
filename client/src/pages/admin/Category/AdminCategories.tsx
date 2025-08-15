import { useEffect, useState } from "react";
import AdminLayout from "../AdminLayout";
import CategoryService from "../../../services/category.service";
import { Category} from "../../../interfaces/CategoryInterfaces";
import { Link } from "react-router-dom";

const AdminCategories = () => {

  const [categories, setCategories] = useState<Category[]>([]);

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
      } else {
        console.error(response.message);
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <AdminLayout>
      <section className="w-5/6 m-auto my-12">
        <h1 className="font-semibold text-2xl">Categories</h1>
        <ul className="my-4 -bg--color-light-grey-violet rounded-t-lg -text--color-dark-grey-violet">
          <li className="grid grid-cols-2 p-2 px-4 font-semibold">
            <p>Name</p>
            <p>Description</p>
          </li>
          {categories?.length === 0 &&
            <li className="-bg--color-lightest-grey h-96 flex items-center justify-center flex-col gap-4">
              <p>There are no categories.</p>
              <Link to="/admin/category/create" className="p-2 -bg--color-black -text--color-light-grey-violet font-semibold rounded-lg hover:opacity-90 hover:scale-105 transition-transform duration-150">
                Create Category +
              </Link>
            </li>
          }
          { 
            categories?.map((category) => {
              return (
                <li key={category.id} className="grid grid-cols-2 p-2">
                  <p>{category.name}</p>
                  <p>{category.description}</p>
                </li>
              )
            })
          }
        </ul>
      </section>
    </AdminLayout>
  );
}

export default AdminCategories