import { Star } from 'lucide-react';

export function Navbar() {
  return (
    <nav className="fixed top-0 w-full z-50 flex justify-between items-center px-margin h-16 max-w-container-max mx-auto glass-panel">
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
      <div className="hidden md:flex items-center gap-8">
        <a
          className="font-mono-eyebrow text-mono-eyebrow text-on-surface-variant hover:text-primary transition-colors"
          href="#"
        >
          Docs
        </a>
        <a
          className="font-mono-eyebrow text-mono-eyebrow text-on-surface-variant hover:text-primary transition-colors"
          href="#"
        >
          Security
        </a>
        <a
          className="font-mono-eyebrow text-mono-eyebrow text-on-surface-variant hover:text-primary transition-colors"
          href="#"
        >
          Manifesto
        </a>
        <a
          className="font-mono-eyebrow text-mono-eyebrow text-on-surface-variant hover:text-primary transition-colors"
          href="#"
        >
          Changelog
        </a>
        <a
          className="flex items-center gap-2 px-3 py-1.5 rounded-DEFAULT btn-primary font-mono-eyebrow text-mono-eyebrow transition-all hover:scale-95"
          href="#"
        >
          <Star className="w-4 h-4 fill-current" />
          Star on GitHub
          <span className="opacity-80 ml-1 border-l border-surface/20 pl-2">
            1.2k
          </span>
        </a>
      </div>
    </nav>
  );
}
