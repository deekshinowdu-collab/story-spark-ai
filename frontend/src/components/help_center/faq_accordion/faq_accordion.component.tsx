import { FC, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQAccordionProps {
  items: FAQItem[];
}

const FAQAccordion: FC<FAQAccordionProps> = ({ items }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  if (!items || items.length === 0) {
    return (
      <section id="faq-section" className="scroll-mt-28 transition-colors duration-300 w-full box-border">
        <div className="text-center py-10 px-4 bg-slate-50 dark:bg-white/[0.02] rounded-2xl border border-slate-200 dark:border-white/5 max-w-3xl mx-auto">
          <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">No FAQ items match your search query.</p>
        </div>
      </section>
    );
  }

  return (
    <section id="faq-section" className="scroll-mt-28 transition-colors duration-300 w-full box-border">
      <div className="mb-10 text-center px-4">
        <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mb-4 tracking-tight">
          Frequently Asked Questions
        </h2>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed font-medium">
          Find quick answers to the most common StorySparkAI questions, workflows, and troubleshooting topics.
        </p>
      </div>

      <div className="space-y-4 max-w-3xl mx-auto px-4 sm:px-0 w-full box-border">
        {items.map((faq, index) => {
          const isOpen = openIndex === index;

          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.4, delay: Math.min(index * 0.05, 0.3) }}
              className="group overflow-hidden rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#111827]/40 backdrop-blur-xl shadow-sm hover:shadow-md transition-all duration-300 w-full box-border"
            >
              <button
                type="button"
                onClick={() => toggleAccordion(index)}
                className="w-full flex items-center justify-between px-5 py-4 sm:px-6 sm:py-5 text-left transition-all duration-200 hover:bg-slate-50 dark:hover:bg-white/[0.02] cursor-pointer outline-none select-none"
                aria-expanded={isOpen}
              >
                <span className="text-sm sm:text-base text-slate-900 dark:text-slate-200 font-bold pr-4 tracking-tight leading-snug">
                  {faq.question}
                </span>
                <span
                  className={`flex-shrink-0 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-slate-100 dark:bg-white/5 flex items-center justify-center text-slate-500 dark:text-slate-400 group-hover:text-blue-500 dark:group-hover:text-blue-400 transition-all duration-300 ${
                    isOpen ? "rotate-180 bg-blue-500/10 text-blue-600 dark:text-blue-400" : ""
                  }`}
                  aria-hidden="true"
                >
                  <i className="fa-solid fa-chevron-down text-xs"></i>
                </span>
              </button>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25, ease: "easeInOut" }}
                  >
                    <div className="px-5 pb-5 sm:px-6 sm:pb-6 overflow-hidden">
                      <div className="rounded-xl bg-slate-50/60 dark:bg-slate-900/40 border border-slate-100 dark:border-white/5 p-4">
                        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
                          {faq.answer}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};

export default FAQAccordion;