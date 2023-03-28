interface IAvatarProps {
  url: string;
  twWidth?: string;             // Width in tailwind format like w-12
  twHeight?: string;            // Height in tailwind format like h-12
}

function Avatar({ url, twWidth = 'w-10', twHeight= 'h-10' }: IAvatarProps) {
  return (
    <div className="avatar items-center">
      <div className={`${twWidth} ${twHeight} rounded-full`}>
        <img src={url} alt="avatar" />
      </div>
    </div>
  )
}

export default Avatar