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
}

const Category: React.FC<Props> = ({ category, editingCategory, setEditingCategory, editing, handleSubmit, handleCancel }) => {

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditingCategory((prevCategory) => ({
      ...prevCategory,
      [name]: value,
    } as CategoryDataInterface));
  };

  return (
    <form onSubmit={handleSubmit} key={category?.id} className="flex">
      <fieldset className="flex flex-1" disabled={!editing}>
        <p className="w-24 p-3">{category?.id}</p>
        <input className={`flex-1 p-3 ${editing ? "border-b-4 -border--color-green focus:outline-none" : ""}`} value={editing ? editingCategory?.name : category?.name} onChange={handleInputChange}/>
        <input className={`flex-1 p-3 ${editing ? "border-b-4 -border--color-green focus:outline-none" : ""}`} value={editing ? editingCategory?.description : category?.description} onChange={handleInputChange}/>
      </fieldset>
      <div className="flex justify-between gap-2 p-1">
        {editing ? (
          <>
            <button type="submit" className="-bg--color-green p-2 w-full rounded-lg hover:opacity-80">
              <img src={ok_icon} alt="ok icon" width={20} className="m-auto"/>
            </button>
            <button type="button" className="-bg--color-red p-2 w-full rounded-lg hover:opacity-80" onClick={handleCancel}>
              <img src={cancel_icon} alt="cancel icon" width={20} className="m-auto"/>
            </button>
          </>
        ) : null }
      </div>
    </form>
  );
};

export default Category;
