import { Routes, Route } from 'react-router-dom';
import './App.css';
import Footer from './components/Footer.tsx';
import Navbar from './components/Navbar.tsx';
import Report from './pages/Report.tsx';
import Home from "./pages/Home.tsx";
import Issues from './pages/Issues.tsx';
import IssueDetails from './pages/Issue.tsx';

const App: React.FC = () => {
  return (
    <div>
      <Navbar />
        <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/report' element={<Report/>} />
        <Route path='/issues' element={<Issues/>} />
        <Route path='/issues/:id' element={<IssueDetails/>} />
        </Routes>
      <Footer />
    </div>
  )
}

export default App
