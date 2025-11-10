'use client';

import { ChevronDown } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';

export function Hero() {
  const [more, setMore] = useState<boolean>(false);

  const toggleMore = () => {
    setMore(!more);
  }

  return (
    <section id="home" className="min-h-screen flex items-center justify-center pt-20 relative overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-20 left-10 w-72 h-72 bg-emerald-500/10 rounded-full blur-3xl dark:bg-emerald-500/5"></div>
        <div className="absolute bottom-20 right-10 w-72 h-72 bg-emerald-500/10 rounded-full blur-3xl dark:bg-emerald-500/5"></div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="animate-fadeInLeft group">
            <p className="text-emerald-600 dark:text-emerald-400 font-medium mb-4">
              Hello! I am
            </p>
            <h1 className="text-5xl md:text-6xl font-bold text-slate-900 dark:text-white mb-6">
              Trieu<span className="text-emerald-600 dark:text-emerald-400"> Developer</span>
            </h1>
            <p className={`text-xl text-slate-600 dark:text-slate-400 mb-8 ${more ? '' : 'line-clamp-4 overflow-hidden'}`}>
              A developer who<br />
              <span className="text-emerald-600 dark:text-emerald-400 font-semibold">creates and builds things, most commonly software, applications, or websites, through a process that involves coding, designing, and managing projects. The specific type of developer depends on what they are building, such as a web developer for the internet or a mobile developer for mobile applications. Developers also play a broader role, which can include understanding user needs, planning solutions, and overseeing other programmers, and the term can also refer to someone who develops real estate or other products</span>
            </p>
            <button
              onClick={toggleMore}
              className="inline-block px-6 py-2 mb-8 text-sm font-semibold text-slate-700 dark:text-slate-200 bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 rounded-lg from-emerald-500 to-emerald-600 group-hover:shadow-lg group-hover:shadow-emerald-500/50 transition-colors duration-200"
            >
              {more ? 'less' : 'more'}
            </button>
            <p className="text-slate-600 dark:text-slate-400 mb-8 leading-relaxed">
              Because if the cover doesn't catch me, will you read at all?
            </p>

            <button className="px-8 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-semibold transition-all hover:shadow-lg hover:shadow-emerald-600/50">
              Get in Touch
            </button>
          </div>

          {/* Right Image */}
          <div className="animate-fadeInRight flex justify-center">
            <div className="relative w-full max-w-sm">
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-3xl blur-2xl opacity-20"></div>
              <div className="relative bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-3xl p-8 shadow-2xl">
                <div className="bg-slate-200 dark:bg-slate-700 rounded-2xl w-full aspect-square flex items-center justify-center">
                  <span className="text-slate-400 dark:text-slate-500">Your Avatar Here</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ChevronDown className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
        </div>
      </div>
    </section>
  );
}
