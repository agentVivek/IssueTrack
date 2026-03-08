import { useEffect, useState } from "react";

export interface UserType{
    id: number;
    name: string;
    role: string;
    email: string;
    dept: string; 
    status: "ACTIVE"|"DEACTIVATED";
}

export const useGetUsers = () => {
    const [users, setUsers] = useState<UserType[]>([]);
    const [loading, setLoading] = useState<boolean> (false);
    useEffect(()=>{ 
        const getUsers = async ()=>{
        setLoading(true);
        try{
            const res = await fetch(`/api/users`);
            const data = await res.json();
            if (!res.ok) throw new Error("Failed to fetch issues");
            setUsers(data);
        } catch(error){
            console.log(error);
        } finally{
            setLoading(false);
        }
        }
        getUsers();
        },[]);
    return {users, loading};
}