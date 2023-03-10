import { BarsArrowUpIcon, PencilSquareIcon, StarIcon, TrashIcon } from "@heroicons/react/24/outline";
import { getSelectedGistId, getSelectedGistUserName, getIsStarredGist } from "../../store/selectors/app";
import { useSelector } from "react-redux";
import { getIsAuthenticated, getUserName } from "../../store/selectors/auth";
import { useEffect } from "react";
import { useAppDispatch } from "../../store";
import { checkStarStatus } from "../../store/thunks/app";
import Star from "./Star";

// interface IStarForkProps {
//   variant: GIST_ACTIONS;
//   isChecked?: boolean;
// }

function GistAction() {
  // const dispatch = useAppDispatch()
  // const selectedGistId = useSelector(getSelectedGistId);
  const isAuthenticated = useSelector(getIsAuthenticated);
  const userName = useSelector(getUserName);
  const gistOwnerName = useSelector(getSelectedGistUserName);

  return (
    <>
      {isAuthenticated && (
        <>
          {userName === gistOwnerName ? (
            <>
              <PencilSquareIcon className="cursor-pointer" height={20} width={20} />
              <TrashIcon className="cursor-pointer ml-2" height={20} width={20} />
            </>
          ) : (
            <>
              <Star />
              <BarsArrowUpIcon className="cursor-pointer ml-2" height={20} width={20} />
            </>
          )
          }
        </>
      )}
    </>
  )
}

export default GistAction