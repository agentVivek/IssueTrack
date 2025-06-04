import IssueDetails from '../../components/IssueDeatails';
import Solution from '../../components/Solution';
import { useParams } from 'react-router-dom';


const Issue = () => {
  const { id } = useParams(); 

  return (
    <div className="min-h-screen pt-[5vw] bg-gradient-to-br from-[#009BF3] to-gray-200">
    <IssueDetails id={id}/>
    <Solution issueId={id}/>
    </div>
  )
};  

export default Issue; 
