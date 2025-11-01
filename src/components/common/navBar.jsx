import { Link, NavLink, Outlet } from "react-router-dom"
import { MdOutlinePeopleAlt } from "react-icons/md";

const NavBar = () => {
  return (
      <div className="drawer drawer-open">
          <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
          <div className="drawer-content p-5">
              <Outlet/>
          </div>

          <div className="drawer-side is-drawer-close:overflow-visible">
              <label htmlFor="my-drawer-4" aria-label="close sidebar" className="drawer-overlay"></label>
              <div className="is-drawer-close:w-14 is-drawer-open:w-64 bg-blue-200 flex flex-col items-start min-h-full">
                  {/* Sidebar content here */}
                  <ul className="menu w-full grow py-2 flex flex-col">

                      {/* list item */}
                      <li className="pt-2 font-semibold text-blue-900">
                          <NavLink to={'/feed'} title="Feeds" className={({ isActive }) => (isActive ? 'active-nav-link' : '')}>
                              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor" className="inline-block size-5 my-1.5"><path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"></path><path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path></svg>
                          </NavLink>
                      </li>

                      {/* list item */}
                      <li className="pt-2 font-semibold text-blue-900">
                          <NavLink to={'/networks'} title="Networks" className={({ isActive }) => (isActive ? 'active-nav-link' : '') + ' text-2xl'}>
                              <MdOutlinePeopleAlt/>
                          </NavLink>
                      </li>

                      <li className="pt-2 font-semibold text-blue-900">
                          <NavLink to={'/requests'} title="Requests" className={({ isActive }) => (isActive ? 'active-nav-link' : '')}>
                              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor" className="inline-block size-5 my-1.5"><path d="M20 7h-9"></path><path d="M14 17H5"></path><circle cx="17" cy="17" r="3"></circle><circle cx="7" cy="7" r="3"></circle></svg>
                          </NavLink>
                      </li>
                  </ul>
              </div>
          </div>
      </div>
  )
}

export default NavBar