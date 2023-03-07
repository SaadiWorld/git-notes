import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../store";
import { getGists } from "../store/selectors/app";
import { getToken } from "../store/selectors/auth";
import { fetchGists } from "../store/thunks/app";
import { GIST_TYPE } from "../types/coomon";

function HomePage() {
  const dispatch = useAppDispatch();
  const gists = useSelector(getGists);
  const token = useSelector(getToken)

  useEffect(() => {
    dispatch(fetchGists(GIST_TYPE.PUBLIC))  
  }, [token])
  
  return (
    <>{gists?.map(gist => <div key={gist.id}>{gist.url}</div>)}</>
  )
}

export default HomePage