import { useEffect, useState } from "react";
import AdminLayout from "../AdminLayout";
import CategoryService from "../../../services/category.service";
import { Link, useParams } from "react-router-dom"

const AdminCategoryUpdate = () => {

  const {categoryId} = useParams();

  const [data, setData] = useState({
    id: categoryId,
    name: '',
    description: ''
  });

  useEffect(() => {
    const getCategory = async () => {
      try {
        if (categoryId == null) return;
        const response = await CategoryService.getCategoryById(Number(categoryId));
        if (response.success) {
          setData(response.data);
        } else {
          console.error(response.message);
        }
      } catch (error) {
        console.log(error);
      }
    }
    if (categoryId == null) return;
    getCategory();
  }, [categoryId])


  useEffect(() => {
    document.title = "Admin Category Home | CrystalGym";
  }, [])
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await CategoryService.updateCategory(data);
      if (response.success) {
        console.log(response.message);
        window.location.href = "/admin/categories";
      } else {
        console.error(response.message);
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <AdminLayout>
      <section className="w-4/6 m-auto my-12">
        <h1 className="font-semibold text-2xl">Edit Category</h1>
        <form onSubmit={handleSubmit} className="my-4 space-y-4">
          <div>
            <label htmlFor="name">Name</label>
            <input 
              type="text" 
              placeholder="Name..." 
              className="w-full p-2  border-2 -border--color-very-light-grey rounded-lg shadow-md"
              name="name"
              required
              value={data.name}
              onChange={(e) => setData({ ...data, name: e.target.value })}
            />
          </div>
          <div>
            <label htmlFor="description">Description</label>
            <textarea 
              placeholder="Description..."
              className="w-full p-2 max-h-40 border-2 -border--color-very-light-grey rounded-lg shadow-md"
              name="description"
              value={data.description}
              onChange={(e) => setData({ ...data, description: e.target.value })}
            />
          </div>
          <div className="flex justify-center gap-4">
            <Link
              to="/admin/categories" 
              className="text-center rounded-lg p-2 w-48 -bg--color-red  -text--color-white"
            >
              Cancel
            </Link>
            <button
              type="submit" 
              className="rounded-lg p-2 w-48 -bg--color-black -text--color-white"
            >
              Save Changes
            </button>
          </div>
        </form>
      </section>
    </AdminLayout>
  );
}

export default AdminCategoryUpdate