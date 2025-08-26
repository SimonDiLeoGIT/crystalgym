import { useEffect, useState } from "react";
import AdminLayout from "../Components/AdminLayout";
import CategoryService from "../../../services/category.service";
import { Link, useParams } from "react-router-dom"
import ErrorMessage from "../../../components/ErrorMessage";

const CategoryUpdate = () => {

  const {categoryId} = useParams();

  const [data, setData] = useState({
    id: categoryId,
    name: '',
    description: '',
    status: 0
  });

  const [errorMessage, setErrorMessage] = useState<string>('');
  const [visibleErrorMessage, setVisibleErrorMessage] = useState<boolean>(false);

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
        window.location.href = "/dashboard/categories";
      } else {
        console.error(response.message);
      }
    } catch (error) {
      console.log(error);
    }
  }

  const handleDelete = async (category_id: number) => {
    try {
      const response = await CategoryService.deleteCategory(category_id);
      if (response.success) {
        window.location.href = "/dashboard/categories";
      } else {
        setErrorMessage("Error deleting category");
        setVisibleErrorMessage(true);
      }
    } catch (error) {
      setErrorMessage(error.message);
      setVisibleErrorMessage(true);
    }
  }

  return (
    <AdminLayout
      head={<> <Link to="/dashboard/categories">Categories</Link> · <span className="opacity-70">Edit</span></>}
    >
      <ErrorMessage message={errorMessage} visible={visibleErrorMessage} setVisible={setVisibleErrorMessage} />
      <section className="w-4/6 m-auto my-12">
        <h1 className="font-semibold text-2xl">Details</h1>
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
          <div className="flex justify-center gap-2">
            <Link
              to="/dashboard/categories" 
              className="py-2 w-32 text-center bg-slate-300 font-semibold shadow-md text-slate-500 rounded-lg hover:opacity-90"
            >
              Cancel
            </Link>
            <button
              type="submit" 
              className="py-2 w-32 text-center bg-violet-600 font-semibold shadow-md text-white rounded-lg hover:opacity-90"
            >
              Save Changes
            </button>
          </div>
        </form>
        <div className="flex justify-end">
        {
          data.status === 0 ?
            <button className="py-2 w-32 text-center bg-emerald-200/60 font-semibold shadow-md text-emerald-800 rounded-lg hover:opacity-90">
              Publish
            </button>
          :
            <p className="text-slate-400 italic p-2">
              Published
            </p>
        }
        </div>
        {
          data && data.id &&
          <section className="flex items-center justify-between my-8 p-4 border-2 border-rose-600 rounded-lg">
            <p className="font-semibold">Danger Zone</p>
            <button 
              onClick={() => handleDelete(Number(data?.id))}
              className="py-2 w-32 text-center bg-rose-600 font-semibold shadow-md text-white rounded-lg hover:opacity-90"
              >
              Delete
            </button>
          </section>
          }
      </section>
    </AdminLayout>
  );
}

export default CategoryUpdate