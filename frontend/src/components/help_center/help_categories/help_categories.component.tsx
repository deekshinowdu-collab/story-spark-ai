import type { FC } from "react";
import { motion } from "framer-motion";

import type { HelpCategory } from "../help_center.utils";

interface HelpCategoriesProps {
  categories: HelpCategory[];
}

const HelpCategories: FC<HelpCategoriesProps> = ({ categories }) => {
  const hasCategories = categories.length > 0;

  return (
    <motion.section
      id="help-categories"
      className="w-full scroll-mt-28 transition-colors duration-300"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5 }}
      aria-labelledby="categories-heading"
    >
      <div className="mb-12 px-4 text-center sm:px-0">
        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/10 px-4 py-1.5 text-blue-600 dark:text-blue-300">
          <i className="fa-solid fa-layer-group" aria-hidden="true" />
          <span className="text-xs font-semibold uppercase tracking-wider sm:text-sm">
            Help Categories
          </span>
        </div>

        <h2
          id="categories-heading"
          className="mb-4 text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-4xl"
        >
          Explore by Category
        </h2>

        <p className="mx-auto max-w-2xl text-sm font-medium leading-relaxed text-slate-600 dark:text-slate-400 sm:text-base">
          Browse support topics designed to help you quickly understand
          StorySparkAI features, workflows, and troubleshooting steps.
        </p>
      </div>

      {!hasCategories ? (
        <div className="mx-auto max-w-4xl rounded-3xl border border-dashed border-slate-200 bg-white p-8 text-center dark:border-white/10 dark:bg-white/[0.02] sm:p-12">
          <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl border border-slate-200/60 bg-slate-100 dark:border-white/5 dark:bg-slate-900 sm:h-20 sm:w-20">
            <i
              className="fa-solid fa-magnifying-glass text-2xl text-slate-400 dark:text-slate-500 sm:text-3xl"
              aria-hidden="true"
            />
          </div>

          <h3 className="mb-2 text-lg font-bold text-slate-900 dark:text-white sm:text-xl">
            No Categories Found
          </h3>
          <p className="text-xs font-medium text-slate-500 dark:text-slate-400 sm:text-sm">
            Try adjusting your search keywords to locate sections.
          </p>
        </div>
      ) : (
        <div className="grid w-full grid-cols-1 gap-5 px-4 sm:grid-cols-2 sm:gap-6 sm:px-0 lg:grid-cols-3">
          {categories.map((category, index) => (
            <motion.button
              key={category.id}
              type="button"
              onClick={() => {
                document
                  .getElementById(category.sectionId)
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{
                duration: 0.45,
                delay: Math.min(index * 0.08, 0.3),
              }}
              whileHover={{ y: -6 }}
              className="group relative flex h-full w-full flex-col justify-between overflow-hidden rounded-2xl border border-slate-200 bg-white p-5 text-left shadow-sm transition-colors duration-300 hover:border-blue-500/40 hover:shadow-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/40 dark:border-white/10 dark:bg-[#111827]/40 dark:hover:border-blue-500/30 sm:rounded-3xl sm:p-7"
            >
              <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-blue-500/10 opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100" />
              <div className="pointer-events-none absolute -bottom-10 -left-10 h-32 w-32 rounded-full bg-purple-500/10 opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100" />
              <div className="pointer-events-none absolute left-0 top-0 h-[2px] w-full bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

              <div className="relative z-10 w-full">
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl border border-blue-500/20 bg-gradient-to-br from-blue-500/10 to-indigo-500/10 text-xl text-blue-500 transition-transform duration-300 group-hover:scale-105 dark:text-blue-400 sm:mb-6 sm:h-14 sm:w-14 sm:rounded-2xl sm:text-2xl">
                  <i
                    className={`fa-solid ${category.icon}`}
                    aria-hidden="true"
                  />
                </div>

                <h3 className="mb-2 text-lg font-bold tracking-tight text-slate-900 transition-colors group-hover:text-blue-600 dark:text-white dark:group-hover:text-blue-400 sm:mb-3 sm:text-xl">
                  {category.title}
                </h3>
                <p className="text-xs font-medium leading-relaxed text-slate-600 dark:text-slate-400 sm:text-sm">
                  {category.description}
                </p>
              </div>

              <div className="relative z-10 mt-6 flex items-center justify-between">
                <span className="text-xs font-bold tracking-tight text-blue-600 dark:text-blue-400 sm:text-sm">
                  Browse Section
                </span>
                <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200/60 bg-slate-100 text-xs text-slate-400 transition-all duration-200 group-hover:border-blue-500/20 group-hover:bg-blue-500 group-hover:text-white dark:border-white/10 dark:bg-white/5 sm:h-9 sm:w-9 sm:rounded-xl sm:text-sm">
                  <i className="fa-solid fa-arrow-right" aria-hidden="true" />
                </span>
              </div>
            </motion.button>
          ))}
        </div>
      )}
    </motion.section>
  );
};

export default HelpCategories;
