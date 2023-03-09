import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { useAppDispatch } from "../store";
import { fetchSingleGist } from "../store/thunks/app";
import Gist from "react-gist";
import { useSelector } from "react-redux";
import { getIsAppError, getIsAppLoading, getSelectedGist } from "../store/selectors/app";
import Loader from "../components/Loader";

function GistPage() {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const selectedGist = useSelector(getSelectedGist);
  const isAppLoading = useSelector(getIsAppLoading);
  const isAppError = useSelector(getIsAppError);
  const [isValidGist, setIsValidGist] = useState(false)

  useEffect(() => {
    id && dispatch(fetchSingleGist(id))
  }, [id])

  useEffect(() => {
    if (selectedGist && selectedGist.id === id && !isAppError) setIsValidGist(true);
  }, [selectedGist])
  
  return (
    <div className="h-full"> 
      { isAppLoading ? 
        <Loader /> :
        isValidGist ?
        <Gist id={`${id}`} /> :
        <div className="flex h-10 justify-center items-center">'No Gist found!'</div>
      }
    </div>
  )
}

export default GistPage