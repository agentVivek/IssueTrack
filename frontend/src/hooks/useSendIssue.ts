import { useState } from "react"
import type { IssueData } from "../pages/Report";

export const useSendIssue = () => {
    const [sending, setSending] = useState<boolean>(false);
    
    const sendIssue = async(issueData: IssueData)=>{
        const isValid = handleError(issueData);
        if(sending || !isValid) return false;
        setSending(true);
        try{
            const formData = new FormData(); //Used instead of JSON. This allows the image file to be sent correctly as binary data.
            formData.append("title", issueData.title);
            formData.append("description", issueData.description);
            formData.append("category", issueData.category);
            formData.append("zone", issueData.zone);
            // Append File if it exists
            if (issueData.image) {
                formData.append("image", issueData.image); 
            }
            const res = await fetch(`/api/issues/send/`, {
				method: "POST",
				body: formData,
			});
			await res.json();
			if (!res.ok) throw new Error("Failed to send data");
            return true;
        } catch(error){
            console.log(error);
        } finally{
            setSending(false);
        }
    }

    return {sendIssue, sending};
}

const handleError = (issueData : IssueData) =>{
    if (!issueData.title.trim() || !issueData.description.trim() || !issueData.category || !issueData.zone) {
      return false;
    }
}