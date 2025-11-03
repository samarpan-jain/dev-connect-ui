const ProfileCard = ({ userData }) => {

    return (
        userData && <div className="card bg-gray-100 w-[100%] shadow-sm">
            <figure className="flex w-full md:h-1/2 lg:h-auto lg:w-[80%] m-auto pt-6 px-4">
                <img className="rounded-md"
                    src={userData.photoUrl ? userData.photoUrl : "src/assets/profileImg.jpg"}
                    alt="User Profile Pic" />
            </figure>
            <div className="card-body">
                <h2 className="card-title font-bold text-xl">
                    <span className="whitespace-wrap">{userData.name}{userData.age ? ', ' + userData.age + ' yrs' : null}</span>
                    {userData.gender && <p className="flex justify-end">{userData.gender}</p>}
                </h2>
                {userData.about && <p className="bg-blue-100 p-2 overflow-y-auto flex-wrap break-words rounded-md italic">{userData.about}</p>}
                {userData.skills && userData.skills.length > 0 && <h2 className="card-title font-bold text-md">
                    Skills
                </h2>}
                {userData.skills &&
                    userData.skills.length > 0 && <div className="card-actions flex justify-start gap-2 flex-wrap">
                        {userData.skills.map((skill, index) =>
                            <div key={index} className="border border-blue-500 rounded-md p-1">{skill}</div>
                        )}
                    </div>}
            </div>
        </div>
    );
}

export default ProfileCard