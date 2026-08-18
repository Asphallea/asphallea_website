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
          FIVE-LINE INTEGRATION
        </div>
        <h2 className="font-headline-lg text-headline-lg text-on-background">
          Wrap your agent in minutes.
        </h2>
      </div>

      <motion.div 
        className="code-window rounded-lg overflow-hidden shadow-2xl transition-all duration-300 hover:shadow-bronze"
        whileHover={{ scale: 1.01 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        <div className="bg-surface-container-high px-4 py-2 border-b border-white/5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="font-mono-eyebrow text-mono-eyebrow text-on-surface-variant">
              app.py
            </span>
          </div>
          <span className="font-mono-eyebrow text-mono-eyebrow text-on-surface-variant">
            Python
          </span>
        </div>
        <div className="p-6 font-mono-code text-mono-code text-on-surface whitespace-pre-wrap leading-relaxed">
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
          <span className="text-on-surface-variant/60">
            # 1. Declare a least-privilege policy
          </span>
          <br />
          policy = (
          <br />
          {'    '}Policy.builder(<span className="text-[#a8edff]">"production-agent"</span>)
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
          <span className="text-on-surface-variant/60">
            # 2. Wrap MCP sessions or LangChain tools in one line
          </span>
          <br />
          guarded_session = guard_mcp_session(session, policy, on_deny=<span className="text-[#a8edff]">"error"</span>)
          <br />
          guarded_tool = guard_tool(read_file, policy=policy, reads=<span className="text-[#a8edff]">"path"</span>)
        </div>
      </motion.div>
    </motion.section>
  );
}
