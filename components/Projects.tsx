'use client';

import { ExternalLink, Github } from 'lucide-react';
import Image from 'next/image';

const projects = [
  {
    title: 'Food booting Project',
    category: 'Featured Project - Ecommerce',
    description:
      'A web app for visualizing personalized Spotify data. View your top artists, top tracks, recently played tracks, and detailed audio analysis for each track. Get recommendations for new tracks based on your existing playlists and more.',
    image: 'https://res.cloudinary.com/dmdzyoslx/image/upload/v1762781630/avatars/f3ea74c9-41bc-4a81-88a3-566eb383d8cb.png',
    tags: ['React', 'Tailwind', 'Node.js', 'MongoDB'],
    links: {
      live: 'https://final-tester-frontend.vercel.app',
      github: 'https://github.com/TrieuDang93710/final-tester-frontend.git',
    },
  },
  {
    title: 'Searching system Project',
    category: 'Featured Project - Web App',
    description:
      'A web app for visualizing personalized Spotify data. View your top artists, top tracks, recently played tracks, and detailed audio analysis for each track.',
    image: 'https://res.cloudinary.com/dmdzyoslx/image/upload/v1762782128/avatars/aaa3b5fc-9720-4539-aa3f-a93ce7d40684.png',
    tags: ['Next.js', 'Nest.js', 'TypeScript', 'PostgreSQL'],
    links: {
      live: 'https://jobs-searching-system.vercel.app',
      github: 'https://github.com/TrieuDang93710/room-manager-system.git',
    },
  },
  // {
  //   title: 'Chat app Project',
  //   category: 'Featured Project - Mobile App',
  //   description:
  //     'A web app for visualizing personalized Spotify data. View your top artists, top tracks, recently played tracks, and detailed audio analysis for each track. Get recommendations for new tracks based on your existing playlists and more.',
  //   image: 'https://res.cloudinary.com/dmdzyoslx/image/upload/v1762781630/avatars/f3ea74c9-41bc-4a81-88a3-566eb383d8cb.png',
  //   tags: ['Flutter', 'Dart', 'Nest.js', 'PostgreSQL', 'Socket.IO'],
  //   links: {
  //     live: 'https://final-tester-frontend.vercel.app',
  //     github: 'https://github.com/TrieuDang93710/final-tester-frontend.git',
  //   },
  // },
];

export function Projects() {
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
