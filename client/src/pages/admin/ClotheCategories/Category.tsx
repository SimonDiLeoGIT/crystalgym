import { CategoryDataInterface } from "../../../interfaces/CategoryInterfaces"
import ok_icon from "../../../assets/icons/ok-svgrepo-com.svg"
import cancel_icon from "../../../assets/icons/cancel-svgrepo-com.svg"

interface Props {
  category?: CategoryDataInterface | null
  handleCancel: () => void
  handleSubmit: (event: React.FormEvent) => void
  editingCategory?: CategoryDataInterface | null
  setEditingCategory: React.Dispatch<React.SetStateAction<CategoryDataInterface | null>>
  editing: boolean
  index: number
}

const Category: React.FC<Props> = ({ category, editingCategory, setEditingCategory, editing, handleSubmit, handleCancel, index }) => {

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditingCategory((prevCategory) => ({
      ...prevCategory,
      [name]: value,
    } as CategoryDataInterface));
  };

  return (
    <form onSubmit={handleSubmit} key={category?.id} className="">
      <fieldset className="grid grid-cols-3 gap-2" disabled={!editing}>
        <p className="p-2">{category?.id ? category.id : 'Id'}</p>
        <input className={`p-2 ${editing ? " border-b-2 -border--color-green focus:outline-none b " : ""} ${index % 2 === 0 ? "-bg--color-very-light-grey" : ""}`} value={editing ? editingCategory?.name : category?.name} name='name' onChange={handleInputChange}/>
        <input className={`hidden md:block w-9/12 ${editing ? " border-b-2 -border--color-green focus:outline-none" : ""} ${index % 2 === 0 ? "-bg--color-very-light-grey" : ""}`} value={editing ? editingCategory?.description : category?.description || ""} name="description" onChange={handleInputChange}/>
      </fieldset>
      <div className="absolute top-0 right-0 flex justify-center w-20 h-full">
        {editing ? (
          <>
            <button type="submit" className="-bg--color-green p-1 m-1 w-full rounded-lg hover:opacity-80">
              <img src={ok_icon} alt="ok icon" width={20} className="m-auto"/>
            </button>
            <button type="button" className="-bg--color-red p-1 m-1 w-full rounded-lg hover:opacity-80" onClick={handleCancel}>
              <img src={cancel_icon} alt="cancel icon" width={20} className="m-auto"/>
            </button>
          </>
        ) : null }
      </div>
    </form>
  );
};

export default Category;
