import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { MdDelete } from "react-icons/md";
import { authContext } from '../context/authContext';

const IssueCard = ({ issue }) => {
    const { authUser } = useContext(authContext);
      useEffect(()=>{
    
      }, [authUser]);
    const navigate = useNavigate();
    const handleClick = ()=>{
        navigate(`/issues/${issue.id}`);
    }
   const [deleting, setDeleting] = useState(false);

  const handleDelete = async () => {
    // 1. Ask the user
    // const confirmed = window.confirm(
    //   `Are you sure you want to delete the issue “${issue.title}”?`
    // );
    // if (!confirmed) return;
    setDeleting(true);
    try {
      const res = await fetch(`/api/issues/${issue.id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await res.json();
      if (data.error) {
        toast.error('Delete failed ');
        throw(data.error);
      }
      toast.success(`✅ Deleted`);
    } catch (err) {
      console.error('❌ Delete failed:', err); 
    } finally {
      setDeleting(false);
    }
  };
  return ( 
    <div className="relative bg-radial-[at_50%_75%] from-sky-100  to-blue-400 to-70% rounded-2xl border border-gray-200  p-6 transition-all hover:shadow-lg hover:scale-[1.05] duration-200 ease-in-out" onClick={handleClick} >
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
      <div className={`flex  absolute right-3 bottom-3 ${issue.created_by === authUser.name ? '' : 'hidden'}`}>
      <p>{deleting ? 'Deleting…' : 'Delete'}</p>
      <MdDelete 
        onClick={handleDelete}
        disabled={deleting}
      className={`size-7 text-red-500 hover:text-red-700 cursor-pointer ${deleting ? 'bg-gray-300 cursor-not-allowed' : ''}`} />
      </div>
</div>);
};

export default IssueCard;
