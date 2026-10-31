import { motion } from 'motion/react';
import { ShieldAlert, Layers, CheckCircle2 } from 'lucide-react';

export function ContainmentMatrixSection() {
  const matrixData = [
    {
      capability: 'Policy Tier (Tool Allow/Deny, Rates, Spend Caps)',
      linux: true,
      windows: true,
      macos: true,
    },
    {
      capability: 'JSONL Audit Trail & Pattern Secret Redaction',
      linux: true,
      windows: true,
      macos: true,
    },
    {
      capability: 'OS Filesystem Allowlist',
      linux: 'Landlock (Kernel 5.13+)',
      windows: 'AppContainer',
      macos: 'Seatbelt (sandbox-exec)',
    },
    {
      capability: 'OS Subprocess Network Deny',
      linux: 'seccomp-bpf + netns',
      windows: 'AppContainer',
      macos: 'Seatbelt profile',
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
      capability: 'Process Tree Termination & Subprocess Bounds',
      linux: 'PR_SET_PDEATHSIG',
      windows: 'Job Objects',
      macos: 'Process Group kill',
    },
    {
      capability: 'Core Binary Hash Manifest Verification',
      linux: 'SHA-256 (Wheels)',
      windows: 'SHA-256 (Wheels)',
      macos: 'SHA-256 (Universal2)',
    },
  ];

  return (
    <section id="containment" className="flex flex-col gap-10 max-w-6xl mx-auto w-full scroll-mt-24">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.5 }}
        className="flex flex-col gap-3 items-center text-center max-w-3xl mx-auto"
      >
        <div className="font-mono-eyebrow text-mono-eyebrow bronze-text tracking-widest uppercase flex items-center gap-2">
          <Layers className="w-4 h-4" />
          HONEST PLATFORM SUPPORT BOUNDARIES
        </div>
        <h2 className="font-headline-lg text-headline-lg text-on-background">
          Two tiers. Kernel-enforced boundaries.
        </h2>
        <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
          Asphallea pairs cross-platform policy evaluation with platform-native OS sandboxing. Coverage is real across Linux, Windows, and macOS, but operating systems provide different primitives. Asphallea reports exact host capabilities and fails closed by default if requested controls are unsupported.
        </p>
      </motion.div>

      {/* Two Tiers Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.5 }}
          className="code-window rounded-xl p-6 border border-white/10 flex flex-col gap-3 bg-[#161B20]"
        >
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-surface-container-high border border-white/10 flex items-center justify-center text-primary font-bold text-sm">
              01
            </div>
            <div>
              <h3 className="font-headline-md text-base text-on-background font-semibold">
                Policy Tier (Cross-Platform)
              </h3>
              <p className="text-[11px] text-on-surface-variant/80">Identical behavior on Linux, Windows, and macOS</p>
            </div>
          </div>
          <p className="text-xs text-on-surface-variant leading-relaxed">
            Every integrated tool call is intercepted, checked deterministically against declarative YAML or Python policies, allowed or denied before execution, and logged to an append-only JSONL audit trail with secret scrubbing.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="code-window rounded-xl p-6 border border-white/10 flex flex-col gap-3 bg-[#161B20]"
        >
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-surface-container-high border border-white/10 flex items-center justify-center text-[#74d4ea] font-bold text-sm">
              02
            </div>
            <div>
              <h3 className="font-headline-md text-base text-on-background font-semibold">
                Containment Tier (OS Kernel Engine)
              </h3>
              <p className="text-[11px] text-on-surface-variant/80">Platform-native subprocess isolation</p>
            </div>
          </div>
          <p className="text-xs text-on-surface-variant leading-relaxed">
            For tools that execute shell commands or code, Asphallea’s native core (<code className="text-[#74d4ea]">asphallea-run</code>) applies kernel sandboxing before launching child processes, failing closed if primitives are unavailable on the host.
          </p>
        </motion.div>
      </div>

      {/* Capability Matrix Table */}
      <div className="code-window rounded-xl overflow-hidden border border-white/10 bg-[#14181C]">
        <div className="bg-surface-container-high px-5 py-3 border-b border-white/10 flex flex-wrap items-center justify-between gap-2">
          <span className="font-mono-eyebrow text-xs text-on-background font-semibold">
            Platform Capabilities Matrix
          </span>
          <span className="text-[11px] font-mono-code text-primary flex items-center gap-1.5">
            <ShieldAlert className="w-3.5 h-3.5" />
            Fails closed when capabilities are missing
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono-code border-collapse">
            <thead>
              <tr className="border-b border-white/10 bg-white/[0.02]">
                <th className="p-3.5 font-mono-eyebrow text-on-surface-variant uppercase text-[11px]">Security Capability</th>
                <th className="p-3.5 font-mono-eyebrow text-on-surface-variant uppercase text-[11px] text-center">Linux 5.13+</th>
                <th className="p-3.5 font-mono-eyebrow text-on-surface-variant uppercase text-[11px] text-center">Windows</th>
                <th className="p-3.5 font-mono-eyebrow text-on-surface-variant uppercase text-[11px] text-center">macOS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-on-surface">
              {matrixData.map((row, idx) => (
                <tr key={idx} className="hover:bg-white/[0.02] transition-colors">
                  <td className="p-3.5 font-medium text-on-background">{row.capability}</td>
                  <td className="p-3.5 text-center">
                    {typeof row.linux === 'boolean' ? (
                      <CheckCircle2 className="w-4 h-4 text-primary mx-auto" />
                    ) : (
                      <span className="bg-white/5 px-2 py-0.5 rounded text-primary">{row.linux}</span>
                    )}
                  </td>
                  <td className="p-3.5 text-center">
                    {typeof row.windows === 'boolean' ? (
                      <CheckCircle2 className="w-4 h-4 text-primary mx-auto" />
                    ) : (
                      <span className="bg-white/5 px-2 py-0.5 rounded text-[#74d4ea]">{row.windows}</span>
                    )}
                  </td>
                  <td className="p-3.5 text-center">
                    {typeof row.macos === 'boolean' ? (
                      <CheckCircle2 className="w-4 h-4 text-primary mx-auto" />
                    ) : row.macos === 'Planned' ? (
                      <span className="text-on-surface-variant/50">{row.macos}</span>
                    ) : (
                      <span className="bg-white/5 px-2 py-0.5 rounded text-[#ffb77b]">{row.macos}</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
