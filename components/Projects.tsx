'use client';

import { ExternalLink, Github, ChevronDown } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';

const projects = [
  {
    title: 'Food booting Project',
    category: 'Featured Project - Ecommerce',
    description:
      'A web app for ordering food online with a user-friendly interface. Browse menus, customize orders, and track deliveries in real-time.',
    image: 'https://res.cloudinary.com/dmdzyoslx/image/upload/v1762781630/avatars/f3ea74c9-41bc-4a81-88a3-566eb383d8cb.png',
    tags: ['React', 'Tailwind', 'Node.js', 'MongoDB'],
    qa: [
      { q: 'Role', a: 'Frontend & integration' },
      { q: 'Duration', a: '6 weeks' },
      { q: 'Tech', a: 'React, Tailwind, Node.js, MongoDB' },
      { q: 'Note', a: 'Currently, registered and logged in is only available for users role. Admin account: superadmin@gmail.com / Password: 123456 to access admin features.' },
    ],
    links: {
      live: 'https://final-tester-frontend.vercel.app',
      github: 'https://github.com/TrieuDang93710/final-tester-frontend.git',
    },
  },
  {
    title: 'Searching system Project',
    category: 'Featured Project - Web App',
    description:
      'A web app for searching and managing job listings. Users can search for jobs, apply filters, and view detailed job descriptions.',
    image: 'https://res.cloudinary.com/dmdzyoslx/image/upload/v1762782128/avatars/aaa3b5fc-9720-4539-aa3f-a93ce7d40684.png',
    tags: ['Next.js', 'Nest.js', 'TypeScript', 'PostgreSQL'],
    qa: [
      { q: 'Role', a: 'Full-stack developer' },
      { q: 'Duration', a: '8 weeks' },
      { q: 'Tech', a: 'Next.js, Nest.js, TypeScript, PostgreSQL' },
    ],
    links: {
      live: 'https://jobs-searching-system.vercel.app',
      github: 'https://github.com/TrieuDang93710/room-manager-system.git',
    },
  },
  {
    title: 'Ecommerce Project',
    category: 'Featured Project - Web App',
    description:
      'A mobile eCommerce app that offers a seamless shopping experience. Browse products, add to cart, and checkout with ease.',
    image: 'https://res.cloudinary.com/dmdzyoslx/image/upload/v1764422837/my_images/vwigujqjoc1dp5zmaqvx.png',
    tags: ['ReactJs', 'Node.js', 'MongoDB', 'Docker'],
    links: {
      live: 'https://problem5-v1-0-0-1.onrender.com',
      github: 'https://github.com/trieudb3317dev/DANGBINHTRIEU/tree/main/problem_5',
    },
  },
];

export function Projects() {
  const [openMap, setOpenMap] = useState<Record<number, number | null>>({});

  const toggleQA = (projectIndex: number, qaIndex: number) => {
    setOpenMap((prev) => {
      const current = prev[projectIndex] ?? null;
      return { ...prev, [projectIndex]: current === qaIndex ? null : qaIndex };
    });
  };

  return (
    <section id="projects" className="py-20 bg-slate-100 dark:bg-slate-800/50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold text-slate-900 dark:text-white mb-12 animate-fadeInUp">
          Featured Projects
        </h2>

        <div className="space-y-20">
          {projects.map((project, index) => (
            <div
              key={index}
              className="grid md:grid-cols-2 gap-8 items-center animate-fadeInUp"
              style={{ animationDelay: `${index * 200}ms` }}
            >
              {/* Image */}
              <div className={index % 2 === 1 ? 'md:order-2' : ''}>
                <div className="bg-white dark:bg-slate-700 rounded-lg overflow-hidden shadow-xl hover:shadow-2xl transition-shadow">
                  <div
                    style={{
                      backgroundImage: `url(${project.image})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                      backgroundRepeat: 'no-repeat',
                    }}
                    className="w-full aspect-video bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center text-6xl">
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className={index % 2 === 1 ? 'md:order-1' : ''}>
                <p className="text-emerald-600 dark:text-emerald-400 font-semibold mb-3">
                  {project.category}
                </p>
                <h3 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">
                  {project.title}
                </h3>
                <p className="text-slate-600 dark:text-slate-400 mb-6 leading-relaxed">
                  {project.description}
                </p>

                {/* QA block as accordion */}
                {project.qa && (
                  <div className="space-y-3 mb-6">
                    {project.qa.map((item, i) => {
                      const isOpen = openMap[index] === i;
                      return (
                        <div
                          key={i}
                          className="border border-slate-200 dark:border-slate-700 rounded-md overflow-hidden"
                        >
                          <button
                            onClick={() => toggleQA(index, i)}
                            className="w-full px-4 py-3 flex items-center justify-between text-left bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
                            aria-expanded={isOpen}
                          >
                            <div>
                              <p className="text-sm font-semibold text-slate-900 dark:text-white">
                                {item.q}
                              </p>
                            </div>
                            <ChevronDown
                              className={`w-5 h-5 text-emerald-600 dark:text-emerald-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''
                                }`}
                            />
                          </button>

                          {isOpen && (
                            <div className="px-4 py-3 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-700">
                              <p className="text-sm text-slate-600 dark:text-slate-400">
                                {item.a}
                              </p>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-full text-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Links */}
                <div className="flex gap-4">
                  <a
                    href={project.links.live}
                    className="flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition-colors"
                  >
                    <ExternalLink className="w-4 h-4" />
                    Visit
                  </a>
                  <a
                    href={project.links.github}
                    className="flex items-center gap-2 px-4 py-2 border border-emerald-600 text-emerald-600 hover:bg-emerald-600/10 rounded-lg transition-colors dark:border-emerald-400 dark:text-emerald-400"
                  >
                    <Github className="w-4 h-4" />
                    Code
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
