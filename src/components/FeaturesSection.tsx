import { Code2, Gavel, ShieldCheck, Cpu } from 'lucide-react';
import { motion } from 'motion/react';

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.12 }
  }
};

const item = {
  hidden: { opacity: 0, y: 15 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4 } }
};

export function FeaturesSection() {
  return (
    <section className="flex flex-col gap-8 max-w-6xl mx-auto w-full">
      <div className="flex flex-col gap-2 text-center max-w-2xl mx-auto">
        <div className="font-mono-eyebrow text-mono-eyebrow bronze-text tracking-widest uppercase">
          ENGINEERED FOR PRODUCTION
        </div>
        <h2 className="font-headline-lg text-headline-lg text-on-background">
          Why agent security is an execution problem.
        </h2>
      </div>

      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 border border-white/10 rounded-xl overflow-hidden glass-panel w-full"
      >
        <motion.div variants={item} className="p-6 flex flex-col gap-3 relative border-b lg:border-b-0 lg:border-r border-white/5 bg-[#14181C]">
          <div className="w-10 h-10 rounded-lg code-window flex items-center justify-center text-primary border border-primary/20">
            <Code2 className="w-5 h-5" />
          </div>
          <h3 className="font-headline-md text-base text-on-background font-semibold">
            Policy as Code
          </h3>
          <p className="font-mono-code text-mono-code text-on-surface-variant text-xs leading-relaxed">
            Define allowed actions in YAML or via fluent Python builders. Version control security boundaries alongside your agent logic.
          </p>
        </motion.div>

        <motion.div variants={item} className="p-6 flex flex-col gap-3 relative border-b lg:border-b-0 lg:border-r border-white/5 bg-[#14181C]">
          <div className="w-10 h-10 rounded-lg code-window flex items-center justify-center text-primary border border-primary/20">
            <Gavel className="w-5 h-5" />
          </div>
          <h3 className="font-headline-md text-base text-on-background font-semibold">
            Deterministic Engine
          </h3>
          <p className="font-mono-code text-mono-code text-on-surface-variant text-xs leading-relaxed">
            No probabilistic model in the loop guessing intent. Tool calls are evaluated deterministically against policy with append-only JSONL audit logs.
          </p>
        </motion.div>

        <motion.div variants={item} className="p-6 flex flex-col gap-3 relative border-b sm:border-b-0 sm:border-r border-white/5 bg-[#14181C]">
          <div className="w-10 h-10 rounded-lg code-window flex items-center justify-center text-[#74d4ea] border border-[#74d4ea]/20">
            <Cpu className="w-5 h-5" />
          </div>
          <h3 className="font-headline-md text-base text-on-background font-semibold">
            Kernel Containment
          </h3>
          <p className="font-mono-code text-mono-code text-on-surface-variant text-xs leading-relaxed">
            OS-level process sandboxing via Landlock &amp; seccomp-bpf on Linux, AppContainer &amp; Job Objects on Windows, and Seatbelt on macOS.
          </p>
        </motion.div>

        <motion.div variants={item} className="p-6 flex flex-col gap-3 relative bg-[#14181C]">
          <div className="w-10 h-10 rounded-lg code-window flex items-center justify-center text-primary-fixed-dim border border-primary-fixed-dim/20">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <h3 className="font-headline-md text-base text-on-background font-semibold">
            SHA-256 Manifest
          </h3>
          <p className="font-mono-code text-mono-code text-on-surface-variant text-xs leading-relaxed">
            Prebuilt wheels bundle native core binaries verified against an embedded SHA-256 manifest before execution, failing closed on mismatch.
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
}
