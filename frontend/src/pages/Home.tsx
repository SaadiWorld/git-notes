import { useEffect } from "react";
import { useSelector } from "react-redux";
import GistView from "../components/GistView";
import { useAppDispatch } from "../store";
import { getAppPage, getGistView } from "../store/selectors/app";
import { fetchGists } from "../store/thunks/app";
import { GIST_TYPE } from "../types/common";

function HomePage() {
  const dispatch = useAppDispatch();
  const gistView = useSelector(getGistView);
  const page = useSelector(getAppPage);

  useEffect(() => {
    dispatch(fetchGists({ gistType: GIST_TYPE.PUBLIC, page }))  
  }, [page])
  
  return (
    <GistView type={gistView} />
  )
}

export default HomePage