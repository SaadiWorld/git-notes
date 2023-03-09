import ReactPaginate from "react-paginate";

interface IPaginationProps {
  totalRows: number;
  rowsPerPage: number;
  pageChangeHandler: (page: number) => void;
}

const Pagination = ({ totalRows, rowsPerPage, pageChangeHandler }: IPaginationProps) => {
  const pageCount = Math.ceil(totalRows / rowsPerPage);

  const handlePageChange = (selectedItem: { selected: number }) => {
    const { selected: selectedPageNumber } = selectedItem;
    console.log(selectedPageNumber)
    pageChangeHandler(selectedPageNumber + 1);
  }

  return (
    <ReactPaginate
      breakLabel="..."
      nextLabel="next >"
      onPageChange={handlePageChange}
      pageCount={pageCount}
      previousLabel="< previous"
      // renderOnZeroPageCount={null}
      className="pagination flex pt-8 pb-10 overflow-auto sm:justify-end justify-center"
      pageClassName="py-1.5 px-2.5 text-sm rounded-md"
      pageLinkClassName="numbered-link py-1.5 px-2.5 text-sm rounded-md"
      breakClassName="py-1.5 px-2.5 text-sm rounded-md"
      breakLinkClassName="py-1.5 px-2.5 text-sm rounded-md"
      previousClassName="py-1.5 px-2.5 text-sm rounded-md"
      previousLinkClassName="py-1.5 px-2.5 text-sm rounded-md"
      nextClassName="next-list-item py-1.5 px-2.5 text-sm rounded-md"
      nextLinkClassName="py-1.5 px-2.5 text-sm rounded-md"
      activeLinkClassName="text-white bg-primary"
      disabledLinkClassName="text-neutral"
    />
  )
}

export default Pagination