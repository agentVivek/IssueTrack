import { useEffect, useState } from "react";

const IssueDetails = ({id}) => {
        const [issue, setIssue] = useState({title: "Issue", description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum", status: "open", created_by: "agent", updated_at : "1/1/25", created_at : "1/1/23"});
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
        <div className="max-w-3xl mx-auto p-6 md:p-8 bg-white rounded-2xl shadow-lg border border-gray-200">
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