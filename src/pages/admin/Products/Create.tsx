import { useEffect, useState } from "react";
import AdminLayout from "../Components/AdminLayout";
import ErrorMessage from "../../../components/ErrorMessage";
import { Link } from "react-router-dom";
import ProductService from "../../../services/product.service";
import CategoryService from "../../../services/category.service";
import GenderService from "../../../services/gender.service";

export const Create = () => {

  const [data, setData] = useState({
    name: '',
    code: '',
    description: '',
    release_date: '',
    gender_id: 0,
    category_id: 0
  });

  const [categories, setCategories] = useState([]);
  const [genders, setGenders] = useState([]);
  
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [visibleErrorMessage, setVisibleErrorMessage] = useState<boolean>(false);


  useEffect(() => {
    document.title = " | CrystalGym";
  }, [])
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await ProductService.postProduct(data);
      if (response.success) {
        window.location.href = "/dashboard/products";
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

  useEffect(() => {
    const today = new Date();
    setData({ ...data, release_date: today.toISOString().split('T')[0] })
  }, [])

  useEffect(() => {
    const getCategories = async () => {
      try {
        const response = await CategoryService.getAll();
        if (response.success) {
          setCategories(response.data);
        }
      } catch (error) {
        console.error(error);
      }
    }
    getCategories();
  }, [])

  useEffect(() => {
    const getGenders = async () => {
      try {
        const response = await GenderService.getGenders();
        if (response.success) {
          setGenders(response.data);
        }
      } catch (error) {
        console.error(error);
      }
    }
    getGenders();
  }, [])

  return (
    <AdminLayout
      head={<> <Link to="/dashboard/products">Products</Link> · <span className="opacity-70">Create</span></>}
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
            <label htmlFor="code">Code</label>
            <input 
              type="text" 
              placeholder="Code..." 
              className="w-full p-2  border-2 -border--color-very-light-grey rounded-lg shadow-md"
              name="code"
              required
              value={data.code}
              onChange={(e) => setData({ ...data, code: e.target.value })}
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
          <div>
            <label htmlFor="release_date">Release Date</label>
            <input 
              type="text" 
              className="w-full p-2 border-2 rounded-lg shadow-md text-slate-400"
              name="Release Date"
              required
              value={data.release_date}
              disabled
            />
          </div>
          <div>
            <label htmlFor="category_id">Category</label>
            <select 
              className="w-full p-2 border-2 rounded-lg shadow-md"
              name="category_id"
              required
              value={data.category_id}
              onChange={(e) => setData({ ...data, category_id: parseInt(e.target.value) })}
            >
              <option value={0}>Select a category</option>
              {categories?.map((category: any) => (
                <option key={category.id} value={category.id}>{category.name}</option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="gender_id">Gender</label>
            {
              genders?.map((gender: any) => (
                <div key={gender.id} className="flex items-center space-x-4">
                  <input
                    type="radio"
                    name="gender_id"
                    value={gender.id}
                    checked={data.gender_id === gender.id}
                    onChange={(e) => setData({ ...data, gender_id: parseInt(e.target.value) })}
                  />
                  <label>{gender.name}</label>
                </div>
              ))
            }
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