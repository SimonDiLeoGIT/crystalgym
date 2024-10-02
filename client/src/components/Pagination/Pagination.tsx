import ReactPaginate from "react-paginate"
import left_arrow from '../../assets/icons/carousel/left-arrow.svg'
import right_arrow from '../../assets/icons/carousel/right-arrow.svg'

interface Props {
  totalPages: number
  getData: (page: number) => Promise<void>
}

const Pagination: React.FC<Props> = ({ totalPages, getData}) => {

  const handlePageClick = async (event: { selected: number }) => {
    const nextPage = event.selected + 1;

    if (nextPage <= totalPages) {
      await getData(nextPage);
      window.scrollTo(0, 0);
    }
  };

  return (
    <ReactPaginate
      breakLabel="..."
      nextLabel={
        <img src={right_arrow} className="w-4" alt="Next Page"/>
      }
      onPageChange={handlePageClick}
      pageRangeDisplayed={1}
      pageCount={totalPages || 0}
      marginPagesDisplayed={2}
      previousLabel={
        <img src={left_arrow} className="w-4" alt="Prev Page"/>
      }
      renderOnZeroPageCount={null}
      containerClassName=" flex justify-center hover:cursor-pointer m-auto my-8"
      pageLinkClassName="p-1 md:p-2"
      pageClassName="p-2 md:p-2 rounded-lg font-semibold -text--color-black hover:-bg--color-very-light-grey hover:opacity-60"
      activeClassName="-bg--color-light-grey-violet -text--color-white hover:-bg--color-light-grey-violet"
      previousClassName="h-8 w-4 md:w-8 flex items-center justify-center -bg--color-light-grey-violet rounded-lg m-auto mr-1 hover:opacity-60"
      nextClassName="h-8 w-4 md:w-8 flex items-center justify-center -bg--color-light-grey-violet rounded-lg m-auto ml-1 hover:opacity-60"
    />
  )
}

export default Pagination