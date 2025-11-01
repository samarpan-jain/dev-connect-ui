import { TbCircleCheck } from "react-icons/tb";
import { RxCrossCircled } from "react-icons/rx";
import { Fragment } from "react";

const UsersList = ({ showReviewBtns = false, data, infoKey, uniqueKey="_id", handleConnectionReview=(status, connId)=>{} }) => {
    return (
        <ul className="list bg-gray-100 rounded-box shadow-md">
            <li className="p-4 pb-2 text-xs opacity-60 tracking-wide font-semibold">Networking is oil to progress; make your networks wisely</li>

            <li className="list-row bg-white m-4 mt-2">
                {(!data || data.length == 0) && <h4 className="text-center font-semibold text-slate-600 columns-6xl">
                    No data found. Wait for sometime till then update and your profile strong.
                </h4>
                }
                {data && data.length > 0 && data.map((record)=>{
                    const listData = infoKey? record[infoKey] : record;
                    return <Fragment key={record[uniqueKey]}>
                        {listData && listData.photoUrl && <div><img className="size-10 rounded-box" src={listData.photoUrl} alt="Profile Pic" /></div>}
                        <div>
                            <div className="font-semibold">{listData.name}</div>
                            <div className="text-xs uppercase font-semibold opacity-60">{listData && listData.age ? listData.age + ',' : null} {listData.gender}</div>
                        </div>
                        <p className="list-col-wrap text-xs italic">
                            {listData.about}
                        </p>
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
                    </Fragment>})}
            </li>
        </ul>
    )
}

export default UsersList