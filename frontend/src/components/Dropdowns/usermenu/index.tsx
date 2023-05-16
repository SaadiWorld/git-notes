import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../../store';
import { getUserAvatar } from '../../../store/selectors/auth';
import { resetAuthData } from '../../../store/slices/auth';
import Avatar from '../../Avatar';

function UserMenu() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const avatarUrl =  useSelector(getUserAvatar);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const handleLogout = () => {
    dispatch(resetAuthData());
    window.localStorage.clear();
    navigate('/');
    setMenuOpen(false);
  }

  const handleClick = (e: React.MouseEvent) => {
    setMenuOpen(false);
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  }

  const handleClickOutside = (e: any) => {
    if (menuRef && menuRef.current && !menuRef.current.contains(e.target)) {
      setMenuOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <div data-testid="user-menu" className="dropdown dropdown-end" ref={menuRef}>
      <label tabIndex={0} data-testid="nav-avatar" className="cursor-pointer" onClick={toggleMenu} onKeyUp={toggleMenu}>
        <Avatar url={avatarUrl} />
      </label>
      {menuOpen && (
        <ul tabIndex={0} data-testid="user-menu-body" className="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52">
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
          <li>
            <Link to='/' className="justify-between" onClick={handleLogout}>
              Logout
            </Link>
          </li>
        </ul>
      )}
    </div>
  )
}

export default UserMenu