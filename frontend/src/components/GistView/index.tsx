import { Bars3Icon, Squares2X2Icon } from "@heroicons/react/24/outline";
import { useSelector } from "react-redux";
import useScrollToTop from "../../hooks/useScrollToTop";
import { useAppDispatch } from "../../store";
import { getAppPage, getAppPerPage, getTotalGists } from "../../store/selectors/app";
import { setGistView, setPage } from "../../store/slices/app";
import { GIST_VIEW } from "../../types/common"
import Grid from "./Grid";
import Pagination from "./List/Pagination";
import Table from "./List/ReactTable";

interface IGistViewProps{
  type: GIST_VIEW;
}

function GistView({ type }: IGistViewProps) {
  const dispatch = useAppDispatch();
  const page = useSelector(getAppPage);
  useScrollToTop(page, 'page-top');
  const perPage = useSelector(getAppPerPage);
  const totalRows = useSelector(getTotalGists);
  const handlePageChange = (page: number) => {
    dispatch(setPage(page));
  }

  const handleViewChange = (newType: GIST_VIEW) => {
    if (newType === type) return;
    dispatch(setGistView(newType));
  }

  return (
    <div className="px-20">
      <div id='page-top' className="flex justify-end py-5">
        <Bars3Icon className={`cursor-pointer ${type === GIST_VIEW.LIST ? 'text-primary' : ''}`} height={20} width={20} onClick={() => handleViewChange(GIST_VIEW.LIST)} />
        <Squares2X2Icon className={`cursor-pointer ml-2 ${type === GIST_VIEW.GRID ? 'text-primary' : ''}`} height={20} width={20} onClick={() => handleViewChange(GIST_VIEW.GRID)} />
      </div>
      {type === GIST_VIEW.GRID ? <Grid />: <Table /> }
      <Pagination
        totalRows={totalRows}
        rowsPerPage={perPage}
        pageChangeHandler={handlePageChange}
      />
    </div>
  )
}

export default GistView