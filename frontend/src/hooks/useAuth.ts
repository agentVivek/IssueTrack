import { createContext, useContext } from "react";
import type { userType } from "../context/authContext";

interface AuthContextType{
    authUser: userType|null; 
    setAuthUser: React.Dispatch<React.SetStateAction<userType | null>>;
}

const authContext = createContext<AuthContextType|null> (null);

const useAuth = () => {
    const context = useContext(authContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}

export default useAuth;
export {authContext};