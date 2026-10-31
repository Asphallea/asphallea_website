import { motion } from 'motion/react';

export function IntegrationSection() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5 }}
      className="flex flex-col gap-8 max-w-6xl mx-auto w-full"
    >
      <div className="flex flex-col gap-2 text-center lg:text-left">
        <div className="font-mono-eyebrow text-mono-eyebrow bronze-text tracking-widest uppercase">
          FRAMEWORK INTEGRATION
        </div>
        <h2 className="font-headline-lg text-headline-lg text-on-background">
          Wrap your tools and sessions in minutes.
        </h2>
      </div>

      <motion.div 
        className="code-window rounded-xl overflow-hidden shadow-2xl transition-all duration-300 hover:shadow-bronze border border-white/10"
        whileHover={{ scale: 1.005 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        <div className="bg-surface-container-high px-4 py-2.5 border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-red-400/80"></span>
            <span className="w-2.5 h-2.5 rounded-full bg-amber-400/80"></span>
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400/80"></span>
            <span className="font-mono-eyebrow text-xs text-on-surface-variant ml-1 font-semibold">
              agent_app.py
            </span>
          </div>
          <span className="font-mono-eyebrow text-xs text-on-surface-variant">
            Python 3.10+
          </span>
        </div>
        <div className="p-6 font-mono-code text-xs sm:text-sm text-on-surface whitespace-pre-wrap leading-relaxed bg-[#13171A]">
          <span className="text-[#ffb77b]">from</span> asphallea{' '}
          <span className="text-[#ffb77b]">import</span> Policy
          <br />
          <span className="text-[#ffb77b]">from</span> asphallea.integrations.mcp{' '}
          <span className="text-[#ffb77b]">import</span> guard_mcp_session
          <br />
          <span className="text-[#ffb77b]">from</span> asphallea.integrations.langchain{' '}
          <span className="text-[#ffb77b]">import</span> guard_tool
          <br />
          <br />
          <span className="text-on-surface-variant/70">
            # 1. Declare a least-privilege policy with resource mapping
          </span>
          <br />
          policy = (
          <br />
          {'    '}Policy.builder(<span className="text-[#a8edff]">"production-agent"</span>)
          <br />
          {'    '}.tool(<span className="text-[#a8edff]">"read_file"</span>, reads=<span className="text-[#a8edff]">"path"</span>)
          <br />
          {'    '}.read_paths(<span className="text-[#a8edff]">"./workspace"</span>)
          <br />
          {'    '}.write_paths(<span className="text-[#a8edff]">"./workspace/out"</span>)
          <br />
          {'    '}.deny_network()
          <br />
          {'    '}.build()
          <br />
          )
          <br />
          <br />
          <span className="text-on-surface-variant/70">
            # 2. Wrap MCP sessions or LangChain tools (positional policy_or_engine)
          </span>
          <br />
          guarded_session = guard_mcp_session(session, policy, on_deny=<span className="text-[#a8edff]">"error"</span>)
          <br />
          guarded_tool = guard_tool(read_file, policy, reads=<span className="text-[#a8edff]">"path"</span>)
        </div>
      </motion.div>
    </motion.section>
  );
}
