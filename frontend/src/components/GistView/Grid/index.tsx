import { useSelector } from "react-redux";
import { getGists } from "../../../store/selectors/app";
import Card from "./Card";
import { formatDistanceToNow } from "date-fns";
import { useNavigate } from "react-router-dom";

function Grid() {
  const navigate = useNavigate();
  const gists = useSelector(getGists);
  return (
    <div className="gap-5 lg:grid-cols-3 grid grid-cols-1 sm:grid-cols-2">
      { gists?.map(gist=> (
        <div
          key={gist.id}
          onClick={() => navigate(`/gist/${gist.id}`)}
          className='cursor-pointer'
        >
          <Card
            id={gist.id}
            avatar={gist.owner.avatar_url}
            ownerName={gist.owner.login}
            time={`${formatDistanceToNow(new Date(gist.updated_at))} ago`}
            fileName={Object.keys(gist.files).toString()}
          />
        </div>
      ))}
    </div>
  )
}

export default Grid