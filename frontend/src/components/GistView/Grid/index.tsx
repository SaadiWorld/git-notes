import { useSelector } from "react-redux";
import { getGists } from "../../../store/selectors/app";
import Card from "./Card";
import { formatDistanceToNow } from "date-fns";

function Grid() {
  const gists = useSelector(getGists);
  return (
    <div className="gap-5 lg:grid-cols-3 grid grid-cols-1 sm:grid-cols-2">
      { gists?.map(gist=> (
        <Card
          key={gist.id}
          id={gist.id}
          avatar={gist.owner.avatar_url}
          ownerName={gist.owner.login}
          time={formatDistanceToNow(new Date(gist.updated_at))}
          fileName={Object.keys(gist.files).toString()}
        />
      ))}
    </div>
  )
}

export default Grid