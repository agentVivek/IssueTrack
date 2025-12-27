import { AlertTriangle, CheckCircle, Users, Clock, Plus } from 'lucide-react';

const HeroSection: React.FC = () => {
  return (
    <div className="w-full flex flex-col font-sans">
      
      {/* --- TOP HERO SECTION --- */}
      <div className="relative w-full bg-linear-to-b from-[#9ba3eb] via-[#8b96e8] to-[#7c8ae6] py-20 px-4 sm:px-6 lg:px-8 text-center text-white overflow-hidden">
        
        {/* Main Heading */}
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 drop-shadow-sm">
          Our Campus, Our Responsibility
        </h1>

        {/* Subtext */}
        <p className="max-w-2xl mx-auto text-lg md:text-xl text-indigo-50 mb-10 font-medium opacity-90">
          A unified platform for students and faculty to flag maintenance issues and ensure IIT (ISM) remains a pristine place to learn and live.
        </p>

        {/* Call to Action Button */}
        <button className="group relative inline-flex items-center gap-2 bg-[#2e3470] hover:bg-[#3b4285] text-white px-8 py-3 rounded-lg text-lg font-semibold shadow-lg shadow-indigo-900/30 transition-all duration-300 transform hover:-translate-y-1">
          <Plus size={20} className="group-hover:rotate-90 transition-transform duration-300" />
          Report an Issue
        </button>
      </div>

      {/* --- STATS SECTION --- */}
      <div className="w-full bg-white py-12 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            
            {/* Stat Item 1: Issues Reported */}
            <StatItem 
              icon={<AlertTriangle size={28} className="text-[#6366f1]" />} 
              value="9" 
              label="Issues Reported" 
            />

            {/* Stat Item 2: Issues Resolved */}
            <StatItem 
              icon={<CheckCircle size={28} className="text-[#6366f1]" />} 
              value="2" 
              label="Issues Resolved" 
            />

            {/* Stat Item 3: Active Citizens */}
            <StatItem 
            icon={<Users size={28} className="text-[#6366f1]" />} 
            value="120+" 
            label="Active Users" 
            />

            {/* Stat Item 4: Response Rate */}
            <StatItem 
            icon={<Clock size={28} className="text-[#6366f1]" />} 
            value="2 Days" 
            label="Avg. Resolution Time" 
            />

          </div>
        </div>
      </div>
    </div>
  );
};

interface StatItemProps{
    icon: React.ReactNode;
    value: string;
    label: string;
}

// Helper Component for the Stats to keep code clean
const StatItem: React.FC<StatItemProps> = (props) => {
    const { icon, value, label } = props;
  return (
    <div className="flex flex-col items-center justify-center group">
      {/* Icon Container */}
      <div className="w-16 h-16 bg-[#e0e7ff] rounded-2xl flex items-center justify-center mb-4 transition-colors duration-300 group-hover:bg-[#c7d2fe]">
        {icon}
      </div>
      {/* Number */}
      <span className="text-3xl font-bold text-gray-900 mb-1">{value}</span>
      {/* Label */}
      <span className="text-sm font-medium text-gray-500">{label}</span>
    </div>
  );
};

export default HeroSection;