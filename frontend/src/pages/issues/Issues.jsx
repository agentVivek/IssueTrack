import React, { useEffect, useState } from 'react';
import IssueCard from '../../components/IssueCard'; // This should be your issue display component
// import axios from 'axios';

const Issues = () => {
  const [issues, setIssues] = useState([{title: "Issue", description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum", status: "open", created_by: "agent"}, {issue: "Issue", description: "Description", status: "open", created_by: "agent"}, {issue: "Issue", description: "Description", status: "open", created_by: "agent"}, {issue: "Issue", description: "Description", status: "open", created_by: "agent"}]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchIssues = async () => {
      try {
        // const response = await axios.get('/api/issues'); // Update with your actual endpoint
        // setIssues(response.data);
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
    <div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
      {issues.length === 0 ? (
        <div className="col-span-full text-center text-gray-500">No issues found.</div>
      ) : (
        issues.map(issue => (
          <IssueCard key={issue.id} issue={issue} />
        ))
      )}
    </div>


  );
};

export default Issues;
