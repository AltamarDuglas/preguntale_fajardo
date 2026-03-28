import { useNavigation } from './hooks/useNavigation';
import { useQuestions } from './hooks/useQuestions';

import Header from './components/layout/Header';
import Navigation from './components/layout/Navigation';
import HomeScreen from './components/screens/HomeScreen';
import HistoryScreen from './components/screens/HistoryScreen';

/**
 * App Root - Versión UX Unificada (Foco Colombia)
 */
export default function App() {
  const { currentScreen, navigateTo } = useNavigation();
  const { remaining, questions, submitQuestion } = useQuestions();

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
            />
          )}
          {currentScreen === 'screen-history' && (
            <HistoryScreen questions={questions} />
          )}
        </section>

        <Navigation currentScreen={currentScreen} navigateTo={navigateTo} />
      </section>
    </main>
  );
}
