import { Routes, Route } from 'react-router-dom';
import './App.css';
import Footer from './components/Footer.tsx';
import Navbar from './components/Navbar.tsx';
import Report from './pages/Report.tsx';
import Home from "./pages/Home.tsx";
import Issues from './pages/Issues.tsx';
import IssueDetails from './pages/IssueDetails.tsx';
import Profile from './pages/Profile.tsx';
import EditProfile from './pages/EditProfile.tsx';
import Contact from './pages/Contact.tsx';

const App: React.FC = () => {
  return (
    <div>
      <Navbar />
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/report' element={<Report/>} />
          <Route path='/issues' element={<Issues/>} />
          <Route path='/issues/:id' element={<IssueDetails/>} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/editProfile' element={<EditProfile />}/>
          <Route path='/contact' element={<Contact /> } />
        </Routes>
      <Footer />
    </div>
  )
}

export default App
