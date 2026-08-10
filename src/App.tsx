import { Routes, Route, Navigate } from 'react-router-dom';
import { LanguageProvider } from './contexts/LanguageContext';
import { Layout } from './components/Layout';
import { HomePage } from './pages/HomePage';
import { PrayPage } from './pages/PrayPage';
import { StreakCalendarPage } from './pages/StreakCalendarPage';

function App() {
  return (
    <LanguageProvider>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/pray/:mysterySetId" element={<PrayPage />} />
          <Route path="/pray/:mysterySetId/:step" element={<PrayPage />} />
          <Route path="/calendar" element={<StreakCalendarPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Layout>
    </LanguageProvider>
  );
}

export default App
