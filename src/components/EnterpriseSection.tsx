import { useState } from 'react';
import { motion } from 'motion/react';
import { Building2, ShieldCheck, Database, KeyRound, ArrowRight, CheckCircle2, LayoutDashboard } from 'lucide-react';

export function EnterpriseSection() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    // 1. Save to local storage for persistence
    try {
      const existing = JSON.parse(localStorage.getItem('asphallea_waitlist_emails') || '[]');
      if (!existing.includes(email)) {
        existing.push({ email, date: new Date().toISOString() });
        localStorage.setItem('asphallea_waitlist_emails', JSON.stringify(existing));
      }
    } catch {
      // Ignore storage error
    }

    // 2. Optional Formspree / Webhook API dispatch if configured
    const apiUrl = import.meta.env?.VITE_WAITLIST_API;
    if (apiUrl) {
      try {
        await fetch(apiUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email }),
        });
      } catch {
        // Fallback gracefully
      }
    }

    setSubmitted(true);
  };

  return (
    <section id="enterprise" className="flex flex-col gap-12 max-w-6xl mx-auto w-full scroll-mt-24">
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.5 }}
        className="flex flex-col gap-4 items-center text-center max-w-3xl mx-auto"
      >
        <div className="font-mono-eyebrow text-mono-eyebrow bronze-text tracking-widest uppercase flex items-center gap-2">
          <Building2 className="w-4 h-4" />
          ASPHALLEA ENTERPRISE
        </div>
        <h2 className="font-headline-lg text-headline-lg text-on-background">
          Zero-trust governance for enterprise agent fleets.
        </h2>
        <p className="font-body-md text-body-md text-on-surface-variant">
          Scale agent deployments across engineering teams with centralized audit vaults, SIEM forwarding, team policy control planes, and a real-time security dashboard.
        </p>
      </motion.div>

      {/* Grid of Enterprise Features */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="code-window rounded-xl p-6 border border-white/10 flex flex-col gap-4 hover:border-primary/40 transition-colors"
        >
          <div className="p-3 rounded-lg bg-surface-container-high w-fit text-primary">
            <LayoutDashboard className="w-6 h-6" />
          </div>
          <h3 className="font-headline-md text-lg text-on-background font-semibold">
            Real-Time Security Dashboard
          </h3>
          <p className="text-xs text-on-surface-variant leading-relaxed">
            Centralized Web Console to monitor live agent tool executions, policy block rates, threat telemetry, and active sandbox containers across your enterprise fleet.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="code-window rounded-xl p-6 border border-white/10 flex flex-col gap-4 hover:border-primary/40 transition-colors"
        >
          <div className="p-3 rounded-lg bg-surface-container-high w-fit text-[#74d4ea]">
            <Database className="w-6 h-6" />
          </div>
          <h3 className="font-headline-md text-lg text-on-background font-semibold">
            SIEM & Audit Vault
          </h3>
          <p className="text-xs text-on-surface-variant leading-relaxed">
            Stream sanitized JSONL audit events directly into Datadog, Splunk, AWS CloudWatch, or Elastic Security with automated PII & secret redaction hooks.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="code-window rounded-xl p-6 border border-white/10 flex flex-col gap-4 hover:border-primary/40 transition-colors"
        >
          <div className="p-3 rounded-lg bg-surface-container-high w-fit text-primary-fixed-dim">
            <KeyRound className="w-6 h-6" />
          </div>
          <h3 className="font-headline-md text-lg text-on-background font-semibold">
            Fleet Policy RBAC
          </h3>
          <p className="text-xs text-on-surface-variant leading-relaxed">
            Manage organization-wide agent policies centrally via GitOps. Push mandatory security boundaries down to developer machines and cloud runtimes.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="code-window rounded-xl p-6 border border-white/10 flex flex-col gap-4 hover:border-primary/40 transition-colors"
        >
          <div className="p-3 rounded-lg bg-surface-container-high w-fit text-[#ffb4ab]">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h3 className="font-headline-md text-lg text-on-background font-semibold">
            SOC2 & Compliance Vault
          </h3>
          <p className="text-xs text-on-surface-variant leading-relaxed">
            Cryptographically signed execution chains proving your AI agents operate strictly within compliant organizational boundaries.
          </p>
        </motion.div>
      </div>

      {/* Enterprise Dashboard Teaser Preview Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="code-window rounded-xl p-6 border border-white/10 flex flex-col gap-6"
      >
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-white/5 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse"></div>
            <h3 className="font-headline-md text-base text-on-background font-semibold">
              Enterprise Dashboard Preview: Fleet Telemetry
            </h3>
          </div>
          <span className="text-xs font-mono-code text-primary bg-primary/10 border border-primary/20 px-3 py-1 rounded-full">
            Coming to Enterprise
          </span>
        </div>

        {/* Dashboard Mock Widgets */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 font-mono-code">
          <div className="bg-surface-container-high/60 p-4 rounded-lg border border-white/5 flex flex-col gap-1">
            <span className="text-xs text-on-surface-variant">Active Agent Fleets</span>
            <span className="text-2xl font-bold text-on-background">1,420</span>
            <span className="text-[10px] text-emerald-400">100% Protected via OS Sandbox</span>
          </div>

          <div className="bg-surface-container-high/60 p-4 rounded-lg border border-white/5 flex flex-col gap-1">
            <span className="text-xs text-on-surface-variant">Tool Calls Intercepted (24h)</span>
            <span className="text-2xl font-bold text-[#74d4ea]">2,849,102</span>
            <span className="text-[10px] text-on-surface-variant">Avg Latency Overhead: 0.18ms</span>
          </div>

          <div className="bg-surface-container-high/60 p-4 rounded-lg border border-white/5 flex flex-col gap-1">
            <span className="text-xs text-on-surface-variant">Prompt Injection Blocks</span>
            <span className="text-2xl font-bold text-[#ffb4ab]">384</span>
            <span className="text-[10px] text-[#ffb4ab]">100% Deterministic Interceptions</span>
          </div>
        </div>
      </motion.div>

      {/* Early Access Form Banner */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="glass-panel rounded-xl p-8 border border-primary/20 bg-gradient-to-r from-[#18120D] via-[#211A15] to-[#18120D] flex flex-col md:flex-row items-center justify-between gap-8"
      >
        <div className="flex flex-col gap-2 max-w-xl text-center md:text-left">
          <span className="font-mono-eyebrow text-mono-eyebrow bronze-text uppercase tracking-widest">
            ENTERPRISE EARLY ACCESS
          </span>
          <h3 className="font-headline-md text-xl text-on-background font-bold">
            Building enterprise AI agents?
          </h3>
          <p className="text-sm text-on-surface-variant">
            Join the private preview program for centralized dashboard access, SIEM pipelines, and dedicated security support.
          </p>
        </div>

        {submitted ? (
          <div className="flex items-center gap-2 text-primary font-mono-code text-sm bg-white/5 px-6 py-3 rounded-lg border border-primary/30">
            <CheckCircle2 className="w-5 h-5 text-primary" />
            <span>Thank you! We’ll be in touch shortly.</span>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
            <input
              type="email"
              required
              placeholder="work-email@company.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-surface-container-high border border-white/10 rounded-lg px-4 py-3 text-sm text-on-surface focus:outline-none focus:border-primary transition-colors min-w-[260px]"
            />
            <button
              type="submit"
              className="btn-primary px-6 py-3 rounded-lg font-mono-eyebrow font-bold text-xs uppercase tracking-wider transition-all hover:scale-95 flex items-center justify-center gap-2 whitespace-nowrap"
            >
              <span>Request Early Access</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        )}
      </motion.div>
    </section>
  );
}
