import { useState } from 'react';
import { isEmail, isStrongPassword } from 'validator';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { API_BASE_URL } from '../../utils/constants.js';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { EmailIcon, PasswordIcon, UserIcon } from '../common/svgIcon.jsx';
import InputField from '../common/InputField.jsx';

function Signup() {
    const [signupData, setSignupData] = useState({name:'', email:'', password:''});
    const [formErrors, setFormErrors] = useState({});
    const navigate = useNavigate();

    const handleSignupData = (e, field) => {
        setSignupData((prevState) => ({
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
        else if (field === 'email') {
            const emailValue = e.target.value;
            if (!isEmail(emailValue)) {
                setFormErrors((prevErrors) => ({
                    ...prevErrors,
                    email: 'Invalid email format'
                }));
            } else {
                setFormErrors((prevErrors) => {
                    const { email, ...otherErrors } = prevErrors;
                    return otherErrors;
                });
            }
        }
        else if (field === 'password') {
            const passwordValue = e.target.value;
            if (!isStrongPassword(passwordValue, { minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1 })) {
                setFormErrors((prevErrors) => ({
                    ...prevErrors,
                    password: 'Password must be strong. retry again.'
                }));
            } else {
                setFormErrors((prevErrors) => {
                    const { password, ...otherErrors } = prevErrors;
                    return otherErrors;
                });
            }
        }
    }

    const handleSignup = async () => {
        try {
            if(Object.keys(formErrors).length > 0){
                return;
            }
            const newUserData = await axios.post(API_BASE_URL + 'auth/signup', signupData, 
                { withCredentials: true });
            
            if(newUserData.data && newUserData.data.message){
                navigate("/login", {replace:true});
            }
        }
        catch (err) {
            console.error(err);
            toast.error(err.response && err.response.data && err.response.data.message ? err.response.data.message : "Signup failed. Please try again." );
        }
    }

    return (
        <div className="card lg:card-side bg-gray-100 shadow-sm w-[80%] mx-auto my-10 py-6">
        <figure className="flex w-full md:h-1/2 lg:h-auto lg:w-1/2">
            <img className="max-w-[80%] rounded-md mx-auto"
            src="src/assets/devConnect.png"
            alt="App Logo" />
        </figure>
        <div className="card-body w-full md:h-1/2 lg:h-auto lg:w-1/2 justify-center">
                <h2 className="card-title text-2xl font-bold justify-center text-blue-700">Register to Team Up</h2>

                <InputField legend="Name" IconComponent={UserIcon} maxLength="30" minLength="3" placeholder="Enter your full name here"
                    pattern="^[a-zA-Z]+[a-zA-Z\s]*$" value={signupData.name} handleChange={(e) => handleSignupData(e, 'name')}
                    required={true} formErrors={formErrors} field="name" />

                <InputField legend="Email Id" IconComponent={EmailIcon} type="email" placeholder={"mail@site.com"}
                    value={signupData.email} handleChange={(e) => handleSignupData(e, 'email')}
                    required={true} formErrors={formErrors} field="email" />

                <InputField legend="Password" IconComponent={PasswordIcon} type="password" placeholder={"Enter the password here"}
                    value={signupData.password} handleChange={(e) => handleSignupData(e, 'password')} minLength="8"
                    pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                    required={true} formErrors={formErrors} field="password" title="Must be more than 8 characters, including number, lowercase letter, uppercase letter" />

                <button onClick={handleSignup} className="btn btn-primary bg-blue-400 p-4 text-white w-[80%] mx-auto">Submit</button>
                <p className="flex justify-end text-gray-600 text-xs">Already have an account? &nbsp; <Link to="/login" className="font-bold text-blue-600 underline">Login</Link></p>
            </div>
            <ToastContainer/>
        </div>
    );
}

export default Signup;