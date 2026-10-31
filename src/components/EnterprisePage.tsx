import { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Building2, ShieldCheck, Database, KeyRound, ArrowRight, CheckCircle2, 
  LayoutDashboard, Server, Lock, FileCheck, AlertCircle, Loader2, Sparkles, HelpCircle 
} from 'lucide-react';

interface EnterprisePageProps {
  onOpenDemo: () => void;
}

const FORMSPREE_ENDPOINT = import.meta.env?.VITE_WAITLIST_API || 'https://formspree.io/f/xljjwzln';

export function EnterprisePage({ onOpenDemo }: EnterprisePageProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    useCase: '',
    context: '',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!formData.name.trim() || !formData.email.trim() || !formData.company.trim() || !formData.useCase.trim()) {
      setError('Please fill in all required fields.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email.trim())) {
      setError('Please enter a valid email address.');
      return;
    }

    setLoading(true);

    try {
      const existing = JSON.parse(localStorage.getItem('asphallea_demo_requests') || '[]');
      existing.push({
        ...formData,
        source: 'enterprise_page',
        id: `lead_${Date.now()}`,
        submittedAt: new Date().toISOString(),
      });
      localStorage.setItem('asphallea_demo_requests', JSON.stringify(existing));

      // 2. Dispatch to Formspree endpoint with JSON AJAX
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          company: formData.company,
          useCase: formData.useCase,
          context: formData.context,
        }),
      });

      if (!response.ok) {
        const data = await response.json().catch(() => null);
        if (data && data.errors && Array.isArray(data.errors)) {
          const msg = data.errors.map((e: any) => `${e.field ? e.field + ': ' : ''}${e.message}`).join(', ');
          throw new Error(msg || 'Form validation error. Please check your inputs.');
        } else if (data && data.error) {
          throw new Error(data.error);
        }
        throw new Error('Form service temporarily unavailable. Please try again or reach out directly.');
      }

      setSuccess(true);
    } catch (err: any) {
      setError(err?.message || 'Unable to submit request. Please try again or reach out directly.');
    } finally {
      setLoading(false);
    }
  };

  const featureMatrix = [
    {
      feature: 'Core Policy & Deterministic Enforcement Engine',
      tier: 'Open Source',
      status: 'Available Now',
      description: 'Intercepts tool calls, enforces allow/deny policies, and sandboxes subprocesses locally via asphallea-run.',
    },
    {
      feature: 'Local JSONL Audit Trail & Secret Scrubbing',
      tier: 'Open Source',
      status: 'Available Now',
      description: 'Local append-only logs recording tool arguments, decisions, and timestamps with pattern credential redaction.',
    },
    {
      feature: 'Scoped Technical Paid Evaluations',
      tier: 'Enterprise',
      status: 'Available Now',
      description: 'Hands-on architectural review, custom policy builder setup, and verified containment validation with our core team.',
    },
    {
      feature: 'SIEM & Cloud Observability Connectors',
      tier: 'Enterprise',
      status: 'Private Preview',
      description: 'Standardized pipeline adapters for Datadog, Splunk, Elastic, and AWS CloudWatch audit streaming.',
    },
    {
      feature: 'Centralized Policy GitOps Distribution',
      tier: 'Enterprise',
      status: 'Private Preview',
      description: 'Push canonical, versioned policy documents down to developer workstations and containerized fleet agents.',
    },
    {
      feature: 'Fleet Telemetry Web Console',
      tier: 'Enterprise',
      status: 'Planned',
      description: 'Centralized web dashboard aggregating denial events, agent fleet status, and policy version histories across teams.',
    },
    {
      feature: 'Granular Fleet Access Control & Revocation',
      tier: 'Enterprise',
      status: 'Planned',
      description: 'Instant kill-switch and token revocation mechanisms for compromised or malfunctioning agent instances.',
    },
  ];

  const deploymentPractices = [
    {
      title: 'Self-Hosted Runtime Deployment',
      icon: Server,
      desc: 'The runtime runs inside your cloud VPC or on-premise infrastructure without external network dependencies for policy enforcement.',
    },
    {
      title: 'Transparent Telemetry & Data Boundaries',
      icon: Lock,
      desc: 'The runtime does not send telemetry to Asphallea. Data exchanged with your configured model providers, tools, and audit destinations follows your deployment configuration. (Inquiries submitted via this website are processed via Formspree for evaluation follow-ups).',
    },
    {
      title: 'Deterministic Non-LLM Decisions',
      icon: ShieldCheck,
      desc: 'Policy decisions are evaluated deterministically without an LLM in the enforcement loop. This controls tool execution boundaries, but does not prevent the agent from hallucinating or guarantee that permitted actions are correct.',
    },
    {
      title: 'Append-Only Audit Logging',
      icon: FileCheck,
      desc: 'Structured JSONL logs provide append-only audit records of tool invocations, arguments, and policy decisions with credential redaction. Application-level append-only writes do not prevent a host administrator from modifying or deleting local files.',
    },
  ];

  return (
    <div className="flex flex-col gap-16 max-w-6xl mx-auto w-full py-6 min-w-0">
      {/* Hero Header */}
      <div className="flex flex-col gap-4 text-center max-w-3xl mx-auto">
        <div className="flex items-center justify-center gap-2">
          <span className="font-mono-eyebrow text-mono-eyebrow bronze-text tracking-widest uppercase">
            ENTERPRISE OFFERING &amp; EVALUATIONS
          </span>
          <span className="text-[11px] font-mono-code bg-amber-500/10 text-amber-300 border border-amber-500/20 px-2.5 py-0.5 rounded-full">
            Under Active Development
          </span>
        </div>
        <h1 className="font-headline-xl text-headline-xl text-on-background">
          Autonomous agents, safely bounded in enterprise infrastructure.
        </h1>
        <p className="font-body-lg text-body-lg text-on-surface-variant leading-relaxed">
          Asphallea helps engineering and security leaders enable agentic automation while maintaining hard OS containment, explicit policy boundaries, and verifiable audit records.
        </p>
      </div>

      {/* Intended Team & Deployment Use Cases */}
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-1">
          <span className="font-mono-eyebrow text-xs bronze-text uppercase tracking-wider">
            TARGET USE CASES
          </span>
          <h2 className="font-headline-lg text-xl text-on-background font-bold">
            Built for engineering teams deploying agent workflows
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="code-window rounded-xl p-6 border border-white/10 flex flex-col gap-3 bg-[#14181C]">
            <div className="w-9 h-9 rounded bg-surface-container-high border border-white/10 flex items-center justify-center text-primary font-bold text-sm">
              01
            </div>
            <h3 className="font-headline-md text-base text-on-background font-semibold">
              Developer Coding &amp; Subprocess Workflows
            </h3>
            <p className="text-xs text-on-surface-variant leading-relaxed">
              Evaluate containment for developer agent harnesses and code-generation subprocesses. Restrict execution strictly to project directories and bar reads to private SSH keys, cloud credentials, or sibling paths. Wrapping external CLIs requires verifying their specific process launch path and host OS containment support.
            </p>
          </div>

          <div className="code-window rounded-xl p-6 border border-white/10 flex flex-col gap-3 bg-[#14181C]">
            <div className="w-9 h-9 rounded bg-surface-container-high border border-white/10 flex items-center justify-center text-[#74d4ea] font-bold text-sm">
              02
            </div>
            <h3 className="font-headline-md text-base text-on-background font-semibold">
              Internal Tool &amp; MCP Integrations
            </h3>
            <p className="text-xs text-on-surface-variant leading-relaxed">
              Wrap Model Context Protocol servers connecting agents to databases, internal ticketing, and storage. Enforce per-tool call limits, argument validation, and strict read/write boundaries.
            </p>
          </div>

          <div className="code-window rounded-xl p-6 border border-white/10 flex flex-col gap-3 bg-[#14181C]">
            <div className="w-9 h-9 rounded bg-surface-container-high border border-white/10 flex items-center justify-center text-[#ffdcc2] font-bold text-sm">
              03
            </div>
            <h3 className="font-headline-md text-base text-on-background font-semibold">
              Data Processing &amp; Script Execution
            </h3>
            <p className="text-xs text-on-surface-variant leading-relaxed">
              Run untrusted or agent-generated scripts under real OS containment. Limit CPU time, memory usage, open file descriptors, and block network socket connections at the kernel level.
            </p>
          </div>
        </div>
      </div>

      {/* Deployment & Data Handling Truth */}
      <div className="code-window rounded-xl p-6 md:p-8 border border-white/10 bg-[#161B20] flex flex-col gap-6">
        <div className="flex flex-col gap-1 border-b border-white/10 pb-4">
          <span className="font-mono-eyebrow text-xs bronze-text uppercase tracking-wider">
            ARCHITECTURE &amp; DATA PRIVACY
          </span>
          <h2 className="font-headline-md text-lg text-on-background font-bold">
            Verified data handling and deployment model
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {deploymentPractices.map((p, idx) => {
            const Icon = p.icon;
            return (
              <div key={idx} className="flex flex-col gap-2.5 p-4 rounded-lg bg-surface-container-high/40 border border-white/5">
                <div className="w-8 h-8 rounded bg-surface-container-high flex items-center justify-center text-primary">
                  <Icon className="w-4 h-4" />
                </div>
                <h4 className="font-semibold text-xs text-on-background">{p.title}</h4>
                <p className="text-[11px] text-on-surface-variant leading-relaxed">{p.desc}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Feature Availability Matrix */}
      <div className="flex flex-col gap-6 w-full max-w-full min-w-0">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
          <div>
            <span className="font-mono-eyebrow text-xs bronze-text uppercase tracking-wider">
              CAPABILITY MATRIX
            </span>
            <h2 className="font-headline-lg text-xl text-on-background font-bold">
              Open source vs. commercial capabilities
            </h2>
          </div>
          <span className="text-[11px] font-mono-code text-on-surface-variant bg-white/5 px-2.5 py-1 rounded border border-white/10">
            Current status as of v0.1.1
          </span>
        </div>

        <div className="code-window rounded-xl overflow-hidden border border-white/10 bg-[#14181C] w-full max-w-full min-w-0">
          <div className="overflow-x-auto w-full max-w-full min-w-0">
            <table className="w-full text-left text-xs font-mono-code border-collapse min-w-[640px]">
              <thead>
                <tr className="border-b border-white/10 bg-white/[0.02]">
                  <th className="p-4 font-mono-eyebrow text-on-surface-variant uppercase">Capability</th>
                  <th className="p-4 font-mono-eyebrow text-on-surface-variant uppercase">Edition</th>
                  <th className="p-4 font-mono-eyebrow text-on-surface-variant uppercase">Availability</th>
                  <th className="p-4 font-mono-eyebrow text-on-surface-variant uppercase">Description</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-on-surface">
                {featureMatrix.map((item, idx) => (
                  <tr key={idx} className="hover:bg-white/[0.02] transition-colors">
                    <td className="p-4 font-semibold text-on-background whitespace-nowrap">{item.feature}</td>
                    <td className="p-4 whitespace-nowrap">
                      <span className="text-on-surface-variant">{item.tier}</span>
                    </td>
                    <td className="p-4 whitespace-nowrap">
                      {item.status === 'Available Now' ? (
                        <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded text-[10px]">
                          Available Now
                        </span>
                      ) : item.status === 'Private Preview' ? (
                        <span className="bg-amber-500/10 text-amber-300 border border-amber-500/20 px-2 py-0.5 rounded text-[10px]">
                          Private Preview
                        </span>
                      ) : (
                        <span className="bg-white/5 text-on-surface-variant border border-white/10 px-2 py-0.5 rounded text-[10px]">
                          Planned
                        </span>
                      )}
                    </td>
                    <td className="p-4 text-on-surface-variant text-[11px] leading-relaxed min-w-[280px]">
                      {item.description}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Dashboard Preview - Clearly Labeled Mock */}
      <div className="code-window rounded-xl p-6 md:p-8 border border-white/10 flex flex-col gap-6 bg-[#161B20]">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-white/10 pb-4">
          <div className="flex items-center gap-3">
            <LayoutDashboard className="w-5 h-5 text-primary" />
            <div>
              <h3 className="font-headline-md text-base text-on-background font-semibold">
                Central Management Console (Preview)
              </h3>
              <p className="text-xs text-on-surface-variant">Illustrative interface mock — currently in development</p>
            </div>
          </div>
          <span className="text-[10px] font-mono-code bg-white/5 border border-white/10 px-2.5 py-1 rounded text-on-surface-variant">
            Sample Preview Data
          </span>
        </div>

        {/* Realistic Dashboard Mock (No fabricated customer numbers) */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 font-mono-code text-xs">
          <div className="bg-[#121619] p-4 rounded-lg border border-white/5 flex flex-col gap-1.5">
            <span className="text-[11px] text-on-surface-variant">Fleet Enforcement Status</span>
            <div className="flex items-center gap-2 mt-1">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400"></span>
              <span className="text-lg font-bold text-on-background">Strict Containment Active</span>
            </div>
            <span className="text-[10px] text-on-surface-variant/70">OS kernel primitives verified</span>
          </div>

          <div className="bg-[#121619] p-4 rounded-lg border border-white/5 flex flex-col gap-1.5">
            <span className="text-[11px] text-on-surface-variant">Sample Telemetry Stream</span>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-lg font-bold text-[#74d4ea]">JSONL Streaming</span>
            </div>
            <span className="text-[10px] text-on-surface-variant/70">Direct forwarding to customer SIEM</span>
          </div>

          <div className="bg-[#121619] p-4 rounded-lg border border-white/5 flex flex-col gap-1.5">
            <span className="text-[11px] text-on-surface-variant">Active Policy Revision</span>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-lg font-bold text-[#ffdcc2]">sha256:4cd148...</span>
            </div>
            <span className="text-[10px] text-on-surface-variant/70">Canonical asphallea.policy/v1</span>
          </div>
        </div>
      </div>

      {/* What a Paid Evaluation Involves + Form */}
      <div id="evaluation-form" className="glass-panel rounded-xl p-8 border border-primary/30 flex flex-col lg:flex-row items-start justify-between gap-10">
        <div className="flex flex-col gap-4 max-w-lg">
          <div className="flex items-center gap-2 text-xs font-mono-eyebrow bronze-text uppercase tracking-widest">
            <Sparkles className="w-4 h-4" />
            PAID TECHNICAL EVALUATION
          </div>
          <h2 className="font-headline-lg text-2xl text-on-background font-bold">
            Evaluate Asphallea with our core engineers
          </h2>
          <p className="text-xs text-on-surface-variant leading-relaxed">
            We partner with engineering teams through focused 2–4 week evaluation engagements to assess agent attack surfaces, construct least-privilege policies, and verify runtime containment.
          </p>

          <div className="flex flex-col gap-2.5 pt-2 font-mono-code text-xs text-on-surface-variant">
            <div className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
              <span>Targeted threat model analysis of your specific agent tools</span>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
              <span>Tailored policy generation with arguments and network allowlists</span>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
              <span>Staging deployment verification &amp; operational impact report</span>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
              <span>Direct Slack/Teams channel with runtime maintainers</span>
            </div>
          </div>
        </div>

        {/* Lead Capture Form */}
        <div className="w-full lg:max-w-md code-window rounded-xl p-6 border border-white/10 bg-[#161B20]">
          {success ? (
            <div className="flex flex-col items-center text-center py-6 gap-3">
              <div className="w-10 h-10 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center text-primary">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <h3 className="font-headline-md text-base text-on-background font-semibold">
                Evaluation Request Received
              </h3>
              <p className="text-xs text-on-surface-variant leading-relaxed">
                Thank you, {formData.name}. We will review your agent deployment details and reply by email to schedule an introductory technical call.
              </p>
            </div>
          ) : (
            <form action={FORMSPREE_ENDPOINT} method="POST" onSubmit={handleSubmit} className="flex flex-col gap-3.5">
              <input type="text" name="_gotcha" style={{ display: 'none' }} tabIndex={-1} autoComplete="off" />
              <h3 className="font-headline-md text-sm text-on-background font-bold">
                Request a Technical Demo &amp; Scoped Evaluation
              </h3>

              {error && (
                <div className="p-2.5 rounded bg-red-500/10 border border-red-500/25 text-red-300 text-xs flex items-center gap-2">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="flex flex-col gap-1">
                  <label htmlFor="eval-name" className="text-[11px] font-mono-eyebrow text-on-surface-variant">Name *</label>
                  <input
                    id="eval-name"
                    name="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Morgan Lee"
                    className="bg-surface-container-high/80 border border-white/10 rounded px-2.5 py-1.5 text-xs text-on-surface focus:outline-none focus:border-primary"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label htmlFor="eval-company" className="text-[11px] font-mono-eyebrow text-on-surface-variant">Company *</label>
                  <input
                    id="eval-company"
                    name="company"
                    type="text"
                    required
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    placeholder="Company or Project"
                    className="bg-surface-container-high/80 border border-white/10 rounded px-2.5 py-1.5 text-xs text-on-surface focus:outline-none focus:border-primary"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <label htmlFor="eval-email" className="text-[11px] font-mono-eyebrow text-on-surface-variant">Email Address *</label>
                <input
                  id="eval-email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="name@company.com or personal email"
                  className="bg-surface-container-high/80 border border-white/10 rounded px-2.5 py-1.5 text-xs text-on-surface focus:outline-none focus:border-primary"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label htmlFor="eval-usecase" className="text-[11px] font-mono-eyebrow text-on-surface-variant">Agent Use Case / Deployment *</label>
                <input
                  id="eval-usecase"
                  name="useCase"
                  type="text"
                  required
                  value={formData.useCase}
                  onChange={(e) => setFormData({ ...formData, useCase: e.target.value })}
                  placeholder="e.g. MCP file system tools, shell execution, customer support"
                  className="bg-surface-container-high/80 border border-white/10 rounded px-2.5 py-1.5 text-xs text-on-surface focus:outline-none focus:border-primary"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label htmlFor="eval-context" className="text-[11px] font-mono-eyebrow text-on-surface-variant">Additional Context (Optional)</label>
                <textarea
                  id="eval-context"
                  name="context"
                  rows={2}
                  value={formData.context}
                  onChange={(e) => setFormData({ ...formData, context: e.target.value })}
                  placeholder="Deployment host OS, framework (LangChain/MCP), timeline"
                  className="bg-surface-container-high/80 border border-white/10 rounded px-2.5 py-1.5 text-xs text-on-surface focus:outline-none focus:border-primary resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full mt-1 py-2.5 rounded btn-primary font-mono-eyebrow text-xs uppercase tracking-wider font-bold transition-all hover:scale-95 flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    <span>Submitting...</span>
                  </>
                ) : (
                  <>
                    <span>Request Technical Evaluation</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
