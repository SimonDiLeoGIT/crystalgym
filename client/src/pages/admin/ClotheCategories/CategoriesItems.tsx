import { Suspense, useState } from "react";
import Category from "./Category"
import { CategoryDataInterface, PaginatedCategoriesInterface } from "../../../interfaces/CategoryInterfaces";
import { SortSelector } from "../../../components/SortSelector";
import { ErrorInterface } from "../../../interfaces/ErrorInterface";
import CategoryService from "../../../services/category.service";
import Message from "../../../components/Message";
import ErrorMessage from "../../../components/ErrorMessage";
import edit_icon from "../../../assets/icons/edit-cover-1481-svgrepo-com.svg.svg"
import open from "../../../assets/icons/open-folder-svgrepo-com.svg"

interface Props {
  adding: boolean
  setAdding: React.Dispatch<React.SetStateAction<boolean>>
  setSortBy: React.Dispatch<React.SetStateAction<keyof CategoryDataInterface>>
  setSortOrder: React.Dispatch<React.SetStateAction<string>>
  categories: PaginatedCategoriesInterface | null
  getCategories: () => Promise<void>
}

const CategoriesItems: React.FC<Props> = ({ adding, setAdding, setSortBy, setSortOrder, categories, getCategories}) => {

  const [editingCategory, setEditingCategory] = useState<CategoryDataInterface | null>(null)

  const [message, setMessage] = useState<string>('');
  const [visibleMessage, setVisibleMessage] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [visibleErrorMessage, setVisibleErrorMessage] = useState<boolean>(false);
  const [selectedSort, setSelectedSort] = useState<keyof CategoryDataInterface | null>(null)

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editingCategory == null) return;
    try {
      const response = await CategoryService.updateCategory(editingCategory);
      if (response.code === 200) {
        successfullSubmit(response.message)
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
      console.log('llego:', editingCategory)
      const response = await CategoryService.createCategory(editingCategory);
      if (response.code === 201) {
        successfullSubmit(response.message)
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

  const successfullSubmit = async (message: string) => {
    setMessage(message);
    setVisibleMessage(true);
    setAdding(false);
    setEditingCategory(null);
    await getCategories()
  }

  const handleSelect = (id: keyof CategoryDataInterface, op: string) => {
    setSortBy(id)
    setSortOrder(op === 'Up' ? 'asc' : 'desc')
  }

  const handleCancelEditing = () => {
    setEditingCategory(null);
  }

  const handleCancelAdding = () => {
    setAdding(false);
  }

  return (
    <>
      <Message message={message} visible={visibleMessage} setVisible={setVisibleMessage} />
      <ErrorMessage message={errorMessage} visible={visibleErrorMessage} setVisible={setVisibleErrorMessage} />
      <ul className="shadow-lg -shadow--color-greyest-violet">
        <li className="grid grid-cols-3 font-semibold -bg--color-grey-violet -text--color-white">
          <SortSelector text="Id" options={['Up', 'Down']} id='id' handleSelect={handleSelect} selectedSort={selectedSort} setSelectedSort={setSelectedSort} />
          <SortSelector text="Nombre" options={['Up', 'Down']} id='name' handleSelect={handleSelect} selectedSort={selectedSort} setSelectedSort={setSelectedSort} />
          <div className="hidden md:block w-10/12"><SortSelector text="Descripción" options={['Up', 'Down']} id='description' handleSelect={handleSelect} selectedSort={selectedSort} setSelectedSort={setSelectedSort} /></div>
        </li>
        <Suspense fallback={<h3>Loading...</h3>}>
          {
            adding &&
            <li key={0} className="border-b-2 relative -bg--color-very-light-grey">
              <Category handleSubmit={handleCreate} handleCancel={handleCancelAdding} index={0} setEditingCategory={setEditingCategory} editing editingCategory={editingCategory}/>
            </li>
          }
          {
            (categories?.data.categories.length === 0 && !adding) ?
            <div key={0} className="h-96 grid place-content-center">
              Categories Not Found
            </div>
            :
            categories?.data.categories.map((category, index) => {
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
        </Suspense>
      </ul>
    </>
  )
}

export default CategoriesItems