import { motion } from 'motion/react';

export function ProblemBand() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5 }}
      className="w-full glass-panel py-12 px-8 divider-x border-b border-outline-variant/30 text-center max-w-4xl mx-auto rounded-xl"
    >
      <p className="font-body-lg text-body-lg text-on-surface-variant leading-relaxed">
        AI agents now have real hands: shell, filesystem, network, MCP servers.
        A single prompt injection is no longer a bad sentence — it's a dropped
        database or a leaked secret. Text-level guardrails never see the action.{' '}
        <span className="text-on-background font-medium">
          Asphallea sits at the execution layer and stops it.
        </span>
      </p>
    </motion.section>
  );
}
