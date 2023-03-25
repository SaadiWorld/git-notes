import { TrashIcon } from "@heroicons/react/24/outline";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../store";
import { getSelectedGistId } from "../../store/selectors/app";
import { deleteGist } from "../../store/thunks/app";
import Modal from "../Modals/generic/GenericModal";

function Delete() {
  const dispatch = useAppDispatch()
  const navigate = useNavigate();
  const selectedGistId = useSelector(getSelectedGistId);

  const handleDelete = () => {
    selectedGistId && dispatch(deleteGist(selectedGistId)).then(()=> navigate('/my-gists'))
  }
  
  return (
    <>
    <label htmlFor="generic-modal">
      <TrashIcon className="cursor-pointer ml-2" height={20} width={20} />
    </label>
    <Modal title='Delete Gist' subtitle='Are you sure you want to delete this gist?' onClick={handleDelete} />
    </>
  )
}

export default Delete