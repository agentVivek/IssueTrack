import React from 'react';
import { Twitter, Linkedin, Github, Mail, MapPin, Phone, Heart } from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className={`bg-[#2e3470] font-sans`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-6">
        
        {/* --- Main Content: 2 Column Layout --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          
          {/* Column 1: Brand & Social */}
          <div className="space-y-4">
            <h3 className={`text-2xl font-bold text-white tracking-tight`}>IssueTrack</h3>
            <p className={`text-sm leading-relaxed text-indigo-200 max-w-md`}>
              Building a better IIT (ISM) Dhanbad campus, together. Report issues, track progress, and drive positive change.
            </p>
            {/* Social Links */}
            <div className="flex space-x-3 pt-2">
              <SocialLink href="#" icon={<Twitter size={18} />} label="Twitter"/>
              <SocialLink href="#" icon={<Linkedin size={18} />} label="LinkedIn"  />
              <SocialLink href="https://github.com/agentVivek" icon={<Github size={18} />} label="GitHub"/>
            </div>
          </div>

          {/* Column 2: Contact Info */}
          <div className="md:text-right">
            <h4 className={`text-lg font-semibold text-white mb-4`}>Contact IIT (ISM)</h4>
            <ul className={`space-y-3 text-sm text-indigo-200 md:flex md:flex-col md:items-end`}>
              <li className="flex items-start md:justify-end">
                <MapPin size={18} className={`mr-2 text-indigo-200 shrink-0 mt-0.5 md:order-2 md:ml-2 md:mr-0`} />
                <span>
                  Admin Block, Dhanbad,<br /> Jharkhand - 826004
                </span>
              </li>
              <li className="flex items-center md:justify-end">
                <Phone size={18} className={`mr-2 text-indigo-200 shrink-0 md:order-2 md:ml-2 md:mr-0`} />
                <span>+91 326 223 5001</span>
              </li>
              <li className="flex items-center md:justify-end">
                <Mail size={18} className={`mr-2 text-indigo-200 shrink-0 md:order-2 md:ml-2 md:mr-0`} />
                <a href="mailto:helpdesk@iitism.ac.in" className={`hover:text-white transition-colors`}>
                  helpdesk@iitism.ac.in
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* --- Bottom Section: Copyright --- */}
        <div className={`border-t border-indigo-800/50 pt-6 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-indigo-200`}>
          <p className="text-center md:text-left">
            &copy; {currentYear} IIT (ISM) Dhanbad.
          </p>
          <p className="flex items-center">
            Made with <Heart size={14} className="mx-1 text-red-400 fill-current" /> for the community
          </p>
        </div>
      </div>
    </footer>
  );
};

// --- Helper Component for Social Links ---
interface SocialLinkProps {
  href: string;
  icon: React.ReactNode;
  label: string;
}

const SocialLink: React.FC<SocialLinkProps> = ({ href, icon, label}) => (
  <a 
    href={href} 
    target="_blank" 
    rel="noopener noreferrer"
    aria-label={label}
    className={`w-9 h-9 rounded-full bg-[#3b4285] text-indigo-200 flex items-center justify-center transition-all duration-300 hover:bg-white hover:text-[#2e3470]`}
  >
    {icon}
  </a>
);

export default Footer;