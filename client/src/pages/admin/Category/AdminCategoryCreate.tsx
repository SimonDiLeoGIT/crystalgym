import { useEffect, useState } from "react";
import AdminLayout from "../AdminLayout";
import CategoryService from "../../../services/category.service";

const AdminCategoryCreate = () => {

  const [data, setData] = useState({
    name: '',
    description: ''
  });


  useEffect(() => {
    document.title = "Admin Category Home | CrystalGym";
  }, [])
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await CategoryService.postCategory(data);
      if (response.success) {
        console.log(response.message);
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
        <h1 className="font-semibold text-2xl">Categories</h1>
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
          <div className="w-full text-center">
            <button
              type="submit" 
              className="rounded-lg m-auto p-2 w-48 -bg--color-black -text--color-white"
            >
              Create category
            </button>
          </div>
        </form>
      </section>
    </AdminLayout>
  );
}

export default AdminCategoryCreate