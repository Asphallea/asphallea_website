import { Copy, Check, Star } from 'lucide-react';
import { motion } from 'motion/react';
import { useState } from 'react';

export function HeroSection() {
  const [copied, setCopied] = useState(false);
  const installCmd = 'pip install git+https://github.com/Asphallea/Asphallea.git';

  const handleCopy = () => {
    navigator.clipboard.writeText(installCmd);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center max-w-6xl mx-auto w-full">
      {/* Left Column: Copy */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="lg:col-span-6 flex flex-col gap-6 items-center text-center lg:items-start lg:text-left"
      >
        <div className="font-mono-eyebrow text-mono-eyebrow bronze-text tracking-widest uppercase">
          RUNTIME SECURITY FOR AI AGENTS
        </div>
        <h1 className="font-headline-xl text-headline-xl text-on-background">
          A firewall for what your AI agents do.
        </h1>
        <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl">
          Asphallea sandboxes agent and MCP tool-calls at runtime and enforces
          which actions are allowed by policy, not by watching text. It
          secures what agents do, not what they say.
        </p>
        <div className="flex items-center gap-4 mt-2 w-full max-w-lg">
          <div className="flex items-center justify-between w-full code-window rounded-DEFAULT px-4 py-3 input-focus-bronze transition-colors text-left overflow-hidden">
            <code className="font-mono-code text-mono-code text-on-surface truncate mr-2" title={installCmd}>
              {installCmd}
            </code>
            <button
              onClick={handleCopy}
              className="text-on-surface-variant hover:text-primary transition-colors flex-shrink-0"
              title="Copy install command"
            >
              {copied ? (
                <Check className="w-5 h-5 text-primary" />
              ) : (
                <Copy className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row gap-4 mt-4 w-full sm:w-auto">
          <a
            className="px-6 py-3 rounded-DEFAULT btn-primary font-mono-eyebrow text-mono-eyebrow font-bold transition-all hover:scale-95 flex items-center justify-center gap-2"
            href="https://github.com/Asphallea/Asphallea"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Star className="w-4 h-4 fill-current" />
            Star on GitHub
          </a>
          <a
            className="px-6 py-3 rounded-DEFAULT btn-ghost font-mono-eyebrow text-mono-eyebrow transition-all hover:bg-white/5 flex justify-center text-center"
            href="#quickstart"
          >
            Read the Quickstart
          </a>
        </div>
      </motion.div>

      {/* Right Column: Code & Logs */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="lg:col-span-6 flex flex-col gap-4 w-full"
      >
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
        <motion.div 
          className="code-window rounded-lg p-4 font-mono-code text-mono-code text-on-surface flex flex-col gap-2 text-sm"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.8, delayChildren: 0.5 } }
          }}
        >
          <motion.div 
            className="flex items-start gap-2"
            variants={{
              hidden: { opacity: 0, y: 5 },
              visible: { opacity: 1, y: 0 }
            }}
          >
            <span className="text-on-surface-variant">&gt;</span>
            <span>
              Agent requested:{' '}
              <code className="bg-white/5 px-1 rounded">
                filesystem.delete('/etc/passwd')
              </code>
            </span>
          </motion.div>
          <motion.div 
            className="flex items-start gap-2 text-[#ffb4ab]"
            variants={{
              hidden: { opacity: 0, x: -5 },
              visible: { opacity: 1, x: 0 }
            }}
          >
            <span className="font-bold">[DENY]</span>
            <span>BLOCKED by policy: filesystem.delete</span>
          </motion.div>
          <motion.div 
            className="flex items-start gap-2 bronze-text"
            variants={{
              hidden: { opacity: 0, y: 5 },
              visible: { opacity: 1, y: 0 }
            }}
          >
            <span className="font-bold">[WARN]</span>
            <span>Execution halted. Sandbox intact.</span>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
