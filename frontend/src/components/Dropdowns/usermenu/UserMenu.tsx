import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../../store';
import { getUserAvatar } from '../../../store/selectors/auth';
import { resetAuthData } from '../../../store/slices/auth';
import Avatar from '../../Avatar';

function NavUserMenu() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const avatarUrl =  useSelector(getUserAvatar);

  const handleLogout = () => {
    dispatch(resetAuthData());
    window.localStorage.clear();
    navigate('/');
  }

  const handleClick = () => {
    const element = document.activeElement;
    if (element instanceof HTMLElement){
      element.blur();
    }
  };

  return (
    <div data-testid="nav-avatar" className="dropdown dropdown-end">
      <label tabIndex={0} className='cursor-pointer'>
        <Avatar url={avatarUrl} />
      </label>
      <ul tabIndex={0} className="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52">
        <li>
          <Link to='/create-gist' className="justify-between" onClick={handleClick}>
            Create Gist
            {/* <span className="badge">New</span> */}
          </Link>
        </li>
        <li>
          <Link to='/my-gists' className="justify-between" onClick={handleClick}>
            My Gists
            {/* <span className="badge">New</span> */}
          </Link>
        </li>
        <li>
          <Link to='/starred-gists' className="justify-between" onClick={handleClick}>
            Starred Gists
          </Link>
        </li>
        <li>
          <Link to='/profile' className="justify-between" onClick={handleClick}>
            Profile
          </Link>
        </li>
        <li onClick={handleLogout}><a>Logout</a></li>
      </ul>
    </div>
  )
}

export default NavUserMenu