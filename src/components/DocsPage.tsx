import { useState } from 'react';
import { motion } from 'motion/react';
import { BookOpen, Search, AlertTriangle, ShieldCheck, Terminal, HelpCircle, ChevronRight, ExternalLink, Code } from 'lucide-react';

interface DocItem {
  id: string;
  title: string;
  category: 'Getting Started' | 'Policy API' | 'Adapters' | 'OS Containment' | 'Errors & Fixes' | 'Common Mistakes';
  summary: string;
  symptom?: string;
  codeSnippet?: string;
  solution: string;
}

export function DocsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const docsData: DocItem[] = [
    {
      id: 'quickstart-install',
      title: 'Installation & Platform Wheels',
      category: 'Getting Started',
      summary: 'Installing Asphallea via PyPI on Linux, macOS, and Windows without Rust toolchain setup.',
      codeSnippet: `# Install the verified package from PyPI
pip install asphallea

# Verify installation in Python
python -c "import asphallea; print(asphallea.__version__)"`,
      solution: 'Asphallea distributes prebuilt binary wheels for manylinux, musllinux, macOS (universal2 for Apple Silicon and Intel), and Windows (amd64). The embedded native launcher is verified via internal SHA-256 checksums at runtime.',
    },
    {
      id: 'api-builder-reference',
      title: 'Policy.builder() Fluent API',
      category: 'Policy API',
      summary: 'Declarative methods to specify tool permissions, arguments, filesystem paths, and network rules.',
      codeSnippet: `from asphallea import Policy

policy = (
    Policy.builder("agent-scope")
    # Map tool arguments to filesystem and network resources
    .tool("read_file", reads="path")
    .tool("write_file", writes="path")
    .tool("search_web", network="url")
    # Filesystem allowlists (writes imply reads)
    .read_paths("./workspace")
    .write_paths("./workspace/out")
    # Network defaults
    .deny_network()
    .allow_hosts("api.search.example.com")
    # Call ceilings and spend limits (max calls proxy)
    .max_calls("search_web", 25)
    .spend_cap("search_web", 25)
    .timeout(30.0)
    # OS kernel containment limits (Linux setrlimit)
    .limits(cpu_seconds=10, memory_mb=512, max_processes=32)
    .build()
)`,
      solution: 'Construct an immutable Policy object using Policy.builder(name). Tool argument declarations (.tool(name, reads=..., writes=..., network=...)) allow policies to govern tools they did not author, such as external MCP endpoints.',
    },
    {
      id: 'adapter-guard-decorator',
      title: '@guard Decorator for Callables',
      category: 'Adapters',
      summary: 'Wrap synchronous or asynchronous Python functions with declarative policy evaluation.',
      codeSnippet: `from asphallea import Policy, guard, AuditLog, PolicyViolation

policy = Policy.builder("file-reader").tool("read_file", reads="path").read_paths("./workspace").build()

@guard(policy, tool="read_file", reads="path", audit=AuditLog("audit.jsonl"))
def read_file(path: str) -> str:
    with open(path, "r", encoding="utf-8") as f:
        return f.read()

# Permitted
data = read_file("./workspace/config.json")

# Raises PolicyViolation before open() executes
try:
    read_file("/etc/passwd")
except PolicyViolation as err:
    print(f"Blocked: {err.decision.reason}")`,
      solution: 'The @guard decorator intercepts arguments before function invocation. If arguments violate policy, a PolicyViolation exception is raised and the wrapped function does not execute.',
    },
    {
      id: 'adapter-mcp-session',
      title: 'guard_mcp_session & guard_call_tool',
      category: 'Adapters',
      summary: 'Intercept Model Context Protocol client sessions and server call handlers.',
      codeSnippet: `from asphallea import Policy
from asphallea.integrations.mcp import guard_mcp_session, guard_call_tool

policy = (
    Policy.builder("mcp-scope")
    .tool("filesystem.read", reads="path")
    .tool("filesystem.delete", writes="path")
    .read_paths("./workspace")
    .deny_network()
    .build()
)

# 1. Wrap an entire MCP client session
guarded_session = guard_mcp_session(session, policy, on_deny="error")

# 2. Or wrap an individual call_tool callable
guarded_call = guard_call_tool(raw_call_tool, policy, on_deny="raise")`,
      solution: 'guard_mcp_session is a drop-in wrapper around an MCP client session. Set on_deny="error" to return an MCP tool error response so the agent receives the refusal without an unhandled exception crashing your loop.',
    },
    {
      id: 'adapter-langchain-tool',
      title: 'guard_tool for LangChain & LangGraph',
      category: 'Adapters',
      summary: 'Wrap LangChain BaseTool instances or @tool functions with positional policy_or_engine.',
      codeSnippet: `from asphallea import Policy
from asphallea.integrations.langchain import guard_tool

policy = Policy.builder("lc-agent").tool("read_file", reads="path").read_paths("./workspace").build()

# Note: policy_or_engine is a positional parameter:
guarded_tool = guard_tool(read_file_tool, policy, reads="path", on_deny="raise")

# Pass guarded_tool directly into your LangChain / LangGraph agent`,
      solution: 'guard_tool accepts tool as the first argument and policy_or_engine as the second positional argument. It preserves tool name, description, and args_schema for LLM schema generation while intercepting invoke() calls.',
    },
    {
      id: 'containment-sandbox-run',
      title: 'sandbox.run Subprocess Execution',
      category: 'OS Containment',
      summary: 'Launch shell or script commands under native OS kernel sandboxing via asphallea-run.',
      codeSnippet: `from asphallea import Policy, sandbox, capabilities

# Check host kernel support
caps = capabilities()
print(caps.explain())

policy = Policy.builder("shell-runner").allow_tools("shell").read_paths("./workspace").write_paths("./workspace/out").deny_network().build()

# Runs under Landlock on Linux, AppContainer on Windows, Seatbelt on macOS
result = sandbox.run(
    ["bash", "-c", "echo hello > ./workspace/out/test.txt"],
    policy=policy,
    tool="shell"
)

assert result.contained is True
assert result.returncode == 0`,
      solution: 'sandbox.run invokes the prebuilt asphallea-run binary, which applies OS kernel restrictions before launching the child command. If requested containment cannot be delivered by the host kernel, it fails closed with ContainmentUnavailable unless allow_degraded=True is explicitly passed.',
    },
    {
      id: 'err-policy-violation',
      title: 'PolicyViolation Exception',
      category: 'Errors & Fixes',
      summary: 'Raised when a tool call, network host, or filesystem path is denied by declarative policy.',
      symptom: 'asphallea.exceptions.PolicyViolation: read path "/etc/passwd" is not under an allowed read prefix (rule=read_paths)',
      codeSnippet: `# Fix: Expand declared read prefixes if legitimate, or inspect agent prompt
policy = (
    Policy.builder("agent-scope")
    .read_paths("./workspace", "/etc/app-configs") # Add legitimate path
    .build()
)`,
      solution: 'Inspect the rule that failed via err.decision.rule and err.decision.reason. If the access was legitimate, update your Policy.builder() declaration with explicit paths or tools.',
    },
    {
      id: 'err-containment-unavailable',
      title: 'ContainmentUnavailable (Fail-Closed)',
      category: 'Errors & Fixes',
      summary: 'Raised when sandbox.run cannot enforce the requested OS kernel containment on the current host.',
      symptom: 'asphallea.exceptions.ContainmentUnavailable: backend cannot deliver filesystem containment: host Linux kernel is 5.4, but Landlock requires Linux 5.13+',
      codeSnippet: `# Development-only fallback:
result = sandbox.run(cmd, policy=policy, allow_degraded=True)
# WARNING: Logs degraded status on every call. Never deploy uncontained in production.`,
      solution: 'Asphallea fails closed rather than running commands without requested OS protections. Ensure your Linux host is running kernel 5.13+, or pass allow_degraded=True only in local test environments.',
    },
    {
      id: 'err-integrity-error',
      title: 'IntegrityError (SHA-256 Hash Mismatch)',
      category: 'Errors & Fixes',
      summary: 'Raised when the SHA-256 hash of asphallea-run does not match the checksum manifest bundled in the release wheel.',
      symptom: 'asphallea.IntegrityError: core binary hash <actual> does not match the manifest hash <expected>; the binary may have been tampered with or replaced',
      solution: 'Reinstall the release wheel from PyPI with "pip install --force-reinstall asphallea". If pointing at a custom binary via ASPHALLEA_CORE_BIN, verify its checksum against official release artifacts.',
    },
    {
      id: 'pitfall-unmapped-args',
      title: 'Common Mistake: Unmapped Tool Arguments',
      category: 'Common Mistakes',
      summary: 'Forgetting to declare tool argument mappings prevents the engine from evaluating file paths or URLs.',
      codeSnippet: `# INCORRECT (policy allowlists path, but engine doesn't know tool parameter 'file_path' is a path):
Policy.builder("agent").read_paths("./workspace").allow_tools("fetch_doc").build()

# CORRECT:
Policy.builder("agent").tool("fetch_doc", reads="file_path").read_paths("./workspace").build()`,
      solution: 'Always declare parameter resource bindings using .tool("tool_name", reads="param", writes="param", network="param") so Asphallea knows which arguments to evaluate.',
    },
    {
      id: 'pitfall-guard-vs-sandbox',
      title: 'Common Mistake: Conflating @guard with Subprocess Sandbox',
      category: 'Common Mistakes',
      summary: 'Assuming that decorating an arbitrary Python function with @guard automatically places its child processes inside an OS sandbox.',
      solution: '@guard evaluates function arguments and refuses invocation if policy is breached. It does NOT containerize arbitrary operating system syscalls made inside the function body. For child processes and shell execution, use sandbox.run().',
    },
  ];

  const categories = ['All', 'Getting Started', 'Policy API', 'Adapters', 'OS Containment', 'Errors & Fixes', 'Common Mistakes'];

  const filteredDocs = docsData.filter((item) => {
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    const matchesSearch =
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.summary.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (item.symptom && item.symptom.toLowerCase().includes(searchTerm.toLowerCase())) ||
      item.solution.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const [activeItem, setActiveItem] = useState<DocItem>(docsData[0]);

  return (
    <div className="flex flex-col gap-10 max-w-6xl mx-auto w-full py-6">
      {/* Header */}
      <div className="flex flex-col gap-3 text-center max-w-3xl mx-auto">
        <div className="font-mono-eyebrow text-mono-eyebrow bronze-text tracking-widest uppercase flex items-center justify-center gap-2">
          <BookOpen className="w-4 h-4" />
          DEVELOPER DOCUMENTATION &amp; API REFERENCE
        </div>
        <h1 className="font-headline-xl text-headline-xl text-on-background">
          Asphallea Documentation &amp; Error Guide
        </h1>
        <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
          Comprehensive reference for the open-source runtime (v0.1.1), including Policy API signatures, framework adapters, OS containment mechanics, and error troubleshooting.
        </p>
      </div>

      {/* Search & Category Filter */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-white/10 pb-5">
        <div className="flex flex-wrap gap-1.5">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded text-xs font-mono-code transition-all ${
                selectedCategory === cat
                  ? 'btn-primary font-bold'
                  : 'bg-surface-container-high/80 text-on-surface-variant hover:text-white border border-white/5'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant/70" />
          <input
            type="text"
            placeholder="Search API, errors, symptoms..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-surface-container-high/80 border border-white/10 rounded px-3 pl-9 py-1.5 text-xs text-on-surface focus:outline-none focus:border-primary font-mono-code"
          />
        </div>
      </div>

      {/* Docs Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left: Article List */}
        <div className="lg:col-span-5 flex flex-col gap-2.5">
          {filteredDocs.map((item) => {
            const isSelected = activeItem.id === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveItem(item)}
                className={`code-window rounded-xl p-4 text-left border transition-all flex flex-col gap-1.5 ${
                  isSelected
                    ? 'border-primary bg-surface-container-high/90 shadow-bronze'
                    : 'border-white/10 hover:border-white/25 bg-[#14181C]'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-xs text-on-background">{item.title}</span>
                  <span className="text-[10px] font-mono-code px-2 py-0.5 rounded bg-white/5 border border-white/10 text-primary">
                    {item.category}
                  </span>
                </div>
                <p className="text-[11px] text-on-surface-variant/80 line-clamp-2 leading-relaxed">
                  {item.summary}
                </p>
              </button>
            );
          })}

          {filteredDocs.length === 0 && (
            <div className="p-8 text-center text-xs text-on-surface-variant code-window rounded-xl border border-white/10">
              No documentation items matched your search query.
            </div>
          )}
        </div>

        {/* Right: Selected Article Content */}
        <div className="lg:col-span-7 code-window rounded-xl p-6 border border-white/10 flex flex-col gap-5 bg-[#161B20]">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <div>
              <h2 className="font-headline-md text-lg text-on-background font-bold">
                {activeItem.title}
              </h2>
              <span className="text-[11px] text-primary font-mono-code">
                Category: {activeItem.category}
              </span>
            </div>
            <a
              href="https://github.com/Asphallea/Asphallea"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-on-surface-variant hover:text-primary transition-colors flex items-center gap-1 font-mono-code"
            >
              <span>GitHub Source</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          <p className="text-xs text-on-surface-variant leading-relaxed">
            {activeItem.summary}
          </p>

          {activeItem.symptom && (
            <div className="flex flex-col gap-1.5 p-3.5 rounded bg-red-500/10 border border-red-500/25 text-red-200 text-xs">
              <span className="font-bold flex items-center gap-1.5 text-red-400">
                <AlertTriangle className="w-3.5 h-3.5" />
                Error Traceback / Symptom:
              </span>
              <code className="font-mono-code text-[11px] break-all">{activeItem.symptom}</code>
            </div>
          )}

          {activeItem.codeSnippet && (
            <div className="flex flex-col gap-1.5">
              <span className="text-xs font-mono-eyebrow text-on-surface-variant">Verified Python Implementation:</span>
              <div className="p-4 rounded-lg bg-[#111518] border border-white/10 overflow-x-auto text-xs text-on-surface whitespace-pre leading-relaxed font-mono-code">
                <code>{activeItem.codeSnippet}</code>
              </div>
            </div>
          )}

          <div className="flex flex-col gap-1.5 pt-2 border-t border-white/10">
            <span className="text-xs text-primary font-bold font-mono-eyebrow">Technical Resolution &amp; Architecture Note:</span>
            <p className="text-xs text-on-surface-variant leading-relaxed">
              {activeItem.solution}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
