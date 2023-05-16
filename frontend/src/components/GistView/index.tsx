import { Bars3Icon, Squares2X2Icon } from "@heroicons/react/24/outline";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import useScrollPosition from "../../hooks/useScrollPosition";
import { useAppDispatch } from "../../store";
import { getAppPage, getAppPerPage, getGistView, getTotalGists } from "../../store/selectors/app";
import { setGistView, setPage } from "../../store/slices/app";
import { GIST_VIEW } from "../../types/common"
import Grid from "./Grid";
import Pagination from "./List/Pagination";
import Table from "./List/ReactTable";

function GistView() {
  const dispatch = useAppDispatch();
  const page = useSelector(getAppPage);
  const perPage = useSelector(getAppPerPage);
  const totalRows = useSelector(getTotalGists);
  const type = useSelector(getGistView);
  const [setScrollPosition] = useScrollPosition();

  const handlePageChange = (page: number) => {
    dispatch(setPage(page));
  }

  const handleViewChange = (newType: GIST_VIEW) => {
    newType !== type && dispatch(setGistView(newType));
  }

  useEffect(() => {
    setScrollPosition('page-top', 'start')
  }, [page])
  

  return (
    <>
      <div data-testid="gist-view-container" id="page-top" className="flex justify-end py-5">
        <Bars3Icon data-testid="list-icon" className={`cursor-pointer ${type === GIST_VIEW.LIST ? 'text-primary' : ''}`} height={20} width={20} onClick={() => handleViewChange(GIST_VIEW.LIST)} />
        <Squares2X2Icon data-testid="grid-icon" className={`cursor-pointer ml-2 ${type === GIST_VIEW.GRID ? 'text-primary' : ''}`} height={20} width={20} onClick={() => handleViewChange(GIST_VIEW.GRID)} />
      </div>
      {type === GIST_VIEW.GRID ? <Grid />: <Table /> }
      <Pagination
        totalRows={totalRows}
        rowsPerPage={perPage}
        pageChangeHandler={handlePageChange}
      />
    </>
  )
}

export default GistView