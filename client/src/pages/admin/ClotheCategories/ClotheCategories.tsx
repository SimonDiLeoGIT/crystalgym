import { useEffect, useState } from "react";
import Login from "../../Login";
import { useUser } from "../../../hook/useUser";
import { CategoryDataInterface, PaginatedCategoriesInterface } from "../../../interfaces/CategoryInterfaces";
import CategoryService from "../../../services/category.service";
import Pagination from "../../../components/Pagination/Pagination";
import CategoriesItems from "./CategoriesItems";


const ClotheCategories = () => {
  const [loading, setLoading] = useState(true);

  const [paginatedCategories, setPaginatedCategories] = useState<PaginatedCategoriesInterface | null>(null);

  const [adding, setAdding] = useState<boolean>(false);
  const [name, setName] = useState<string>('');

  const [sortBy, setSortBy] = useState<keyof CategoryDataInterface>('id');
  const [sortOrder, setSortOrder] = useState<string>('asc');
  const [perPage, _setPerPage] = useState<number>(10);
  
  const { getUser, user } = useUser();
  

  useEffect(() => {
    document.title = "Clothe Categories | Admin CrystalGym";
  },[])

  useEffect(() => {
    const fetchUser = async () => {
      await getUser();
    };

    fetchUser();
  }, [ getUser ]); // eslint-disable-line

  useEffect(() => {
    getCategories();
  }, [sortBy, sortOrder, perPage, name]); // eslint-disable-line

  const getCategories = async (page: number = 1) => {
    const response = await CategoryService.getPaginatedCategories(page, perPage, sortBy, sortOrder, name);
    if (response.code == 200) {
      setPaginatedCategories(response);
    }
  }

  useEffect(() => {
    if (paginatedCategories) setLoading(false);
  }, [paginatedCategories]);

  if (loading) {
    return <div className="h-screen">Loading...</div>;
  }

  if (!user || user.id_role != 1) {
    return <Login />;
  }


  const handleItemsCountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let newValue = e.target.value;
    if (newValue.startsWith('0') && newValue.length > 1) {
      newValue = newValue.replace(/^0+/, '');
    }
    setPerPage(Number(newValue));
  };

  const setPerPage = (number: number) => {
    if (!paginatedCategories) return;
  
    const maxProducts = paginatedCategories.data.pagination.total_items || 0;
  
    if (number < 0) {
      _setPerPage(0);
    } else if (number > maxProducts) {
      _setPerPage(maxProducts);
    } else {
      _setPerPage(number);
    }
  };

  return (
    <section className="w-11/12 lg:w-10/12 m-auto my-12">
      <header className="flex flex-col justify-between md:flex-row md:items-center my-4 gap-4">
        <h1 className="text-xl font-bold">Categories<span className="font-normal -text--color-grey"> ({paginatedCategories?.data.pagination.total_items})</span></h1>
        <form onSubmit={(e) => e.preventDefault()} className="flex items-center gap-2 m-auto mr-0">
          <fieldset className="flex items-center">
            <button type="button" onClick={() => setPerPage(perPage-1)} className="-bg--color-light-grey-violet -text--color-white p-2 rounded-md font-semibold hover:opacity-70" >-</button>
              <input type="number" className="p-2 w-12 border-b-4 text-center -border--color-greyest-violet focus:-border--color-light-grey-violet focus:outline-none -bg--color-very-light-grey" value={perPage} min={0} max={paginatedCategories?.data.pagination.total_items} onChange={handleItemsCountChange} />
            <button type="button" onClick={() => setPerPage(perPage+1)} className="-bg--color-light-grey-violet -text--color-white p-2 rounded-md font-semibold hover:opacity-70" >+</button>
          </fieldset>
          <fieldset className="flex-1 md:flex-none">
            <input type="text" placeholder="Buscar..." className="w-full p-2 border-b-4 -border--color-greyest-violet focus:-border--color-light-grey-violet focus:outline-none -bg--color-very-light-grey" onChange={(e) => setName(e.target.value)} />
          </fieldset>
        </form>
        <button onClick={() => setAdding((prev) => !prev)} className="p-2 rounded-lg -bg--color-dark-violet -text--color-white font-semibold hover:opacity-80">
          Add Category
        </button>
      </header>
      <CategoriesItems
        adding={adding}
        setAdding={setAdding}
        setSortBy={setSortBy}
        setSortOrder={setSortOrder}
        categories={paginatedCategories}
        getCategories={getCategories}
      />
      <Pagination getData={getCategories} totalPages={paginatedCategories?.data.pagination.total_pages || 0} />
    </section>
  )
}

export default ClotheCategories