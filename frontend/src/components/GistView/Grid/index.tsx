import { useSelector } from "react-redux";
import { getGists } from "../../../store/selectors/app";
import Card from "./Card";
import { formatDistanceToNow } from "date-fns";
import { useNavigate } from "react-router-dom";

function Grid() {
  const navigate = useNavigate();
  const gists = useSelector(getGists);
  return (
    <div data-testid='grid-view' className="gap-5 lg:grid-cols-3 grid grid-cols-1 sm:grid-cols-2">
      { gists?.map(({id, owner: { avatar_url, login }, files, updated_at}) => (
        <div
          key={id}
          onClick={() => navigate(`/gist/${id}`)}
          className='cursor-pointer'
        >
          <Card
            id={id}
            avatar={avatar_url}
            ownerName={login}
            time={`${formatDistanceToNow(new Date(updated_at))} ago`}
            fileName={Object.keys(files).toString()}
          />
        </div>
      ))}
    </div>
  )
}

export default Grid