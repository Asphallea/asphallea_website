import { Bot, Shield, Server, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';

export function McpSection() {
  return (
    <section className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-center max-w-6xl mx-auto w-full text-center lg:text-left">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.5 }}
        className="lg:w-1/2 flex flex-col gap-5 items-center lg:items-start"
      >
        <div className="font-mono-eyebrow text-mono-eyebrow bronze-text tracking-widest uppercase">
          MODEL CONTEXT PROTOCOL INTEGRATION
        </div>
        <h2 className="font-headline-lg text-headline-lg text-on-background">
          Wrap MCP client sessions with policy.
        </h2>
        <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
          Model Context Protocol (MCP) connects agents to external tool servers. Asphallea provides lightweight execution wrappers (<code className="text-primary font-mono-code">guard_mcp_session</code> and <code className="text-primary font-mono-code">guard_call_tool</code>) that intercept invocations along the wrapped path, checking tool names and argument resources before calls leave your client process.
        </p>
        <div className="text-xs text-on-surface-variant/80 border-l-2 border-primary/40 pl-3 italic text-left">
          Interception applies to wrapped sessions. Denied calls return structured MCP error responses or raise PolicyViolation without contacting the tool server.
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.5, delay: 0.15 }}
        className="lg:w-1/2 w-full"
      >
        {/* Diagram for MCP Wrapped Flow */}
        <div className="code-window rounded-xl p-8 flex items-center justify-between relative overflow-hidden h-64 bg-[#14181C]">
          {/* Agent Node */}
          <div className="flex flex-col items-center gap-2 z-10">
            <div className="w-14 h-14 rounded-full bg-surface-container-high border border-white/10 flex items-center justify-center">
              <Bot className="w-7 h-7 text-on-surface-variant" />
            </div>
            <span className="font-mono-eyebrow text-xs text-on-surface-variant">
              Agent Client
            </span>
          </div>

          {/* Connection Line */}
          <div className="absolute top-1/2 left-20 right-20 h-[2px] bg-white/10 -translate-y-1/2 z-0"></div>
          <div className="absolute top-1/2 left-20 w-1/2 h-[2px] bg-[#C27D38]/60 -translate-y-1/2 z-0"></div>

          {/* Policy Choke Point */}
          <div className="flex flex-col items-center gap-1.5 z-10 bg-[#161B20] p-2.5 rounded-lg border border-primary/40 shadow-bronze">
            <div className="w-11 h-11 rounded bg-surface-container-high flex items-center justify-center border border-primary/50 text-primary">
              <Shield className="w-5 h-5" />
            </div>
            <span className="font-mono-eyebrow text-[11px] text-primary font-bold">
              guard_mcp_session
            </span>
          </div>

          {/* MCP Server Node */}
          <div className="flex flex-col items-center gap-2 z-10">
            <div className="w-14 h-14 rounded-xl bg-surface-container-high border border-white/10 flex items-center justify-center">
              <Server className="w-7 h-7 text-on-surface-variant" />
            </div>
            <span className="font-mono-eyebrow text-xs text-on-surface-variant">
              MCP Server
            </span>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
