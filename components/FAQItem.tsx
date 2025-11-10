"use client";

import { ChevronDown } from "lucide-react";

export const FAQItem = ({
  question,
  answer,
  isOpen,
  onToggle,
  index = 0,
}: {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
  index?: number;
}) => {
  return (
    <div
      className="border border-slate-200 dark:border-slate-700 rounded-lg overflow-hidden animate-fadeInUp"
      style={{ animationDelay: `${index * 50}ms` }}
    >
      <button
        onClick={onToggle}
        className="w-full px-6 py-4 flex items-center justify-between bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors text-left"
        aria-expanded={isOpen}
      >
        <span className="text-lg font-semibold text-slate-900 dark:text-white">
          {question}
        </span>
        <ChevronDown
          className={`w-5 h-5 text-emerald-600 dark:text-emerald-400 transition-transform duration-300 flex-shrink-0 ${isOpen ? "rotate-180" : ""
            }`}
        />
      </button>

      {isOpen && (
        <div className="px-6 py-4 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-700">
          <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
            {answer}
          </p>
        </div>
      )}
    </div>
  );
};