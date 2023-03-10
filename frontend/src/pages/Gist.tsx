import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { useAppDispatch } from "../store";
import { fetchSingleGist } from "../store/thunks/app";
import Gist from "react-gist";
import { useSelector } from "react-redux";
import { getIsAppError, getIsAppLoading, getAppMessage, getSelectedGist } from "../store/selectors/app";
import Loader from "../components/Loader";
import GistDetail from "../components/GistDetail";
import { formatDistanceToNow } from "date-fns";
import StarFork from "../components/StarFork";
import { GIST_UPDATE_ACTIONS } from "../types/common";

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
              <StarFork variant={GIST_UPDATE_ACTIONS.STAR} />
              <StarFork variant={GIST_UPDATE_ACTIONS.FORK} />
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