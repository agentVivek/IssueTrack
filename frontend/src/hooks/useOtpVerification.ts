import { useState } from "react";
import { useNavigate } from "react-router-dom";

import useAuth from "./useAuth";

export const useOtpVerification = () => {
    const { setAuthUser } = useAuth();

    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const verifyOtp = async (email: string, otp: string) => {
        if(otp.length != 6) return;
        setLoading(true);
        setLoading(true);
        try{  
            const res = await fetch("/api/auth/verify-otp", {
                method: "POST", 
                headers: {"Content-Type" : "application/json"},
                body: JSON.stringify({email, otp}),
            }) 
            const data = await res.json(); 
            if(data.error){
                throw new Error("Failed to SignUp. Please Try Again Later");
            }
            //Store user in local Storage
            localStorage.setItem("it-user", JSON.stringify(data));
            setAuthUser(data);
            navigate('/');
        } catch(error){
            // toast.error();
        } finally{
            setLoading(false);
        } 
    }
    return {verifyOtp, loading};
} 