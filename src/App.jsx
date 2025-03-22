import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Entrepreneurs from '../src/components/Entrepreneurs/Entrepreneurs';
import WomenEntrepreneurForm from './components/WomenEntrepreneurs/WomenEntrepreneurForm';
import BusinessList from './components/BusinessList/BusinessList';
import FinancialLearningPlatform from './components/financiallearningplatform/financiallearningplatform';
import AboutUs from './components/aboutus/aboutus';

function App() {
    return (
        <Router>
            <div className="container mx-auto p-4">
                <Routes>
                    <Route path="/entrepreneur-form" element={<WomenEntrepreneurForm />} />
                    <Route path="/entrepreneurs" element={<Entrepreneurs />} />
                    <Route path="/business-list" element={<BusinessList />} />
                    <Route path="/financiallearningplatform" element={<FinancialLearningPlatform />} />
                    <Route path="/aboutus" element={<AboutUs />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
