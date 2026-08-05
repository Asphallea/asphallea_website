import { useState } from 'react';
import { motion } from 'motion/react';
import { Copy, Check, Sliders, ShieldCheck, Code, Cpu } from 'lucide-react';

export function PolicyBuilderSection() {
  const [agentName, setAgentName] = useState('production-agent');
  const [denyNetwork, setDenyNetwork] = useState(true);
  const [readPath, setReadPath] = useState('./workspace');
  const [writePath, setWritePath] = useState('./workspace/out');
  const [denyShell, setDenyShell] = useState(true);
  const [cpuLimit, setCpuLimit] = useState(10);
  const [memLimit, setMemLimit] = useState(512);
  const [copied, setCopied] = useState(false);

  const generateCode = () => {
    let code = `from asphallea import Policy\n\npolicy = (\n    Policy.builder("${agentName}")`;
    if (readPath) code += `\n    .read_paths("${readPath}")`;
    if (writePath) code += `\n    .write_paths("${writePath}")`;
    if (denyNetwork) code += `\n    .deny_network()`;
    if (denyShell) code += `\n    .deny_tool("run_shell")`;
    if (cpuLimit || memLimit) {
      code += `\n    .limits(cpu_seconds=${cpuLimit}, memory_mb=${memLimit})`;
    }
    code += `\n    .build()\n)`;
    return code;
  };

  const codeString = generateCode();

  const handleCopy = () => {
    navigator.clipboard.writeText(codeString);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="policy-builder" className="flex flex-col gap-12 max-w-6xl mx-auto w-full scroll-mt-24">
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.5 }}
        className="flex flex-col gap-4 items-center text-center max-w-3xl mx-auto"
      >
        <div className="font-mono-eyebrow text-mono-eyebrow bronze-text tracking-widest uppercase flex items-center gap-2">
          <Sliders className="w-4 h-4" />
          INTERACTIVE POLICY BUILDER
        </div>
        <h2 className="font-headline-lg text-headline-lg text-on-background">
          Design least-privilege policies visually.
        </h2>
        <p className="font-body-md text-body-md text-on-surface-variant">
          Toggle capabilities to instantly generate deterministic Python & YAML policies for your AI agents.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        {/* Left: Controls Panel */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="lg:col-span-5 code-window rounded-xl p-6 border border-white/10 flex flex-col gap-6"
        >
          <div className="flex items-center gap-2 border-b border-white/5 pb-3">
            <ShieldCheck className="w-5 h-5 text-primary" />
            <h3 className="font-headline-md text-lg text-on-background font-semibold">
              Policy Controls
            </h3>
          </div>

          {/* Agent Identifier */}
          <div className="flex flex-col gap-2">
            <label className="font-mono-eyebrow text-xs text-on-surface-variant">Agent Name / Scope</label>
            <input
              type="text"
              value={agentName}
              onChange={(e) => setAgentName(e.target.value)}
              className="bg-surface-container-high border border-white/10 rounded px-3 py-2 text-sm text-on-surface font-mono-code focus:outline-none focus:border-primary transition-colors"
            />
          </div>

          {/* Network Control */}
          <div className="flex items-center justify-between p-3 rounded bg-surface-container-high/50 border border-white/5">
            <div className="flex flex-col">
              <span className="text-sm font-semibold text-on-surface">Deny External Network</span>
              <span className="text-xs text-on-surface-variant/70">Block all outbound socket/http connections</span>
            </div>
            <input
              type="checkbox"
              checked={denyNetwork}
              onChange={(e) => setDenyNetwork(e.target.checked)}
              className="w-4 h-4 accent-[#B87333] cursor-pointer"
            />
          </div>

          {/* Shell Execution Control */}
          <div className="flex items-center justify-between p-3 rounded bg-surface-container-high/50 border border-white/5">
            <div className="flex flex-col">
              <span className="text-sm font-semibold text-on-surface">Block Shell Execution</span>
              <span className="text-xs text-on-surface-variant/70">Prevent arbitrary subprocess tool calls</span>
            </div>
            <input
              type="checkbox"
              checked={denyShell}
              onChange={(e) => setDenyShell(e.target.checked)}
              className="w-4 h-4 accent-[#B87333] cursor-pointer"
            />
          </div>

          {/* Paths */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <label className="font-mono-eyebrow text-xs text-on-surface-variant">Allowed Read Path</label>
              <input
                type="text"
                value={readPath}
                onChange={(e) => setReadPath(e.target.value)}
                className="bg-surface-container-high border border-white/10 rounded px-3 py-1.5 text-xs text-on-surface font-mono-code focus:outline-none focus:border-primary"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="font-mono-eyebrow text-xs text-on-surface-variant">Allowed Write Path</label>
              <input
                type="text"
                value={writePath}
                onChange={(e) => setWritePath(e.target.value)}
                className="bg-surface-container-high border border-white/10 rounded px-3 py-1.5 text-xs text-on-surface font-mono-code focus:outline-none focus:border-primary"
              />
            </div>
          </div>

          {/* OS Resource Limits */}
          <div className="flex flex-col gap-3 pt-2 border-t border-white/5">
            <div className="flex items-center gap-2 text-xs font-mono-eyebrow text-primary uppercase">
              <Cpu className="w-4 h-4" />
              OS Resource Limits
            </div>
            <div className="grid grid-cols-2 gap-4 text-xs">
              <div className="flex flex-col gap-1">
                <span className="text-on-surface-variant">CPU Limit ({cpuLimit}s)</span>
                <input
                  type="range"
                  min="1"
                  max="60"
                  value={cpuLimit}
                  onChange={(e) => setCpuLimit(Number(e.target.value))}
                  className="accent-[#B87333] cursor-pointer"
                />
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-on-surface-variant">RAM Limit ({memLimit}MB)</span>
                <input
                  type="range"
                  min="128"
                  max="2048"
                  step="128"
                  value={memLimit}
                  onChange={(e) => setMemLimit(Number(e.target.value))}
                  className="accent-[#B87333] cursor-pointer"
                />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Right: Generated Python Code Preview */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="lg:col-span-7 code-window rounded-xl overflow-hidden border border-white/10 flex flex-col justify-between"
        >
          <div className="bg-surface-container-high px-4 py-3 border-b border-white/5 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Code className="w-4 h-4 text-primary" />
              <span className="font-mono-eyebrow text-mono-eyebrow text-on-surface-variant">
                Generated Policy Code
              </span>
            </div>
            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 text-xs font-mono-code text-on-surface-variant hover:text-primary transition-colors px-2.5 py-1 rounded bg-white/5 hover:bg-white/10 border border-white/5"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-primary" />
                  <span className="text-primary">Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy Code</span>
                </>
              )}
            </button>
          </div>

          <div className="p-6 font-mono-code text-xs sm:text-sm text-on-surface leading-relaxed whitespace-pre overflow-x-auto bg-[#161A1D] h-full flex items-center">
            <code>{codeString}</code>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
