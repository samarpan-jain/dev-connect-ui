import { TbCircleCheck } from "react-icons/tb";
import { RxCrossCircled } from "react-icons/rx";

const UsersList = ({ showReviewBtns = false, data, infoKey, uniqueKey = "_id", handleConnectionReview = (status, connId) => { } }) => {
    return (
        <ul className="list bg-gray-100 rounded-box shadow-md">
            <li className="p-4 pb-2 text-xs opacity-60 tracking-wide font-semibold">Networking is oil to progress; make your networks wisely</li>

            {(!data || data.length == 0) && <li className="list-row bg-white m-4 mt-2 flex flex-col">
                <h4 className="text-center font-semibold text-slate-600 columns-6xl">
                    No data found. Wait for sometime till then update your profile and make it stronger.
                </h4>
            </li>
            }
            {data && data.length > 0 && data.map((record) => {
                const listData = infoKey ? record[infoKey] : record;
                return <li key={record[uniqueKey]} className="list-row bg-white m-4 mt-2">
                    {listData && listData.photoUrl && <div><img className="size-10 rounded-box" src={listData.photoUrl} alt="Profile Pic" /></div>}
                    <div>
                        <div className="font-semibold">{listData.name}</div>
                        <div className="text-xs uppercase font-semibold opacity-60">{listData && listData.age ? listData.age + ',' : null} {listData.gender}</div>
                    </div>
                    <div className="list-col-wrap text-xs">
                        <p className="italic">{listData.about}</p>
                        {listData.skills && listData.skills.length > 0 && 
                        <div className="card-actions flex justify-start gap-2 flex-wrap">
                            {listData.skills.map((skill, index) =>
                                <div key={index} className="border border-blue-500 rounded-md p-1 mt-4">{skill}</div>
                            )}
                        </div>}
                    </div>
                    {showReviewBtns && (
                        <div className="border-l-2">
                            <button className="btn btn-square btn-ghost text-green-600 hover:bg-slate-100 text-2xl" title="Accept Request" onClick={() => handleConnectionReview('accepted', record[uniqueKey])}>
                                <TbCircleCheck />
                            </button>
                            <button className="btn btn-square btn-ghost text-red-600 hover:bg-slate-100 text-2xl" title="Reject Request" onClick={() => handleConnectionReview('rejected', record[uniqueKey])}>
                                <RxCrossCircled />
                            </button>
                        </div>
                    )}
                </li>
            })}
        </ul>
    )
}

export default UsersList