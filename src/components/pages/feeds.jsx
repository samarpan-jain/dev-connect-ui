import axios from "axios"
import { API_BASE_URL } from "../../utils/constants"
import { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { setFeeds, removeFeed } from "../../store/slices/feedSlice"
import ProfileCard from "../common/profileCard"
import { BsSendPlus } from "react-icons/bs";
import { TbSendOff } from "react-icons/tb";
import { toast } from "react-toastify"

const Feeds = () => {
    const [isDataFetched, setIsDataFetched] = useState(false);
    const loggedInUser = useSelector((state) => state.authUser);
    const allFeeds = useSelector((state)=> state.feeds); 
    const dispatch = useDispatch();

    const fetchFeeds = async () => {
        try{
            const feedsData = await axios.get(API_BASE_URL + 'users/feed', { withCredentials: true })
            dispatch(setFeeds(feedsData.data.data));
        }catch(err){
            console.error("Something went wrong, unable to fetch feeds: ", err);
            toast.error("Something went wrong, unable to fetch feeds");
        }
    }

    const handleSendConnectionReq = async(status, feed_id)=>{
        try{
            const response = await axios.post(API_BASE_URL+'connection-requests/send/'+status+'/'+feed_id, {}, {withCredentials:true});
            dispatch(removeFeed())
            toast.success(response.data.message);
        }catch(err){
            console.error("Something went wrong: ", err);
            toast.error("Something went wrong, unable to perform required action");
        }
    }

    useEffect(() => {
        if(allFeeds && allFeeds.length==0){
            setIsDataFetched(false);
        }
        if (loggedInUser && isDataFetched==false) {
            fetchFeeds();
            setIsDataFetched(true);
        }
    }, [allFeeds, loggedInUser])

    if(allFeeds && allFeeds.length==0){
        return <div role="alert" className="alert">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-info h-6 w-6 shrink-0">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            <span className="font-semibold">No feeds to show currently. You are all done for today.</span>
        </div>
    }

    return (
        allFeeds && allFeeds.length>0 && 
        <div>
            <h1 className="pb-4 text-center columns-6xl text-2xl font-semibold">Build your networks to achieve your vision</h1>
            <div className="carousel w-full py-4">
                <div className="carousel-item relative w-full flex flex-col sm:flex-row gap-8 items-center justify-center">
                    <button className="btn btn-circle w-20 h-20 p-4 bg-slate-100" title="Ignore Profile" onClick={()=>handleSendConnectionReq("ignored", allFeeds[0]._id)}>
                        <TbSendOff className="w-8 h-8" />
                    </button>
                    <div className="w-[95%] sm:w-[30%] overflow-x-auto">
                        <ProfileCard userData={{...allFeeds[0]}} />
                    </div>
                    <button className="btn btn-circle w-20 h-20 p-4 bg-slate-100" title="Send Request" onClick={()=>handleSendConnectionReq("interested", allFeeds[0]._id)}>
                        <BsSendPlus className="w-8 h-8" />
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Feeds