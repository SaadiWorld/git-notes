import { StarIcon } from "@heroicons/react/24/outline";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../../store";
import { getIsStarredGist, getSelectedGistId } from "../../store/selectors/app";
import { checkStarStatus, starGist } from "../../store/thunks/app";

function Star() {
  const dispatch = useAppDispatch()
  const selectedGistId = useSelector(getSelectedGistId);
  const isStarred = useSelector(getIsStarredGist)

  const handleGistStar = () => {
    if (isStarred) {
      selectedGistId && dispatch(starGist({ selectedGistId, shouldStarGist: false }));
    } else {
      selectedGistId && dispatch(starGist({ selectedGistId, shouldStarGist: true }));
    }
  }
  
  useEffect(() => {
    selectedGistId && dispatch(checkStarStatus(selectedGistId))
  }, [selectedGistId])
  
  return (
    <StarIcon className={`cursor-pointer ${isStarred ? 'text-yellow-400 fill-yellow-400' : ''}`} height={20} width={20} onClick={handleGistStar}/>
  )
}

export default Star