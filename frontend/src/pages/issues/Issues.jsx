import React, { useContext, useEffect, useState } from 'react';
import IssueCard from '../../components/IssueCard';
import LogoutButton from '../../components/LogoutButton';
import { Navigate } from 'react-router-dom';
import { authContext } from '../../context/authContext';

const Issues = () => {
  const { authUser } = useContext(authContext);

  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  // const [priority, setPriority] = useState('low');
  const fetchIssues = async () => {
      try {
        setLoading(true);
        const res = await fetch("/api/issues"); 
        const data = await res.json();
        if(data.error){
          throw new Error(data.error);
        }
        setIssues(data);

      } catch (err) {
        setError('Failed to fetch issues.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
  useEffect(() => {   
    fetchIssues();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user_id = authUser.id;
    try {
      const res = await fetch('/api/issues', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, description, user_id}),
      });
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      setTitle('');
      setDescription('');
      fetchIssues();
    } catch (err) {
      alert('Failed to raise issue.');
      console.error(err);
    }
  };

  if (loading) return <div className="text-center p-4">Loading issues...</div>;
  if (error) return <div className="text-center text-red-500 p-4">{error}</div>;

return (
<div className="p-4 space-y-6 bg-gradient-to-br from-[#009BF3] to-gray-200">
      <div className="flex justify-between items-center">
        <h1 className="text-4xl font-semibold bg-[linear-gradient(270deg,#DF8908_10%,#B415FF_100%)] bg-clip-text text-transparent">Issue Tracker</h1>
        <LogoutButton />
      </div>

      {/* Raise Issue Form */}
      <form onSubmit={handleSubmit} className="bg-[#8DD8FF] p-4 shadow space-y-4 rounded-3xl">
        <div className='flex flex-col'>
        <h2 className="text-yellow-200 font-sans text-2xl">Raise New Issue </h2>
        <p className='self-end text-gray-600'>“Because your voice matters.”</p>
        </div>
        <input
          type="text"
          placeholder="Title" 
          className="p-2 border rounded"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          placeholder="Description"
          className="w-full p-2 border rounded min-h-[30vh]"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <button
          type="submit"
          className="rounded-3xl bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90%  text-purple-200 px-4 py-2 transform hover:scale-105"
        >
          Submit
        </button>
      </form>
      {/* Issue List */}
      <div>
        <h2 className="text-4xl text-center font-sans font-semibold bg-[linear-gradient(270deg,#DF8908_30%,#B415FF_80%)] bg-clip-text text-transparent">Recent Issues</h2>
      </div>
      <div className="  grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 ">
        {issues.length === 0 ? (
          <div className="col-span-full text-center text-gray-500">No issues found.</div>
        ) : (
          issues.map((issue) => (
            <IssueCard key={parseInt(issue.id)} issue={issue} />
          ))
        )}
      </div>
    </div>
  );
};

export default Issues;
