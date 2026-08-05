import { Star, Menu, X, Shield } from 'lucide-react';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [starCount, setStarCount] = useState<string>('1.2k');

  useEffect(() => {
    fetch('https://api.github.com/repos/Asphallea/Asphallea')
      .then((res) => res.json())
      .then((data) => {
        if (data && typeof data.stargazers_count === 'number') {
          const count = data.stargazers_count;
          if (count >= 1000) {
            setStarCount((count / 1000).toFixed(1) + 'k');
          } else {
            setStarCount(count.toString());
          }
        }
      })
      .catch(() => {
        // Fallback to default if rate limited
      });
  }, []);

  return (
    <nav className="fixed top-0 left-0 w-full z-50 glass-panel border-b border-white/5">
      <div className="flex justify-between items-center px-6 h-16 max-w-6xl mx-auto w-full">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded bg-surface-container-high border border-primary/30 flex items-center justify-center text-primary shadow-sm">
            <Shield className="w-5 h-5 text-primary" />
          </div>
          <span className="font-headline-md text-headline-md font-bold tracking-tighter text-on-background">
            ASPHALLEA
          </span>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6">
          <a
            className="font-mono-eyebrow text-mono-eyebrow text-on-surface-variant hover:text-primary transition-colors"
            href="#quickstart"
          >
            Quickstart
          </a>
          <a
            className="font-mono-eyebrow text-mono-eyebrow text-on-surface-variant hover:text-primary transition-colors"
            href="#sandbox-simulator"
          >
            Simulator
          </a>
          <a
            className="font-mono-eyebrow text-mono-eyebrow text-on-surface-variant hover:text-primary transition-colors"
            href="#policy-builder"
          >
            Builder
          </a>
          <a
            className="font-mono-eyebrow text-mono-eyebrow text-on-surface-variant hover:text-primary transition-colors"
            href="#containment"
          >
            OS Matrix
          </a>
          <a
            className="font-mono-eyebrow text-mono-eyebrow text-on-surface-variant hover:text-primary transition-colors"
            href="#docs"
          >
            Docs
          </a>
          <a
            className="font-mono-eyebrow text-mono-eyebrow text-on-surface-variant hover:text-primary transition-colors"
            href="#enterprise"
          >
            Enterprise
          </a>
          <a
            className="flex items-center gap-2 px-3 py-1.5 rounded-DEFAULT btn-primary font-mono-eyebrow text-mono-eyebrow transition-all hover:scale-95"
            href="https://github.com/Asphallea/Asphallea"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Star className="w-4 h-4 fill-current" />
            Star on GitHub
            <span className="opacity-80 ml-1 border-l border-surface/20 pl-2">
              {starCount}
            </span>
          </a>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden text-on-surface-variant hover:text-primary transition-colors"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden overflow-hidden bg-surface-container-high/95 backdrop-blur-md border-b border-white/5"
          >
            <div className="flex flex-col px-6 py-4 gap-4">
              <a
                className="font-mono-eyebrow text-mono-eyebrow text-on-surface-variant hover:text-primary transition-colors"
                href="#quickstart"
                onClick={() => setIsOpen(false)}
              >
                Quickstart
              </a>
              <a
                className="font-mono-eyebrow text-mono-eyebrow text-on-surface-variant hover:text-primary transition-colors"
                href="#sandbox-simulator"
                onClick={() => setIsOpen(false)}
              >
                Simulator
              </a>
              <a
                className="font-mono-eyebrow text-mono-eyebrow text-on-surface-variant hover:text-primary transition-colors"
                href="#policy-builder"
                onClick={() => setIsOpen(false)}
              >
                Builder
              </a>
              <a
                className="font-mono-eyebrow text-mono-eyebrow text-on-surface-variant hover:text-primary transition-colors"
                href="#containment"
                onClick={() => setIsOpen(false)}
              >
                OS Matrix
              </a>
              <a
                className="font-mono-eyebrow text-mono-eyebrow text-on-surface-variant hover:text-primary transition-colors"
                href="#docs"
                onClick={() => setIsOpen(false)}
              >
                Docs
              </a>
              <a
                className="font-mono-eyebrow text-mono-eyebrow text-on-surface-variant hover:text-primary transition-colors"
                href="#enterprise"
                onClick={() => setIsOpen(false)}
              >
                Enterprise
              </a>
              <a
                className="flex items-center justify-center gap-2 px-3 py-3 rounded-DEFAULT btn-primary font-mono-eyebrow text-mono-eyebrow transition-all w-full mt-2"
                href="https://github.com/Asphallea/Asphallea"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Star className="w-4 h-4 fill-current" />
                Star on GitHub
                <span className="opacity-80 ml-1 border-l border-surface/20 pl-2">
                  {starCount}
                </span>
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
