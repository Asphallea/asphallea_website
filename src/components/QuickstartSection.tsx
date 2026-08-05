import { Copy, Check, Terminal, Shield, Lock, Zap } from 'lucide-react';
import { motion } from 'motion/react';
import { useState } from 'react';

export function QuickstartSection() {
  const [copied, setCopied] = useState(false);

  const pythonCode = `from asphallea import Policy, guard
import subprocess

# 1. Build a strict, least-privilege policy
strict_policy = (
    Policy.builder("strict-agent-policy")
    .deny_network()
    .read_paths("/tmp/workspace")
    .deny_tool("run_shell") # Explicitly deny arbitrary shell execution
    .build()
)

# 2. Wrap the agent's dangerous tool with Asphallea
@guard(strict_policy, tool="run_shell")
def execute_agent_command(command: str):
    # If the agent attempts a banned command,
    # the OS-level sandbox intercepts it here.
    result = subprocess.run(
        command.split(), 
        capture_output=True, 
        text=True
    )
    return result.stdout

# 3. Simulate a prompt-injected agent
try:
    # Agent hallucinates a dangerous command
    execute_agent_command("pip install antigravity")
except Exception as e:
    print(f"Blocked by Asphallea Runtime: {e}")`;

  const handleCopy = () => {
    navigator.clipboard.writeText(pythonCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="quickstart" className="flex flex-col gap-12 max-w-6xl mx-auto w-full scroll-mt-24">
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.5 }}
        className="flex flex-col gap-4 items-center text-center max-w-3xl mx-auto"
      >
        <div className="font-mono-eyebrow text-mono-eyebrow bronze-text tracking-widest uppercase flex items-center gap-2">
          <Terminal className="w-4 h-4" />
          QUICKSTART & API
        </div>
        <h2 className="font-headline-lg text-headline-lg text-on-background">
          Five minutes to containment.
        </h2>
        <p className="font-body-md text-body-md text-on-surface-variant">
          Asphallea uses explicit authorization via a builder policy and a{' '}
          <code className="text-primary font-mono-code px-1.5 py-0.5 rounded bg-white/5 border border-white/10">
            @guard
          </code>{' '}
          decorator to wrap your agent’s dangerous operations in OS-level sandbox constraints.
        </p>
      </motion.div>

      {/* Code & Explanation Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Code Editor Window */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="lg:col-span-8 code-window rounded-xl overflow-hidden shadow-2xl flex flex-col border border-white/10"
        >
          {/* Editor Header Bar */}
          <div className="bg-surface-container-high px-4 py-3 border-b border-white/5 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-[#ff5f56]"></span>
              <span className="w-3 h-3 rounded-full bg-[#ffbd2e]"></span>
              <span className="w-3 h-3 rounded-full bg-[#27c93f]"></span>
              <span className="font-mono-eyebrow text-mono-eyebrow text-on-surface-variant ml-2 flex items-center gap-2">
                main.py
              </span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-xs font-mono-code text-on-surface-variant/60 bg-white/5 px-2 py-0.5 rounded">
                Python 3.10+
              </span>
              <button
                onClick={handleCopy}
                className="flex items-center gap-1.5 text-xs font-mono-code text-on-surface-variant hover:text-primary transition-colors px-2 py-1 rounded bg-white/5 hover:bg-white/10 border border-white/5"
                title="Copy code snippet"
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
          </div>

          {/* Syntax-Highlighted Python Code */}
          <div className="p-6 font-mono-code text-mono-code text-on-surface whitespace-pre overflow-x-auto leading-relaxed text-xs sm:text-sm">
            <span className="text-[#ffb77b]">from</span> asphallea{' '}
            <span className="text-[#ffb77b]">import</span> Policy, guard
            <br />
            <span className="text-[#ffb77b]">import</span> subprocess
            <br />
            <br />
            <span className="text-on-surface-variant/50"># 1. Build a strict, least-privilege policy</span>
            <br />
            strict_policy = (
            <br />
            {'    '}Policy.builder(<span className="text-[#a8edff]">"strict-agent-policy"</span>)
            <br />
            {'    '}.deny_network()
            <br />
            {'    '}.read_paths(<span className="text-[#a8edff]">"/tmp/workspace"</span>)
            <br />
            {'    '}.deny_tool(<span className="text-[#a8edff]">"run_shell"</span>){' '}
            <span className="text-on-surface-variant/50"># Explicitly deny arbitrary shell execution</span>
            <br />
            {'    '}.build()
            <br />
            )
            <br />
            <br />
            <span className="text-on-surface-variant/50"># 2. Wrap the agent's dangerous tool with Asphallea</span>
            <br />
            <span className="text-[#74d4ea]">@guard</span>(strict_policy, tool=<span className="text-[#a8edff]">"run_shell"</span>)
            <br />
            <span className="text-[#ffb77b]">def</span> <span className="text-[#74d4ea]">execute_agent_command</span>(command: <span className="text-[#ffb77b]">str</span>):
            <br />
            {'    '}<span className="text-on-surface-variant/50"># If the agent attempts a banned command,</span>
            <br />
            {'    '}<span className="text-on-surface-variant/50"># the OS-level sandbox intercepts it here.</span>
            <br />
            {'    '}result = subprocess.run(
            <br />
            {'        '}command.split(), 
            <br />
            {'        '}capture_output=<span className="text-[#ffb77b]">True</span>, 
            <br />
            {'        '}text=<span className="text-[#ffb77b]">True</span>
            <br />
            {'    '}
            )
            <br />
            {'    '}<span className="text-[#ffb77b]">return</span> result.stdout
            <br />
            <br />
            <span className="text-on-surface-variant/50"># 3. Simulate a prompt-injected agent</span>
            <br />
            <span className="text-[#ffb77b]">try</span>:
            <br />
            {'    '}<span className="text-on-surface-variant/50"># Agent hallucinates a dangerous command</span>
            <br />
            {'    '}execute_agent_command(<span className="text-[#a8edff]">"pip install antigravity"</span>)
            <br />
            <span className="text-[#ffb77b]">except</span> <span className="text-[#ffb77b]">Exception</span> <span className="text-[#ffb77b]">as</span> e:
            <br />
            {'    '}<span className="text-[#ffb77b]">print</span>(f<span className="text-[#a8edff]">"Blocked by Asphallea Runtime: &#123;e&#125;"</span>)
          </div>
        </motion.div>

        {/* Feature Cards side panel */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="lg:col-span-4 flex flex-col gap-4"
        >
          <div className="code-window rounded-xl p-5 border border-white/5 flex flex-col gap-2 hover:border-primary/40 transition-colors">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded bg-surface-container-high text-primary">
                <Shield className="w-5 h-5" />
              </div>
              <h3 className="font-headline-md text-base text-on-background font-semibold">
                1. Builder Policy
              </h3>
            </div>
            <p className="font-body-md text-xs text-on-surface-variant leading-relaxed">
              Define explicit network, filesystem, and tool rules declaratively using the fluent Python API before spawning agents.
            </p>
          </div>

          <div className="code-window rounded-xl p-5 border border-white/5 flex flex-col gap-2 hover:border-primary/40 transition-colors">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded bg-surface-container-high text-[#74d4ea]">
                <Lock className="w-5 h-5" />
              </div>
              <h3 className="font-headline-md text-base text-on-background font-semibold">
                2. @guard Interceptor
              </h3>
            </div>
            <p className="font-body-md text-xs text-on-surface-variant leading-relaxed">
              Decorate target Python functions or tool invocation handlers to automatically enforce policy checks prior to kernel execution.
            </p>
          </div>

          <div className="code-window rounded-xl p-5 border border-white/5 flex flex-col gap-2 hover:border-primary/40 transition-colors">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded bg-surface-container-high text-[#ffb4ab]">
                <Zap className="w-5 h-5" />
              </div>
              <h3 className="font-headline-md text-base text-on-background font-semibold">
                3. Deterministic Blocking
              </h3>
            </div>
            <p className="font-body-md text-xs text-on-surface-variant leading-relaxed">
              Prompt injection attempts and unauthorized tool calls trigger clean runtime exceptions without collateral process degradation.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
