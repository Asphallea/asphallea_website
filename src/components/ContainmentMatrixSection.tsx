import { motion } from 'motion/react';
import { ShieldAlert, Layers, CheckCircle2, XCircle } from 'lucide-react';

export function ContainmentMatrixSection() {
  const matrixData = [
    {
      capability: 'Policy Tier (Allow/Deny, Rates, Spend Caps)',
      linux: true,
      windows: true,
      macos: true,
    },
    {
      capability: 'JSONL Audit Trail & Secret Redaction',
      linux: true,
      windows: true,
      macos: true,
    },
    {
      capability: 'OS Filesystem Allowlist',
      linux: 'Landlock',
      windows: 'AppContainer',
      macos: 'Seatbelt',
    },
    {
      capability: 'OS Network Deny & Namespace Isolation',
      linux: 'seccomp + netns',
      windows: 'AppContainer',
      macos: 'Seatbelt',
    },
    {
      capability: 'Syscall Filtering',
      linux: 'seccomp-bpf',
      windows: 'N/A',
      macos: 'N/A',
    },
    {
      capability: 'OS Resource Limits (CPU, RAM, Max Procs)',
      linux: 'setrlimit',
      windows: 'Job Objects',
      macos: 'Planned',
    },
    {
      capability: 'Guaranteed Process Tree Termination',
      linux: 'PR_SET_PDEATHSIG',
      windows: 'Job Objects',
      macos: 'Process Group',
    },
  ];

  return (
    <section id="containment" className="flex flex-col gap-12 max-w-6xl mx-auto w-full scroll-mt-24">
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.5 }}
        className="flex flex-col gap-4 items-center text-center max-w-3xl mx-auto"
      >
        <div className="font-mono-eyebrow text-mono-eyebrow bronze-text tracking-widest uppercase flex items-center gap-2">
          <Layers className="w-4 h-4" />
          HONEST OS PLATFORM SUPPORT
        </div>
        <h2 className="font-headline-lg text-headline-lg text-on-background">
          Two tiers. Kernel-level enforcement.
        </h2>
        <p className="font-body-md text-body-md text-on-surface-variant">
          Pure-ML competitors filter text. Asphallea enforces OS containment using platform-native security engines on Linux, Windows, and macOS. Release wheels bundle prebuilt, code-signed, and SHA-256 verified core binaries with zero Rust toolchain setup required.
        </p>
      </motion.div>

      {/* Two Tiers Comparison Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="code-window rounded-xl p-6 border border-white/10 flex flex-col gap-4 relative overflow-hidden"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-surface-container-high flex items-center justify-center text-primary font-bold text-lg">
              01
            </div>
            <div>
              <h3 className="font-headline-md text-lg text-on-background font-semibold">
                Policy Tier (Cross-Platform)
              </h3>
              <p className="text-xs text-on-surface-variant">Runs identically on Linux, Windows, macOS</p>
            </div>
          </div>
          <p className="text-xs text-on-surface-variant leading-relaxed">
            Every tool call is intercepted, checked deterministically against declarative YAML or Python policies, allowed or denied before invocation, and written to an append-only JSONL audit log with secret scrubbing.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="code-window rounded-xl p-6 border border-white/10 flex flex-col gap-4 relative overflow-hidden"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-surface-container-high flex items-center justify-center text-[#74d4ea] font-bold text-lg">
              02
            </div>
            <div>
              <h3 className="font-headline-md text-lg text-on-background font-semibold">
                Containment Tier (OS Kernel Engine)
              </h3>
              <p className="text-xs text-on-surface-variant">High-blast-radius execution isolation</p>
            </div>
          </div>
          <p className="text-xs text-on-surface-variant leading-relaxed">
            For tools that execute shell commands or code, Asphallea’s native core (<code className="text-[#74d4ea]">asphallea-run</code>) applies kernel sandboxing to itself before executing untrusted agent code, failing closed if primitives are missing.
          </p>
        </motion.div>
      </div>

      {/* Capability Matrix Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="code-window rounded-xl overflow-hidden border border-white/10"
      >
        <div className="bg-surface-container-high px-6 py-4 border-b border-white/5 flex items-center justify-between">
          <span className="font-mono-eyebrow text-mono-eyebrow text-on-background font-semibold">
            Platform Capabilities Matrix
          </span>
          <span className="text-xs font-mono-code text-primary flex items-center gap-1">
            <ShieldAlert className="w-3.5 h-3.5" />
            Fails Closed by Default
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono-code border-collapse">
            <thead>
              <tr className="border-b border-white/5 bg-white/[0.02]">
                <th className="p-4 font-mono-eyebrow text-on-surface-variant uppercase">Security Capability</th>
                <th className="p-4 font-mono-eyebrow text-on-surface-variant uppercase text-center">Linux 5.13+</th>
                <th className="p-4 font-mono-eyebrow text-on-surface-variant uppercase text-center">Windows</th>
                <th className="p-4 font-mono-eyebrow text-on-surface-variant uppercase text-center">macOS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-on-surface">
              {matrixData.map((row, idx) => (
                <tr key={idx} className="hover:bg-white/[0.02] transition-colors">
                  <td className="p-4 font-semibold text-on-background">{row.capability}</td>
                  <td className="p-4 text-center">
                    {typeof row.linux === 'boolean' ? (
                      <CheckCircle2 className="w-4 h-4 text-primary mx-auto" />
                    ) : (
                      <span className="bg-white/5 px-2 py-0.5 rounded text-primary">{row.linux}</span>
                    )}
                  </td>
                  <td className="p-4 text-center">
                    {typeof row.windows === 'boolean' ? (
                      <CheckCircle2 className="w-4 h-4 text-primary mx-auto" />
                    ) : (
                      <span className="bg-white/5 px-2 py-0.5 rounded text-[#74d4ea]">{row.windows}</span>
                    )}
                  </td>
                  <td className="p-4 text-center">
                    {typeof row.macos === 'boolean' ? (
                      <CheckCircle2 className="w-4 h-4 text-primary mx-auto" />
                    ) : row.macos === 'Planned' ? (
                      <span className="text-on-surface-variant/50">{row.macos}</span>
                    ) : (
                      <span className="bg-white/5 px-2 py-0.5 rounded text-[#ffb4ab]">{row.macos}</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </section>
  );
}
