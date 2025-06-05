import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import LoginSelect from './pages/LoginSelect';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainTabsPage from './pages/MainTabsPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginSelect />} />
        <Route path="/Signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/home" element={<MainTabsPage />} />
      </Routes>
    </Router>
  );
}

export default App;
