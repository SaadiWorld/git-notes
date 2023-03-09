import { useEffect } from "react";
import { useParams } from "react-router-dom"
import { useAppDispatch } from "../store";
import { resetSelectedGist } from "../store/slices/app";
import { fetchSingleGist } from "../store/thunks/app";
import Gist from "react-gist";

function GistPage() {
  const { id } = useParams();
  const dispatch = useAppDispatch();

  useEffect(() => {
    id && dispatch(fetchSingleGist(id))
  
    return () => {
      dispatch(resetSelectedGist())
    }
  }, [])

  return (
    <div className="h-full">    
      <Gist id={`${id}`} />
    </div>
  )
}

export default GistPage