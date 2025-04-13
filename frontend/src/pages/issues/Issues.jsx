import React, { useEffect, useState } from 'react';
import IssueCard from '../../components/IssueCard';
import LogoutButton from '../../components/LogoutButton';
import { Navigate } from 'react-router-dom';

const Issues = () => {
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
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

    fetchIssues();
  }, []);

  if (loading) return <div className="text-center p-4">Loading issues...</div>;
  if (error) return <div className="text-center text-red-500 p-4">{error}</div>;

  return (
    <div className="p-4 space-y-6">
      <div className="flex justify-end">
        <LogoutButton />
      </div>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
      {issues.length === 0 ? (
        <div className="col-span-full text-center text-gray-500">No issues found.</div>
      ) : (
        issues.map((issue) => (
          <IssueCard key={parseInt(issue.id)} issue={issue}/>
        ))
      )}
    </div>
  </div>);
}; 

export default Issues;
