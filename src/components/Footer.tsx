import logoImg from '../assets/asphallea-logo.jpeg';
import { ArrowRight, ExternalLink } from 'lucide-react';

interface FooterProps {
  onNavigate: (view: 'home' | 'enterprise' | 'docs') => void;
  onOpenDemo: () => void;
}

export function Footer({ onNavigate, onOpenDemo }: FooterProps) {
  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, view: 'home' | 'enterprise' | 'docs') => {
    if (!e.metaKey && !e.ctrlKey && !e.shiftKey && !e.altKey && e.button === 0) {
      e.preventDefault();
      onNavigate(view);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <footer className="w-full border-t border-white/10 bg-[#14181C] z-10 mt-auto pt-12 pb-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col gap-10">
        {/* Top Callout / Closing Commercial Action */}
        <div className="code-window rounded-xl p-6 md:p-8 border border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 bg-[#161B20]">
          <div className="flex flex-col gap-1">
            <span className="font-mono-eyebrow text-xs bronze-text uppercase tracking-wider">
              READY TO SECURE YOUR AGENT DEPLOYMENT?
            </span>
            <h3 className="font-headline-md text-lg text-on-background font-bold">
              Start with the open-source runtime or schedule a technical evaluation.
            </h3>
          </div>
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={onOpenDemo}
              className="px-5 py-2.5 rounded btn-primary font-mono-eyebrow text-xs uppercase font-bold tracking-wider transition-all hover:scale-95 flex items-center justify-center gap-2 whitespace-nowrap w-full sm:w-auto"
            >
              <span>Book a technical demo</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Main Footer Links & Information */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 text-xs font-mono-code">
          {/* Brand Info */}
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2.5">
              <span className="w-7 h-7 shrink-0 overflow-hidden rounded flex items-center justify-center">
                <img
                  src={logoImg}
                  alt="Asphallea Logo"
                  className="w-full h-full object-cover scale-[2.6] origin-[50%_35%] invert mix-blend-screen"
                />
              </span>
              <span className="font-mono-eyebrow text-sm text-on-background font-bold tracking-wider">
                ASPHALLEA
              </span>
            </div>
            <p className="text-on-surface-variant/80 text-[11px] leading-relaxed">
              Open-source runtime security and OS containment for autonomous AI agents.
            </p>
            <span className="text-[10px] text-on-surface-variant/60">
              Open-core · Apache-2.0 License
            </span>
          </div>

          {/* Navigation */}
          <div className="flex flex-col gap-2">
            <span className="font-mono-eyebrow text-on-background uppercase tracking-wider text-[11px]">
              Navigation
            </span>
            <a
              href="/"
              onClick={(e) => handleLinkClick(e, 'home')}
              className="text-left text-on-surface-variant hover:text-primary transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary rounded"
            >
              Product Overview
            </a>
            <a
              href="/enterprise"
              onClick={(e) => handleLinkClick(e, 'enterprise')}
              className="text-left text-on-surface-variant hover:text-primary transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary rounded"
            >
              Enterprise Offering
            </a>
            <a
              href="/docs"
              onClick={(e) => handleLinkClick(e, 'docs')}
              className="text-left text-on-surface-variant hover:text-primary transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary rounded"
            >
              Documentation &amp; API
            </a>
          </div>

          {/* Open Source Resources */}
          <div className="flex flex-col gap-2">
            <span className="font-mono-eyebrow text-on-background uppercase tracking-wider text-[11px]">
              Open Source
            </span>
            <a
              href="https://github.com/Asphallea/Asphallea"
              target="_blank"
              rel="noopener noreferrer"
              className="text-on-surface-variant hover:text-primary transition-colors flex items-center gap-1"
            >
              <span>GitHub Repository</span>
              <ExternalLink className="w-3 h-3 opacity-60" />
            </a>
            <a
              href="https://pypi.org/project/asphallea/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-on-surface-variant hover:text-primary transition-colors flex items-center gap-1"
            >
              <span>PyPI Package (v0.1.1)</span>
              <ExternalLink className="w-3 h-3 opacity-60" />
            </a>
            <a
              href="https://github.com/Asphallea/Asphallea/releases"
              target="_blank"
              rel="noopener noreferrer"
              className="text-on-surface-variant hover:text-primary transition-colors flex items-center gap-1"
            >
              <span>Release Notes</span>
              <ExternalLink className="w-3 h-3 opacity-60" />
            </a>
          </div>

          {/* Trust & Security */}
          <div className="flex flex-col gap-2">
            <span className="font-mono-eyebrow text-on-background uppercase tracking-wider text-[11px]">
              Trust &amp; Governance
            </span>
            <a
              href="https://github.com/Asphallea/Asphallea/blob/main/SECURITY.md"
              target="_blank"
              rel="noopener noreferrer"
              className="text-on-surface-variant hover:text-primary transition-colors flex items-center gap-1"
            >
              <span>Security Policy</span>
              <ExternalLink className="w-3 h-3 opacity-60" />
            </a>
            <a
              href="https://github.com/Asphallea/Asphallea/blob/main/LICENSE"
              target="_blank"
              rel="noopener noreferrer"
              className="text-on-surface-variant hover:text-primary transition-colors flex items-center gap-1"
            >
              <span>Apache-2.0 License</span>
              <ExternalLink className="w-3 h-3 opacity-60" />
            </a>
            <span className="text-on-surface-variant/70 text-[11px]">
              Self-Hosted Runtime · No Telemetry Sent to Asphallea
            </span>
          </div>
        </div>

        {/* Bottom Strip */}
        <div className="border-t border-white/5 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-on-surface-variant/60 font-mono-code">
          <span>© 2026 Asphallea. All rights reserved.</span>
          <span>https://www.asphallea.tech</span>
        </div>
      </div>
    </footer>
  );
}
