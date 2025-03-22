import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Entrepreneurs from './components/Entrepreneurs/Entrepreneurs';
import WomenEntrepreneurForm from './components/WomenEntrepreneurs/WomenEntrepreneurForm';
import BusinessList from './components/BusinessList/BusinessList';
import Home from './components/Home/Home';
import LeaderBoard from './components/LeaderBoards/InvestorLeaderboard';
import GeminiAnalysis from './components/AI/GeminiAnalysis';
import FinancialLearningPlatform from './components/FinancialLearningPlatform/FinancialLearningPlatform';
import AboutUs from './components/About/AboutUs';

function App() {
    return (
        <Router>
            <div className="container mx-auto p-4">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/entrepreneur-form" element={<WomenEntrepreneurForm />} />
                    <Route path="/entrepreneurs" element={<Entrepreneurs />} />
                    <Route path="/business-list" element={<BusinessList />} />
                    <Route path="/leaderboard" element={<LeaderBoard />} />
                    <Route path="/ai" element={<GeminiAnalysis />} />
                    <Route path="/financiallearningplatform" element={<FinancialLearningPlatform />} />
                    <Route path="/about" element={<AboutUs />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
