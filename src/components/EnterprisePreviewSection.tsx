import { motion } from 'motion/react';
import { Building2, ShieldCheck, Database, KeyRound, ArrowRight, CheckCircle2, LayoutDashboard, Clock } from 'lucide-react';

interface EnterprisePreviewProps {
  onOpenDemo: () => void;
  onViewEnterprisePage: () => void;
}

export function EnterprisePreviewSection({ onOpenDemo, onViewEnterprisePage }: EnterprisePreviewProps) {
  const steps = [
    { num: '01', title: 'Select Workflow', desc: 'Isolate one representative agent workflow (e.g. MCP file tool, coding assistant, or data worker).' },
    { num: '02', title: 'Define Policy', desc: 'Collaboratively specify exact permitted paths, allowed network hosts, and forbidden actions.' },
    { num: '03', title: 'Integrate & Test', desc: 'Wrap client sessions or invoke tools via Asphallea runtime in staging environments.' },
    { num: '04', title: 'Review Coverage', desc: 'Assess audit logs, verify legitimate-task completion, and test containment boundaries.' },
    { num: '05', title: 'Decide Next Step', desc: 'Review operational audit logs and containment coverage to decide whether to proceed to production.' },
  ];

  return (
    <section id="enterprise" className="flex flex-col gap-12 max-w-6xl mx-auto w-full scroll-mt-24">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.5 }}
        className="flex flex-col gap-3 items-center text-center max-w-3xl mx-auto"
      >
        <div className="font-mono-eyebrow text-mono-eyebrow bronze-text tracking-widest uppercase flex items-center gap-2">
          <Building2 className="w-4 h-4" />
          COMMERCIAL OFFERING UNDER DEVELOPMENT
        </div>
        <h2 className="font-headline-lg text-headline-lg text-on-background">
          Enterprise evaluation &amp; fleet governance.
        </h2>
        <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
          Built for engineering and security leaders deploying autonomous agents with access to filesystems, internal networks, or third-party tools. We partner directly with technical teams on narrowly scoped paid evaluations to threat-model agent workflows, craft custom policies, and verify host OS containment.
        </p>
      </motion.div>

      {/* Enterprise Capabilities Preview Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="code-window rounded-xl p-5 border border-white/10 flex flex-col gap-3 bg-[#14181C]">
          <div className="flex items-center justify-between">
            <div className="p-2.5 rounded-lg bg-surface-container-high text-primary border border-white/10">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <span className="text-[10px] font-mono-code px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              Available Now
            </span>
          </div>
          <h3 className="font-headline-md text-sm text-on-background font-semibold">
            Scoped Technical Evaluations
          </h3>
          <p className="text-xs text-on-surface-variant leading-relaxed">
            Direct, hands-on guidance from core engineers to assess your agent architecture, implement policies, and verify host OS containment.
          </p>
        </div>

        <div className="code-window rounded-xl p-5 border border-white/10 flex flex-col gap-3 bg-[#14181C]">
          <div className="flex items-center justify-between">
            <div className="p-2.5 rounded-lg bg-surface-container-high text-[#74d4ea] border border-white/10">
              <Database className="w-5 h-5" />
            </div>
            <span className="text-[10px] font-mono-code px-2 py-0.5 rounded bg-amber-500/10 text-amber-300 border border-amber-500/20">
              Private Preview
            </span>
          </div>
          <h3 className="font-headline-md text-sm text-on-background font-semibold">
            SIEM &amp; Audit Forwarding
          </h3>
          <p className="text-xs text-on-surface-variant leading-relaxed">
            Stream structured JSONL audit logs into Datadog, Splunk, Elastic, or CloudWatch with automated credential scrubbing.
          </p>
        </div>

        <div className="code-window rounded-xl p-5 border border-white/10 flex flex-col gap-3 bg-[#14181C]">
          <div className="flex items-center justify-between">
            <div className="p-2.5 rounded-lg bg-surface-container-high text-[#ffdcc2] border border-white/10">
              <KeyRound className="w-5 h-5" />
            </div>
            <span className="text-[10px] font-mono-code px-2 py-0.5 rounded bg-amber-500/10 text-amber-300 border border-amber-500/20">
              Private Preview
            </span>
          </div>
          <h3 className="font-headline-md text-sm text-on-background font-semibold">
            Fleet Policy Distribution
          </h3>
          <p className="text-xs text-on-surface-variant leading-relaxed">
            Centralized policy repository integration (GitOps). Distribute verified, canonical policy documents across developer machines and cloud runtimes.
          </p>
        </div>

        <div className="code-window rounded-xl p-5 border border-white/10 flex flex-col gap-3 bg-[#14181C]">
          <div className="flex items-center justify-between">
            <div className="p-2.5 rounded-lg bg-surface-container-high text-on-surface-variant border border-white/10">
              <LayoutDashboard className="w-5 h-5" />
            </div>
            <span className="text-[10px] font-mono-code px-2 py-0.5 rounded bg-white/5 text-on-surface-variant border border-white/10">
              In Development
            </span>
          </div>
          <h3 className="font-headline-md text-sm text-on-background font-semibold">
            Central Management Console
          </h3>
          <p className="text-xs text-on-surface-variant leading-relaxed">
            Unified management console for policy distribution, event log aggregation, and fleet-wide status monitoring.
          </p>
        </div>
      </div>

      {/* 5-Step Practical Evaluation Process */}
      <div className="code-window rounded-xl p-6 md:p-8 border border-white/10 flex flex-col gap-6 bg-[#161B20]">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-white/10 pb-4">
          <div>
            <span className="font-mono-eyebrow text-xs bronze-text uppercase tracking-wider">
              HOW TEAMS EVALUATE ASPHALLEA
            </span>
            <h3 className="font-headline-md text-lg text-on-background font-bold mt-0.5">
              A 5-step scoped evaluation process
            </h3>
          </div>
          <span className="text-xs font-mono-code text-on-surface-variant/80 bg-white/5 px-2.5 py-1 rounded border border-white/10">
            2–4 week scoped engagement
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {steps.map((s, idx) => (
            <div key={idx} className="flex flex-col gap-2 p-3.5 rounded-lg bg-surface-container-high/40 border border-white/5">
              <span className="font-mono-code text-primary font-bold text-sm">{s.num}</span>
              <span className="font-semibold text-xs text-on-background">{s.title}</span>
              <p className="text-[11px] text-on-surface-variant leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
          <p className="text-xs text-on-surface-variant leading-relaxed max-w-xl">
            We work directly with your engineering leads to establish whether Asphallea fits your threat model and workload constraints before any commercial agreement.
          </p>
          <div className="flex items-center gap-3">
            <button
              onClick={onOpenDemo}
              className="px-5 py-2.5 rounded btn-primary font-mono-eyebrow text-xs uppercase tracking-wider font-bold transition-all hover:scale-95 flex items-center gap-2 whitespace-nowrap"
            >
              <span>Book a technical demo</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
            <a
              href="/enterprise"
              onClick={(e) => {
                if (!e.metaKey && !e.ctrlKey && !e.shiftKey && !e.altKey && e.button === 0) {
                  e.preventDefault();
                  onViewEnterprisePage();
                }
              }}
              className="px-4 py-2.5 rounded btn-ghost font-mono-eyebrow text-xs uppercase tracking-wider transition-all whitespace-nowrap focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary"
            >
              Details &amp; Use Cases
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
