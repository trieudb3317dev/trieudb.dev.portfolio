'use client';

import { Header } from '@/components/Header';
import { Hero } from '@/components/Hero';
import { About } from '@/components/About';
import { WorkExperience } from '@/components/WorkExperience';
import { Projects } from '@/components/Projects';
import { FAQ } from '@/components/FAQ';
import { Contact } from '@/components/Contact';
import { Footer } from '@/components/Footer';
import { Skills } from '@/components/Skills';

export default function Home() {
  return (
    <main>
      <Header />
      <Hero />
      {/* <Skills /> */}
      <About />
      <WorkExperience />
      <Projects />
      <FAQ />
      <Contact />
      <Footer />
    </main>
  );
}
