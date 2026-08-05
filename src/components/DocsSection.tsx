import { useState } from 'react';
import { motion } from 'motion/react';
import { BookOpen, Search, AlertTriangle, ShieldCheck, Terminal, HelpCircle, ChevronRight } from 'lucide-react';

interface DocItem {
  id: string;
  title: string;
  category: 'Overview' | 'API Reference' | 'Errors & Fixes' | 'Common Mistakes';
  summary: string;
  symptom?: string;
  codeSnippet?: string;
  solution: string;
}

export function DocsSection() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeItem, setActiveItem] = useState<DocItem | null>(null);

  const docsData: DocItem[] = [
    {
      id: 'err-policy-violation',
      title: 'PolicyViolation Exception',
      category: 'Errors & Fixes',
      summary: 'Raised when an agent attempts a tool invocation, network request, or path write denied by policy.',
      symptom: 'asphallea.exceptions.PolicyViolation: Path "/etc/passwd" is outside allowed write prefix "./workspace"',
      codeSnippet: `# Fix: Add legitimate path prefixes or allow tools explicitly
policy = (
    Policy.builder("agent-scope")
    .read_paths("./workspace", "/etc/config") # Expand read scope
    .build()
)`,
      solution: 'Verify the tool name and arguments. If the action is intended, update your Policy.builder() declaration with explicit path or tool permissions.',
    },
    {
      id: 'err-degraded-mode',
      title: 'DegradedModeError (OS Containment Missing)',
      category: 'Errors & Fixes',
      summary: 'Raised when sandbox.run() cannot enforce OS kernel containment (e.g. kernel < 5.13 or missing binary).',
      symptom: 'asphallea.exceptions.DegradedModeError: OS containment unavailable (Landlock / seccomp missing)',
      codeSnippet: `# Fix A: Compile Rust launcher binary
# cd core && cargo build --release
# export ASPHALLEA_CORE_BIN="$PWD/target/release/asphallea-run"

# Fix B: Non-prod fallback mode (logs degraded state)
result = sandbox.run(cmd, policy=policy, allow_degraded=True)`,
      solution: 'Ensure your Linux kernel is 5.13+ or build asphallea-run Rust core binary. Pass allow_degraded=True only in development environments.',
    },
    {
      id: 'err-binary-verification',
      title: 'IntegrityError (SHA-256 Hash Mismatch)',
      category: 'Errors & Fixes',
      summary: 'Raised when the SHA-256 hash of asphallea-run does not match the checksum manifest bundled in the release wheel.',
      symptom: 'asphallea.IntegrityError: core binary hash <actual> does not match the manifest hash <expected>; the binary may have been tampered with or replaced',
      solution: 'Reinstall the release wheel for your platform from the GitHub releases page with --force-reinstall, which restores both the core binary and its manifest. If you are pointing at your own binary via ASPHALLEA_CORE_BIN, check that it is the one you intend and verify its SHA-256 against the release page.',
    },
    {
      id: 'pitfall-unmapped-args',
      title: 'Mistake: Unmapped Tool Arguments',
      category: 'Common Mistakes',
      summary: 'Forgetting to specify argument resource mapping causes path checks to skip argument evaluation.',
      codeSnippet: `# Incorrect:
Policy.builder("agent").read_paths("./workspace").build()

# Correct (tells policy engine which kwarg contains path):
Policy.builder("agent")
.tool("filesystem.read", reads="path")
.read_paths("./workspace")
.build()`,
      solution: 'Always declare how tool parameters map to resources using .tool("name", reads="arg", writes="arg") in Policy.builder().',
    },
    {
      id: 'api-builder-reference',
      title: 'Policy.builder() Full API Reference',
      category: 'API Reference',
      summary: 'Complete method declarations for declarative policy construction.',
      codeSnippet: `policy = (
    Policy.builder("scope-name")
    .tool("tool_name", reads="path_arg", writes="out_arg")
    .read_paths("./workspace")
    .write_paths("./workspace/out")
    .deny_network()
    .deny_tool("banned_tool")
    .limits(cpu_seconds=10, memory_mb=512, max_processes=64)
    .spend_cap(100) # Max 100 tool invocations
    .build()
)`,
      solution: 'Use Policy.builder() to declaratively set filesystem, network, process, rate, and spend limits.',
    },
    {
      id: 'overview-architecture',
      title: 'Two-Tier Security Architecture Overview',
      category: 'Overview',
      summary: 'How the Policy Tier and Containment Tier work together without model-in-the-loop.',
      solution: 'The Policy Tier evaluates tool calls deterministically cross-platform. The Containment Tier uses Linux Landlock/seccomp, Windows AppContainer/Job Objects, and macOS Seatbelt to sandbox sub-processes at the OS kernel level.',
    },
  ];

  const categories = ['All', 'Overview', 'API Reference', 'Errors & Fixes', 'Common Mistakes'];

  const filteredDocs = docsData.filter((item) => {
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    const matchesSearch =
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.summary.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (item.symptom && item.symptom.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <section id="docs" className="flex flex-col gap-12 max-w-6xl mx-auto w-full scroll-mt-24">
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.5 }}
        className="flex flex-col gap-4 items-center text-center max-w-3xl mx-auto"
      >
        <div className="font-mono-eyebrow text-mono-eyebrow bronze-text tracking-widest uppercase flex items-center gap-2">
          <BookOpen className="w-4 h-4" />
          DOCUMENTATION & TROUBLESHOOTING
        </div>
        <h2 className="font-headline-lg text-headline-lg text-on-background">
          Developer Docs & Error Guide.
        </h2>
        <p className="font-body-md text-body-md text-on-surface-variant">
          Complete guide covering every API method, error code, troubleshooting scenario, and common pitfall when guarding AI agents.
        </p>
      </motion.div>

      {/* Filter & Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-white/5 pb-6">
        {/* Category Pills */}
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-md text-xs font-mono-code transition-all ${
                selectedCategory === cat
                  ? 'btn-primary font-bold'
                  : 'bg-surface-container-high text-on-surface-variant hover:text-on-background'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant" />
          <input
            type="text"
            placeholder="Search errors, APIs, or symptoms..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-surface-container-high border border-white/10 rounded-lg pl-9 pr-4 py-1.5 text-xs text-on-surface focus:outline-none focus:border-primary font-mono-code"
          />
        </div>
      </div>

      {/* Docs Grid / List */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left List */}
        <div className="lg:col-span-5 flex flex-col gap-3">
          {filteredDocs.map((item) => (
            <div
              key={item.id}
              onClick={() => setActiveItem(item)}
              className={`code-window rounded-xl p-4 cursor-pointer border transition-all flex flex-col gap-2 ${
                activeItem?.id === item.id
                  ? 'border-primary bg-surface-container-high/80'
                  : 'border-white/5 hover:border-white/20'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-semibold text-sm text-on-background">{item.title}</span>
                <span className="text-[10px] font-mono-code px-2 py-0.5 rounded bg-white/5 text-primary">
                  {item.category}
                </span>
              </div>
              <p className="text-xs text-on-surface-variant line-clamp-2">{item.summary}</p>
            </div>
          ))}

          {filteredDocs.length === 0 && (
            <div className="p-8 text-center text-xs text-on-surface-variant code-window rounded-xl border border-white/5">
              No documentation items matched your search query.
            </div>
          )}
        </div>

        {/* Right Detail Pane */}
        <div className="lg:col-span-7 code-window rounded-xl p-6 border border-white/10 flex flex-col gap-4">
          {activeItem ? (
            <div className="flex flex-col gap-4 font-mono-code text-xs sm:text-sm">
              <div className="flex items-center justify-between border-b border-white/5 pb-3">
                <h3 className="font-headline-md text-base text-on-background font-semibold">
                  {activeItem.title}
                </h3>
                <span className="text-xs text-primary bg-primary/10 px-2.5 py-1 rounded">
                  {activeItem.category}
                </span>
              </div>

              <p className="text-on-surface-variant leading-relaxed">{activeItem.summary}</p>

              {activeItem.symptom && (
                <div className="flex flex-col gap-1.5 p-3 rounded bg-red-500/10 border border-red-500/20 text-red-300 text-xs">
                  <span className="font-bold flex items-center gap-1 text-red-400">
                    <AlertTriangle className="w-3.5 h-3.5" />
                    Exact Error Traceback / Symptom:
                  </span>
                  <code>{activeItem.symptom}</code>
                </div>
              )}

              {activeItem.codeSnippet && (
                <div className="flex flex-col gap-1.5">
                  <span className="text-xs text-on-surface-variant">Recommended Code Fix:</span>
                  <div className="p-4 rounded bg-[#121619] border border-white/5 overflow-x-auto text-xs text-on-surface whitespace-pre">
                    <code>{activeItem.codeSnippet}</code>
                  </div>
                </div>
              )}

              <div className="flex flex-col gap-1 pt-2 border-t border-white/5">
                <span className="text-xs text-primary font-bold">Resolution & Best Practice:</span>
                <p className="text-xs text-on-surface-variant leading-relaxed">{activeItem.solution}</p>
              </div>
            </div>
          ) : (
            <div className="py-16 text-center text-xs text-on-surface-variant flex flex-col items-center gap-3">
              <HelpCircle className="w-8 h-8 text-primary/50" />
              <span>Select an API method, error code, or common mistake on the left to view the full resolution guide.</span>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
