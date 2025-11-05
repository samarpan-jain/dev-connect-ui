import ProfileCard from '../common/profileCard'
import { useEffect, useState } from 'react'
import { EmailIcon, LinkIcon, UserIcon } from '../common/svgIcon';
import InputField from '../common/InputField';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import { API_BASE_URL } from '../../utils/constants';
import { useDispatch } from 'react-redux';
import { setAuthUser, removeAuthUser } from '../../store/slices/authUserSlice';
import { isURL } from 'validator';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
    const loggedInUser = useSelector((state) => state.authUser);
    const [profileData, setProfileData] = useState(null);
    const [formErrors, setFormErrors] = useState({});
    const dispatch = useDispatch();
    const navigate = useNavigate()

    useEffect(() => {
        if (loggedInUser) {
            const {name, email, photoUrl, gender, age, about, skills} = loggedInUser;
            setProfileData({name, email, photoUrl, gender, age, about, skills});
        }
    }, [loggedInUser]);

    const handleProfileData = (e, field) => {
        setProfileData((prevState) => ({
            ...prevState,
            [field]: e.target.value
        }));

        // Basic validation
        if (field === 'name') {
            const namePattern = /^[a-zA-Z]+[a-zA-Z\s]*$/;
            const nameValue = e.target.value;
            if (!namePattern.test(nameValue) || nameValue.length < 3 || nameValue.length > 30) {
                setFormErrors((prevErrors) => ({
                    ...prevErrors,
                    name: 'Please enter a valid full name (3-30 characters, letters and spaces only)'
                }));
            } else {
                setFormErrors((prevErrors) => {
                    const { name, ...otherErrors } = prevErrors;
                    return otherErrors;
                });
            }
        }
        else if (field === 'age') {
            const agePattern = /^(?:1[8-9]|[2-9][0-9]|100)$/;
            const ageVal = e.target.value;
            if (!agePattern.test(ageVal) || !parseInt(ageVal)) {
                setFormErrors((prevErrors) => ({
                    ...prevErrors,
                    age: 'Please enter a valid age.'
                }));
            } else {
                setFormErrors((prevErrors) => {
                    const { age, ...otherErrors } = prevErrors;
                    return otherErrors;
                });
            }
        }
        else if (field === 'photoUrl') {
            const urlVal = e.target.value?.trim();
            if (!urlVal || urlVal.length==0 || urlVal.slice(0,5)!='https'|| !isURL(urlVal)) {
                setFormErrors((prevErrors) => ({
                    ...prevErrors,
                    photoUrl: 'Please enter a valid photoUrl.'
                }));
            } else {
                setFormErrors((prevErrors) => {
                    const { photoUrl, ...otherErrors } = prevErrors;
                    return otherErrors;
                });
            }
        }
        else if(field=='about'){
            const about = e.target.value.trim();
            if (!about || about.length < 100 || about.length > 300) {
                setFormErrors((prevErrors) => ({
                    ...prevErrors,
                    about: 'Enter your vision with minLength 100 and maxLength 300'
                }));
            } else {
                setFormErrors((prevErrors) => {
                    const { about, ...otherErrors } = prevErrors;
                    return otherErrors;
                });
            }
        }
    }

    const handleUpdateProfile = async()=>{
        const {email,...safeData} = profileData;

        try{
            const response = await axios.patch(API_BASE_URL + "profile/update", safeData, {withCredentials:true});
            if(response.data && response.data.message){
                dispatch(setAuthUser(profileData))
                toast.success(response.data.message)
            }
        }catch(err){
            console.error("Something went wrong: "+err.message);
            toast.error("Something went wrong: "+err.message);
        }
    }

    const handleAddSkills = ()=>{
        const skill = prompt("Enter a new skill")?.trim();
        if(skill && skill.length>0){
            setProfileData((prevState) => ({
                ...prevState,
                "skills": [...prevState["skills"], skill]
            }));
        }
    }

    const handleClearSkills = ()=>{
        setProfileData((prevState) => ({
            ...prevState,
            "skills": []
        }));
    }

    const handleRemoveAccount = async() => {
        try{
            const userChoice = confirm("Do you want to proceed deleting your account permanently?");
            if(userChoice){
                await axios.post(API_BASE_URL + 'auth/removeAccount', {}, { withCredentials: true });
                dispatch(removeAuthUser());
                navigate("/login", {replace:true} );
            }
        }
        catch(err){
            console.error(err);
            toast.error("Something went wrong!!")
        }
    }

    return profileData && (<div className="flex flex-wrap justify-center gap-10 mt-10 mb-10">
        <div className="card bg-gray-100 w-96 shadow-sm">
            <div className="card-body items-center text-center">
                <h2 className="card-title font-bold text-2xl">Your Profile</h2>

                <InputField legend="Name" IconComponent={UserIcon}
                    value={profileData.name} handleChange={(e) => handleProfileData(e, 'name')}
                    required={true} formErrors={formErrors} field="name" />

                <InputField legend="Email Id" IconComponent={EmailIcon} type="email" placeholder={"mail@gmail.com"}
                    value={profileData.email} disabled={true} formErrors={formErrors} field="email" />

                <div className="fieldset py-2 mx-auto w-[80%]">
                    <legend className="fieldset-legend text-left">Gender</legend>
                    <div className="flex gap-4">
                        <input type="radio" name="gender" className="radio radio-primary border border-blue-400 text-blue-700" value="Male" onChange={(e) => handleProfileData(e, "gender")} checked={profileData.gender=="Male"} /> Male
                        <input type="radio" name="gender" className="radio radio-primary border border-blue-400 text-blue-700" value="Female" onChange={(e) => handleProfileData(e, "gender")} checked={profileData.gender=="Female"} /> Female
                        <input type="radio" name="gender" className="radio radio-primary border border-blue-400 text-blue-700" value="Other" onChange={(e) => handleProfileData(e, "gender")} checked={profileData.gender=="Other"} /> Other
                    </div>
                </div>

                <InputField legend="Age"
                    value={profileData.age} onChange={(e) => handleProfileData(e, 'age')}
                    formErrors={formErrors} field="age" />

                <InputField legend="Image Link" IconComponent={LinkIcon} type="url" placeholder={"https://image.com"}
                    value={profileData.photoUrl} handleChange={(e) => handleProfileData(e, 'photoUrl')}
                    title="Must be valid URL"
                    formErrors={formErrors} field="photoUrl" />

                <div className="fieldset pt-2 mx-auto w-[80%]">
                    <legend className="fieldset-legend text-left">Your Vision</legend>
                    <textarea className="textarea h-24 w-full border border-gray-300 rounded-md p-2" placeholder="Tell us about yourself." value={profileData.about} onChange={(e) => handleProfileData(e, 'about')}></textarea>
                    {formErrors && formErrors["about"] && <p className="text-red-500">{formErrors["about"]}</p>}
                </div>
            </div>
            <div className="card-actions w-full pb-4 pt-2 px-4">
                <div className="flex flex-row gap-4 w-1/2">
                    <button className="btn btn-primary bg-black text-white w-[95%]" onClick={handleAddSkills}>Add Skills</button>
                    <button className="btn btn-primary bg-gray-500 text-white w-[95%]" onClick={handleClearSkills}>Clear Skills</button>
                </div>
                <button className="btn btn-primary bg-blue-700 text-white w-full" onClick={handleUpdateProfile}>Update Profile</button>
                <button className="btn btn-primary bg-red-500 text-white w-full" onClick={handleRemoveAccount}>Remove Account</button>
            </div>
        </div>
        <div className='w-96'>
            <ProfileCard showCardButtons={false} userData={{...profileData}} />
        </div>
        <ToastContainer/>
    </div>)

}

export default Profile