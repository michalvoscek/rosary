import { Routes, Route, Navigate } from 'react-router-dom';
import { LanguageProvider } from './contexts/LanguageContext';
import { Layout } from './components/Layout';
import { HomePage } from './pages/HomePage';
import { PrayPage } from './pages/PrayPage';
import { StreakCalendarPage } from './pages/StreakCalendarPage';
import { SettingsPage } from './pages/SettingsPage';
import {
  PageTransitionProvider,
  usePageTransition,
} from './hooks/usePageTransition';

function AnimatedRoutes() {
  const { direction, transitionId } = usePageTransition();
  const animationClass =
    transitionId > 0
      ? direction === 'forward'
        ? 'page-enter-forward'
        : 'page-enter-back'
      : '';

  return (
    <div key={transitionId} className={`flex flex-col flex-1 ${animationClass}`}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/pray/:mysterySetId" element={<PrayPage />} />
        <Route path="/pray/:mysterySetId/:step" element={<PrayPage />} />
        <Route path="/calendar" element={<StreakCalendarPage />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}

function App() {
  return (
    <LanguageProvider>
      <PageTransitionProvider>
        <Layout>
          <AnimatedRoutes />
        </Layout>
      </PageTransitionProvider>
    </LanguageProvider>
  );
}

export default App
