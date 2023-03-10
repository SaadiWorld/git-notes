import { formatDistanceToNow } from "date-fns";
import { useEffect, useState } from "react";
import Gist from "react-gist";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import GistActions from "../components/GistActions";
import GistDetail from "../components/GistDetail";
import Loader from "../components/Loader";
import { useAppDispatch } from "../store";
import { getAppMessage, getIsAppError, getIsAppLoading, getSelectedGist } from "../store/selectors/app";
import { fetchSingleGist } from "../store/thunks/app";

function GistPage() {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const selectedGist = useSelector(getSelectedGist);
  const isAppLoading = useSelector(getIsAppLoading);
  const isAppError = useSelector(getIsAppError);
  const appMessage = useSelector(getAppMessage);
  const [isValidGist, setIsValidGist] = useState(false)

  useEffect(() => {
    setIsValidGist(false)
    id && dispatch(fetchSingleGist(id))
  }, [id])

  useEffect(() => {
    if (selectedGist && selectedGist.id === id && !isAppError) setIsValidGist(true);
    else setIsValidGist(false);
  }, [selectedGist])
  
  return (
    <div className="h-full"> 
      { isAppLoading ? 
        <Loader /> :
        isValidGist ?
        <>
          <div className="flex justify-between items-center">
            <GistDetail
              avatar={selectedGist.owner.avatar_url}
              ownerName={selectedGist.owner.login}
              time={`${formatDistanceToNow(new Date(selectedGist.updated_at))} ago`}
              fileName={Object.keys(selectedGist.files).join(', ')}
            />
            <div className="flex">
              <GistActions />
            </div>
          </div>
          <Gist id={`${id}`} />
        </> :
        <div className="flex h-10 justify-center items-center">{appMessage}</div>
      }
    </div>
  )
}

export default GistPage