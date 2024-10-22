interface props {
  setText: (text:string) => void
}

const SearchInput: React.FC<props> = ({ setText }) => {
  return (
    <fieldset className="flex-1 md:flex-none">
      <input type="text" placeholder="Buscar..." className="w-full p-2 border-b-4 -border--color-greyest-violet focus:-border--color-light-grey-violet focus:outline-none -bg--color-very-light-grey" onChange={(e) => setText(e.target.value)} />
    </fieldset>
  )
}

export default SearchInput