'use client';

import { Mail, Linkedin, Github, Twitter } from 'lucide-react';

export function Contact() {
  return (
    <section id="contact" className="py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-4xl font-bold text-slate-900 dark:text-white mb-6 animate-fadeInUp">
          Contact
        </h2>

        <p className="text-xl text-slate-600 dark:text-slate-400 mb-8 animate-fadeInUp">
          I'm currently looking to join a cross-functional team that values improving people's lives through accessible design. Let's connect!
        </p>

        <div className="bg-white dark:bg-slate-800 rounded-lg p-8 shadow-lg mb-12 animate-fadeInUp">
          <p className="text-slate-600 dark:text-slate-400 mb-6">
            Whether you have a question or just want to say hi, feel free to reach out!
          </p>

          <a
            href="mailto:trieudb3317.dev@gmail.com"
            className="inline-flex items-center gap-3 px-8 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-semibold transition-all hover:shadow-lg hover:shadow-emerald-600/50"
          >
            <Mail className="w-5 h-5" />
            Say Hello
          </a>
        </div>

        {/* Social Links */}
        <div className="flex justify-center gap-6 animate-fadeInUp">
          <a
            href="https://linkedin.com"
            className="p-3 bg-slate-100 dark:bg-slate-800 hover:bg-emerald-600 dark:hover:bg-emerald-600 text-slate-900 dark:text-white hover:text-white rounded-lg transition-colors"
          >
            <Linkedin className="w-6 h-6" />
          </a>
          <a
            href="https://github.com/TrieuDang93710"
            className="p-3 bg-slate-100 dark:bg-slate-800 hover:bg-emerald-600 dark:hover:bg-emerald-600 text-slate-900 dark:text-white hover:text-white rounded-lg transition-colors"
          >
            <Github className="w-6 h-6" />
          </a>
          <a
            href="https://twitter.com"
            className="p-3 bg-slate-100 dark:bg-slate-800 hover:bg-emerald-600 dark:hover:bg-emerald-600 text-slate-900 dark:text-white hover:text-white rounded-lg transition-colors"
          >
            <Twitter className="w-6 h-6" />
          </a>
        </div>
      </div>
    </section>
  );
}
