import { motion } from 'motion/react';
import { FileWarning, Ban, Terminal, ShieldAlert, CheckCircle2 } from 'lucide-react';

export function ProblemBand() {
  const scenarios = [
    {
      title: 'Restricting Filesystem Scope',
      icon: FileWarning,
      badge: 'Policy Tier',
      description:
        'When an agent is prompted or drifts into reading directories outside its project folder (such as ~/.ssh, /etc, or parent repos), Asphallea evaluates the declared path arguments before the tool call executes and refuses the operation.',
      scope: 'Supported: Declared tool path arguments mapped via reads/writes in policy.',
    },
    {
      title: 'Forbidding Dangerous Tool Invocations',
      icon: Ban,
      badge: 'Policy Tier',
      description:
        'Agents connected to multi-tool servers or MCP endpoints can be barred from calling destructive actions (such as filesystem.delete, drop_table, or raw execution tools), regardless of what prompt or user instruction initiated the call.',
      scope: 'Supported: Explicit tool allowlists and denylists enforced at the adapter boundary.',
    },
    {
      title: 'OS Containment for Shell & Code Execution',
      icon: Terminal,
      badge: 'Containment Tier',
      description:
        'When an agent is legitimately permitted to execute bash commands, Python scripts, or compilers, policy inspection alone cannot govern what child processes do. Asphallea launches them under platform-native OS sandboxing (Landlock/seccomp on Linux, AppContainers on Windows, Seatbelt on macOS).',
      scope: 'Supported: Subprocesses invoked through sandbox.run(), failing closed if kernel primitives are missing.',
    },
    {
      title: 'Deterministic Visibility & Audit Records',
      icon: ShieldAlert,
      badge: 'Audit Engine',
      description:
        'Engineering teams require verifiable records of what their autonomous agents attempted, allowed, or were denied. Asphallea outputs append-only JSONL event logs with deterministic secret and credential redaction.',
      scope: 'Supported: Local file or streaming JSONL audit logs with configurable pattern scrubbers.',
    },
  ];

  return (
    <section className="flex flex-col gap-10 max-w-6xl mx-auto w-full scroll-mt-24">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.5 }}
        className="flex flex-col gap-3 text-center max-w-3xl mx-auto"
      >
        <div className="font-mono-eyebrow text-mono-eyebrow bronze-text tracking-widest uppercase">
          CONCRETE PROBLEMS &amp; USE CASES
        </div>
        <h2 className="font-headline-lg text-headline-lg text-on-background">
          Real agent hazards require real boundary enforcement.
        </h2>
        <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
          AI agents execute tool calls and spawn processes in real environments. Rather than attempting to guess semantic intent from prompt text, Asphallea places deterministic controls at the tool boundary and beneath subprocesses.
        </p>
      </motion.div>

      {/* 4 Practical Use Cases Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {scenarios.map((sc, idx) => {
          const Icon = sc.icon;
          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="code-window rounded-xl p-6 border border-white/10 flex flex-col gap-4 bg-[#161B20] hover:border-primary/40 transition-colors"
            >
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-lg bg-surface-container-high border border-white/10 flex items-center justify-center text-primary">
                  <Icon className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-mono-code px-2 py-0.5 rounded bg-white/5 border border-white/10 text-primary">
                  {sc.badge}
                </span>
              </div>

              <div className="flex flex-col gap-1.5">
                <h3 className="font-headline-md text-base text-on-background font-semibold">
                  {sc.title}
                </h3>
                <p className="text-xs text-on-surface-variant leading-relaxed">
                  {sc.description}
                </p>
              </div>

              <div className="pt-3 border-t border-white/5 flex items-start gap-2 text-[11px] text-on-surface-variant/80 font-mono-code">
                <CheckCircle2 className="w-3.5 h-3.5 text-primary shrink-0 mt-0.5" />
                <span>{sc.scope}</span>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Honest Boundary Callout */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="glass-panel p-5 rounded-xl border border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-on-surface-variant leading-relaxed"
      >
        <div>
          <span className="text-primary font-semibold font-mono-code mr-1">Enforcement Scope Notice:</span>
          Asphallea governs execution through its integrated adapters and <code className="text-white">sandbox.run</code> paths. It does not parse natural language prompts, claim to understand custom business authorization models out-of-the-box, or eliminate the need for application-level authentication.
        </div>
      </motion.div>
    </section>
  );
}
