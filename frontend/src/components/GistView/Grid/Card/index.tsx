import Gist from "react-gist"
import GistDetail from "../../../GistDetail";

interface ICardProps {
  id: number | string;
  fileName: string;
  avatar: string;
  ownerName: string;
  time: string;
}

function Card({ id, fileName, avatar, ownerName, time }: ICardProps) {
  return (
    <div data-testid="gist-card" className="card card-compact w-full bg-base-100 shadow-xl mb-4">
      <Gist id={`${id}`} />
      <GistDetail fileName={fileName} avatar={avatar} ownerName={ownerName} time={time} />
    </div>
  )
}

export default Card