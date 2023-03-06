import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../store";
import { getGists } from "../store/selectors/app";
import { fetchGists } from "../store/thunks/app";

function HomePage() {
  const dispatch = useAppDispatch();
  const gists = useSelector(getGists)

  useEffect(() => {
    dispatch(fetchGists())  
  }, [])
  
  return (
    <>{gists?.map(gist => <div key={gist.id}>{gist.url}</div>)}</>
  )
}

export default HomePage