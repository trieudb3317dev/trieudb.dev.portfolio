'use client';

import { flex } from "@/utils/helper";

export function About() {
  return (
    <section id="about" className='max-w-6xl mx-auto py-4 bg-slate-100 dark:bg-slate-800/50'>
      <div className="w-full h-auto px-4 sm:px-6 lg:px-8 py-20">
        <h2 className="text-4xl font-bold text-slate-900 dark:text-white mb-12 py-4 animate-fadeInUp">
          I'm a Software Engineer.
        </h2>

        <div className="grid md:grid-cols-2 gap-12 items-center animate-fadeInUp">
          <div>
            <p className="text-slate-600 dark:text-slate-400 mb-6 leading-relaxed">
              Currently, I'm a Freelancer.
              {/* <span className="text-emerald-600 dark:text-emerald-400 font-semibold">Facebook</span>. */}
            </p>
            <p className="text-slate-600 dark:text-slate-400 mb-6 leading-relaxed">
              A self-taught developer, functioning in the industry for 2+ years now. I make meaningful and delightful digital products that create an equilibrium between user needs and business goals.
            </p>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              Whether the problem is about a design or development, I just try to find a solution for that.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white dark:bg-slate-700 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <p className="text-3xl font-bold text-emerald-600 dark:text-emerald-400">2+</p>
              <p className="text-slate-600 dark:text-slate-400">Years Experience</p>
            </div>
            <div className="bg-white dark:bg-slate-700 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <p className="text-3xl font-bold text-emerald-600 dark:text-emerald-400">20+</p>
              <p className="text-slate-600 dark:text-slate-400">Projects Done</p>
            </div>
            <div className="bg-white dark:bg-slate-700 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <p className="text-3xl font-bold text-emerald-600 dark:text-emerald-400">15+</p>
              <p className="text-slate-600 dark:text-slate-400">Happy Clients</p>
            </div>
            <div className="bg-white dark:bg-slate-700 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <p className="text-3xl font-bold text-emerald-600 dark:text-emerald-400">10+</p>
              <p className="text-slate-600 dark:text-slate-400">Team Members</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
