import logoImg from '../assets/asphallea-logo.jpeg';

export function Footer() {
  return (
    <footer className="w-full py-margin px-margin border-t border-outline-variant/20 flex flex-col md:flex-row justify-between items-center gap-gutter bg-surface z-10 mt-auto">
      <div className="flex items-center gap-3">
        <img
          src={logoImg}
          alt="Asphallea Logo"
          className="w-6 h-6 rounded object-cover border border-white/10"
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).src =
              'https://lh3.googleusercontent.com/aida-public/AB6AXuAG15-R8UDezNSm32oiScBDCAebIQMl743duNvIWAz5h5XHRpbQbMGAti344dnj0eTCK9HTKCzeeBtKTezvL1bTnwLifDPp8kOh5fRe60bsUBd4QRVFFJD2jCYWZfZyO3i54Up2XmhzmDlpbnwBHZ92GVwV9soN1sjTHTZawt99pJRx2X1CMv6jNol1kkp-pBXne08qSpdqc1f3EoOt8CkYhYw1OdDGCufdJC4727TAcx2gslzWUaWkl5ZxrYZKb2-vkg';
          }}
        />
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
