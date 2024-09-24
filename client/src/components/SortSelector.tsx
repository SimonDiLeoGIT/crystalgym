import { useEffect, useState } from "react"
import down_arrow from '../assets/icons/down-arrow.svg'

interface Props<T> {
  options: string[]
  id: T
  text: string
  handleSelect: (id: T, op: string) => void
  selectedSort: T | null
  setSelectedSort: (id: T | null) => void
}

export const SortSelector = <T extends string | number>({ options, id, text, handleSelect, selectedSort, setSelectedSort }: Props<T>) => {


  const [isOpen, setIsOpen] = useState<boolean>(false)

  useEffect(() => {
    setIsOpen(selectedSort === id)
  },[selectedSort, id])

  function handleClik(id: T, op: string) {
    handleSelect(id, op)
    setSelectedSort(null)
  }

  return (
    <article className="relative">
      <button
        className="p-2 flex w-full"
        onClick={() => setSelectedSort(id !== selectedSort ? id : null)}
      >
        <p className="font-semibold ">{text}</p>
        <p className="flex-1"><img src={down_arrow} className="w-6 m-auto mr-0" /></p>
      </button>

      <aside className={`absolute right-4 top-6 w-1/2 ${!isOpen && 'hidden'} -bg--color-white z-50 overflow-hidden shadow-md`}>
        <ul className="text-sm border ">
          {
            options.map(op => {
              return (
                <li className="-text--color-black font-normal ">
                  <button
                    className="block text-start p-2 hover:opacity-80 border-b -border--color-black w-full"
                    onClick={() => handleClik(id, op)}
                  >
                    {op}
                  </button>
                </li>
              )
            })
          }
        </ul>
      </aside>
    </article>
  )
}