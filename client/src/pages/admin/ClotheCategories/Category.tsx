import { useState } from "react";
import { CategoryDataInterface } from "../../../interfaces/CategoryInterfaces"

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
        <input className={`flex-1 p-2 ${editingId === category.id ? "-bg--color-very-light-grey border-b-2 -border--color-green focus:outline-none" : ""}`} value={editingId == category.id ? editingName : category.name} onChange={(e) => setEditingName(e.target.value)}/>
      </fieldset>
      <div className="w-24 p-2">
        {
          editingId === null ?
          <button type="button" key={category.id} onClick={() => handleClickEdit(category.id, category.name)} className="hover:opacity-60">Edit</button>
          :
          editingId === category.id &&
          <>
            <button>S</button>
            <button>X</button>
          </>
        }
      </div>
    </form>
  )
}

export default Category