'use client';

import React, { useEffect, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { Code, Layers, Zap, Server, Cloud, Database, Box, PenTool } from 'lucide-react';
import { skills } from '@/data/skill.data';

// const skills: {
//     name: string;
//     image?: string;
//     short: string;
//     color: string;
//     Icon: React.ComponentType<any>;
// }[] = [
//         { name: 'React', image: '', short: 'R', color: 'from-[#61DAFB] to-[#0ea5a4]', Icon: Code },
//         { name: 'Next.js', image: '', short: 'N', color: 'from-[#111827] to-[#374151]', Icon: Layers },
//         { name: 'TypeScript', image: '', short: 'TS', color: 'from-[#0ea5ff] to-[#4f46e5]', Icon: Zap },
//         { name: 'Node.js', image: '', short: 'Nd', color: 'from-[#68a063] to-[#166534]', Icon: Server },
//         { name: 'Tailwind', image: '', short: 'TW', color: 'from-[#06b6d4] to-[#0891b2]', Icon: Cloud },
//         { name: 'Postgres', image: '', short: 'PG', color: 'from-[#2563eb] to-[#4f46e5]', Icon: Database },
//         { name: 'Docker', image: '', short: 'D', color: 'from-[#2496ED] to-[#0f172a]', Icon: Box },
//         { name: 'UI/UX', image: '', short: 'UX', color: 'from-[#fb7185] to-[#8b5cf6]', Icon: PenTool },
//     ];

// you can use same icons for top row or define a different list
const topIcons = skills; // reuse for demo

export function Skills() {
    const controls = useAnimation();
    const [paused, setPaused] = useState(false);

    // Adjusted geometry to avoid clipping and make curves fully visible
    const size = 620; // increased container size
    const radius = 200; // increased orbit radius
    const center = { x: size / 2, y: size / 2 };
    const topY = 64; // push top row down so connector arcs are inside view

    useEffect(() => {
        controls.start({
            rotate: 360,
            transition: { repeat: Infinity, duration: 20, ease: 'linear' },
        });
    }, [controls]);

    const togglePause = () => {
        if (paused) {
            controls.start({
                rotate: 360,
                transition: { repeat: Infinity, duration: 20, ease: 'linear' },
            });
            setPaused(false);
        } else {
            controls.stop();
            setPaused(true);
        }
    };

    // compute top icon positions evenly across inner width with a margin
    const computeTopPositions = (count: number) => {
        const margin = 36;
        const usableWidth = size - margin * 2;
        const gap = count > 1 ? usableWidth / (count - 1) : 0;
        return Array.from({ length: count }).map((_, i) => {
            const x = margin + i * gap;
            const y = topY;
            return { x, y };
        });
    };

    const topPositions = computeTopPositions(topIcons.length);

    // helper to build simple cubic bezier path from (x1,y1) to center
    const buildPath = (x1: number, y1: number, cx: number, cy: number) => {
        // control points: raise controlY above center to create upward arc
        const controlY = Math.min(y1, cy) - Math.abs(cy - y1) * 0.4 - 20;
        const c1x = x1;
        const c1y = controlY;
        const c2x = cx;
        const c2y = controlY;
        return `M ${x1} ${y1} C ${c1x} ${c1y}, ${c2x} ${c2y}, ${cx} ${cy}`;
    };

    return (
        // make section overflow visible so top arcs are not clipped
        <section id="skills" className="pt-32 pb-20 section-skills-bg overflow-visible">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-8">
                    <h2 className="text-3xl md:text-4xl font-bold text-white">
                        Tools & Skills
                    </h2>
                    <p className="text-slate-300 mt-2">
                        Hover a badge to inspect. Click center to pause orbit.
                    </p>
                </div>

                <div className="relative w-full flex items-center justify-center overflow-visible">
                    <div className="relative" style={{ width: size, height: size }}>

                        {/* connectors (under everything) */}
                        <svg className="absolute inset-0 w-full h-full z-0 pointer-events-none overflow-visible">
                            {topPositions.map((pos, i) => (
                                <path
                                    key={i}
                                    d={buildPath(pos.x, pos.y, center.x, center.y)}
                                    className="connector-path"
                                    strokeWidth={1.8}
                                    fill="none"
                                />
                            ))}
                        </svg>

                        {/* rotating ring using framer-motion (below center orb and below top icons visually) */}
                        <div className="absolute inset-0 flex items-center justify-center z-10">
                            <motion.div
                                className="relative w-full h-full"
                                animate={controls}
                                style={{ originX: '50%', originY: '50%' }}
                            >
                                {skills.map((s, i) => {
                                    const angle = (360 / skills.length) * i;
                                    const transform = `rotate(${angle}deg) translate(${radius}px) rotate(-${angle}deg)`;
                                    const phase = (i % 4) * 0.12;
                                    const Icon = s.Icon;
                                    // const Icon = s.Icon;
                                    return (
                                        <motion.div
                                            key={s.name}
                                            className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2"
                                            style={{ transform }}
                                            animate={{ y: [0, -8, 0] }}
                                            transition={{
                                                repeat: Infinity,
                                                duration: 4 + phase,
                                                ease: 'easeInOut',
                                                delay: phase,
                                            }}
                                        >
                                            <motion.button
                                                whileHover={{ scale: 1.12 }}
                                                whileTap={{ scale: 0.98 }}
                                                title={s.name}
                                                className={`skill-icon bg-gradient-to-br ${s.color} flex items-center justify-center`}
                                                aria-label={s.name}
                                            >
                                                <Icon className="w-5 h-5" />
                                            </motion.button>
                                        </motion.div>
                                    );
                                })}
                            </motion.div>
                        </div>

                        {/* center orb (on top of rotating ring) */}
                        <div className="absolute inset-0 flex items-center justify-center z-20">
                            <div
                                onClick={togglePause}
                                role="button"
                                aria-pressed={paused}
                                className="center-orb cursor-pointer w-44 h-44 rounded-full bg-gradient-to-br from-emerald-500 to-emerald-700 flex flex-col items-center justify-center text-white text-2xl font-bold shadow-2xl"
                                title={paused ? 'Resume orbit' : 'Pause orbit'}
                            >
                                Me
                                <div className="text-xs text-slate-100/80 mt-2">
                                    Full-stack & Designer
                                </div>
                            </div>
                        </div>

                        {/* TOP ICONS (render after rotating ring & center orb so they visually sit above) */}
                        <div className="absolute left-0 top-0 w-full z-50 pointer-events-auto">
                            <div style={{ width: size }} className="relative mx-auto">
                                {topPositions.map((pos, i) => {
                                    const s = skills[i];
                                    return (
                                        <div
                                            key={i}
                                            style={{ position: 'absolute', left: pos.x - 20, top: pos.y - 20 }}
                                            className="flex items-center justify-center top-icon"
                                        >
                                            {s.image ? (
                                                <img
                                                    src={s.image}
                                                    alt={s.name}
                                                    className="w-12 h-12 rounded-full object-cover border border-slate-700/30"
                                                />
                                            ) : (
                                                <button
                                                    title={s.name}
                                                    className="w-10 h-10 rounded-full flex items-center justify-center bg-slate-900/85 text-white"
                                                >
                                                    <s.Icon className="w-4 h-4" />
                                                </button>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        {/* decorative SVG rings */}
                        <div className="absolute inset-0 pointer-events-none z-5 skills-svg">
                            <svg
                                className="w-full h-full"
                                viewBox={`0 0 ${size} ${size}`}
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <circle cx={center.x} cy={center.y} r="110" />
                                <circle cx={center.x} cy={center.y} r="170" />
                            </svg>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
