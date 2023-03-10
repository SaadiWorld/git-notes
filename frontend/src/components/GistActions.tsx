import { GIST_ACTIONS } from "../types/common";
import { BarsArrowUpIcon, PencilSquareIcon, StarIcon, TrashIcon } from "@heroicons/react/24/outline";
import { getSelectedGist, getSelectedGistUserName } from "../store/selectors/app";
import { useSelector } from "react-redux";
import { getIsAuthenticated, getUserName } from "../store/selectors/auth";

// interface IStarForkProps {
//   variant: GIST_ACTIONS;
//   isChecked?: boolean;
// }

function GistAction() {
  const selectedGist = useSelector(getSelectedGist);
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
              <StarIcon className="cursor-pointer" height={20} width={20} />
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