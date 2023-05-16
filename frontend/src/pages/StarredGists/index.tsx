import { useEffect } from "react";
import GistView from "../../components/GistView";
import { useAppDispatch } from "../../store";
import { fetchGists } from "../../store/thunks/app";
import { GIST_TYPE } from "../../types/common";

function StarredGistsPage() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchGists({ gistType: GIST_TYPE.STARRED }))  
  }, [])

  return (
    <GistView />
  )
}

export default StarredGistsPage