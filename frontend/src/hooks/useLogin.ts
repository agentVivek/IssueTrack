import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "./useAuth";

export const useLogin = () => { 
    const { setAuthUser } = useAuth();
    const [loading, setLoading] = useState<boolean> (false);
    const navigate = useNavigate();
    const login = async (email: string, password: string) => {
        setLoading(true);
        try{
            const res = await fetch("/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });
            const data = await res.json();
            if (!res.ok) {
                throw new Error("Invalid credentials");
            }
            localStorage.setItem("it-user", JSON.stringify(data));
            setAuthUser(data);
            navigate('/'); 
        } catch (error) {
            console.log(error);
            return false;
        } finally {
            setLoading(false);
        }
    };
    
    return {login, loading};
}