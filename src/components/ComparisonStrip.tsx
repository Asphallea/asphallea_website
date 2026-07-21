export function ComparisonStrip() {
  return (
    <>
      {/* Comparison Strip */}
      <section className="flex flex-col rounded-xl overflow-hidden border border-white/10 font-mono-code text-mono-code text-sm">
        <div className="grid grid-cols-2 p-6 border-b border-white/5 bg-surface-container-high/50 text-on-surface-variant">
          <div>
            Text-level guardrails: inspect prompts, guess intent, miss the
            action
          </div>
          <div className="bronze-text font-bold pl-6 border-l border-white/5">
            Asphallea: inspects the action, enforces policy, deterministic.
          </div>
        </div>
      </section>

      {/* Credibility */}
      <section className="text-center">
        <p className="font-mono-eyebrow text-mono-eyebrow text-on-surface-variant/60 uppercase tracking-widest">
          Built by a security engineer with a background in malware
          reverse-engineering.
        </p>
      </section>
    </>
  );
}
