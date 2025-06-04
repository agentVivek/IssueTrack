import { useEffect, useState } from "react";

const IssueDetails = ({id}) => {
        const [issue, setIssue] = useState({title: " ", description: " ", status: "", created_by: "", updated_at : "1/1/25", created_at : "1/1/23"});
        const [loading, setLoading] = useState(true);
        const [error, setError] = useState(null);
        
        useEffect(() => {
        const fetchIssue = async () => {
            try {
                const res = await fetch(`/api/issues/${id}`);
                const data = await res.json();
                if(data.error){
                  throw new Error(data.error);
                }
                setIssue(data); 
                console.log(data);
            } catch (err) {
            console.error(err);
            setError('Failed to load issue.');
            } finally {
            setLoading(false);
            }
        };
    
        fetchIssue();
        }, []);
    
        if (loading) return <div className="p-4 text-center">Loading issue details...</div>;
        if (error) return <div className="p-4 text-center text-red-500">{error}</div>;
        if (!issue) return null;    
    
        return (
        <div className=" max-w-3xl mx-auto p-6 md:p-8 bg-white shadow-lg border-gray-200 bg-radial-[at_50%_75%] from-sky-100  to-blue-400 to-70% rounded-2xl ">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">{issue.title}</h1>
        <p className="text-gray-700 text-base mb-6 leading-relaxed">{issue.description}</p>
    
        <div className="space-y-3 text-sm text-gray-600 mb-10">
            <div>
            <span className="font-semibold text-gray-800">Status:</span>{' '}
            <span 
                className={`inline-block px-2 py-0.5 rounded-full text-white text-xs font-medium
                ${issue.status === 'open' ? 'bg-green-500' :
                    issue.status === 'in-progress' ? 'bg-yellow-500' :
                    'bg-red-500'}`}
            >
                {issue.status}
            </span>
            </div>
            <div>
            <span className="font-semibold text-gray-800">Created By:</span> {issue.created_by}
            </div>
            <div>
            <span className="font-semibold text-gray-800">Created At:</span>{' '}
            {new Date(issue.created_at).toLocaleString()}
            </div>
            {issue.updated_at && (
            <div>
                <span className="font-semibold text-gray-800">Last Updated:</span>{' '}
                {new Date(issue.updated_at).toLocaleString()}
            </div>
            )}
        </div> 
    </div>
    )
}

export default IssueDetails;