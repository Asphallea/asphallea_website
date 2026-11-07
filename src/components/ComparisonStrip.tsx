import { motion } from 'motion/react';

export function ComparisonStrip() {
  return (
    <div className="flex flex-col gap-6 max-w-6xl mx-auto w-full">
      {/* Comparison Strip */}
      <motion.section
        initial={{ opacity: 0.35, scale: 0.98 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: "0px 0px -40px 0px" }}
        transition={{ duration: 0.4 }}
        className="flex flex-col rounded-xl overflow-hidden border border-white/10 font-mono-code text-xs sm:text-sm w-full bg-[#14181C]"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 p-6 border-b border-white/5 gap-4 md:gap-0">
          <div className="md:pr-6 text-on-surface-variant flex flex-col gap-1">
            <span className="font-mono-eyebrow text-[11px] uppercase tracking-wider text-on-surface-variant/70">
              Prompt &amp; Text Classification Layer
            </span>
            <span>
              Inspects natural language prompt tokens, estimates intent probabilistically, misses tool argument mutations and direct child subprocess execution.
            </span>
          </div>
          <div className="md:pl-6 md:border-l border-white/10 pt-4 md:pt-0 border-t md:border-t-0 flex flex-col gap-1">
            <span className="font-mono-eyebrow text-[11px] uppercase tracking-wider text-primary">
              Asphallea Execution &amp; Containment Layer
            </span>
            <span className="text-on-background">
              Inspects declared tool arguments deterministically before invocation, logs append-only audit events, and confines subprocesses inside OS kernel sandboxes.
            </span>
          </div>
        </div>
      </motion.section>

      {/* Engineering Focus Credibility */}
      <div className="text-center max-w-2xl mx-auto">
        <p className="font-mono-eyebrow text-xs text-on-surface-variant/70 uppercase tracking-widest leading-relaxed">
          Open-core runtime architecture · Apache-2.0 License · No telemetry sent to Asphallea
        </p>
      </div>
    </div>
  );
}
