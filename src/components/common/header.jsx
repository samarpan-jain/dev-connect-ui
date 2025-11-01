import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { removeAuthUser } from "../../store/slices/authUserSlice.jsx";
import { API_BASE_URL } from "../../utils/constants.js";

function Header() {
    const loggedInUser = useSelector((state) => state.authUser);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const isAuthorized = useSelector((state) => state.authUser && Object.keys(state.authUser).length > 0);

    const handleLogout = async () => {
        try {
            await axios.post(API_BASE_URL + 'auth/logout', {}, { withCredentials: true });
            dispatch(removeAuthUser());
            navigate("/login", { replace: true });
        }
        catch (err) {
            console.error(err);
        }
    }

    return <div className="navbar bg-base-100 shadow-sm z-10 bg-blue-100 px-6">
        <div className="flex-1">
            <Link to='/' className="btn btn-ghost text-xl text-blue-800 font-bold">&lt;DevConnect /&gt;</Link>
        </div>
        <div className="flex gap-2">
            <div className="dropdown dropdown-end">
                {isAuthorized && <div className="flex flex-row gap-2">
                    <p className="py-2 font-semibold text-blue-900">Hi,&nbsp;{loggedInUser && loggedInUser.name ? loggedInUser.name : "User"}</p>
                    <div tabIndex={0} role="button" className="btn btn-ghost btn-circle rounded-full">
                        <div className="w-10 h-10 rounded-full object-contain">
                            <img className="rounded-full h-full"
                                alt="Navbar component"
                                src={loggedInUser && loggedInUser.photoUrl ? loggedInUser.photoUrl : "src/assets/profileImg.jpg"} />
                        </div>
                    </div>
                </div>}
                {isAuthorized && <ul
                    tabIndex="-1"
                    className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                    <li className="px-2 cursor-pointer hover:bg-gray-200 rounded-md" onClick={() => navigate("/profile")}>
                        Profile
                    </li>
                    <li className="px-2 cursor-pointer hover:bg-gray-200 rounded-md" onClick={handleLogout}>
                        Logout
                    </li>
                </ul>}
            </div>
        </div>
    </div>
}

export default Header;