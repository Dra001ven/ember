import { Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import { useTheme } from './useTheme.js';
import { useReveal } from './useReveal.js';
import Home from './pages/Home.jsx';
import Menu from './pages/Menu.jsx';
import Gallery from './pages/Gallery.jsx';
import About from './pages/About.jsx';
import Reserve from './pages/Reserve.jsx';
import NotFound from './pages/NotFound.jsx';

export default function App() {
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();
  useReveal();

  return (
    <>
      <Header theme={theme} onToggleTheme={toggleTheme} />
      <main id="top" key={location.pathname}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/about" element={<About />} />
          <Route path="/reserve" element={<Reserve />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}
