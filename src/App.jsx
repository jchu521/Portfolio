import ThemeContext from './context/ThemeContext';
import { useTheme } from './hooks/useTheme';
import useActiveSection from './hooks/useActiveSection';
import useHeroReveal from './hooks/useHeroReveal';
import TopBar from './sections/TopBar';
import Hero from './sections/Hero';
import StickyNav from './sections/StickyNav';
import JourneySection from './sections/JourneySection';
import SkillsSection from './sections/SkillsSection';
import Footer from './sections/Footer';

export default function App() {
  const active = useActiveSection(['journey', 'skills']);
  const [theme, setTheme] = useTheme();
  const toggleTheme = () => setTheme((t) => (t === 'dark' ? 'light' : 'dark'));
  const { revealed, heroRef, revealAndScroll } = useHeroReveal('journey');

  return (
    <ThemeContext.Provider value={theme}>
      <TopBar theme={theme} onToggleTheme={toggleTheme} />
      <main>
        <Hero ref={heroRef} onExplore={revealAndScroll} />
        {revealed && (
          <>
            <StickyNav active={active} />
            <JourneySection />
            <SkillsSection />
          </>
        )}
      </main>
      <Footer />
    </ThemeContext.Provider>
  );
}
