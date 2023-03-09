import { useEffect } from "react";
import { useParams } from "react-router-dom"
import { useAppDispatch } from "../store";
import { fetchSingleGist } from "../store/thunks/app";

function Gist() {
  const { id } = useParams();
  const dispatch = useAppDispatch();

  useEffect(() => {
    id && dispatch(fetchSingleGist(id))
  }, [])
  

  return (
    <div>Gist</div>
  )
}

export default Gist