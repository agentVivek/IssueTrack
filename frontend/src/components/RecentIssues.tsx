import IssueCard from './IssueCard'; // Import the component
import { useGetIssues } from '../hooks/useGetIssues.ts';

const RecentIssuesList: React.FC = () => {

  const {allIssues: recentIssues} = useGetIssues({limit: 5})
  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-50">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Recent Issues</h2>
      <div className="flex flex-col gap-4">
        {recentIssues.map((issue) => (
          <IssueCard 
            key={issue.id} 
            data={issue} 
          />
        ))}
      </div>
    </div>
  );
};

export default RecentIssuesList;