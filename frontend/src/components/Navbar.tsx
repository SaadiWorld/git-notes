import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getClientId, getRedirectUri } from "../store/selectors/app";
import NavUserMenu from "./Dropdowns/NavUserMenu";
import Search from "./Search";

interface INavbarProps {
  isAuthenticated: boolean;
}

function Navbar({ isAuthenticated }: INavbarProps) {
  const client_id = useSelector(getClientId);
  const redirect_uri = useSelector(getRedirectUri);

  return (
    <div className="fixed navbar bg-base-100 z-50 max-h-[var(--navbar-height)]">
      <div className="flex max-w-screen-2xl w-full m-auto justify-between">
        <div>
          <Link to='/' className="btn btn-ghost normal-case text-xl">E M U M B A</Link>
        </div>
        <div className="flex gap-2 items-end">
          <Search />
          {isAuthenticated ?
            <NavUserMenu /> :
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