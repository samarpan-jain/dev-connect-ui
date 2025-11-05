import UsersList from "../common/usersList"
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setAllConnectionList } from "../../store/slices/allConnectionsSlice";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { API_BASE_URL } from "../../utils/constants";

const Networks = () => {
  const loggedInUser = useSelector((state) => state.authUser);
  const connections = useSelector((state) => state.allConnectionsList.data)
  const dispatch = useDispatch();

  const fetchAllConnections = async () => {
    try {
      const requests = await axios.get(API_BASE_URL + "users/requests/connections", { withCredentials: true });
      dispatch(setAllConnectionList(requests.data.data))
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong!! Please try again later");
    }
  }

  useEffect(() => {
    if (loggedInUser) {
      fetchAllConnections();
    }
  }, [])

  return (
    <>
      <h1 className="pb-4 text-center columns-6xl text-2xl font-semibold">Explore your strong network</h1>
      <div className="w-[90%] sm:w-[60%] mx-auto">
        {connections && <UsersList showReviewBtns={false} data={connections}/>}
      </div>
      <ToastContainer/>
    </>
  )
}

export default Networks