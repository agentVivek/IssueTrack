import { Mail, Phone, MapPin, Clock, ShieldAlert, Info } from 'lucide-react';

const Contact: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      
      {/* --- Header Section --- */}
      <div className="bg-[#2e3470] text-white py-16 px-4 text-center">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">Get in Touch</h1>
        <p className="text-indigo-200 max-w-2xl mx-auto text-lg">
          Have feedback about the platform or need urgent assistance? 
          Reach out to the Student Welfare or Maintenance Department.
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 -mt-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* --- LEFT COLUMN: Contact Info --- */}
          <div className="space-y-6">
            
            {/* 1. General Info Card */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center">
                <Info size={20} className="mr-2 text-indigo-600" />
                Contact Information
              </h3>
              
              <div className="space-y-6">
                <ContactItem 
                  icon={<MapPin size={20} />}
                  title="Campus Address"
                  content={
                    <>
                      Indian Institute of Technology (ISM)<br />
                      Sardar Patel Nagar, Dhanbad<br />
                      Jharkhand - 826004
                    </>
                  }
                />
                <ContactItem 
                  icon={<Mail size={20} />}
                  title="Email Us"
                  content={<a href="mailto:helpdesk@iitism.ac.in" className="hover:text-indigo-600">helpdesk@iitism.ac.in</a>}
                />
                <ContactItem 
                  icon={<Phone size={20} />}
                  title="Admin Office"
                  content="+91 326 223 5001"
                />
                <ContactItem 
                  icon={<Clock size={20} />}
                  title="Office Hours"
                  content="Mon - Fri: 9:00 AM - 5:30 PM"
                />
              </div>
            </div>

            {/* 2. Emergency / Security Card */}
            <div className="bg-white rounded-xl shadow-sm border border-red-100 p-6 relative overflow-hidden">
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                <ShieldAlert size={20} className="mr-2 text-red-600" />
                Emergency Contacts
              </h3>
              <p className="text-sm text-gray-500 mb-4">
                For urgent safety or security issues on campus, please call directly:
              </p>
              <div className="space-y-3">
                <div className="flex justify-between items-center text-sm font-medium">
                  <span className="text-gray-700">Campus Security</span>
                  <a href="tel:+913262235000" className="text-red-600 hover:underline">+91 326 223 5000</a>
                </div>
                <div className="flex justify-between items-center text-sm font-medium">
                  <span className="text-gray-700">Ambulance / Health</span>
                  <a href="tel:+913262235555" className="text-red-600 hover:underline">+91 326 223 5555</a>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

// --- Helper Component for Contact Info ---
const ContactItem = ({ icon, title, content }: { icon: React.ReactNode, title: string, content: React.ReactNode }) => (
  <div className="flex items-start">
    <div className="w-10 h-10 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-600 mr-4 shrink-0">
      {icon}
    </div>
    <div>
      <h4 className="text-sm font-bold text-gray-900">{title}</h4>
      <div className="text-sm text-gray-600 mt-1 leading-relaxed">
        {content}
      </div>
    </div>
  </div>
);

export default Contact;