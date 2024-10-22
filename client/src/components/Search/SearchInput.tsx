import { useState } from "react";

interface Props {
  setText: (text:string) => void
}

const SearchInput: React.FC<Props> = ({ setText }) => {

  const [debounceTimeout, setDebounceTimeout] = useState<ReturnType<typeof setTimeout> | null>(null);


  const handleTextChange = (newText: string) => {
    // Limpiar el timeout anterior si aún está en ejecución
    if (debounceTimeout) {
      clearTimeout(debounceTimeout);
    }
    
    const timeout = setTimeout(() => {
      setText(newText);
    }, 300);
    
    setDebounceTimeout(timeout);
  };

  return (
    <fieldset className="flex-1 md:flex-none">
      <input type="text" placeholder="Buscar..." className="w-full p-2 border-b-4 -border--color-greyest-violet focus:-border--color-light-grey-violet focus:outline-none -bg--color-very-light-grey" onChange={(e) => handleTextChange(e.target.value)} />
    </fieldset>
  )
}

export default SearchInput