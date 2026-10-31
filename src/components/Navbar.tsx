import { Star, Menu, X, ArrowUpRight } from 'lucide-react';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import logoImg from '../assets/asphallea-logo.jpeg';

interface NavbarProps {
  activeView: 'home' | 'enterprise' | 'docs';
  onNavigate: (view: 'home' | 'enterprise' | 'docs') => void;
  onOpenDemo: () => void;
}

export function Navbar({ activeView, onNavigate, onOpenDemo }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [starCount, setStarCount] = useState<string>('1');

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
        // Fallback to default actual count if rate limited
      });
  }, []);

  const handleNavClick = (view: 'home' | 'enterprise' | 'docs', hash?: string) => {
    onNavigate(view);
    setIsOpen(false);
    if (hash) {
      setTimeout(() => {
        const el = document.querySelector(hash);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 50);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-40 glass-panel border-b border-white/10" aria-label="Main Navigation">
      <div className="flex justify-between items-center px-4 sm:px-6 h-16 max-w-6xl mx-auto w-full">
        {/* Brand Logo */}
        <button
          onClick={() => handleNavClick('home')}
          className="flex items-center gap-3 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded"
          aria-label="Asphallea Home"
        >
          <img
            src={logoImg}
            alt="Asphallea Logo"
            className="w-8 h-8 rounded object-cover border border-white/15"
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).src =
                'https://lh3.googleusercontent.com/aida-public/AB6AXuD-7Tx0WsMNc2_ouhCUfT_QwSQcBPn488UJTJY0s-j-zCLT445BO7mo2jqZ4BD-IbF2-ehFONqexAW1UMFXWgkkvUl9_xBR3a3iVVEekUs-irkHgpl1-VpvR05otT24gfoee_KM4GzX5PrzD5IcuiMVsSPA8viv8XYoRHmU4CcxG2T0bzXNYeMUnj6owuWfok8I8Tfi1cQaNSQp3FI2GNgoUNXN-ykM8IkTUkAjNJrmTeOVqR4GFf-blXHW9i6IzJ9ssg';
            }}
          />
          <div className="flex flex-col">
            <span className="font-headline-md text-base sm:text-lg font-bold tracking-tight text-on-background">
              ASPHALLEA
            </span>
            <span className="text-[10px] font-mono-code text-on-surface-variant/70 leading-none">
              Runtime Security for Agents
            </span>
          </div>
        </button>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6">
          <button
            onClick={() => handleNavClick('home', '#product')}
            className={`font-mono-eyebrow text-xs uppercase transition-colors px-1 py-1 ${
              activeView === 'home' ? 'text-primary font-bold' : 'text-on-surface-variant hover:text-on-background'
            }`}
          >
            Product
          </button>
          <button
            onClick={() => handleNavClick('enterprise')}
            className={`font-mono-eyebrow text-xs uppercase transition-colors px-1 py-1 ${
              activeView === 'enterprise' ? 'text-primary font-bold' : 'text-on-surface-variant hover:text-on-background'
            }`}
          >
            Enterprise
          </button>
          <button
            onClick={() => handleNavClick('docs')}
            className={`font-mono-eyebrow text-xs uppercase transition-colors px-1 py-1 ${
              activeView === 'docs' ? 'text-primary font-bold' : 'text-on-surface-variant hover:text-on-background'
            }`}
          >
            Developers / Docs
          </button>
          <a
            className="flex items-center gap-1.5 font-mono-eyebrow text-xs text-on-surface-variant hover:text-primary transition-colors"
            href="https://github.com/Asphallea/Asphallea"
            target="_blank"
            rel="noopener noreferrer"
            title="View open-source repository on GitHub"
          >
            <Star className="w-3.5 h-3.5 fill-current" />
            <span>GitHub</span>
            <span className="text-[10px] font-mono-code bg-white/5 border border-white/10 px-1.5 py-0.5 rounded text-on-surface-variant">
              {starCount}
            </span>
          </a>

          {/* Primary Commercial CTA */}
          <button
            onClick={onOpenDemo}
            className="px-4 py-2 rounded btn-primary font-mono-eyebrow text-xs uppercase tracking-wider font-bold transition-all hover:scale-95 shadow-sm"
          >
            Book a technical demo
          </button>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden text-on-surface-variant hover:text-primary transition-colors p-1"
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={isOpen}
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
            className="md:hidden overflow-hidden bg-surface-container-high/95 backdrop-blur-md border-b border-white/10"
          >
            <div className="flex flex-col px-6 py-4 gap-4">
              <button
                className={`text-left font-mono-eyebrow text-xs uppercase py-1 ${
                  activeView === 'home' ? 'text-primary font-bold' : 'text-on-surface-variant'
                }`}
                onClick={() => handleNavClick('home')}
              >
                Product Overview
              </button>
              <button
                className={`text-left font-mono-eyebrow text-xs uppercase py-1 ${
                  activeView === 'enterprise' ? 'text-primary font-bold' : 'text-on-surface-variant'
                }`}
                onClick={() => handleNavClick('enterprise')}
              >
                Enterprise Offering
              </button>
              <button
                className={`text-left font-mono-eyebrow text-xs uppercase py-1 ${
                  activeView === 'docs' ? 'text-primary font-bold' : 'text-on-surface-variant'
                }`}
                onClick={() => handleNavClick('docs')}
              >
                Developers / Documentation
              </button>
              <a
                className="flex items-center gap-2 font-mono-eyebrow text-xs text-on-surface-variant py-1"
                href="https://github.com/Asphallea/Asphallea"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Star className="w-3.5 h-3.5 fill-current" />
                <span>GitHub Repository ({starCount} stars)</span>
                <ArrowUpRight className="w-3.5 h-3.5 opacity-60 ml-auto" />
              </a>
              <button
                onClick={() => {
                  setIsOpen(false);
                  onOpenDemo();
                }}
                className="w-full py-2.5 rounded btn-primary font-mono-eyebrow text-xs uppercase tracking-wider font-bold text-center mt-2"
              >
                Book a technical demo
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
