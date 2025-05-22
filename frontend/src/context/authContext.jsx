import { createContext, useState } from "react";

function getStoredUser() {
    try{
        const user = JSON.parse(localStorage.getItem("user")) || null;
        return user;
    }catch(error){
        return null;
    }
}

const authContext = createContext();

function AuthProvider({children}) {
    const [authUser, setAuthUser] = useState(getStoredUser);
    return(
        <authContext.Provider value={{authUser, setAuthUser}}>
            {children}
        </authContext.Provider>
    )
} 

export default AuthProvider;
export {authContext};