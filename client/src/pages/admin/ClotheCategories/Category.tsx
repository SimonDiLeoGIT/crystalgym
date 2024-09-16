import { useState } from "react";
import { CategoryDataInterface } from "../../../interfaces/CategoryInterfaces"
import edit_icon from "../../../assets/icons/edit-cover-1481-svgrepo-com.svg.svg"
import ok_icon from "../../../assets/icons/ok-svgrepo-com.svg"
import cancel_icon from "../../../assets/icons/cancel-svgrepo-com.svg"

interface Props {
  category: CategoryDataInterface
  editingId: number | null
  setEditingId: React.Dispatch<React.SetStateAction<number | null>>
}

const Category: React.FC<Props> = ({ category, editingId, setEditingId }) => {

  const [editingName, setEditingName] = useState<string>('');

  const handleClickEdit = (id: number, name: string) => {
    setEditingId(id);
    setEditingName(name);
  };

  return (
    <form key={category.id} className="flex">
      <fieldset className="flex flex-1" disabled={editingId != category.id}>
        <input className="w-24 p-2" disabled value={category.id} />
        <input className={`flex-1 p-2 ${editingId === category.id ? "border-b-2 -border--color-green focus:outline-none" : ""}`} value={editingId == category.id ? editingName : category.name} onChange={(e) => setEditingName(e.target.value)}/>
      </fieldset>
      <div className="m-1">
        {
          editingId === null ?
          <button type="button" key={category.id} onClick={() => handleClickEdit(category.id, category.name)} className="hover:opacity-60 -bg--color-dark-violet p-2  rounded-lg">
            <img src={edit_icon} alt="edit icon" width={20} className="m-auto"/>
          </button>
          :
          editingId === category.id &&
          <div className="flex justify-between gap-2">
            <button type="button" className="-bg--color-green p-2 w-full rounded-lg" onClick={() => setEditingId(null)}>
              <img src={ok_icon} alt="ok icon" width={20} className="m-auto"/>
            </button>
            <button type="button" className="-bg--color-red p-2 w-full rounded-lg" onClick={() => setEditingId(null)}>
              <img src={cancel_icon} alt="cancel icon" width={20} className="m-auto"/>
            </button>
          </div>
        }
      </div>
    </form>
  )
}

export default Category