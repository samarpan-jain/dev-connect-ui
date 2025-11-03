import { useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setAuthUser } from '../../store/slices/authUserSlice';
import { useNavigate } from 'react-router-dom';
import { API_BASE_URL } from '../../utils/constants.js';
import { isEmail, isStrongPassword } from 'validator';
import { toast, ToastContainer } from 'react-toastify';
import { EmailIcon, PasswordIcon } from '../common/svgIcon.jsx';
import InputField from '../common/InputField.jsx';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({});
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            if(Object.keys(errors).length > 0){
                return;
            }
            const loginData = await axios.post(API_BASE_URL + 'auth/login', {
                email: email,
                password: password
            }, { withCredentials: true });
            
            if(loginData.data && loginData.data.data){
                dispatch(setAuthUser(loginData.data.data));
                navigate("/feed", {replace:true});
            }
        }
        catch (err) {
            console.error(err);
            toast.error("Login failed. Please check your credentials and try again.");
        }
    }

    const handleEmail = (e)=>{
        const value = e.target.value;
        if(!isEmail(value)){
            setErrors((prevErrors) => ({
                ...prevErrors,
                email: 'Invalid email format'
            }));
        }
        else{
            setErrors((prevErrors) => {
                const { email, ...otherErrors } = prevErrors;
                return otherErrors;
            });
        }
        setEmail(value);
    }

    const handlePassword = (e)=>{
        const value = e.target.value;
        if(!isStrongPassword(value, {minLength:8, minLowercase:1, minUppercase:1, minNumbers:1})){
            setErrors((prevErrors) => ({
                ...prevErrors,
                password: 'Password must be at least 8 characters long and include at least one lowercase letter, one uppercase letter, and one number'
            }));
        }
        else{
            setErrors((prevErrors) => {
                const { password, ...otherErrors } = prevErrors;
                return otherErrors;
            });
        }
        setPassword(value);
    }

    return <div className="card lg:card-side bg-gray-100 shadow-sm w-[80%] mx-auto my-10 py-8">
        <figure className="flex w-full md:h-1/2 lg:h-auto lg:w-1/2">
            <img className="max-w-[80%] rounded-md mx-auto"
            src="src/assets/devConnect.png"
            alt="App Logo" />
        </figure>
        <div className="card-body w-full md:h-1/2 lg:h-auto lg:w-1/2 justify-center">
            <h2 className="card-title text-2xl font-bold justify-center text-blue-700">Login to build Networks</h2>
            
            <InputField legend="Email Id" IconComponent={EmailIcon} type="email" placeholder={"mail@site.com"}
            value={email} handleChange={(e) => handleEmail(e)}
            required={true} formErrors={errors} field="email" />

            <InputField legend="Password" IconComponent={PasswordIcon} type="password" placeholder={"Enter the password here"}
            value={password} handleChange={(e) => handlePassword(e)}
            required={true} formErrors={errors} field="password" title="Must be more than 8 characters, including number, lowercase letter, uppercase letter" />

            <div className="card-actions mt-4 justify-center gap-4">
                <button type="submit" className="btn btn-primary bg-blue-400 p-4 text-white w-[38%]" onClick={handleLogin}>Login</button>
                <button className="btn btn-primary bg-gray-500 p-4 text-white w-[38%]" onClick={()=>navigate('/signup')}>Sign Up</button>
            </div>
        </div>
        <ToastContainer />
    </div>
}

export default Login;