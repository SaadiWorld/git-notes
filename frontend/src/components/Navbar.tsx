import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useAppDispatch } from "../store";
import { getClientId, getRedirectUri } from "../store/selectors/app";
import { resetAuthData } from "../store/slices/auth";

interface INavbarProps{
  isAuthenticated: boolean;
}

function Navbar({isAuthenticated}: INavbarProps) {
  const dispatch = useAppDispatch();
  const client_id =  useSelector(getClientId);
  const redirect_uri =  useSelector(getRedirectUri);

  const handleLogout = () => {
    dispatch(resetAuthData());
    window.localStorage.clear();
  }

  return (
    <div className="navbar bg-base-100">
      <div className="flex-1">
        <a className="btn btn-ghost normal-case text-xl">EMUMBA</a>
      </div>
      <div className="flex-none gap-2">
        <div className="form-control">
          <input type="text" placeholder="Search" className="input input-bordered" />
        </div>
        { isAuthenticated ? 
            <div className="dropdown dropdown-end">
              <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                <div className="w-10 rounded-full">
                  <img src="/images/stock/photo-1534528741775-53994a69daeb.jpg" />
                </div>
              </label>
              <ul tabIndex={0} className="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52">
                <li>
                  <a className="justify-between">
                    Profile
                    <span className="badge">New</span>
                  </a>
                </li>
                <li><a>Settings</a></li>
                <li onClick={handleLogout}><a>Logout</a></li>
              </ul>
            </div> :
            <div className="navbar-end">
              <Link to={`https://github.com/login/oauth/authorize?client_id=${client_id}&redirect_uri=${redirect_uri}`} className="btn">Login</Link>
            </div>
        }
      </div>
    </div>
  )
}

export default Navbar