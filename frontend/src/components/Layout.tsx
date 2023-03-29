import { Outlet } from 'react-router-dom';
import Navbar from './Navbar'

interface ILayoutProps {
  isAuthenticated: boolean;
}

function Layout({ isAuthenticated }: ILayoutProps) {
  return (
    <>
      <Navbar isAuthenticated={isAuthenticated} />
      <div className="overflow-auto h-[calc(100vh-var(--navbar-height))] top-[var(--navbar-height)] relative">
        <div className="relative mx-auto max-w-screen-2xl h-full">
          <div className="px-20 h-full">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  )
}

export default Layout