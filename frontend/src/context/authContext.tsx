import { useState } from "react";
import { authContext } from "../hooks/useAuth";

export interface userType{
    id: number;
    fullName: string;
    email: string; 
    role: string;
    // branch: string;
    profile_img: string;
    created_at: string;
}
interface AuthProviderProps{
    children: React.ReactNode;
}

const AuthProvider : React.FC<AuthProviderProps> =  (props) => {
    const [authUser, setAuthUser] = useState<userType|null>(getStoredUser());
    return(
        <authContext.Provider value={{authUser, setAuthUser}}>
            {props.children}
        </authContext.Provider>
    )
}

function getStoredUser(){
    const storedValue = localStorage.getItem("it-user");
    if(!storedValue) return null;
    try{
        const user = JSON.parse(storedValue);
        return user;
    } catch(error){
        return null; 
    }
}

export default AuthProvider;

