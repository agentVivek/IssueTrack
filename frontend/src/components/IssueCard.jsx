import React from 'react';
import { useNavigate } from 'react-router-dom';

const IssueCard = ({ issue }) => {
    const navigate = useNavigate();
    const handleClick = ()=>{
        navigate(`/issues/${issue.id}`);
    }
  return ( 
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 transition-all hover:shadow-lg hover:scale-[1.02] duration-200 ease-in-out" onClick={handleClick} >
    <h2 className="text-xl font-semibold text-gray-800 mb-2">{issue.title}</h2>
    <p className="text-sm text-gray-600 mb-4 line-clamp-3">{issue.description}</p>

    <div className="flex flex-col gap-1 text-xs text-gray-500">
        <span className="flex items-center gap-1">
        <span className="font-medium">Status:</span>
        <span className={`px-2 py-0.5 rounded-full text-white text-xs 
            ${issue.status === 'open' ? 'bg-green-500' : issue.status === 'in-progress' ? 'bg-yellow-500' : 'bg-red-500'}`}>
            {issue.status}
        </span>
        </span>
        <span className="flex items-center gap-1">
        <span className="font-medium">Created by:</span>
        {issue.created_by}
        </span>
    </div>
</div>);
};

export default IssueCard;
