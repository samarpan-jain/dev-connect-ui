import axios from "axios"
import UsersList from "../common/usersList"
import { API_BASE_URL } from "../../utils/constants"
import { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { allConnectionReqs, removeConnectionReq } from "../../store/slices/connectionReqsSlice"
import { incrementConnectionCount } from "../../store/slices/allConnectionsSlice"
import { toast, ToastContainer } from "react-toastify"

const ConnectionReqs = () => {
  const loggedInUser = useSelector((state)=>state.authUser);
  const connectionReqs = useSelector((state)=>state.connectionReqs.data)
  const dispatch = useDispatch();

  const handleConnectionReview = async(status, connId)=>{
    try{
      const response = await axios.post(API_BASE_URL+`connection-requests/review/${status}/${connId}`,{},{withCredentials:true});
      dispatch(removeConnectionReq(connId));
      if(status=='accepted'){
        dispatch(incrementConnectionCount());
      }
      toast.success(response.data.message)
    }
    catch(err){
      console.error(err);
      toast.error("Something went wrong!! Please try again later");
    }

  }

  const fetchConnectionReqReceived = async()=>{
    try{
      const requests = await axios.get(API_BASE_URL + "users/requests/received", {withCredentials:true});
      dispatch(allConnectionReqs(requests.data.data))
    }catch(err){
      console.error(err);
      toast.error("Something went wrong!! Please try again later");
    }
  }

  useEffect(()=>{
    if(loggedInUser){
      fetchConnectionReqReceived();
    }
  },[])

  return (
    <>
      <h1 className="pb-4 text-center columns-6xl text-2xl font-semibold">Review requests to build a strong network</h1>
      <div className="w-[90%] sm:w-[70%] mx-auto">
        {connectionReqs && <UsersList showReviewBtns={true} data={connectionReqs} infoKey={"fromUserDetails"} handleConnectionReview={handleConnectionReview}/>}
      </div>
      <ToastContainer/>
    </>
  )
}

export default ConnectionReqs