import { Shield } from 'lucide-react';

export function Footer() {
  return (
    <footer className="w-full py-margin px-margin border-t border-outline-variant/20 flex flex-col md:flex-row justify-between items-center gap-gutter bg-surface z-10 mt-auto">
      <div className="flex items-center gap-3">
        <div className="w-6 h-6 rounded bg-surface-container-high border border-white/10 flex items-center justify-center text-primary">
          <Shield className="w-3.5 h-3.5" />
        </div>
        <span className="font-mono-eyebrow text-mono-eyebrow text-on-surface-variant font-bold tracking-wider">
          ASPHALLEA
        </span>
      </div>
      <div className="flex items-center gap-6">
        <a
          className="font-mono-eyebrow text-mono-eyebrow text-on-surface-variant hover:text-primary-fixed-dim transition-colors hover:underline decoration-primary/30"
          href="https://github.com/Asphallea/Asphallea"
          target="_blank"
          rel="noopener noreferrer"
        >
          GitHub
        </a>
        <a
          className="font-mono-eyebrow text-mono-eyebrow text-on-surface-variant hover:text-primary-fixed-dim transition-colors hover:underline decoration-primary/30"
          href="https://github.com/Asphallea/Asphallea"
          target="_blank"
          rel="noopener noreferrer"
        >
          Docs
        </a>
        <a
          className="font-mono-eyebrow text-mono-eyebrow text-on-surface-variant hover:text-primary-fixed-dim transition-colors hover:underline decoration-primary/30"
          href="#"
        >
          Changelog
        </a>
      </div>
      <div className="font-mono-eyebrow text-mono-eyebrow text-on-surface-variant/60">
        Open-core · Apache-2.0 · © 2026
      </div>
    </footer>
  );
}
