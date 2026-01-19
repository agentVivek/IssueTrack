import { useState } from "react"
import useAuth from "./useAuth";
import { useNavigate } from "react-router-dom";

const useLogout = () => {
    const {setAuthUser} = useAuth();
    const [loading, setLoading] = useState<boolean>(false);
    const navigate = useNavigate();
    const logout = async () => {
        setLoading(true);
        try{
            const res = await fetch("/api/auth/logout", {
            method: "POST", 
            headers: {"Content-Type" : "application/json"},
            });
            const data = await res.json();
            if(data.error){
                throw new Error(data.error);
            }
            localStorage.removeItem("it-user");
            setAuthUser(null);
            // toast.success("LoggedOut Successfully");
            navigate('/login');
        }catch(error){
            // toast.error(error.message);
        } finally{
            setLoading(false);
        }
    }

    return {loading, logout};
}

export default useLogout;