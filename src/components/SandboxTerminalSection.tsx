import { useState } from 'react';
import { motion } from 'motion/react';
import { Terminal, Play, RotateCcw, ShieldCheck, ShieldAlert, FileText, Ban, Cpu, AlertTriangle } from 'lucide-react';

interface Scenario {
  id: string;
  name: string;
  category: string;
  icon: typeof ShieldAlert;
  description: string;
  command: string;
  auditRecord: Record<string, any>;
  logs: { timestamp: string; type: 'info' | 'allow' | 'deny' | 'warn'; text: string }[];
  result: {
    status: string;
    details: string;
    rule: string;
  };
}

export function SandboxTerminalSection() {
  const scenarios: Scenario[] = [
    {
      id: 'legitimate-task',
      name: '1. Legitimate Workspace Read',
      category: 'Allowed Workflow',
      icon: FileText,
      description: 'Agent accesses approved documentation inside its declared workspace.',
      command: 'gate.decide("filesystem.read", {"path": "./workspace/notes.txt"})',
      auditRecord: {
        timestamp: '2026-10-31T08:14:02.104Z',
        tool: 'filesystem.read',
        decision: 'allow',
        rule: 'read_paths',
        policy: 'workspace-policy',
        arguments: { path: './workspace/notes.txt' },
      },
      logs: [
        { timestamp: '08:14:02.101', type: 'info', text: 'Incoming tool invocation: filesystem.read' },
        { timestamp: '08:14:02.102', type: 'info', text: 'Evaluating argument "path" against read_paths allowlist' },
        { timestamp: '08:14:02.104', type: 'allow', text: '[ALLOW] Path resolves inside allowed prefix "./workspace"' },
        { timestamp: '08:14:02.105', type: 'info', text: 'Appended JSONL audit record. Delegating to underlying tool.' },
      ],
      result: {
        status: 'EXECUTION ALLOWED BY POLICY',
        details: 'Deterministic policy evaluation confirmed arguments match declared allowlist.',
        rule: 'read_paths',
      },
    },
    {
      id: 'out-of-bounds-read',
      name: '2. Path Traversal Out of Bounds',
      category: 'Policy Denial',
      icon: ShieldAlert,
      description: 'Agent attempts to read private files outside the declared workspace.',
      command: 'gate.decide("filesystem.read", {"path": "/home/user/.ssh/id_rsa"})',
      auditRecord: {
        timestamp: '2026-10-31T08:14:05.321Z',
        tool: 'filesystem.read',
        decision: 'deny',
        rule: 'read_paths',
        reason: "read path '/home/user/.ssh/id_rsa' is not under an allowed read prefix",
        policy: 'workspace-policy',
        arguments: { path: '[REDACTED_PATH]' },
      },
      logs: [
        { timestamp: '08:14:05.318', type: 'info', text: 'Incoming tool invocation: filesystem.read' },
        { timestamp: '08:14:05.319', type: 'warn', text: 'Evaluating argument "path": /home/user/.ssh/id_rsa' },
        { timestamp: '08:14:05.321', type: 'deny', text: '[POLICY DENIED] Rule "read_paths" violation: target is outside "./workspace"' },
        { timestamp: '08:14:05.322', type: 'warn', text: 'PolicyViolation raised. Underlying filesystem tool was never called.' },
        { timestamp: '08:14:05.323', type: 'info', text: 'Audit event recorded with credentials scrubbed.' },
      ],
      result: {
        status: 'BLOCKED BEFORE INVOCATION',
        details: 'PolicyViolation raised. No system file was opened or read.',
        rule: 'read_paths',
      },
    },
    {
      id: 'forbidden-tool',
      name: '3. Explicitly Forbidden Action',
      category: 'Tool Denylist',
      icon: Ban,
      description: 'Agent attempts a destructive database or file deletion tool.',
      command: 'gate.decide("filesystem.delete", {"path": "./production.db"})',
      auditRecord: {
        timestamp: '2026-10-31T08:14:09.810Z',
        tool: 'filesystem.delete',
        decision: 'deny',
        rule: 'deny_tools',
        reason: "tool 'filesystem.delete' is explicitly denied by policy",
        policy: 'workspace-policy',
      },
      logs: [
        { timestamp: '08:14:09.808', type: 'info', text: 'Incoming tool invocation: filesystem.delete' },
        { timestamp: '08:14:09.809', type: 'warn', text: 'Checking tool name against policy denylist' },
        { timestamp: '08:14:09.810', type: 'deny', text: '[POLICY DENIED] Tool "filesystem.delete" matched explicit deny rule' },
        { timestamp: '08:14:09.811', type: 'warn', text: 'Denial takes precedence over all allowlists. Call aborted.' },
      ],
      result: {
        status: 'BLOCKED BEFORE INVOCATION',
        details: 'Explicit denylist rule rejected the call immediately.',
        rule: 'deny_tools',
      },
    },
    {
      id: 'contained-subprocess',
      name: '4. Subprocess Shell Containment',
      category: 'OS Kernel Tier',
      icon: Cpu,
      description: 'Subprocess workload attempts unauthorized filesystem write trapped by host kernel.',
      command: 'sandbox.run(["bash", "-c", "rm -f /var/data && touch /tmp/evil"], policy=policy)',
      auditRecord: {
        timestamp: '2026-10-31T08:14:14.205Z',
        tool: 'sandbox',
        decision: 'allow',
        contained: true,
        exit_code: 1,
        engine: 'linux-landlock-seccomp',
      },
      logs: [
        { timestamp: '08:14:14.198', type: 'info', text: 'Spawning asphallea-run core with Landlock & seccomp-bpf' },
        { timestamp: '08:14:14.201', type: 'info', text: 'Subprocess launched with restricted kernel capability set' },
        { timestamp: '08:14:14.204', type: 'deny', text: '[OS TRAP] Landlock denied write to /var/data (Permission denied)' },
        { timestamp: '08:14:14.205', type: 'warn', text: 'Process exited with non-zero code (1). Sandbox intact.' },
      ],
      result: {
        status: 'CONTAINED AT KERNEL LEVEL',
        details: 'OS kernel rejected unauthorized syscalls directly. Host files intact.',
        rule: 'OS Landlock / Seatbelt Engine',
      },
    },
  ];

  const [activeScenario, setActiveScenario] = useState<Scenario>(scenarios[0]);
  const [isRunning, setIsRunning] = useState(false);
  const [logIndex, setLogIndex] = useState(scenarios[0].logs.length);

  const runSimulation = (scenario: Scenario) => {
    setActiveScenario(scenario);
    setIsRunning(true);
    setLogIndex(0);

    let current = 0;
    const interval = setInterval(() => {
      current++;
      setLogIndex(current);
      if (current >= scenario.logs.length) {
        clearInterval(interval);
        setIsRunning(false);
      }
    }, 350);
  };

  return (
    <section id="sandbox-simulator" className="flex flex-col gap-8 max-w-6xl mx-auto w-full scroll-mt-24">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.5 }}
        className="flex flex-col gap-3 items-center text-center max-w-3xl mx-auto"
      >
        <div className="font-mono-eyebrow text-mono-eyebrow bronze-text tracking-widest uppercase flex items-center gap-2">
          <Terminal className="w-4 h-4" />
          INTERACTIVE THREAT &amp; ENFORCEMENT SIMULATOR
        </div>
        <h2 className="font-headline-lg text-headline-lg text-on-background">
          How Asphallea handles real events.
        </h2>
        <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
          Walk through standard workflow scenarios showing how Asphallea allows legitimate tasks, halts unauthorized calls before execution, and isolates subprocesses at the OS level.
        </p>

        {/* Mandatory Visibility Notice */}
        <div className="flex items-center gap-2 px-3 py-1.5 rounded bg-white/5 border border-white/10 text-xs font-mono-code text-on-surface-variant/90 mt-1">
          <AlertTriangle className="w-3.5 h-3.5 text-primary shrink-0" />
          <span>Illustrative simulation — does not execute the Asphallea runtime.</span>
        </div>
      </motion.div>

      {/* Simulator Interface */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left: Step / Scenario Selector */}
        <div className="lg:col-span-5 flex flex-col gap-3">
          <span className="font-mono-eyebrow text-xs text-on-surface-variant uppercase tracking-wider px-1">
            Enforcement Scenarios
          </span>
          {scenarios.map((sc) => {
            const Icon = sc.icon;
            const isSelected = activeScenario.id === sc.id;
            return (
              <button
                key={sc.id}
                onClick={() => runSimulation(sc)}
                className={`code-window rounded-xl p-4 text-left border transition-all flex flex-col gap-2 ${
                  isSelected
                    ? 'border-primary bg-surface-container-high/90 shadow-bronze'
                    : 'border-white/10 hover:border-white/25 bg-[#14181C]'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Icon className={`w-4 h-4 ${isSelected ? 'text-primary' : 'text-on-surface-variant'}`} />
                    <span className="font-semibold text-sm text-on-background">{sc.name}</span>
                  </div>
                  <span className="text-[10px] font-mono-code px-2 py-0.5 rounded bg-white/5 border border-white/10 text-on-surface-variant">
                    {sc.category}
                  </span>
                </div>
                <p className="text-xs text-on-surface-variant/90 leading-relaxed">{sc.description}</p>
              </button>
            );
          })}
        </div>

        {/* Right: Terminal Console & Audit Log View */}
        <div className="lg:col-span-7 code-window rounded-xl overflow-hidden border border-white/10 flex flex-col shadow-2xl bg-[#13171A]">
          {/* Title Bar */}
          <div className="bg-surface-container-high px-4 py-2.5 border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-red-400/80"></span>
              <span className="w-2.5 h-2.5 rounded-full bg-amber-400/80"></span>
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400/80"></span>
              <span className="font-mono-eyebrow text-xs text-on-surface-variant ml-1">
                simulated-runtime-console
              </span>
            </div>
            <button
              onClick={() => runSimulation(activeScenario)}
              disabled={isRunning}
              className="flex items-center gap-1.5 text-xs font-mono-code btn-primary px-3 py-1 rounded font-bold transition-all hover:scale-95 disabled:opacity-50"
            >
              {isRunning ? (
                <>
                  <RotateCcw className="w-3.5 h-3.5 animate-spin" />
                  <span>Evaluating...</span>
                </>
              ) : (
                <>
                  <Play className="w-3.5 h-3.5" />
                  <span>Replay Scenario</span>
                </>
              )}
            </button>
          </div>

          {/* Invocation Command */}
          <div className="bg-[#0F1316] p-3.5 border-b border-white/10 font-mono-code text-xs text-on-surface flex items-center gap-2 overflow-x-auto">
            <span className="text-primary font-bold select-none">&gt;</span>
            <code className="text-on-surface truncate">{activeScenario.command}</code>
          </div>

          {/* Execution Events */}
          <div className="p-5 font-mono-code text-xs bg-[#14181C] flex flex-col gap-2 min-h-[200px]">
            {activeScenario.logs.slice(0, logIndex).map((log, idx) => (
              <div key={idx} className="flex items-start gap-2.5">
                <span className="text-on-surface-variant/50 text-[11px] shrink-0 font-mono-code">
                  [{log.timestamp}]
                </span>
                {log.type === 'deny' && <span className="text-[#ffb4ab] font-bold">{log.text}</span>}
                {log.type === 'allow' && <span className="text-emerald-400 font-bold">{log.text}</span>}
                {log.type === 'warn' && <span className="text-primary font-bold">{log.text}</span>}
                {log.type === 'info' && <span className="text-[#74d4ea]">{log.text}</span>}
              </div>
            ))}

            {logIndex >= activeScenario.logs.length && (
              <div className="mt-3 p-3.5 rounded bg-surface-container-high/80 border border-primary/25 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div className="flex items-center gap-2.5">
                  <ShieldCheck className="w-5 h-5 text-primary shrink-0" />
                  <div className="flex flex-col">
                    <span className="font-bold text-xs text-primary uppercase tracking-wide">
                      {activeScenario.result.status}
                    </span>
                    <span className="text-xs text-on-surface">
                      {activeScenario.result.details}
                    </span>
                  </div>
                </div>
                <div className="text-[10px] font-mono-code text-on-surface-variant bg-white/5 px-2 py-0.5 rounded border border-white/10 whitespace-nowrap">
                  Enforced Rule: {activeScenario.result.rule}
                </div>
              </div>
            )}
          </div>

          {/* Corresponding JSONL Audit Event Record */}
          <div className="p-4 bg-[#0F1316] border-t border-white/10 flex flex-col gap-1.5">
            <span className="text-[10px] font-mono-eyebrow text-on-surface-variant uppercase tracking-wider">
              Recorded JSONL Audit Trail Entry
            </span>
            <pre className="text-[11px] font-mono-code text-zinc-300 overflow-x-auto p-2.5 rounded bg-black/40 border border-white/5 leading-relaxed">
              {JSON.stringify(activeScenario.auditRecord, null, 2)}
            </pre>
          </div>
        </div>
      </div>
    </section>
  );
}
