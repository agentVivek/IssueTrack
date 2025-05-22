import React, { useEffect, useState } from 'react';
import {toast} from "react-hot-toast";
const Solution = ({issueId}) => {
    const [solution, setSolution] = useState({
        description: '',
        created_at: ''
      });   
    useEffect(()=>{
        const fetchSolution = async () => {
            try{
                const res = await fetch(`/api/solution/${issueId}`);
                const data = await res.json();
                if(data.error){
                    throw new Error(data.error);
                } 
                if(!data) setSolution(data)
                setSolution(data);
            } catch(error){
                toast.error(error.message);
            }
        }
        fetchSolution(); 
    }, [])    
return (
    solution.description ? (
      <div className="max-w-3xl mx-auto p-6 md:p-8 bg-white rounded-2xl shadow-lg border border-gray-200">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Solution</h1>
        <p className="text-gray-800 mb-3">
          {solution.description}
        </p>
        <div className="flex justify-between text-xs text-gray-500">
          <span className="italic">
            {solution.created_at ? new Date(solution.created_at).toLocaleString() : ''}
          </span>
        </div>
      </div>
    ) : (
      <div className="max-w-3xl mx-auto p-6 md:p-8 text-center text-gray-500 italic">
        No solution has been provided for this issue yet.
      </div>
    )
  );
  
};

export default Solution;
