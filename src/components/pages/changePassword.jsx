import { useState } from "react";
import InputField from "../common/InputField"
import { PasswordIcon } from "../common/svgIcon"
import { RiLockPasswordLine } from "react-icons/ri";
import { isStrongPassword } from "validator";
import { toast } from "react-toastify";
import axios from "axios";
import { API_BASE_URL } from "../../utils/constants";

const ChangePassword = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [errors, setErrors] = useState({});

  const handlePassword = (e, field)=>{
    const value = e.target.value.trim();

    if(!isStrongPassword(value, {minLength:8, minLowercase:1, minUppercase:1, minNumbers:1})|| (field=='oldPassword' && value==newPassword) || (field=='newPassword' && value==oldPassword)){
      setErrors((prevErrors) => ({
        ...prevErrors,
        [field]: "Password is invalid. Try again with a strong valid password."
      }));
    }
    else{
      if(oldPassword!=newPassword){
        if(field=='oldPassword'){
          setErrors((prevErrors) => {
            const { oldPassword, ...otherErrors } = prevErrors;
            return otherErrors;
          });
        }else{
          setErrors((prevErrors) => {
            const { newPassword, ...otherErrors } = prevErrors;
            return otherErrors;
          });
        }
      }else{
        setErrors((prevErrors) => {
          const { oldPassword, newPassword, ...otherErrors } = prevErrors;
          return otherErrors;
        });
      }
    }

    if(field=='oldPassword'){
      setOldPassword(value);
    }
    else{
      setNewPassword(value)
    }
  }

  const handleSubmit = async()=>{
    try{
      const passwordData = await axios.patch(API_BASE_URL + 'profile/change-password', {
          oldPassword: oldPassword,
          newPassword: newPassword
      }, { withCredentials: true });

      toast.success(passwordData.data.message);

    }catch(err){
      console.error("Something went wrong",err)
      if(err.status!=500){
        toast.error("Something went wrong: "+err.response.data.message)
      }
    }
  }

  return (
    <div className="card w-96 bg-slate-100 shadow-sm m-auto">
      <div className="card-body">
        <div className="flex justify-center">
          <h2 className="text-3xl font-bold text-blue-800">Change Password</h2>
        </div>
        <div className="mt-6 flex flex-col gap-2 text-xs">
          <InputField legend="Current Password" IconComponent={PasswordIcon} placeholder={"Enter the current password here"}
            value={oldPassword} formErrors={errors} handleChange={(e)=>handlePassword(e, 'oldPassword')}
            required={true} field="oldPassword" title="Must be more than 8 characters, including number, lowercase letter, uppercase letter" />

          <InputField legend="New Password" IconComponent={RiLockPasswordLine} type="text" placeholder={"Enter the new password here"}
            value={newPassword} formErrors={errors} handleChange={(e)=>handlePassword(e, 'newPassword')}
            required={true} field="newPassword" title="Must be more than 8 characters, including number, lowercase letter, uppercase letter" />

        </div>
        <div className="mt-6">
          <button disabled={errors && Object.keys(errors).length>0} className="btn btn-primary text-white btn-block disabled:bg-slate-400 bg-blue-500" onClick={handleSubmit}>Submit</button>
        </div>
      </div>
    </div>
  )
}

export default ChangePassword