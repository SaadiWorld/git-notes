import { BarsArrowUpIcon } from "@heroicons/react/24/outline";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../store";
import { getForkedGistId, getForksList, getSelectedGistId } from "../../store/selectors/app";
import { getUserName } from "../../store/selectors/auth";
import { forkGist } from "../../store/thunks/app";
import { IFork } from "../../store/types/app";

function Fork() {
  const dispatch = useAppDispatch()
  const navigate = useNavigate();
  const userName = useSelector(getUserName);
  const selectedGistId = useSelector(getSelectedGistId);
  const forkedGistId = useSelector(getForkedGistId); // The id of new gist created after forking
  const forksList = useSelector(getForksList); // Array of those gists which were forks of the original one

  const isAlreadyForked = forksList.find((fork: IFork) => fork.user.login === userName)

  const handleGistFork = () => {
    selectedGistId && dispatch(forkGist(selectedGistId))
  }
  
  useEffect(() => {
    forkedGistId && navigate(`/gist/${forkedGistId}`);
  }, [forkedGistId])
  
  return (
    <>
      { !isAlreadyForked && <BarsArrowUpIcon className="cursor-pointer ml-2" height={20} width={20} onClick={handleGistFork} /> }
    </>
  )
}

export default Fork