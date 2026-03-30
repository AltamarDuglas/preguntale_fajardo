import { useState, useEffect } from 'react';
import { useNavigation } from './hooks/useNavigation';
import { useQuestions } from './hooks/useQuestions';

import Header from './components/layout/Header';
import Navigation from './components/layout/Navigation';
import HomeScreen from './components/screens/HomeScreen';
import ProposalsScreen from './components/screens/ProposalsScreen';
import HistoryScreen from './components/screens/HistoryScreen';
import AdminLogin from './components/admin/AdminLogin';
import SergioDashboard from './components/admin/SergioDashboard';
import AdminDashboard from './components/admin/AdminDashboard';
import ReplierDashboard from './components/admin/ReplierDashboard';

/**
 * App Root - Versión UX 4.0 (Interactúa + Informa + Sigue)
 */
export default function App() {
  const { currentScreen, navigateTo } = useNavigation();
  const { remaining, questions, submitQuestion, refresh, totalCount } = useQuestions();
  const [adminUser, setAdminUser] = useState(null);

  // Verificar sesión administrativa al cargar
  useEffect(() => {
    const savedSession = localStorage.getItem('fajardo_admin_session');
    if (savedSession) {
        setAdminUser(JSON.parse(savedSession).user);
    }
  }, []);

  const handleAdminLogout = () => {
    localStorage.removeItem('fajardo_admin_session');
    setAdminUser(null);
  };

  // RENDERIZADO DE VISTAS ADMINISTRATIVAS
  if (currentScreen === 'admin-portal') {
    if (!adminUser) {
        return <AdminLogin onLoginSuccess={(user) => setAdminUser(user)} navigateTo={navigateTo} />;
    }

    if (adminUser.role === 'ADMIN') {
        return <AdminDashboard user={adminUser} onLogout={handleAdminLogout} />;
    } else if (adminUser.role === 'SERGIO') {
        return <SergioDashboard user={adminUser} onLogout={handleAdminLogout} />;
    } else {
        return <ReplierDashboard user={adminUser} onLogout={handleAdminLogout} />;
    }
  }

  return (
    <main className="page">
      <section className="app-container">
        
        <Header />

        <section className="content">
          {currentScreen === 'screen-home' && (
            <HomeScreen 
                navigateTo={navigateTo} 
                remaining={remaining} 
                submitQuestion={submitQuestion} 
                totalCount={totalCount}
            />
          )}
          {currentScreen === 'screen-proposals' && (
            <ProposalsScreen />
          )}
          {currentScreen === 'screen-history' && (
            <HistoryScreen questions={questions} refresh={refresh} />
          )}
        </section>

        <Navigation currentScreen={currentScreen} navigateTo={navigateTo} />
      </section>
    </main>
  );
}
