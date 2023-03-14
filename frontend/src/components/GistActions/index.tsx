import { PencilSquareIcon } from "@heroicons/react/24/outline";
import { getSelectedGistId, getSelectedGistUserName } from "../../store/selectors/app";
import { useSelector } from "react-redux";
import { getIsAuthenticated, getUserName } from "../../store/selectors/auth";
import Star from "./Star";
import Fork from "./Fork";
import { useNavigate } from "react-router-dom";
import Delete from "./Delete";

// interface IStarForkProps {
//   variant: GIST_ACTIONS;
//   isChecked?: boolean;
// }

function GistAction() {
  const navigate = useNavigate();
  const isAuthenticated = useSelector(getIsAuthenticated);
  const userName = useSelector(getUserName);
  const gistOwnerName = useSelector(getSelectedGistUserName);
  const id = useSelector(getSelectedGistId);

  return (
    <>
      {isAuthenticated && (
        <>
          {userName === gistOwnerName ? (
            <>
              <PencilSquareIcon className="cursor-pointer" height={20} width={20} onClick={() => navigate(`/edit-gist/${id}`)} />
              <Delete />
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