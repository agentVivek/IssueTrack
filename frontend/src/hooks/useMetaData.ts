import { useEffect, useState } from "react"

export interface Category{
    id: number;
    name: string;
    email: string;
}

export const useGetCategories = ()=>{
    const [loading, setLoading] = useState<boolean> (false);
    const [categories, setCategories] = useState<Category[]> ([]);
    useEffect(()=>{
        const getCategories = async()=>{
            setLoading(true);
            try{
                const res = await fetch('/api/categories');
				const data = await res.json();
				if (!res.ok) throw new Error("Failed to fetch categories");
				setCategories(data);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        }
        getCategories();
    },[])
    return {categories, loading};
}

export interface Zones{
    id: number;
    name: string;
    description: string;
}

export const useGetZones = ()=>{
    const [loading, setLoading] = useState<boolean>(false);
    const [zones, setZones] = useState<Zones[]> ();
    useEffect(()=>{
        const getZones = async()=>{
            setLoading(true);
            try {
                const res = await fetch('/api/zones');
                if (!res.ok) throw new Error("Failed to fetch zones");
                const data = await res.json();
                setZones(data);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
            getZones();
        }
    }, [])
    return {zones, loading};
}