'use client';

import { ChevronDown } from 'lucide-react';
import { useState } from 'react';

interface FAQItem {
  id: number;
  question: string;
  answer: string;
}

const faqItems: FAQItem[] = [
  {
    id: 1,
    question: 'What services do you offer?',
    answer: 'I offer web development, mobile app development, UI/UX design, and full-stack solutions. I specialize in React, Next.js, TypeScript, and modern web technologies.',
  },
  {
    id: 2,
    question: 'What is your experience level?',
    answer: 'I have 3+ years of experience as a self-taught UI/UX designer and developer. I\'ve completed 50+ projects for 30+ happy clients, working with 15+ team members.',
  },
  {
    id: 3,
    question: 'How long does a typical project take?',
    answer: 'Project duration depends on complexity and scope. Simple projects take 1-2 weeks, medium projects 3-4 weeks, and complex projects 2+ months. I\'ll provide a timeline after discussing requirements.',
  },
  {
    id: 4,
    question: 'What is your development process?',
    answer: 'I follow a structured approach: discovery & planning → design → development → testing → deployment. I maintain regular communication with clients throughout the process.',
  },
  {
    id: 5,
    question: 'Do you provide post-launch support?',
    answer: 'Yes! I provide maintenance and support after project launch. This includes bug fixes, updates, and feature enhancements based on your needs.',
  },
  {
    id: 6,
    question: 'What is your pricing model?',
    answer: 'I offer flexible pricing: hourly rates for ongoing work, fixed-price projects for well-defined scopes, or retainer agreements for long-term partnerships.',
  },
];

export function FAQ() {
  const [openId, setOpenId] = useState<number | null>(null);

  const toggleOpen = (id: number) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section id="faq" className="w-full py-20 bg-white dark:bg-slate-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 animate-fadeInUp">
          <h2 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-lg">
            Find answers to common questions about my services and process
          </p>
        </div>

        <div className="space-y-4">
          {faqItems.map((item, index) => (
            <div
              key={item.id}
              className="border border-slate-200 dark:border-slate-700 rounded-lg overflow-hidden animate-fadeInUp"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <button
                onClick={() => toggleOpen(item.id)}
                className="w-full px-6 py-4 flex items-center justify-between bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors text-left"
              >
                <span className="text-lg font-semibold text-slate-900 dark:text-white">
                  {item.question}
                </span>
                <ChevronDown
                  className={`w-5 h-5 text-emerald-600 dark:text-emerald-400 transition-transform duration-300 flex-shrink-0 ${
                    openId === item.id ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {openId === item.id && (
                <div className="px-6 py-4 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-700">
                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                    {item.answer}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-12 p-8 bg-gradient-to-r from-emerald-500/10 to-emerald-600/10 dark:from-emerald-500/20 dark:to-emerald-600/20 border border-emerald-200 dark:border-emerald-800/50 rounded-lg text-center animate-fadeInUp">
          <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">
            Didn't find your answer?
          </h3>
          <p className="text-slate-600 dark:text-slate-400 mb-4">
            Feel free to reach out and ask any other questions you might have.
          </p>
          <a
            href="#contact"
            className="inline-block px-6 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-semibold transition-colors"
          >
            Get in Touch
          </a>
        </div>
      </div>
    </section>
  );
}
