import ReactPaginate from "react-paginate"
import left_arrow from '../../assets/icons/carousel/left-arrow.svg'
import right_arrow from '../../assets/icons/carousel/right-arrow.svg'

interface Props {
  totalPages: number
  onPageChange: (page: number) => void
}

const Pagination: React.FC<Props> = ({ totalPages, onPageChange}) => {

  const handlePageClick = async (event: { selected: number }) => {
    const nextPage = event.selected + 1;
    
    if (nextPage <= totalPages) {
      await onPageChange(nextPage);
      window.scrollTo(0, 0);
    }
  };

  return (
    <ReactPaginate
      breakLabel="..."
      nextLabel={
        <div className="p-3">
          <img src={right_arrow} className="w-4" alt="Next Page"/>
        </div>
      }
      onPageChange={handlePageClick}
      pageRangeDisplayed={1}
      pageCount={totalPages || 0}
      marginPagesDisplayed={2}
      previousLabel={
        <div className="p-3">
          <img src={left_arrow} className="w-4" alt="Prev Page"/>
        </div>
      }
      renderOnZeroPageCount={null}
      containerClassName=" flex justify-center hover:cursor-pointer m-auto my-8"
      pageLinkClassName="p-1 md:p-2"
      pageClassName="p-2 md:p-2 rounded-md font-semibold text-black hover:opacity-90"
      activeClassName="bg-violet-300 text-slate-100 hover:opacity-90"
      previousClassName="flex items-center justify-center bg-violet-300 rounded-md m-auto mr-1 hover:opacity-90"
      nextClassName="flex items-center justify-center bg-violet-300 rounded-md m-auto ml-1 hover:opacity-90"
    />
  )
}

export default Pagination