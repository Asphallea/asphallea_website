import { Copy, Check, Star, ArrowRight, ShieldCheck, Terminal, Layers } from 'lucide-react';
import { motion } from 'motion/react';
import { useState } from 'react';

interface HeroSectionProps {
  onOpenDemo: () => void;
  onExploreOSS: () => void;
}

export function HeroSection({ onOpenDemo, onExploreOSS }: HeroSectionProps) {
  const [copied, setCopied] = useState(false);
  const installCmd = 'pip install asphallea';

  const handleCopy = () => {
    navigator.clipboard.writeText(installCmd);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="product" className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center max-w-6xl mx-auto w-full pt-4 min-w-0 max-w-full">
      {/* Left Column: Copy & Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="lg:col-span-6 flex flex-col gap-6 items-center text-center lg:items-start lg:text-left min-w-0 max-w-full"
      >
        <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2">
          <span className="font-mono-eyebrow text-mono-eyebrow bronze-text tracking-widest uppercase">
            RUNTIME SECURITY FOR AI AGENTS
          </span>
          <span className="text-[11px] font-mono-code bg-white/5 border border-primary/25 text-primary px-2 py-0.5 rounded-full">
            v0.1.1 on PyPI
          </span>
        </div>

        <h1 className="font-headline-xl text-headline-xl text-on-background">
          A firewall for what your AI agents do.
        </h1>

        <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl leading-relaxed">
          Asphallea enforces explicit least-privilege policies on integrated tool calls, with OS kernel containment for supported shell and code execution paths. It secures what agents do, not what they say.
        </p>

        {/* Dual Conversion Actions */}
        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto pt-1">
          <button
            onClick={onOpenDemo}
            className="px-6 py-3.5 rounded btn-primary font-mono-eyebrow text-xs uppercase tracking-wider font-bold transition-all hover:scale-95 flex items-center justify-center gap-2 shadow-sm"
          >
            <span>Book a technical demo</span>
            <ArrowRight className="w-4 h-4" />
          </button>
          <a
            href="#quickstart"
            onClick={(e) => {
              if (!e.metaKey && !e.ctrlKey && !e.shiftKey && !e.altKey && e.button === 0) {
                e.preventDefault();
                onExploreOSS();
              }
            }}
            className="px-6 py-3.5 rounded btn-ghost font-mono-eyebrow text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary"
          >
            <Terminal className="w-4 h-4 text-primary" />
            <span>Try open-source runtime</span>
          </a>
        </div>

        {/* Installation snippet with transparency */}
        <div className="flex flex-col gap-2 w-full max-w-lg mt-2 text-left">
          <div className="flex items-center justify-between w-full code-window rounded px-4 py-3 border border-white/10 input-focus-bronze transition-colors overflow-hidden">
            <span className="text-primary font-mono-code font-bold mr-2 text-sm select-none">$</span>
            <code className="font-mono-code text-mono-code text-on-surface truncate flex-1" title={installCmd}>
              {installCmd}
            </code>
            <button
              onClick={handleCopy}
              className="text-on-surface-variant hover:text-primary transition-colors flex-shrink-0 p-1 rounded"
              title="Copy install command"
              aria-label="Copy install command"
            >
              {copied ? (
                <Check className="w-4 h-4 text-primary" />
              ) : (
                <Copy className="w-4 h-4" />
              )}
            </button>
          </div>
          <span className="text-[11px] font-mono-code text-on-surface-variant/80 px-1 leading-normal">
            Prebuilt wheels bundle hash-verified core binaries on Linux, macOS (Apple Silicon &amp; Intel), and Windows. No Rust toolchain required for consumers.
          </span>
        </div>
      </motion.div>

      {/* Right Column: Verified Policy & Execution Flow */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.15 }}
        className="lg:col-span-6 flex flex-col gap-4 w-full min-w-0 max-w-full"
      >
        {/* Verified Declarative Policy Window */}
        <div className="code-window rounded-xl overflow-hidden shadow-2xl flex flex-col border border-white/10 w-full min-w-0 max-w-full">
          <div className="bg-surface-container-high px-4 py-2.5 border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-red-400/80"></span>
              <span className="w-2.5 h-2.5 rounded-full bg-amber-400/80"></span>
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400/80"></span>
              <span className="font-mono-eyebrow text-xs text-on-surface-variant ml-1 font-semibold">
                policy.yaml (Real Asphallea Schema)
              </span>
            </div>
            <span className="text-[11px] font-mono-code text-primary bg-primary/10 px-2 py-0.5 rounded border border-primary/20">
              Deterministic Rules
            </span>
          </div>

          <div className="p-4 font-mono-code text-xs text-on-surface whitespace-pre-wrap leading-relaxed overflow-x-auto bg-[#13171A]">
            <span className="text-on-surface-variant/70"># Declarative least-privilege policy</span>
            <br />
            <span className="text-tertiary">name</span>: <span className="text-[#ffdcc2]">"workspace-agent"</span>
            <br />
            <br />
            <span className="text-tertiary">tools</span>:
            <br />
            {'  '}<span className="text-tertiary">allow</span>:
            <br />
            {'    '}- <span className="text-[#a8edff]">filesystem.read</span>
            <br />
            {'    '}- <span className="text-[#a8edff]">run_shell</span>
            <br />
            {'  '}<span className="text-tertiary">deny</span>:
            <br />
            {'    '}- <span className="text-[#ffb4ab]">filesystem.delete</span>
            <br />
            {'  '}<span className="text-tertiary">args</span>:
            <br />
            {'    '}<span className="text-[#a8edff]">filesystem.read</span>: {'{ '}<span className="text-tertiary">reads</span>: <span className="text-[#ffdcc2]">path</span>{' }'}
            <br />
            <br />
            <span className="text-tertiary">filesystem</span>:
            <br />
            {'  '}<span className="text-tertiary">read</span>: [<span className="text-[#ffdcc2]">"./workspace"</span>]
            <br />
            {'  '}<span className="text-tertiary">write</span>: [<span className="text-[#ffdcc2]">"./workspace/out"</span>]
            <br />
            <br />
            <span className="text-tertiary">network</span>:
            <br />
            {'  '}<span className="text-tertiary">default</span>: <span className="text-[#ffb4ab]">deny</span>
          </div>
        </div>

        {/* Runtime Interception & Containment Log */}
        <div className="code-window rounded-xl p-4 font-mono-code text-xs text-on-surface flex flex-col gap-2.5 border border-white/10 bg-[#161B20]">
          <div className="flex items-center justify-between border-b border-white/10 pb-2">
            <span className="text-[11px] font-mono-eyebrow text-on-surface-variant uppercase tracking-wider flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-primary" />
              Runtime Decision Log
            </span>
            <span className="text-[10px] text-on-surface-variant/70">append-only jsonl</span>
          </div>

          {/* Event 1: Permitted inside workspace */}
          <div className="flex items-start gap-2 text-xs">
            <span className="text-emerald-400 font-bold shrink-0">[ALLOW]</span>
            <span className="text-on-surface-variant">
              tool <code className="text-white">filesystem.read("./workspace/spec.md")</code> permitted by path allowlist.
            </span>
          </div>

          {/* Event 2: Denied outside workspace */}
          <div className="flex items-start gap-2 text-xs">
            <span className="text-[#ffb4ab] font-bold shrink-0">[DENY]</span>
            <span className="text-on-surface-variant">
              tool <code className="text-white">filesystem.read("/etc/passwd")</code> denied: outside read prefix.
            </span>
          </div>

          {/* Event 3: Contained subprocess execution */}
          <div className="flex items-start gap-2 text-xs">
            <span className="text-[#74d4ea] font-bold shrink-0">[CONTAINED]</span>
            <span className="text-on-surface-variant">
              subprocess <code className="text-white">sandbox.run(["bash", "-c", "..."])</code> trapped by OS Landlock/Seatbelt.
            </span>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
