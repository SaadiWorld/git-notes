import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../store";
import { getClientId, getRedirectUri } from "../store/selectors/app";
import { getUserAvatar } from "../store/selectors/auth";
import { resetAuthData } from "../store/slices/auth";
import Avatar from "./Avatar";
import Search from "./Search";

interface INavbarProps{
  isAuthenticated: boolean;
}

function Navbar({isAuthenticated}: INavbarProps) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const avatarUrl =  useSelector(getUserAvatar);
  const client_id =  useSelector(getClientId);
  const redirect_uri =  useSelector(getRedirectUri);

  const handleLogout = () => {
    dispatch(resetAuthData());
    window.localStorage.clear();
    navigate('/');
  }

  return (
    <div className="fixed navbar bg-base-100 z-50 max-h-[var(--navbar-height)]">
      <div className="flex max-w-screen-2xl w-full m-auto justify-between">
        <div>
          <Link to='/' className="btn btn-ghost normal-case text-xl">E M U M B A</Link>
        </div>
        <div className="flex gap-2">
          <Search />
          { isAuthenticated ? 
            <div className="dropdown dropdown-end">
              <label tabIndex={0}>
                  <Avatar url={avatarUrl} />
              </label>
              <ul tabIndex={0} className="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52">
                <li>
                  <Link to='/my-gists' className="justify-between">
                    My Gists
                    {/* <span className="badge">New</span> */}
                  </Link>
                </li>
                <li>
                  <Link to='/starred-gists' className="justify-between">
                    Starred Gists
                  </Link>
                </li>
                <li>
                  <a className="justify-between">
                    Profile
                  </a>
                </li>
                <li onClick={handleLogout}><a>Logout</a></li>
              </ul>
            </div> :
            <div className="navbar-end">
              <Link to={`https://github.com/login/oauth/authorize?client_id=${client_id}&scope=gist&redirect_uri=${redirect_uri}`} className="btn">Login</Link>
            </div>
          }
        </div>
      </div>
    </div>
  )
}

export default Navbar