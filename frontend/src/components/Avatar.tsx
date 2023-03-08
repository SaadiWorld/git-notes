interface IAvatarProps {
  url: string;
}

function Avatar({ url }: IAvatarProps) {
  return (
    <div className="btn btn-ghost btn-circle avatar">
      <div className="w-10 rounded-full">
        <img src={url} />
      </div>
    </div>
  )
}

export default Avatar