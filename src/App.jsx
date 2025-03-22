import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Entrepreneurs from '../src/components/Entrepreneurs/Entrepreneurs';
import WomenEntrepreneurForm from './components/WomenEntrepreneurs/WomenEntrepreneurForm';
import BusinessList from './components/BusinessList/BusinessList';
import Home from './components/Home/Home';

function App() {
    return (
        <Router>
            <div className="container mx-auto p-4">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/entrepreneur-form" element={<WomenEntrepreneurForm />} />
                    <Route path="/entrepreneurs" element={<Entrepreneurs />} />
                    <Route path="/business-list" element={<BusinessList />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
