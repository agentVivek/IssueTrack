import IssueCard from './IssueCard'; // Import the component

// Sample data based on your images
export interface Issue {
  id: number;
  title: string;
  status: 'OPEN' | 'IN PROGRESS' | 'RESOLVED'; // Union type for strict status checking
  description: string;
  imageUrl: string | null;
  category: string;
  zone: string;
  reporter: string;
  timeElapsed: string;
  timestamp: number;
  upvotes: number;
  downvotes: number;
  commentsCount: number;
}
const sampleIssues: Issue[] = [
  {
    id: 1,
    title: "Potholes on the Road",
    status: "OPEN",
    description: "Multiple large potholes have developed on the main road near the market area, causing slow traffic and potential vehicle damage.",
    imageUrl: "https://images.unsplash.com/photo-1515162816999-a0c47dc1e44b?w=400&h=300&fit=crop", // Example image
    category: "Roads & Transport",
    zone: "Rupnarayanpur, Kharagpur-I, Paschim Medinipur",
    reporter: "Rajesh Kumar",
    timeElapsed: "about 5 hours ago",
    timestamp: new Date().getTime(),
    upvotes: 12,
    downvotes: 1,
    commentsCount: 3,
  },
  {
    id: 2,
    title: "Street Light Not Working",
    status: "IN PROGRESS",
    description: "The streetlight at the corner of Station Road has been flickering and is now completely off for the last 3 days.",
    imageUrl: null, 
    category: "Electricity & Power",
    zone: "Railway Station Road, ISM",
    reporter: "Ashwani Pathak",
    timeElapsed: "3 days ago",
    timestamp: new Date().getTime(),  
    upvotes: 5,
    downvotes: 0,
    commentsCount: 1,
  },
];

const RecentIssuesList: React.FC = () => {
  const handleViewDetails = (id: number): void => {
    console.log(`Navigating to details for issue ${id}`);
    // Add your navigation logic here, e.g., history.push(`/issues/${id}`)
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-50">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Recent Issues</h2>
      <div className="flex flex-col gap-4">
        {sampleIssues.map((issue) => (
          <IssueCard 
            key={issue.id} 
            data={issue} 
            onViewDetails={() => handleViewDetails(issue.id)} 
          />
        ))}
      </div>
    </div>
  );
};

export default RecentIssuesList;