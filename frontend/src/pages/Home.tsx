import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../store";
import { getAppPage, getGistView } from "../store/selectors/app";
import { getToken } from "../store/selectors/auth";
import { fetchGists } from "../store/thunks/app";
import { GIST_TYPE, GIST_VIEW } from "../types/common";
import { setGistView } from "../store/slices/app";
import GistView from "../components/GistView";

function HomePage() {
  const dispatch = useAppDispatch();
  const gistView = useSelector(getGistView);
  const token = useSelector(getToken) || window.localStorage.getItem('token');
  const page = useSelector(getAppPage);

  useEffect(() => {
    dispatch(fetchGists({ gistType: GIST_TYPE.PUBLIC, page }))  
  }, [token, page])

  const gistViewChangeHandler = (view: GIST_VIEW) => dispatch(setGistView(view));
  
  return (
    <GistView type={gistView} />
  )
}

export default HomePage