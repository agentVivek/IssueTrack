import { useEffect, useState } from "react";

export interface IssueType { 
  id: number;
  title: string;
  status: 'OPEN' | 'IN PROGRESS' | 'RESOLVED'; // Union type for strict status checking
  description: string;
  imageUrl: string | null;
  category: string;
  zone: string;
  user: {
    userId: string;
    name: string;
    avatarUrl: string;
  };
  created_at: string;
  upvotes: number;
  downvotes: number;
  commentsCount: number;
}

export const useGetIssueById = (id: number) => {
    const [issue, setIssue] = useState<IssueType> ();
    const [loading, setLoading] = useState<boolean> (false);

    useEffect(()=>{
      const getIssueById = async ()=>{
        setLoading(true);
        try{
          const res = await fetch(`/api/issues/${id}`);
          const data = await res.json();
          if (!res.ok) throw new Error("Failed to fetch issue");
          setIssue(data);
        }catch(error){
          console.log(error);
        }finally{
          setLoading(false);
        }
      }
      getIssueById();
    },[id]);

    return {issue, loading};
}

interface Options{
  userId?: string|undefined;
  limit?: number|undefined;
}

export const useGetIssues = (options: Options) => {
  const [issues, setIssues] = useState<IssueType[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const { userId , limit} = options;
  useEffect(()=>{
      const getIssues = async ()=>{
        setLoading(true);
        try{
          // URLSearchParams automatically handles ? & = and encoding
          const params = new URLSearchParams();
          if (limit) params.append('limit', limit.toString());
          if (userId) params.append('userId', userId);
          const url = `/api/issues?${params.toString()}`;
          const res = await fetch(url);
          const data = await res.json();
          if (!res.ok) throw new Error("Failed to fetch issues");
          setIssues(data);
        } catch(error){
          console.log(error);
        } finally{
          setLoading(false);
        }
      }
      getIssues();
      },[limit, userId])

      return {allIssues: issues, loading};
}

