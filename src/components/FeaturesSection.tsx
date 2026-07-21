import { Code2, Gavel, Terminal } from 'lucide-react';
import { motion } from 'motion/react';

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.2 }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

export function FeaturesSection() {
  return (
    <motion.section
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-100px" }}
      className="grid grid-cols-1 md:grid-cols-3 gap-0 border border-white/10 rounded-xl overflow-hidden glass-panel max-w-6xl mx-auto w-full"
    >
      <motion.div variants={item} className="p-8 flex flex-col gap-4 relative">
        <div className="w-12 h-12 rounded-lg code-window flex items-center justify-center text-primary border-primary/20">
          <Code2 className="w-6 h-6" />
        </div>
        <h3 className="font-headline-md text-headline-md text-on-background">
          Policy as Code
        </h3>
        <p className="font-mono-code text-mono-code text-on-surface-variant text-sm">
          Define allowed actions in YAML. Version control your security rules
          alongside your application code. No black boxes.
        </p>
      </motion.div>

      <motion.div variants={item} className="p-8 flex flex-col gap-4 divider-y relative">
        <div className="w-12 h-12 rounded-lg code-window flex items-center justify-center text-primary border-primary/20">
          <Gavel className="w-6 h-6" />
        </div>
        <h3 className="font-headline-md text-headline-md text-on-background">
          Deterministic Enforcement
        </h3>
        <p className="font-mono-code text-mono-code text-on-surface-variant text-sm">
          We don't use an LLM to guess if an action is safe. Rules are evaluated
          deterministically at the execution layer.
        </p>
      </motion.div>

      <motion.div variants={item} className="p-8 flex flex-col gap-4 divider-y relative">
        <div className="w-12 h-12 rounded-lg code-window flex items-center justify-center text-primary border-primary/20">
          <Terminal className="w-6 h-6" />
        </div>
        <h3 className="font-headline-md text-headline-md text-on-background">
          Drop-in Integration
        </h3>
        <p className="font-mono-code text-mono-code text-on-surface-variant text-sm">
          Wraps existing MCP servers and standard agent toolsets without
          requiring changes to the underlying models.
        </p>
      </motion.div>
    </motion.section>
  );
}
