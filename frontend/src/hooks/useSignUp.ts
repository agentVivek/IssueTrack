import { useState } from "react";
import type { signUpData } from "../pages/SignUp";
import { useNavigate } from "react-router-dom";
export const useSignUp = ()=>{
    const [loading, setLoading] = useState<boolean> (false);
    const navigate = useNavigate();
    const signup = async (userData : signUpData) =>{
        const isValid = handleError(userData);
        if(!isValid) return;
        setLoading(true);
        try{  
            const res = await fetch("/api/auth/signup", {
                method: "POST", 
                headers: {"Content-Type" : "application/json"},
                body: JSON.stringify(userData),
            }) 
            const data = await res.json(); //returns js object
            if(data.error){
                throw new Error("Failed to SignUp. Please Try Again Later");
            }
            navigate('/');
        } catch(error){
            // toast.error(error);
        } finally{
            setLoading(false);
        } 
    }
    return {loading, signup};
}

const handleError = (data: signUpData) => {
    const {fullName, email, password, confirmPassword} = data;
    if(!fullName || !email || !password || !confirmPassword){
        // toast.error("All fields are required");
        return false;
    }
    if(password.length < 6){
        // toast.error("Password should be atleast 6 characters long");
        return false;
    }
    if(password !== confirmPassword){
        // toast.error("Password do not match");
        return false;
    }
    return true;
}
