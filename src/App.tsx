/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Background3D } from './components/Background3D';
import { ComparisonStrip } from './components/ComparisonStrip';
import { FeaturesSection } from './components/FeaturesSection';
import { Footer } from './components/Footer';
import { HeroSection } from './components/HeroSection';
import { IntegrationSection } from './components/IntegrationSection';
import { McpSection } from './components/McpSection';
import { Navbar } from './components/Navbar';
import { ProblemBand } from './components/ProblemBand';

export default function App() {
  return (
    <>
      <Background3D />
      <div className="watermark">A</div>
      <Navbar />
      <main className="flex-grow pt-32 pb-24 px-margin max-w-container-max mx-auto w-full relative z-10 flex flex-col gap-32">
        <HeroSection />
        <ProblemBand />
        <McpSection />
        <IntegrationSection />
        <FeaturesSection />
        <ComparisonStrip />
      </main>
      <Footer />
    </>
  );
}
