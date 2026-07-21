import { motion } from 'motion/react';

export function ComparisonStrip() {
  return (
    <>
      {/* Comparison Strip */}
      <motion.section
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.5 }}
        className="flex flex-col rounded-xl overflow-hidden border border-white/10 font-mono-code text-mono-code text-sm max-w-6xl mx-auto w-full text-center md:text-left"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 p-6 border-b border-white/5 bg-surface-container-high/50 text-on-surface-variant gap-4 md:gap-0">
          <div className="md:pr-6">
            Text-level guardrails: inspect prompts, guess intent, miss the
            action
          </div>
          <div className="bronze-text font-bold md:pl-6 md:border-l border-white/5 pt-4 md:pt-0 border-t md:border-t-0 mt-4 md:mt-0">
            Asphallea: inspects the action, enforces policy, deterministic.
          </div>
        </div>
      </motion.section>

      {/* Credibility */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="text-center max-w-3xl mx-auto w-full"
      >
        <p className="font-mono-eyebrow text-mono-eyebrow text-on-surface-variant/60 uppercase tracking-widest leading-relaxed">
          Built by a security engineer with a background in malware
          reverse-engineering.
        </p>
      </motion.section>
    </>
  );
}
