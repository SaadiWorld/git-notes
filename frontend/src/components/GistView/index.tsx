import { useSelector } from "react-redux";
import useScrollToTop from "../../hooks/useScrollToTop";
import { useAppDispatch } from "../../store";
import { getAppPage, getAppPerPage, getTotalGists } from "../../store/selectors/app";
import { setPage } from "../../store/slices/app";
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
  useScrollToTop(page, 'table-header');
  const perPage = useSelector(getAppPerPage);
  const totalRows = useSelector(getTotalGists);
  const handlePageChange = (page: number) => {
    dispatch(setPage(page));
  }

  return (
    <div className="px-20">
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