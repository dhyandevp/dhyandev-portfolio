import React, { useEffect, Suspense, lazy } from 'react';
import { LazyMotion, domAnimation, MotionConfig, m, AnimatePresence } from 'motion/react';
import { Navigation } from './components/Navigation';
import { Footer } from './components/Footer';
import { developerProfile } from './data/portfolioData';
import { initSmoothScroll } from './lib/scroll';
import { RouterProvider, useRouter } from './lib/router';

import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ProjectsPage from './pages/ProjectsPage';
import SpecializationsPage from './pages/SpecializationsPage';
import NotesPage from './pages/NotesPage';
import ContactPage from './pages/ContactPage';

// Dynamically import custom cursor so it only mounts if pointer: fine and hover: hover
const CustomCursor = lazy(() => import('./components/CustomCursor'));

const RouteView: React.FC = () => {
  const { path } = useRouter();

  const renderPage = () => {
    switch (path) {
      case '/':
        return <HomePage />;
      case '/about':
        return <AboutPage />;
      case '/projects':
        return <ProjectsPage />;
      case '/specializations':
        return <SpecializationsPage />;
      case '/notes':
      case '/laboratory':
        return <NotesPage />;
      case '/contact':
      case '/reachout':
        return <ContactPage />;
      default:
        return <HomePage />;
    }
  };

  return (
    <AnimatePresence mode="wait">
      <m.div
        key={path}
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -6 }}
        transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
        className="w-full flex-1"
      >
        {renderPage()}
      </m.div>
    </AnimatePresence>
  );
};

export const App: React.FC = () => {
  useEffect(() => {
    const cleanup = initSmoothScroll();
    return () => cleanup?.();
  }, []);

  return (
    <RouterProvider>
      <LazyMotion features={domAnimation} strict={false}>
        <MotionConfig reducedMotion="user">
          <div className="min-h-screen bg-[#F4F4F2] bg-dot-grid text-[#121211] flex flex-col font-sans selection:bg-[#121211] selection:text-[#F4F4F2] relative">
            {/* Custom Cursor for fine desktop pointers only */}
            <Suspense fallback={null}>
              <CustomCursor />
            </Suspense>

            {/* 1. Floating Pill Navigation Bar */}
            <Navigation />

            {/* 2. Main Page Content */}
            <main className="flex-1 w-full pt-16 sm:pt-20" id="main-content">
              <RouteView />
            </main>

            {/* 3. Footer with Monumental Signature Wordmark */}
            <Footer profile={developerProfile} />
          </div>
        </MotionConfig>
      </LazyMotion>
    </RouterProvider>
  );
};

export default App;
