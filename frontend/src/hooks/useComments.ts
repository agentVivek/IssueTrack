import { useCallback, useEffect, useState } from "react";

export interface Comment{
    id: number;
    content: string;
    issue_id: number;
    user: {
    id: string;
    name: string;
    avatarUrl: string;
    };
    created_at: number;
}

export const useGetComments = (issueId: number) => {
    const [loading, setLoading] = useState<boolean> (false);
    const [comments, setComments] = useState<Comment[]> ([]);

    const fetchComments = useCallback(async () => {
      if (!issueId) return;
      setLoading(true);
      try {
        const res = await fetch(`/api/issues/${issueId}/comments`);
        if (!res.ok) throw new Error("Failed to fetch comments");
        const data = await res.json();
        setComments(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }, [issueId]);

    // Initial Fetch
    useEffect(() => {
      fetchComments();
    }, [fetchComments]);

    // Return 'refetch' so the UI can update after posting
    return { comments, loading, refetch: fetchComments };
}

export const useSendComment = ()=>{
    const [sending, setSending] = useState<boolean>(false);

    const sendComment = async (issueId: number, text: string) => {
    if (!text.trim()) return false;
    setSending(true);
    try {
        const res = await fetch(`/api/issues/${issueId}/comments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
    });
    const data = await res.json();
    if (data.error) throw new Error("Failed to post comment");
    return true; 
    } catch (error) {
    return false;
    } finally {
    setSending(false);
    }
    }
    return {sendComment, sending};
}