import { useEffect, useState } from "react";
import Login from "../Login";
import { UserDataInterface } from "../../interfaces/UserInterface";
import { useUser } from "../../hook/useUser";
import { PaginatedCategoriesInterface } from "../../interfaces/CategoryInterfaces";
import CategoryService from "../../services/category.service";
import ReactPaginate from "react-paginate";
import left_arrow from '../../assets/icons/carousel/left-arrow.svg'
import right_arrow from '../../assets/icons/carousel/right-arrow.svg'


const ClotheCategories = () => {

  // const [message, setMessage] = useState<string>('');
  // const [visibleMessage, setVisibleMessage] = useState<boolean>(false);
  // const [errorMessage, setErrorMessage] = useState<string>('');
  // const [visibleErrorMessage, setVisibleErrorMessage] = useState<boolean>(false);

  const [user, setUser] = useState<UserDataInterface | null>(null);
  const [loading, setLoading] = useState(true);

  const [paginatedCategories, setPaginatedCategories] = useState<PaginatedCategoriesInterface | null>(null);

  // const [submiting, setSubmiting] = useState(false);

  const [editingId, setEditingId] = useState<number | null>(null);
  const [editingName, setEditingName] = useState<string>('');

  const { getUser } = useUser();
  

  useEffect(() => {
    document.title = "Clothe Categories | Admin CrystalGym";
  })

  useEffect(() => {
    const fetchUser = async () => {
      const fetchedUser : UserDataInterface | null = await getUser();
      setUser(fetchedUser);
    };

    fetchUser();
  }, [ getUser ]);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async (page: number = 1) => {
    const response = await CategoryService.getPaginatedCategories(page);
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

  const handlePageClick = async (event: { selected: number }) => {
    if (paginatedCategories) {
      const nextPage = event.selected + 1;
      const totalPages = paginatedCategories?.data.pagination.total_pages;

      if (nextPage <= totalPages) {
        await fetchCategories(nextPage);
        window.scrollTo(0, 0);
      }
    }
  };

  const handleClickEdit = (id: number, name: string) => {
    setEditingId(id);
    setEditingName(name);
  };

  return (
    <section className=" w-11/12 lg:w-10/12 m-auto my-12">
      <h1 className="text-3xl font-bold">Clothe Categories</h1>
      <ul className=" rounded-xl overflow-hidden shadow-lg -shadow--color-greyest-violet">
        <li className="flex -bg--color-grey-violet -text--color-white p-2">
          <strong className="w-24">ID</strong>
          <strong className="flex-1">Name</strong>
        </li>
        {paginatedCategories?.data.categories.map((category, index) => {
          return (
            <li key={category.id} className={`${index % 2 === 0 ? "-bg--color-very-light-grey" : ""}`}>
              <form key={category.id} className="flex">
                <fieldset className="flex flex-1" disabled={editingId != category.id}>
                  <input className="w-24 p-2" disabled value={category.id} />
                  <input className="flex-1 p-2" value={editingId == category.id ? editingName : category.name} onChange={(e) => setEditingName(e.target.value)}/>
                </fieldset>
                <div className="w-24 p-2">
                  <button type="button" key={category.id} onClick={() => handleClickEdit(category.id, category.name)} className="hover:opacity-60">Edit</button>
                </div>
              </form>
            </li>
          )
        })}
      </ul>
      <ReactPaginate 
        breakLabel="..."
        nextLabel={
          <img src={right_arrow} className="w-4" alt="Next Page"/>
        }
        onPageChange={handlePageClick}
        pageRangeDisplayed={1}
        pageCount={paginatedCategories ? paginatedCategories?.data.pagination.total_pages : 0}
        marginPagesDisplayed={2}
        previousLabel={
          <img src={left_arrow} className="w-4" alt="Prev Page"/>
        }
        renderOnZeroPageCount={null}
        containerClassName=" flex justify-center hover:cursor-pointer m-auto my-8"
        pageLinkClassName="p-1 md:p-2"
        pageClassName="p-2 md:p-2 rounded-lg font-semibold -text--color-black hover:-bg--color-very-light-grey hover:opacity-60"
        activeClassName="-bg--color-light-grey-violet -text--color-white hover:-bg--color-light-grey-violet"
        previousClassName="h-8 w-4 md:w-8 flex items-center justify-center -bg--color-light-grey-violet rounded-lg m-auto mr-1 hover:opacity-60"
        nextClassName="h-8 w-4 md:w-8 flex items-center justify-center -bg--color-light-grey-violet rounded-lg m-auto ml-1 hover:opacity-60"
        />
    </section>
  )
}

export default ClotheCategories