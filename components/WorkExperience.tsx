'use client';

import { Briefcase } from 'lucide-react';

const experiences = [
  {
    title: 'Flutter mobile chat application',
    description: 'Mobile chat application with advanced features: real-time messaging, push notifications, and user authentication',
    icon: '📱',
    tags: ['Flutter', 'Dart', 'Firebase', 'Socket.IO', 'PostgreSQL', 'Nest.js'],
  },
  {
    title: 'Web Application Development',
    description: 'Some application development with a focus on user experience and performance optimization: building responsive and interactive web applications using modern frameworks.',
    icon: '🚀',
    tags: ['Next.js', 'Tailwind CSS', 'TypeScript', 'Nest.js', 'PostgreSQL', 'MongoDB'],
  },
  // {
  //   title: 'Team work',
  //   description: '',
  //   icon: '⚡',
  //   tags: ['Flutter', 'Dart', 'Firebase'],
  // },
  // {
  //   title: 'CIB on the Mobile',
  //   description: 'Real-time data synchronization platform',
  //   icon: '🔄',
  //   tags: ['WebSocket', 'Redis', 'PostgreSQL'],
  // },
];

export function WorkExperience() {
  return (
    <section id="work" className="py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold text-slate-900 dark:text-white mb-12 animate-fadeInUp">
          Work Experience
        </h2>

        <div className="grid md:grid-cols-2 gap-6">
          {experiences.map((exp, index) => (
            <div
              key={index}
              className="bg-gradient-to-br from-emerald-500/10 to-emerald-600/5 dark:from-emerald-500/20 dark:to-emerald-600/10 border border-emerald-200 dark:border-emerald-800/50 rounded-lg p-6 hover:shadow-lg transition-all hover:scale-105 animate-fadeInUp"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex items-start gap-4">
                <div className="text-3xl">{exp.icon}</div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
                    {exp.title}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400 mb-4">
                    {exp.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {exp.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-sm px-3 py-1 bg-emerald-600/20 text-emerald-700 dark:text-emerald-300 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
