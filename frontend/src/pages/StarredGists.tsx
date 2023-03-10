import { useEffect } from "react";
import { useSelector } from "react-redux";
import GistView from "../components/GistView";
import { useAppDispatch } from "../store";
import { getGistView } from "../store/selectors/app";
import { fetchGists } from "../store/thunks/app";
import { GIST_TYPE } from "../types/common";

function StarredGistsPage() {
  const dispatch = useAppDispatch();
  const gistView = useSelector(getGistView);

  useEffect(() => {
    dispatch(fetchGists({ gistType: GIST_TYPE.STARRED }))  
  }, [])

  return (
    <GistView type={gistView} />
  )
}

export default StarredGistsPage