import { Copy, Check, Terminal, Shield, Lock, Layers, Cpu } from 'lucide-react';
import { motion } from 'motion/react';
import { useState } from 'react';

export function QuickstartSection() {
  const [activeTab, setActiveTab] = useState<'policy' | 'containment'>('policy');
  const [copied, setCopied] = useState(false);

  const policySnippet = `from asphallea import Policy, guard, PolicyViolation

# 1. Declare a least-privilege policy for an agent
policy = (
    Policy.builder("agent-workspace-scope")
    .tool("read_data", reads="path")
    .read_paths("./workspace")
    .deny_network()
    .build()
)

# 2. Intercept the agent's tool before it runs
@guard(policy, tool="read_data", reads="path")
def read_data(path: str) -> str:
    with open(path, "r", encoding="utf-8") as f:
        return f.read()

# 3. Permitted invocation inside declared workspace
content = read_data("./workspace/notes.txt")

# 4. Out-of-bounds invocation raises PolicyViolation immediately
try:
    read_data("/etc/shadow")
except PolicyViolation as err:
    # Denied deterministically before open() was ever called
    print(f"Policy denied [{err.decision.rule}]: {err.decision.reason}")`;

  const containmentSnippet = `from asphallea import Policy, sandbox

# 1. Policy for shell execution workloads
policy = (
    Policy.builder("isolated-worker")
    .allow_tools("shell_worker")
    .read_paths("./workspace")
    .write_paths("./workspace/out")
    .deny_network()
    .limits(cpu_seconds=10, memory_mb=512, max_processes=32)
    .build()
)

# 2. Execute arbitrary subprocess under OS kernel containment
# On Linux: Landlock filesystem allowlist + seccomp-bpf syscall filter
# On Windows: AppContainer isolation + Job Object bounds
# On macOS: Seatbelt sandbox-exec profile
result = sandbox.run(
    ["bash", "-c", "rm -rf /var/data && echo 'done' > ./workspace/out/res.txt"],
    policy=policy,
    tool="shell_worker"
)

# 3. Check containment outcome
print(f"Contained: {result.contained}")
print(f"Exit code: {result.returncode}")  # Non-zero on kernel trap
if result.stderr:
    print(f"Stderr: {result.stderr.strip()}")`;

  const activeSnippet = activeTab === 'policy' ? policySnippet : containmentSnippet;

  const handleCopy = () => {
    navigator.clipboard.writeText(activeSnippet);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="quickstart" className="flex flex-col gap-10 max-w-6xl mx-auto w-full scroll-mt-24">
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
          DEVELOPER QUICKSTART &amp; VERIFIED APIS
        </div>
        <h2 className="font-headline-lg text-headline-lg text-on-background">
          Two distinct layers of runtime defense.
        </h2>
        <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
          Asphallea separates tool policy evaluation from OS subprocess containment. Decorating a function checks declared arguments before invocation; <code className="text-primary font-mono-code">sandbox.run</code> places child processes inside OS kernel sandboxes.
        </p>
      </motion.div>

      {/* Code Editor with Tabs */}
      <div className="code-window rounded-xl overflow-hidden shadow-2xl flex flex-col border border-white/10">
        {/* Editor Tab Bar */}
        <div className="bg-surface-container-high px-4 py-2.5 border-b border-white/10 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab('policy')}
              className={`flex items-center gap-2 px-3 py-1.5 rounded text-xs font-mono-code transition-all ${
                activeTab === 'policy'
                  ? 'bg-primary text-[#18120d] font-bold shadow-sm'
                  : 'bg-white/5 text-on-surface-variant hover:text-white'
              }`}
            >
              <Shield className="w-3.5 h-3.5" />
              <span>Layer 1: Policy Interception (@guard)</span>
            </button>
            <button
              onClick={() => setActiveTab('containment')}
              className={`flex items-center gap-2 px-3 py-1.5 rounded text-xs font-mono-code transition-all ${
                activeTab === 'containment'
                  ? 'bg-primary text-[#18120d] font-bold shadow-sm'
                  : 'bg-white/5 text-on-surface-variant hover:text-white'
              }`}
            >
              <Cpu className="w-3.5 h-3.5" />
              <span>Layer 2: OS Containment (sandbox.run)</span>
            </button>
          </div>

          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 text-xs font-mono-code text-on-surface-variant hover:text-primary transition-colors px-2.5 py-1 rounded bg-white/5 hover:bg-white/10 border border-white/5"
            title="Copy code snippet"
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

        {/* Code Content */}
        <div className="p-6 font-mono-code text-xs sm:text-sm bg-[#13171A] overflow-x-auto leading-relaxed text-on-surface whitespace-pre">
          <code>{activeSnippet}</code>
        </div>

        {/* Footer Explanation Note */}
        <div className="bg-[#181D22] px-6 py-4 border-t border-white/5 text-xs text-on-surface-variant flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          {activeTab === 'policy' ? (
            <p className="leading-relaxed">
              <strong className="text-white">What this demonstrates:</strong> The Policy Tier acts before callable execution. It checks tool names, resource arguments (reads, writes, network hosts), spend counts, and rate limits. If denied, it raises <code className="text-primary font-mono-code">PolicyViolation</code> without running the function.
            </p>
          ) : (
            <p className="leading-relaxed">
              <strong className="text-white">What this demonstrates:</strong> The Containment Tier runs the command via <code className="text-primary font-mono-code">asphallea-run</code> with OS-enforced restrictions. Even if a shell command attempts forbidden operations (like deleting outside the workspace), the host kernel denies syscalls directly.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
