import React, { useEffect, useState, useContext } from 'react';
import {toast} from "react-hot-toast";
import SolutionForm from './SolutionForm';
import { authContext } from '../context/authContext';


const Solution = ({issueId}) => {
    const { authUser } = useContext(authContext);
    useEffect(()=>{ 

    }, [authUser]);
    console.log(authUser)
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
      <div className="max-w-3xl mx-auto p-6 md:p-8  border-gray-200 bg-radial-[at_50%_75%] from-sky-100  to-green-300 to-70% rounded-2xl mt-[2vw]">
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
      <div className={`${authUser?.role === 'admin' ? '' : 'hidden'}`}>
      <div className="max-w-3xl mx-auto p-6 md:p-8 text-center text-gray-500 italic">
        No solution has been provided for this issue yet.
      
      </div>
      <SolutionForm />
      </div>
    )
  );
  
};

export default Solution;
