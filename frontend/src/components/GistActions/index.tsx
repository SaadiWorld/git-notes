import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";
import { getSelectedGistUserName } from "../../store/selectors/app";
import { useSelector } from "react-redux";
import { getIsAuthenticated, getUserName } from "../../store/selectors/auth";
import { useEffect } from "react";
import { useAppDispatch } from "../../store";
import Star from "./Star";
import Fork from "./Fork";

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
              <Fork />
            </>
          )
          }
        </>
      )}
    </>
  )
}

export default GistAction