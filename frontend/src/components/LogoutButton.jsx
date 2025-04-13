import { useContext } from "react";
import toast from "react-hot-toast";
import { BiLogOut } from "react-icons/bi";
import { authContext } from "../context/authContext";

const LogoutButton = () => {
    const { setAuthUser } = useContext(authContext);
    const logout = async ()=>{
        try{
            const res = await fetch("/api/auth/logout", {
                method: "POST",
                headers: {"Content-Type" : "application/json"},
            });
            const data = await res.json();
            if(data.error){
                throw new Error(data.error);
            }
            localStorage.removeItem("user");
            setAuthUser(null);
        } catch(error){
            toast.error(error.message);
        }
    }
    return (
        <div className='mt-auto p-2 flex items-center gap-2 cursor-pointer hover:text-red-500'>
            <BiLogOut className='w-6 h-6 text-blue-500 hover:text-red-500' onClick={logout}/>
            <span className='loading loading-spinner hidden'></span>
        </div>
    );
}

export default LogoutButton;
