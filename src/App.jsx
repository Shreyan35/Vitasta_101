import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage.jsx';
import StoicStrengthPage from './pages/StoicStrengthPage.jsx';
import StoicBodyArticlePage from './pages/StoicBodyArticlePage.jsx';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/programs/stoic-strength" element={<StoicStrengthPage />} />
      <Route path="/articles/stoic-body" element={<StoicBodyArticlePage />} />
    </Routes>
  );
}
