import { useEffect, useState } from "react";
import AdminLayout from "../AdminLayout";
import CategoryService from "../../../services/category.service";
import ErrorMessage from "../../../components/ErrorMessage";
import { Link } from "react-router-dom";

const AdminCategoryCreate = () => {

  const [data, setData] = useState({
    name: '',
    description: ''
  });
  
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [visibleErrorMessage, setVisibleErrorMessage] = useState<boolean>(false);


  useEffect(() => {
    document.title = "Admin Category Home | CrystalGym";
  }, [])
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await CategoryService.postCategory(data);
      if (response.success) {
        console.log(response.message);
        window.location.href = "/admin/categories";
      } else {
        console.error(response.message);
        setErrorMessage(response.message);
        setVisibleErrorMessage(true);
      }
    } catch (error) {
      console.log(error);
      setErrorMessage(error.message);
      setVisibleErrorMessage(true);
    }
  }

  return (
    <AdminLayout
      head={<> <Link to="/admin/categories">Categories</Link> · <span className="opacity-70">Create</span></>}
    >
      <ErrorMessage message={errorMessage} visible={visibleErrorMessage} setVisible={setVisibleErrorMessage} />
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
              className="p-2 px-12 bg-violet-600 font-semibold shadow-md text-white rounded-lg hover:opacity-90"
            >
              Create
            </button>
          </div>
        </form>
      </section>
    </AdminLayout>
  );
}

export default AdminCategoryCreate