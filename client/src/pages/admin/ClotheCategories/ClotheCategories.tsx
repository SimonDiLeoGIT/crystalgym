import { useEffect, useState } from "react";
import Login from "../../Login";
import { useUser } from "../../../hook/useUser";
import { CategoryDataInterface, PaginatedCategoriesInterface } from "../../../interfaces/CategoryInterfaces";
import CategoryService from "../../../services/category.service";
import ReactPaginate from "react-paginate";
import Category from "./Category";
import Message from "../../../components/Message";
import ErrorMessage from "../../../components/ErrorMessage";
import { ErrorInterface } from "../../../interfaces/ErrorInterface";
import left_arrow from '../../../assets/icons/carousel/left-arrow.svg'
import right_arrow from '../../../assets/icons/carousel/right-arrow.svg'
import edit_icon from "../../../assets/icons/edit-cover-1481-svgrepo-com.svg.svg"
import open from "../../../assets/icons/open-folder-svgrepo-com.svg"
import { SortSelector } from "../../../components/SortSelector";


const ClotheCategories = () => {

  // const [user, setUser] = useState<UserDataInterface | null>(null);
  const [loading, setLoading] = useState(true);

  const [paginatedCategories, setPaginatedCategories] = useState<PaginatedCategoriesInterface | null>(null);

  const [adding, setAdding] = useState<boolean>(false);

  const [editingCategory, setEditingCategory] = useState<CategoryDataInterface | null>(null);	

  const [message, setMessage] = useState<string>('');
  const [visibleMessage, setVisibleMessage] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [visibleErrorMessage, setVisibleErrorMessage] = useState<boolean>(false);

  const [sortBy, setSortBy] = useState<keyof CategoryDataInterface>('id');
  const [sortOrder, setSortOrder] = useState<string>('asc');
  const [selectedSort, setSelectedSort] = useState<keyof CategoryDataInterface | null>(null)
  
  const { getUser, user } = useUser();
  

  useEffect(() => {
    document.title = "Clothe Categories | Admin CrystalGym";
  })

  useEffect(() => {
    const fetchUser = async () => {
      await getUser();
    };

    fetchUser();
  }, [ getUser ]); // eslint-disable-line

  useEffect(() => {
    getCategories();
  }, []);



  const getCategories = async (page: number = 1) => {
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
        await getCategories(nextPage);
        window.scrollTo(0, 0);
      }
    }
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editingCategory == null) return;
    try {
      const response = await CategoryService.updateCategory(editingCategory);
      if (response.code === 200) {
        setMessage(response.message);
        setVisibleMessage(true);
        setEditingCategory(null);
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
    if (editingCategory == null) return;
    try {
      const response = await CategoryService.createCategory(editingCategory);
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

  const handleSelect = (id: keyof CategoryDataInterface, op: string) => {
    setSortBy(id)
    setSortOrder(op === 'Up' ? 'asc' : 'desc')
  }

  // const handleDelete = async (id: number) => {
  //   try {
  //     const response = await CategoryService.deleteCategory(id)
  //     if (response) {
  //       setMessage("Categoría eliminada con exito.")
  //       setVisibleMessage(true)
  //       getCategories(sortBy, sortOrder)
  //     }
  //   } catch (error) {
  //     console.error(error);
  //     setErrorMessage('No se pudo eliminar la categoría. Intentelo nuevamente')
  //     setVisibleErrorMessage(true)
  //   }
  // }

  const handleCancelEditing = () => {
    setEditingCategory(null);
  }

  const handleCancelAdding = () => {
    setAdding(false);
  }

  return (
    <section className="w-11/12 lg:w-10/12 m-auto my-12">
      <Message message={message} visible={visibleMessage} setVisible={setVisibleMessage} />
      <ErrorMessage message={errorMessage} visible={visibleErrorMessage} setVisible={setVisibleErrorMessage} />
      <header className="flex justify-between mb-2">
        <h1 className="text-3xl font-bold">Categories</h1>
        <button onClick={() => setAdding((prev) => !prev)} className="p-2 rounded-lg -bg--color-dark-violet -text--color-white font-semibold hover:opacity-80">
          Add Category
        </button>
      </header>
      <ul className="shadow-lg -shadow--color-greyest-violet">
        <li className="grid grid-cols-3 font-semibold -bg--color-grey-violet -text--color-white">
          <SortSelector text="Id" options={['Up', 'Down']} id='id' handleSelect={handleSelect} selectedSort={selectedSort} setSelectedSort={setSelectedSort} />
          <SortSelector text="Nombre" options={['Up', 'Down']} id='name' handleSelect={handleSelect} selectedSort={selectedSort} setSelectedSort={setSelectedSort} />
          <div className="hidden md:block w-10/12"><SortSelector text="Descripción" options={['Up', 'Down']} id='description' handleSelect={handleSelect} selectedSort={selectedSort} setSelectedSort={setSelectedSort} /></div>
        </li>
        {
          adding &&
          <li key={0} className="border-b-2 relative">
            <Category handleSubmit={handleCreate} handleCancel={handleCancelAdding} index={0} setEditingCategory={setEditingCategory} editing />
          </li>
        }
        {paginatedCategories?.data.categories.map((category, index) => {
          return (
            <li key={category.id} className={`${index % 2 === 0 ? "-bg--color-very-light-grey" : ""} border-b-2 relative`}>
              <Category category={category} handleSubmit={handleUpdate} handleCancel={handleCancelEditing} index={index} editingCategory={editingCategory} setEditingCategory={setEditingCategory} editing={editingCategory?.id === category.id} />
              {
                !editingCategory &&
                <div className="absolute top-0 right-0 flex justify-center w-20 h-full">
                  <button type="button" className="hover:opacity-80 p-1 m-1 w-full rounded-lg -bg--color-grey-violet">
                    <img src={open} alt="open icon" width={20} className="m-auto"/>
                  </button>
                  <button type="button" onClick={() => setEditingCategory(category)} className="hover:opacity-80 p-1 m-1 w-full rounded-lg -bg--color-dark-violet">
                    <img src={edit_icon} alt="edit icon" width={20} className="m-auto"/>
                  </button>
                </div>
              }
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