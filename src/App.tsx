/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from "motion/react";
import { Instagram, ArrowUpRight } from "lucide-react";

export default function App() {
  const selectedWork = [
    {
      id: 1,
      title: "The River / Phoenix Rising",
      category: "MUSIC VIDEO",
      image: "https://picsum.photos/seed/cinematic1/1200/800",
      videoUrl: "https://vimeo.com/your-video-id", // Replace with your link
    },
    {
      id: 2,
      title: "Urban Solitude",
      category: "SHORT FILM",
      image: "https://picsum.photos/seed/cinematic2/1200/800",
      videoUrl: "https://vimeo.com/your-video-id", // Replace with your link
    },
    {
      id: 3,
      title: "Neon Pulse",
      category: "COMMERCIAL",
      image: "https://picsum.photos/seed/cinematic3/1200/800",
      videoUrl: "https://vimeo.com/your-video-id", // Replace with your link
    },
    {
      id: 4,
      title: "Midnight Echoes",
      category: "DOCUMENTARY",
      image: "https://picsum.photos/seed/cinematic4/1200/800",
      videoUrl: "https://vimeo.com/your-video-id", // Replace with your link
    },
  ];

  return (
    <div className="min-h-screen selection:bg-white selection:text-black">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 w-full z-50 p-6 md:p-10 flex justify-between items-start mix-blend-difference">
        <div className="font-mono text-[10px] tracking-widest uppercase opacity-60">
          Mrinmoy <br /> Portfolio ©2026
        </div>
        <div className="flex gap-8 font-mono text-[10px] tracking-widest uppercase">
          <a href="#work" className="hover:opacity-50 transition-opacity">Work</a>
          <a href="#about" className="hover:opacity-50 transition-opacity">About</a>
          <a href="#contact" className="hover:opacity-50 transition-opacity">Contact</a>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="h-screen flex flex-col justify-end p-6 md:p-10 pb-20">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-[1400px]"
        >
          <h1 className="text-[12vw] md:text-[10vw] leading-[0.85] font-extrabold tracking-tighter uppercase">
            Cinematographer <br />
            <span className="text-transparent stroke-white stroke-1" style={{ WebkitTextStroke: '1px white' }}>+ Editor</span>
          </h1>
        </motion.div>
        
        <div className="mt-12 flex flex-col md:flex-row justify-between items-end gap-8">
          <div className="font-mono text-[10px] tracking-widest uppercase max-w-xs opacity-60">
            Based in India. Crafting visual signatures with story-building at the heart of every frame.
          </div>
          <motion.div 
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="font-mono text-[10px] tracking-widest uppercase opacity-40"
          >
            Scroll to explore ↓
          </motion.div>
        </div>
      </section>

      {/* Selected Work Grid */}
      <section id="work" className="p-6 md:p-10 border-t border-white/10">
        <div className="flex justify-between items-baseline mb-12">
          <h2 className="text-4xl md:text-6xl font-semibold tracking-tight">Selected Work<sup className="text-xs font-mono ml-2 opacity-40">[04]</sup></h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
          {selectedWork.map((work) => (
            <motion.a 
              key={work.id}
              href={work.videoUrl}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ y: -10 }}
              className="group cursor-pointer block"
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-zinc-900">
                <img 
                  src={work.image} 
                  alt={work.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 scale-105 group-hover:scale-100"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500 flex items-center justify-center">
                   <div className="w-16 h-16 rounded-full border border-white/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 scale-50 group-hover:scale-100 backdrop-blur-sm">
                      <ArrowUpRight size={32} />
                   </div>
                </div>
              </div>
              <div className="mt-6 flex justify-between items-start">
                <div>
                  <h3 className="text-2xl md:text-3xl font-medium tracking-tight mb-1">"{work.title}"</h3>
                  <span className="font-mono text-[10px] tracking-widest uppercase opacity-40">{work.category}</span>
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </section>

      {/* Info Section */}
      <section id="about" className="p-6 md:p-10 py-32 border-t border-white/10 bg-[#0f0f0f]">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-10">
          <div>
            <h4 className="font-mono text-[10px] tracking-widest uppercase opacity-40 mb-8">Expertise</h4>
            <ul className="space-y-4 text-xl md:text-2xl tracking-tight">
              <li>Narrative Cinematography</li>
              <li>Color Grading</li>
              <li>Post-Production Workflow</li>
              <li>Visual Storytelling</li>
              <li>Lighting Design</li>
            </ul>
          </div>
          <div>
            <h4 className="font-mono text-[10px] tracking-widest uppercase opacity-40 mb-8">Software</h4>
            <ul className="space-y-4 text-xl md:text-2xl tracking-tight">
              <li>DaVinci Resolve Studio</li>
              <li>Adobe Premiere Pro</li>
              <li>After Effects</li>
              <li>Avid Media Composer</li>
            </ul>
          </div>
          <div>
            <h4 className="font-mono text-[10px] tracking-widest uppercase opacity-40 mb-8">Gear</h4>
            <ul className="space-y-4 text-xl md:text-2xl tracking-tight">
              <li>ARRI Alexa Mini / RED Komodo</li>
              <li>Cooke S4/i Prime Set</li>
              <li>SmallHD Monitoring</li>
              <li>Teradek Bolt Systems</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="p-6 md:p-10 pt-40 pb-10 flex flex-col justify-between min-h-[80vh]">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-20">
          <div>
            <h2 className="text-5xl md:text-7xl font-bold tracking-tighter mb-12">Let's build <br /> something iconic.</h2>
            <div className="flex flex-col gap-4">
              <a href="mailto:hello@mrinmoy.com" className="text-2xl md:text-4xl hover:opacity-50 transition-opacity underline underline-offset-8 decoration-1">hello@mrinmoy.com</a>
              <a href="tel:+910000000000" className="text-xl opacity-60 hover:opacity-100 transition-opacity">+91 (0) 000 000 000</a>
            </div>
          </div>
          
          <div className="flex flex-col justify-end md:items-end gap-12">
            <div className="flex flex-col md:items-end gap-4 font-mono text-[10px] tracking-widest uppercase">
              <span className="opacity-40">Socials</span>
              <a href="https://www.instagram.com/mrinmoy4u4ever/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:opacity-50 transition-opacity">
                Instagram <ArrowUpRight size={12} />
              </a>
              <a href="#" className="flex items-center gap-2 hover:opacity-50 transition-opacity">
                Vimeo <ArrowUpRight size={12} />
              </a>
              <a href="#" className="flex items-center gap-2 hover:opacity-50 transition-opacity">
                LinkedIn <ArrowUpRight size={12} />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-32 pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-end gap-8">
          <h1 className="text-[15vw] leading-[0.8] font-black tracking-tighter opacity-5 select-none pointer-events-none">
            MRINMOY
          </h1>
          <div className="flex flex-col items-end gap-2 font-mono text-[10px] tracking-widest uppercase opacity-40">
            <span>© 2026 Mrinmoy</span>
            <span>All rights reserved</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
