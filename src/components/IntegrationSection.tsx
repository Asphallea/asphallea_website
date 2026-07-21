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
          <span className="text-[#a08d80]">from</span> asphallea{' '}
          <span className="text-[#a08d80]">import</span> Sandbox, Policy
          <br />
          <span className="text-[#a08d80]">from</span> my_agent{' '}
          <span className="text-[#a08d80]">import</span> execute_task
          <br />
          <br />
          <span className="text-on-surface-variant italic">
            # 1. Load your security policy
          </span>
          <br />
          policy = Policy.from_file(
          <span className="text-primary-fixed-dim">"policy.yml"</span>)
          <br />
          <br />
          <span className="text-on-surface-variant italic">
            # 2. Wrap the execution environment
          </span>
          <br />
          <span className="text-[#a08d80]">with</span> Sandbox(policy=policy){' '}
          <span className="text-[#a08d80]">as</span> secure_env:
          <br />
          {'    '}
          <span className="text-on-surface-variant italic">
            # Agent runs normally, but tools are intercepted
          </span>
          <br />
          {'    '}result = execute_task(prompt, tools=secure_env.tools)
        </div>
      </motion.div>
    </motion.section>
  );
}
