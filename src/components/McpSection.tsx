import { Bot, Shield, Server } from 'lucide-react';

export function McpSection() {
  return (
    <section className="flex flex-col md:flex-row gap-16 items-center">
      <div className="md:w-1/2 flex flex-col gap-6">
        <div className="font-mono-eyebrow text-mono-eyebrow bronze-text tracking-widest uppercase">
          MADE FOR THE MCP ERA
        </div>
        <h2 className="font-headline-lg text-headline-lg text-on-background">
          Secure every MCP tool-call.
        </h2>
        <p className="font-body-md text-body-md text-on-surface-variant">
          Model Context Protocol (MCP) gives agents unprecedented access to your
          infrastructure. Asphallea acts as a mandatory proxy between the agent
          and the MCP server, enforcing granular, declarative policies on every
          invocation before it executes.
        </p>
      </div>

      <div className="md:w-1/2 w-full">
        {/* Abstract Graphic for MCP Flow */}
        <div className="code-window rounded-xl p-8 flex items-center justify-between relative overflow-hidden h-64">
          {/* Agent Node */}
          <div className="flex flex-col items-center gap-2 z-10">
            <div className="w-16 h-16 rounded-full bg-surface-container-high border border-white/10 flex items-center justify-center">
              <Bot className="w-8 h-8 text-on-surface-variant" />
            </div>
            <span className="font-mono-eyebrow text-mono-eyebrow text-on-surface-variant">
              Agent
            </span>
          </div>

          {/* Connection Line (Blocked) */}
          <div className="absolute top-1/2 left-24 right-24 h-[2px] bg-white/10 -translate-y-1/2 z-0"></div>
          <div className="absolute top-1/2 left-24 w-1/2 h-[2px] bg-[#ffb4ab] -translate-y-1/2 z-0"></div>

          {/* Asphallea Gate */}
          <div className="flex flex-col items-center gap-2 z-10 bg-background p-2 rounded-lg border border-[#ffb4ab]/30 shadow-[0_0_20px_rgba(255,180,171,0.1)]">
            <div className="w-12 h-12 rounded bg-[#1A1E22] flex items-center justify-center border border-[#ffb4ab]">
              <Shield className="w-6 h-6 text-[#ffb4ab]" />
            </div>
            <span className="font-mono-eyebrow text-mono-eyebrow text-[#ffb4ab]">
              Policy Gate
            </span>
          </div>

          {/* MCP Server Node */}
          <div className="flex flex-col items-center gap-2 z-10">
            <div className="w-16 h-16 rounded-xl bg-surface-container-high border border-white/10 flex items-center justify-center">
              <Server className="w-8 h-8 text-on-surface-variant" />
            </div>
            <span className="font-mono-eyebrow text-mono-eyebrow text-on-surface-variant">
              MCP Server
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
