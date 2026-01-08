import { useState } from "react"
import useAuth from "./useAuth";

const useLogout = () => {
    const {setAuthUser} = useAuth();
    const [loading, setLoading] = useState<boolean>(false);

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
        }catch(error){
            // toast.error(error.message);
        } finally{
            setLoading(true);
        }
    }

    return {loading, logout};
}

export default useLogout;