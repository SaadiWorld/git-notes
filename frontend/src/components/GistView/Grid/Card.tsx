import Gist from "react-gist"
import Avatar from "../../Avatar";

interface ICardProps {
  id: number;
  fileName: string;
  avatar: string;
  ownerName: string;
  time: string;
}

function Card({id, fileName, avatar, ownerName, time}: ICardProps) {
  console.log({id, fileName, avatar, time})
  return (
    <div className="card card-compact w-full bg-base-100 shadow-xl mb-4">
      <Gist id={`${id}`} />
      <div className="p-4 flex">
        <Avatar url={avatar} />
        <div className="pl-2 grid">
          <p className=" overflow-hidden text-ellipsis whitespace-nowrap">{ownerName} / <strong>{fileName}</strong></p>
          <p>{time}</p>
        </div>
      </div>
    </div>
  )
}

export default Card