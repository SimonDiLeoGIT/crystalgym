import { useEffect, useState } from "react";
import Login from "../../Login";
import { UserDataInterface } from "../../../interfaces/UserInterface";
import { useUser } from "../../../hook/useUser";
import { PaginatedCategoriesInterface } from "../../../interfaces/CategoryInterfaces";
import CategoryService from "../../../services/category.service";
import ReactPaginate from "react-paginate";
import left_arrow from '../../../assets/icons/carousel/left-arrow.svg'
import right_arrow from '../../../assets/icons/carousel/right-arrow.svg'
import Category from "./Category";
import Message from "../../../components/Message";
import ErrorMessage from "../../../components/ErrorMessage";
import { ErrorInterface } from "../../../interfaces/ErrorInterface";


const ClotheCategories = () => {

  const [user, setUser] = useState<UserDataInterface | null>(null);
  const [loading, setLoading] = useState(true);

  const [paginatedCategories, setPaginatedCategories] = useState<PaginatedCategoriesInterface | null>(null);

  const [editingId, setEditingId] = useState<number | null>(null);

  const [adding, setAdding] = useState<boolean>(false);

  const [editingName, setEditingName] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [visibleMessage, setVisibleMessage] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [visibleErrorMessage, setVisibleErrorMessage] = useState<boolean>(false);
  
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

  useEffect(() => {
    fetchCategories();
  }, [editingId,adding]);

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

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId == null) return;
    try {
      const response = await CategoryService.updateCategory(editingId, editingName);
      if (response.code === 200) {
        setMessage(response.message);
        setVisibleMessage(true);
        setEditingId(null);
      } else {
        setErrorMessage("Error updating category");
        setVisibleErrorMessage(true);
      }
    } catch (error) {
      const errorResponse: ErrorInterface = error as ErrorInterface;
      setErrorMessage(errorResponse.message || "An error occurred");
      setVisibleErrorMessage(true);
    }
  }

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await CategoryService.createCategory(editingName);
      if (response.code === 201) {
        setMessage(response.message);
        setVisibleMessage(true);
        setAdding(false);
      } else {
        setErrorMessage("Error creating category");
        setVisibleErrorMessage(true);
      }
    } catch (error) {
      const errorResponse: ErrorInterface = error as ErrorInterface;
      setErrorMessage(errorResponse.message || "An error occurred");
      setVisibleErrorMessage(true);
    }
  }

  const handleCancelEditing = () => {
    setEditingId(null);
  }

  const handleCancelAdding = () => {
    setAdding(false);
  }

  return (
    <section className=" w-11/12 lg:w-10/12 m-auto my-12">
      <Message message={message} visible={visibleMessage} setVisible={setVisibleMessage} />
      <ErrorMessage message={errorMessage} visible={visibleErrorMessage} setVisible={setVisibleErrorMessage} />
      <header className="flex justify-between mb-2">
        <h1 className="text-3xl font-bold">Categories</h1>
        <button onClick={() => setAdding((prev) => !prev)} className="p-2 rounded-lg -bg--color-dark-violet -text--color-white font-semibold hover:opacity-80">
          Add Category
        </button>
      </header>
      <ul className=" rounded-xl overflow-hidden shadow-lg -shadow--color-greyest-violet">
        <li className="flex -bg--color-grey-violet -text--color-white p-3">
          <strong className="w-24">ID</strong>
          <strong className="flex-1">Name</strong>
        </li>
        {paginatedCategories?.data.categories.map((category, index) => {
          return (
            <li key={category.id} className={`${index % 2 === 0 ? "-bg--color-very-light-grey" : ""}`}>
              <Category category={category} editingId={editingId} setEditingId={setEditingId} editingName={editingName} setEditingName={setEditingName} handleSubmit={handleUpdate} handleCancel={handleCancelEditing}/>
            </li>
          )
        })}
        {
          adding && <Category category={null} editingId={editingId} setEditingId={setEditingId} editingName={editingName} setEditingName={setEditingName} handleSubmit={handleCreate} handleCancel={handleCancelAdding}/>
        }
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