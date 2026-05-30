import { FC } from "react";
import { motion } from "framer-motion";
import { SetupStep } from "../help_center.utils";

interface SetupGuideProps {
  steps: SetupStep[];
}

const SetupGuide: FC<SetupGuideProps> = ({ steps }) => {
  return (
    <motion.section
      id="setup-guide-section"
      className="scroll-mt-28 w-full box-border"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5 }}
      aria-labelledby="setup-heading"
    >
      <div className="mb-12 text-center px-4">
        <div className="inline-flex items-center gap-2 rounded-full border border-indigo-500/20 bg-indigo-500/10 px-4 py-1.5 text-xs sm:text-sm font-semibold text-indigo-600 dark:text-indigo-300 mb-4 select-none uppercase tracking-wider">
          <i className="fa-solid fa-code"></i>
          Developer Guide
        </div>
        <h2
          id="setup-heading"
          className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight"
        >
          Local Setup Guide
        </h2>
        <p className="mt-4 max-w-2xl mx-auto text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
          Get StorySparkAI running locally in minutes. Follow these setup
          steps to install dependencies, configure environment variables,
          and start contributing to the project.
        </p>
      </div>

      <div className="relative max-w-4xl mx-auto px-4 sm:px-0 w-full box-border">
        <div
          className="absolute left-6 top-0 bottom-0 hidden md:block w-px bg-gradient-to-b from-indigo-500/40 via-blue-500/20 to-transparent pointer-events-none"
          aria-hidden="true"
        />

        <ol className="space-y-6 sm:space-y-8 relative z-10 w-full box-border list-none p-0 m-0">
          {steps.map((step, index) => (
            <motion.li
              key={step.step}
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{
                duration: 0.45,
                delay: Math.min(index * 0.08, 0.3),
              }}
              className="relative flex flex-col md:flex-row gap-4 sm:gap-5 group w-full box-border"
            >
              <div className="flex-shrink-0">
                <div className="flex h-11 w-11 sm:h-12 sm:w-12 items-center justify-center rounded-xl sm:rounded-2xl border border-indigo-500/20 bg-white shadow-sm text-indigo-600 font-bold transition-all duration-300 group-hover:scale-105 group-hover:shadow-md dark:bg-slate-900 dark:border-white/10 dark:text-indigo-300 select-none">
                  {step.step}
                </div>
              </div>

              <div className="flex-1 rounded-2xl sm:rounded-3xl border border-slate-200 bg-white/90 p-5 sm:p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-indigo-500/5 dark:border-white/10 dark:bg-[#111827]/40 dark:hover:border-indigo-500/30 min-w-0 w-full box-border">
                <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white mb-2 sm:mb-3 tracking-tight group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors truncate max-w-full">
                  {step.title}
                </h3>
                <p className="text-xs sm:text-sm leading-relaxed text-slate-600 dark:text-slate-400 mb-4 font-medium">
                  {step.description}
                </p>

                {step.code && (
                  <div className="overflow-hidden rounded-xl sm:rounded-2xl border border-slate-200 bg-slate-950 shadow-inner dark:border-white/10 w-full box-border">
                    <div className="flex items-center justify-between border-b border-white/5 bg-slate-900 px-4 py-2 select-none">
                      <div className="flex items-center gap-1.5">
                        <span className="h-2.5 w-2.5 rounded-full bg-red-500/80"></span>
                        <span className="h-2.5 w-2.5 rounded-full bg-yellow-500/80"></span>
                        <span className="h-2.5 w-2.5 rounded-full bg-green-500/80"></span>
                      </div>
                      <span className="text-[10px] sm:text-xs text-slate-400 font-mono tracking-wider uppercase">
                        terminal
                      </span>
                    </div>
                    <pre className="overflow-x-auto p-4 sm:p-5 text-xs sm:text-sm leading-relaxed m-0 sidebar">
                      <code className="font-mono text-emerald-400 whitespace-pre-wrap block">
                        {step.code}
                      </code>
                    </pre>
                  </div>
                )}
              </div>
            </motion.li>
          ))}
        </ol>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, delay: 0.1 }}
        viewport={{ once: true }}
        className="mt-12 overflow-hidden rounded-2xl sm:rounded-3xl border border-indigo-200 bg-gradient-to-r from-indigo-50/50 via-white to-blue-50/50 p-5 sm:p-6 shadow-sm dark:border-indigo-500/20 dark:from-indigo-950/20 dark:via-slate-900/60 dark:to-blue-950/20 max-w-4xl mx-auto px-4 sm:px-6 w-full box-border"
      >
        <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-5 w-full box-border">
          <div className="flex h-11 w-11 sm:h-12 sm:w-12 items-center justify-center rounded-xl sm:rounded-2xl bg-indigo-500/10 text-indigo-600 shadow-sm dark:text-indigo-300 flex-shrink-0 select-none border border-indigo-500/10">
            <i className="fa-solid fa-circle-info text-base sm:text-lg"></i>
          </div>
          <div className="flex-1 min-w-0 w-full">
            <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white tracking-tight">
              Prerequisites
            </h3>
            <p className="mt-2 text-xs sm:text-sm leading-relaxed text-slate-600 dark:text-slate-400 font-medium">
              Before starting, ensure you have{" "}
              <span className="font-bold text-slate-800 dark:text-slate-200">
                Node.js 18+
              </span>
              ,{" "}
              <span className="font-bold text-slate-800 dark:text-slate-200">
                npm 9+
              </span>
              , and a running MongoDB instance configured locally or in the
              cloud.
            </p>
            <div className="mt-4 flex flex-wrap gap-2 select-none">
              <span className="rounded-md border border-indigo-500/10 bg-indigo-500/5 px-2.5 py-0.5 text-[10px] sm:text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">
                Node.js 18+
              </span>
              <span className="rounded-md border border-blue-500/10 bg-blue-500/5 px-2.5 py-0.5 text-[10px] sm:text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
                npm 9+
              </span>
              <span className="rounded-md border border-purple-500/10 bg-purple-500/5 px-2.5 py-0.5 text-[10px] sm:text-xs font-bold text-purple-600 dark:text-purple-400 uppercase tracking-wider">
                MongoDB
              </span>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.section>
  );
};

export default SetupGuide;