/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { Background3D } from './components/Background3D';
import { ComparisonStrip } from './components/ComparisonStrip';
import { ContainmentMatrixSection } from './components/ContainmentMatrixSection';
import { DocsPage } from './components/DocsPage';
import { EnterprisePage } from './components/EnterprisePage';
import { EnterprisePreviewSection } from './components/EnterprisePreviewSection';
import { FeaturesSection } from './components/FeaturesSection';
import { Footer } from './components/Footer';
import { HeroSection } from './components/HeroSection';
import { IntegrationSection } from './components/IntegrationSection';
import { McpSection } from './components/McpSection';
import { Navbar } from './components/Navbar';
import { PolicyBuilderSection } from './components/PolicyBuilderSection';
import { ProblemBand } from './components/ProblemBand';
import { QuickstartSection } from './components/QuickstartSection';
import { SandboxTerminalSection } from './components/SandboxTerminalSection';
import { DemoRequestModal } from './components/DemoRequestModal';

export default function App() {
  const [activeView, setActiveView] = useState<'home' | 'enterprise' | 'docs'>('home');
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);

  // Sync state with URL path
  useEffect(() => {
    const syncViewFromPath = () => {
      const path = window.location.pathname.toLowerCase();
      if (path === '/enterprise') {
        setActiveView('enterprise');
      } else if (path === '/docs') {
        setActiveView('docs');
      } else {
        setActiveView('home');
      }
    };

    syncViewFromPath();
    window.addEventListener('popstate', syncViewFromPath);
    return () => window.removeEventListener('popstate', syncViewFromPath);
  }, []);

  const handleNavigate = (view: 'home' | 'enterprise' | 'docs') => {
    setActiveView(view);
    const targetPath = view === 'home' ? '/' : `/${view}`;
    if (window.location.pathname !== targetPath) {
      window.history.pushState(null, '', targetPath);
    }
  };

  const handleExploreOSS = () => {
    if (activeView !== 'home') {
      handleNavigate('home');
    }
    setTimeout(() => {
      const el = document.getElementById('quickstart');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 50);
  };

  return (
    <>
      <Background3D />
      <Navbar
        activeView={activeView}
        onNavigate={handleNavigate}
        onOpenDemo={() => setIsDemoModalOpen(true)}
      />

      <main className="flex-grow pt-28 pb-20 px-4 sm:px-6 max-w-container-max mx-auto w-full relative z-10 flex flex-col gap-24 sm:gap-28">
        {activeView === 'home' && (
          <>
            <HeroSection
              onOpenDemo={() => setIsDemoModalOpen(true)}
              onExploreOSS={handleExploreOSS}
            />
            <ProblemBand />
            <QuickstartSection />
            <SandboxTerminalSection />
            <PolicyBuilderSection />
            <ContainmentMatrixSection />
            <McpSection />
            <IntegrationSection />
            <FeaturesSection />
            <ComparisonStrip />
            <EnterprisePreviewSection
              onOpenDemo={() => setIsDemoModalOpen(true)}
              onViewEnterprisePage={() => {
                handleNavigate('enterprise');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />
          </>
        )}

        {activeView === 'enterprise' && (
          <EnterprisePage onOpenDemo={() => setIsDemoModalOpen(true)} />
        )}

        {activeView === 'docs' && <DocsPage />}
      </main>

      <Footer
        onNavigate={handleNavigate}
        onOpenDemo={() => setIsDemoModalOpen(true)}
      />

      <DemoRequestModal
        isOpen={isDemoModalOpen}
        onClose={() => setIsDemoModalOpen(false)}
      />
    </>
  );
}
