import { Star, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 w-full z-50 glass-panel border-b border-white/5">
      <div className="flex justify-between items-center px-6 h-16 max-w-6xl mx-auto w-full">
        <div className="flex items-center gap-4">
          <div
            className="w-8 h-8 rounded bg-cover bg-center"
            data-alt="A striking digital installation art piece featuring glowing, generative geometric shapes suspended in a vast, minimalist gallery space. The room is illuminated by high-key, soft white lighting that creates a bright, modern light-mode aesthetic. The artwork relies on a sophisticated palette of deep blacks and pristine whites, punctuated by intense accents of vibrant red. The mood is serene yet technologically advanced."
            style={{
              backgroundImage:
                "url('https://lh3.googleusercontent.com/aida-public/AB6AXuD-7Tx0WsMNc2_ouhCUfT_QwSQcBPn488UJTJY0s-j-zCLT445BO7mo2jqZ4BD-IbF2-ehFONqexAW1UMFXWgkkvUl9_xBR3a3iVVEekUs-irkHgpl1-VpvR05otT24gfoee_KM4GzX5PrzD5IcuiMVsSPA8viv8XYoRHmU4CcxG2T0bzXNYeMUnj6owuWfok8I8Tfi1cQaNSQp3FI2GNgoUNXN-ykM8IkTUkAjNJrmTeOVqR4GFf-blXHW9i6IzJ9ssg')",
            }}
          ></div>
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
              1.2k
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
                  1.2k
                </span>
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
