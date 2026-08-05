/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Background3D } from './components/Background3D';
import { ComparisonStrip } from './components/ComparisonStrip';
import { ContainmentMatrixSection } from './components/ContainmentMatrixSection';
import { DocsSection } from './components/DocsSection';
import { EnterpriseSection } from './components/EnterpriseSection';
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

export default function App() {
  return (
    <>
      <Background3D />
      <Navbar />
      <main className="flex-grow pt-32 pb-24 px-margin max-w-container-max mx-auto w-full relative z-10 flex flex-col gap-32">
        <HeroSection />
        <QuickstartSection />
        <SandboxTerminalSection />
        <PolicyBuilderSection />
        <ContainmentMatrixSection />
        <ProblemBand />
        <McpSection />
        <IntegrationSection />
        <FeaturesSection />
        <ComparisonStrip />
        <DocsSection />
        <EnterpriseSection />
      </main>
      <Footer />
    </>
  );
}
