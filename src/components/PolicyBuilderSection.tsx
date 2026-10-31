import { useState } from 'react';
import { motion } from 'motion/react';
import { Copy, Check, Sliders, ShieldCheck, Code, Cpu, Info, FileCode } from 'lucide-react';

export function PolicyBuilderSection() {
  const [agentName, setAgentName] = useState('workspace-worker');
  const [denyNetwork, setDenyNetwork] = useState(true);
  const [readPath, setReadPath] = useState('./workspace');
  const [writePath, setWritePath] = useState('./workspace/out');
  const [denyShell, setDenyShell] = useState(false);
  const [cpuLimit, setCpuLimit] = useState(10);
  const [memLimit, setMemLimit] = useState(512);
  const [outputFormat, setOutputFormat] = useState<'python' | 'yaml'>('python');
  const [copied, setCopied] = useState(false);

  const generatePythonCode = () => {
    let code = `from asphallea import Policy\n\n# Declarative policy builder\npolicy = (\n    Policy.builder("${agentName || 'agent'}")`;
    code += `\n    .tool("read_file", reads="path")`;
    if (readPath) code += `\n    .read_paths("${readPath}")`;
    if (writePath) code += `\n    .write_paths("${writePath}")`;
    if (denyNetwork) {
      code += `\n    .deny_network()`;
    } else {
      code += `\n    .allow_network()`;
    }
    if (denyShell) {
      code += `\n    .deny_tool("run_shell")`;
    } else {
      code += `\n    .allow_tools("run_shell")`;
    }
    if (cpuLimit || memLimit) {
      code += `\n    # OS containment limits (Linux setrlimit / Windows Job Object)\n    .limits(cpu_seconds=${cpuLimit}, memory_mb=${memLimit})`;
    }
    code += `\n    .build()\n)`;
    return code;
  };

  const generateYamlCode = () => {
    let yaml = `# Declarative Asphallea Policy Document\nname: ${agentName || 'agent'}\n\ntools:\n  allow:\n    - read_file`;
    if (!denyShell) {
      yaml += `\n    - run_shell`;
    }
    if (denyShell) {
      yaml += `\n  deny:\n    - run_shell`;
    }
    yaml += `\n  args:\n    read_file:\n      reads: path\n`;
    yaml += `\nfilesystem:\n  read:\n    - ${readPath || './workspace'}`;
    if (writePath) {
      yaml += `\n  write:\n    - ${writePath}`;
    }
    yaml += `\n\nnetwork:\n  default: ${denyNetwork ? 'deny' : 'allow'}\n`;
    yaml += `\nlimits:\n  timeout_seconds: 30\n  cpu_seconds: ${cpuLimit}\n  memory_mb: ${memLimit}`;
    return yaml;
  };

  const outputCode = outputFormat === 'python' ? generatePythonCode() : generateYamlCode();

  const handleCopy = () => {
    navigator.clipboard.writeText(outputCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="policy-builder" className="flex flex-col gap-10 max-w-6xl mx-auto w-full scroll-mt-24">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.5 }}
        className="flex flex-col gap-3 items-center text-center max-w-3xl mx-auto"
      >
        <div className="font-mono-eyebrow text-mono-eyebrow bronze-text tracking-widest uppercase flex items-center gap-2">
          <Sliders className="w-4 h-4" />
          POLICY GENERATOR
        </div>
        <h2 className="font-headline-lg text-headline-lg text-on-background">
          Draft least-privilege policies.
        </h2>
        <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
          Configure tools, filesystem allowlists, and execution limits to generate version-controlled policies compatible with Asphallea 0.1.1.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* Controls Panel */}
        <div className="lg:col-span-5 code-window rounded-xl p-6 border border-white/10 flex flex-col gap-5 bg-[#14181C]">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-primary" />
              <h3 className="font-headline-md text-sm text-on-background font-semibold">
                Policy Parameters
              </h3>
            </div>
            <span className="text-[10px] font-mono-code text-on-surface-variant/70">
              Template Generator
            </span>
          </div>

          {/* Agent Scope */}
          <div className="flex flex-col gap-1.5">
            <label htmlFor="builder-agent-name" className="text-xs font-mono-eyebrow text-on-surface-variant">
              Policy / Agent Scope Name
            </label>
            <input
              id="builder-agent-name"
              type="text"
              value={agentName}
              onChange={(e) => setAgentName(e.target.value)}
              className="bg-surface-container-high/80 border border-white/10 rounded px-3 py-2 text-xs text-on-surface font-mono-code focus:outline-none focus:border-primary transition-colors"
            />
          </div>

          {/* Network Toggle */}
          <div className="flex items-center justify-between p-3 rounded bg-surface-container-high/50 border border-white/5">
            <div className="flex flex-col">
              <span className="text-xs font-semibold text-on-surface">Deny Network by Default</span>
              <span className="text-[11px] text-on-surface-variant/70">Block unlisted socket/HTTP destinations</span>
            </div>
            <input
              type="checkbox"
              aria-label="Deny network by default"
              checked={denyNetwork}
              onChange={(e) => setDenyNetwork(e.target.checked)}
              className="w-4 h-4 accent-[#B87333] cursor-pointer"
            />
          </div>

          {/* Shell Toggle */}
          <div className="flex items-center justify-between p-3 rounded bg-surface-container-high/50 border border-white/5">
            <div className="flex flex-col">
              <span className="text-xs font-semibold text-on-surface">Deny Arbitrary Shell (run_shell)</span>
              <span className="text-[11px] text-on-surface-variant/70">Refuse generic subprocess invocation</span>
            </div>
            <input
              type="checkbox"
              aria-label="Deny arbitrary shell execution"
              checked={denyShell}
              onChange={(e) => setDenyShell(e.target.checked)}
              className="w-4 h-4 accent-[#B87333] cursor-pointer"
            />
          </div>

          {/* Paths */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="flex flex-col gap-1.5">
              <label htmlFor="builder-read-path" className="text-xs font-mono-eyebrow text-on-surface-variant">
                Read Path Prefix
              </label>
              <input
                id="builder-read-path"
                type="text"
                value={readPath}
                onChange={(e) => setReadPath(e.target.value)}
                className="bg-surface-container-high/80 border border-white/10 rounded px-2.5 py-1.5 text-xs text-on-surface font-mono-code focus:outline-none focus:border-primary"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label htmlFor="builder-write-path" className="text-xs font-mono-eyebrow text-on-surface-variant">
                Write Path Prefix
              </label>
              <input
                id="builder-write-path"
                type="text"
                value={writePath}
                onChange={(e) => setWritePath(e.target.value)}
                className="bg-surface-container-high/80 border border-white/10 rounded px-2.5 py-1.5 text-xs text-on-surface font-mono-code focus:outline-none focus:border-primary"
              />
            </div>
          </div>

          {/* Resource Limits */}
          <div className="flex flex-col gap-2.5 pt-2 border-t border-white/10">
            <div className="flex items-center justify-between text-xs font-mono-eyebrow">
              <span className="text-primary flex items-center gap-1.5 uppercase">
                <Cpu className="w-3.5 h-3.5" />
                Containment Tier Limits
              </span>
              <span className="text-[10px] text-on-surface-variant/70">Linux &amp; Windows</span>
            </div>
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="flex flex-col gap-1">
                <span className="text-on-surface-variant text-[11px]">CPU Limit: {cpuLimit}s</span>
                <input
                  type="range"
                  min="1"
                  max="60"
                  aria-label="CPU Limit in seconds"
                  value={cpuLimit}
                  onChange={(e) => setCpuLimit(Number(e.target.value))}
                  className="accent-[#B87333] cursor-pointer"
                />
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-on-surface-variant text-[11px]">RAM Limit: {memLimit}MB</span>
                <input
                  type="range"
                  min="128"
                  max="2048"
                  step="128"
                  aria-label="RAM Limit in megabytes"
                  value={memLimit}
                  onChange={(e) => setMemLimit(Number(e.target.value))}
                  className="accent-[#B87333] cursor-pointer"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Output Code Panel */}
        <div className="lg:col-span-7 code-window rounded-xl overflow-hidden border border-white/10 flex flex-col justify-between bg-[#13171A]">
          {/* Format Selector Bar */}
          <div className="bg-surface-container-high px-4 py-2.5 border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setOutputFormat('python')}
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded text-xs font-mono-code transition-colors ${
                  outputFormat === 'python'
                    ? 'bg-primary text-[#18120d] font-bold'
                    : 'text-on-surface-variant hover:text-white'
                }`}
              >
                <Code className="w-3.5 h-3.5" />
                <span>Python Builder</span>
              </button>
              <button
                onClick={() => setOutputFormat('yaml')}
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded text-xs font-mono-code transition-colors ${
                  outputFormat === 'yaml'
                    ? 'bg-primary text-[#18120d] font-bold'
                    : 'text-on-surface-variant hover:text-white'
                }`}
              >
                <FileCode className="w-3.5 h-3.5" />
                <span>YAML Document</span>
              </button>
            </div>

            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 text-xs font-mono-code text-on-surface-variant hover:text-primary transition-colors px-2.5 py-1 rounded bg-white/5 hover:bg-white/10 border border-white/10"
              title="Copy output code"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-primary" />
                  <span className="text-primary">Copied</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy</span>
                </>
              )}
            </button>
          </div>

          {/* Code Viewer */}
          <div className="p-5 font-mono-code text-xs sm:text-sm text-on-surface leading-relaxed whitespace-pre overflow-x-auto bg-[#13171A] flex-1">
            <code>{outputCode}</code>
          </div>

          {/* Platform Behavior Note */}
          <div className="p-3 bg-[#0F1316] border-t border-white/10 flex items-start gap-2 text-[11px] text-on-surface-variant leading-relaxed">
            <Info className="w-3.5 h-3.5 text-primary shrink-0 mt-0.5" />
            <span>
              <strong>Platform enforcement note:</strong> Policy rules are verified identically cross-platform. CPU and RAM caps are applied via Linux <code className="text-white">setrlimit</code> and Windows Job Objects; macOS currently enforces filesystem and network containment via Seatbelt.
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
