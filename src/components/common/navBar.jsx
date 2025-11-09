import { NavLink, Outlet } from "react-router-dom"
import { RiUserCommunityLine } from "react-icons/ri";
import { ConnectionReqIcon, HomeIcon } from "./svgIcon";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import axios from "axios";
import { API_BASE_URL } from "../../utils/constants";
import { setConnectionReqCount } from "../../store/slices/connectionReqsSlice";
import { setConnectionCount } from "../../store/slices/allConnectionsSlice";

const NavBar = () => {
    const connectionCount = useSelector((state) => state.allConnectionsList.connectionCount);
    const connectionReqCount = useSelector((state) => state.connectionReqs.connectionReqCount);
    const dispatch = useDispatch();

    const fetchConnWithReqCount = async () => {
        try {
            const countData = (await axios.get(API_BASE_URL + 'users/connectionWithReqsCount', { withCredentials: true })).data;
            dispatch(setConnectionReqCount(countData.data.connectionReqsCount));
            dispatch(setConnectionCount(countData.data.connectionCount));
        }
        catch (err) {
            console.log("Error in fetching the counts")
        }
    }

    useEffect(() => {
        fetchConnWithReqCount()
    }, [])

    return (
        <div className="drawer drawer-open">
            <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content p-5">
                <Outlet />
            </div>

            <div className="drawer-side is-drawer-close:overflow-visible">
                <label htmlFor="my-drawer-4" aria-label="close sidebar" className="drawer-overlay"></label>
                <div className="is-drawer-close:w-14 is-drawer-open:w-64 bg-blue-200 flex flex-col items-start min-h-full">
                    {/* Sidebar content here */}
                    <ul className="menu w-full grow py-2 flex flex-col">

                        {/* list item */}
                        <li className="pt-2 font-semibold text-blue-900">
                            <NavLink to={'/feed'} title="Feeds" className={({ isActive }) => (isActive ? 'active-nav-link' : '')}>
                                <HomeIcon />
                            </NavLink>
                        </li>

                        {/* list item */}
                        <li className="pt-2 font-semibold text-blue-900">
                            <NavLink to={'/networks'} title="Networks" className={({ isActive }) => (isActive ? 'active-nav-link' : '') + ' text-2xl'}>
                                <div className="indicator">
                                    <span className="indicator-item badge badge-soft badge-primary badge-xs">{(connectionCount==0 || connectionCount<100)? connectionCount:"99+"}</span>
                                    <RiUserCommunityLine />
                                </div>
                            </NavLink>
                        </li>

                        <li className="pt-2 font-semibold text-blue-900">
                            <NavLink to={'/requests'} title="Requests" className={({ isActive }) => (isActive ? 'active-nav-link' : '')}>
                                <div className="indicator">
                                    <span className="indicator-item badge badge-soft badge-secondary badge-xs">{(connectionReqCount==0 || connectionReqCount<100)? connectionReqCount:"99+"}</span>
                                    <ConnectionReqIcon />
                                </div>
                            </NavLink>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default NavBar