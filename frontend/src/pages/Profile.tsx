import { ClipboardDocumentIcon, UsersIcon } from "@heroicons/react/24/outline";
import { useSelector } from "react-redux"
import { Link } from "react-router-dom";
import Avatar from "../components/Avatar"
import { getName, getUserAvatar, getUserBio, getUserBlog, getUserCompany, getUserEmail, getUserLocation, getUserName, getUserTotalFollowers, getUserTotalFollowing, getUserTotalGistsCount, getUserTotalReposCount } from "../store/selectors/auth"

function Profile() {
  const name = useSelector(getName); 
  const username = useSelector(getUserName);
  const email = useSelector(getUserEmail);
  const avatar = useSelector(getUserAvatar);
  const company = useSelector(getUserCompany);
  const location = useSelector(getUserLocation);
  const bio = useSelector(getUserBio);
  const blog = useSelector(getUserBlog);
  
  const followerCount = useSelector(getUserTotalFollowers);
  const followingCount = useSelector(getUserTotalFollowing);
  const gistsCount = useSelector(getUserTotalGistsCount);
  const reposCount = useSelector(getUserTotalReposCount);

  return (
    <div className='h-full relative'>
      <div className="my-10 mx-10">
        <div className="flex">
          <div className="flex flex-[1] justify-center">
            <Avatar url={avatar} twWidth='w-[234px]' twHeight='h-[234px]' />
          </div>
          <div className="flex flex-[3] flex-col justify-start px-5">
            { name && <div className="text-2xl font-bold">{ name }</div> }
            { username && <div className="text-xl font-thin">{ username }</div> }
            { bio && <div className="my-3 text-base">{ bio }</div> }
            <div className="flex items-center"><UsersIcon className="h-5 w-5 mr-2" />{`${followerCount} followers · ${followingCount} following`}</div>
            <div className="flex items-center"><ClipboardDocumentIcon className="h-5 w-5 mr-2" />{`${gistsCount} gists · ${reposCount} repos`}</div>
            <div className="my-3">
              { company && <div className="">{ company }</div> }
              { location && <div className="">{ location }</div> }
              { email && <a href={`mailto:${email}`} className="block text-blue-800">{ email }</a> }
              { blog && <a href={blog} target='_blank' className="block text-blue-800">{ blog }</a> }
            </div>
            <div>
            <Link to='/my-gists' className="text-blue text-blue-800">View Gists</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile