import Avatar from './Avatar';


interface IGistDetailProps {
  fileName: string;
  avatar: string;
  ownerName: string;
  time: string;
}

function GistDetail({fileName, avatar, ownerName, time}: IGistDetailProps) {
  return (
    <div className="p-4 flex">
      <Avatar url={avatar} />
      <div className="pl-2 grid">
        <p className=" overflow-hidden text-ellipsis whitespace-nowrap">{ownerName} / <strong>{fileName}</strong></p>
        <p>{time}</p>
      </div>
    </div>
  )
}

export default GistDetail

