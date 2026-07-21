import { Copy, Star } from 'lucide-react';

export function HeroSection() {
  return (
    <section className="grid grid-cols-1 md:grid-cols-12 gap-gutter items-center">
      {/* Left Column: Copy */}
      <div className="md:col-span-6 flex flex-col gap-6">
        <div className="font-mono-eyebrow text-mono-eyebrow bronze-text tracking-widest uppercase">
          RUNTIME SECURITY FOR AI AGENTS
        </div>
        <h1 className="font-headline-xl text-headline-xl text-on-background">
          A firewall for what your AI agents do.
        </h1>
        <p className="font-body-lg text-body-lg text-on-surface-variant">
          Asphallea sandboxes agent and MCP tool-calls at runtime and enforces
          which actions are allowed — by policy, not by watching text. It
          secures what agents do, not what they say.
        </p>
        <div className="flex items-center gap-4 mt-2">
          <div className="flex items-center justify-between w-full max-w-md code-window rounded-DEFAULT px-4 py-3 input-focus-bronze transition-colors">
            <code className="font-mono-code text-mono-code text-on-surface">
              pip install asphallea
            </code>
            <button
              className="text-on-surface-variant hover:text-primary transition-colors"
              title="Copy"
            >
              <Copy className="w-5 h-5" />
            </button>
          </div>
        </div>
        <div className="flex gap-4 mt-4">
          <a
            className="px-6 py-3 rounded-DEFAULT btn-primary font-mono-eyebrow text-mono-eyebrow font-bold transition-all hover:scale-95 flex items-center gap-2"
            href="#"
          >
            <Star className="w-4 h-4 fill-current" />
            Star on GitHub
          </a>
          <a
            className="px-6 py-3 rounded-DEFAULT btn-ghost font-mono-eyebrow text-mono-eyebrow transition-all hover:bg-white/5"
            href="#"
          >
            Read the Quickstart
          </a>
        </div>
      </div>

      {/* Right Column: Code & Logs */}
      <div className="md:col-span-6 flex flex-col gap-4">
        {/* Policy Editor */}
        <div className="code-window rounded-lg overflow-hidden shadow-2xl flex flex-col">
          <div className="bg-surface-container-high px-4 py-2 border-b border-white/5 flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-white/10"></span>
            <span className="w-3 h-3 rounded-full bg-white/10"></span>
            <span className="w-3 h-3 rounded-full bg-white/10"></span>
            <span className="font-mono-eyebrow text-mono-eyebrow text-on-surface-variant ml-2">
              policy.yml
            </span>
          </div>
          <div className="p-4 font-mono-code text-mono-code text-on-surface whitespace-pre-wrap leading-relaxed overflow-x-auto">
            <span className="text-tertiary">version</span>:{' '}
            <span className="text-primary-fixed-dim">"1.0"</span>
            <br />
            <span className="text-tertiary">agent_name</span>:{' '}
            <span className="text-primary-fixed-dim">"customer_support"</span>
            <br />
            <span className="text-tertiary">rules</span>:
            <br />
            {'  '}- <span className="text-tertiary">action</span>:{' '}
            <span className="text-primary-fixed-dim">"mcp.database.read"</span>
            <br />
            {'    '}
            <span className="text-tertiary">effect</span>:{' '}
            <span className="text-[#a8edff]">allow</span>
            <br />
            <br />
            {'  '}- <span className="text-tertiary">action</span>:{' '}
            <span className="text-primary-fixed-dim">"mcp.filesystem.*"</span>
            <br />
            {'    '}
            <span className="text-tertiary">effect</span>:{' '}
            <span className="text-[#ffb4ab]">deny</span>
            <br />
            {'    '}
            <span className="text-tertiary">reason</span>:{' '}
            <span className="text-primary-fixed-dim">
              "Agents cannot modify local disk."
            </span>
          </div>
        </div>

        {/* Execution Log */}
        <div className="code-window rounded-lg p-4 font-mono-code text-mono-code text-on-surface flex flex-col gap-2 text-sm">
          <div className="flex items-start gap-2">
            <span className="text-on-surface-variant">&gt;</span>
            <span>
              Agent requested:{' '}
              <code className="bg-white/5 px-1 rounded">
                filesystem.delete('/etc/passwd')
              </code>
            </span>
          </div>
          <div className="flex items-start gap-2 text-[#ffb4ab]">
            <span className="font-bold">[DENY]</span>
            <span>BLOCKED by policy: filesystem.delete</span>
          </div>
          <div className="flex items-start gap-2 bronze-text">
            <span className="font-bold">[WARN]</span>
            <span>Execution halted. Sandbox intact.</span>
          </div>
        </div>
      </div>
    </section>
  );
}
