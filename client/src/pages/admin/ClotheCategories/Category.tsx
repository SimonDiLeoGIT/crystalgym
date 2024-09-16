import { CategoryDataInterface } from "../../../interfaces/CategoryInterfaces"
import edit_icon from "../../../assets/icons/edit-cover-1481-svgrepo-com.svg.svg"
import ok_icon from "../../../assets/icons/ok-svgrepo-com.svg"
import cancel_icon from "../../../assets/icons/cancel-svgrepo-com.svg"
import open from "../../../assets/icons/open-folder-svgrepo-com.svg"

interface Props {
  category: CategoryDataInterface | null
  editingId: number | null
  setEditingId: React.Dispatch<React.SetStateAction<number | null>>
  handleCancel: () => void
  editingName: string
  setEditingName: React.Dispatch<React.SetStateAction<string>>
  handleSubmit: (event: React.FormEvent) => void
}

const Category: React.FC<Props> = ({ category, editingId, setEditingId, setEditingName, editingName, handleSubmit, handleCancel }) => {


  const handleClickEdit = (id: number, name: string) => {
    setEditingId(id);
    setEditingName(name);
  };

  return (
    <form onSubmit={handleSubmit} key={category?.id} className="flex">
      <fieldset className="flex flex-1" disabled={editingId != category?.id}>
        <input className="w-24 p-3" disabled value={category?.id} />
        <input className={`flex-1 p-3 ${editingId === category?.id || category === null  ? "border-b-4 -border--color-green focus:outline-none" : ""}`} value={editingId === category?.id ? editingName : category?.name} onChange={(e) => setEditingName(e.target.value)}/>
      </fieldset>
      <div className="flex justify-between gap-2 p-1">
        {editingId === category?.id || category === null ? (
          <>
            <button type="submit" className="-bg--color-green p-2 w-full rounded-lg hover:opacity-80">
              <img src={ok_icon} alt="ok icon" width={20} className="m-auto"/>
            </button>
            <button type="button" className="-bg--color-red p-2 w-full rounded-lg hover:opacity-80" onClick={handleCancel}>
              <img src={cancel_icon} alt="cancel icon" width={20} className="m-auto"/>
            </button>
          </>
        ) : (
          <>
            <button type="button" className="hover:opacity-80 -bg--color-grey-violet p-2  rounded-lg">
              <img src={open} alt="open icon" width={20} className="m-auto"/>
            </button>
            <button type="button" onClick={() => handleClickEdit(category.id, category.name)} className="hover:opacity-80 -bg--color-dark-violet p-2  rounded-lg">
              <img src={edit_icon} alt="edit icon" width={20} className="m-auto"/>
            </button>
          </>
        )}
      </div>
    </form>
  );
};

export default Category;
