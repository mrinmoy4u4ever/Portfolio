/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "motion/react";
import { Instagram, ArrowUpRight, ArrowDown, X, Sparkles, Monitor, Video, Aperture } from "lucide-react";

export default function App() {
  const [activeModalVideo, setActiveModalVideo] = useState<{url: string, title?: string} | null>(null);

  // ---- Hero / Footer scroll parallax ----
  const { scrollYProgress } = useScroll();
  const heroY = useTransform(scrollYProgress, [0, 0.15], [0, 150]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);
  const titleScale = useTransform(scrollYProgress, [0, 0.15], [1, 0.95]);
  const footerTitleY = useTransform(scrollYProgress, [0.8, 1], [150, 0]);
  const footerTitleScale = useTransform(scrollYProgress, [0.85, 1], [0.8, 1]);
  const footerTitleOpacity = useTransform(scrollYProgress, [0.8, 1], [0, 0.05]);

  // ---- Bio Scroll-Lock Text Reveal ----
  const bioSectionRef = useRef<HTMLDivElement>(null);
  const bioText = "Mrinmoy is an India-based cinematographer, video editor, and colorist with a decade of experience. Specializing in brand commercials, he brings a moody, cinematic visual signature to his projects. Driven by the belief that a powerful story can change us, he handles both production and post-production, constantly refining his craft with every new narrative he builds.";
  const bioWords = bioText.split(" ");
  const [revealedCount, setRevealedCount] = useState(0);
  const isLocked = useRef(false);
  const isDone = useRef(false);
  const accumulatedDelta = useRef(0);
  const DELTA_PER_WORD = 18; // scroll delta needed per word


  useEffect(() => {
    const section = bioSectionRef.current;
    if (!section) return;

    const handleWheel = (e: WheelEvent) => {
      if (!isLocked.current || isDone.current) return;
      e.preventDefault();
      accumulatedDelta.current += Math.abs(e.deltaY);
      const wordsToReveal = Math.floor(accumulatedDelta.current / DELTA_PER_WORD);
      if (wordsToReveal > 0) {
        accumulatedDelta.current %= DELTA_PER_WORD;
        setRevealedCount(prev => {
          const next = Math.min(prev + wordsToReveal, bioWords.length);
          if (next >= bioWords.length) {
            isDone.current = true;
            // Unlock scroll after a brief pause so user knows to keep scrolling
            setTimeout(() => {
              isLocked.current = false;
              document.body.style.overflow = '';
            }, 400);
          }
          return next;
        });
      }
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isDone.current) {
          isLocked.current = true;
          document.body.style.overflow = 'hidden';
          // Reveal first word immediately so user sees it entered
          setRevealedCount(prev => Math.max(prev, 1));
        } else if (!entry.isIntersecting && !isDone.current) {
          isLocked.current = false;
          document.body.style.overflow = '';
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(section);
    window.addEventListener('wheel', handleWheel, { passive: false });

    return () => {
      observer.disconnect();
      window.removeEventListener('wheel', handleWheel);
      document.body.style.overflow = '';
    };
  }, [bioWords.length]);

  const selectedWork = [
    {
      id: 1,
      title: "FGear Darjeeling",
      category: "COMMERCIAL",
      image: "https://res.cloudinary.com/dky7vj2hx/video/upload/v1774687361/FGear_C_Darjeeling_joyfks.jpg",
      video: "https://res.cloudinary.com/dky7vj2hx/video/upload/v1774687361/FGear_C_Darjeeling_joyfks.mp4",
    },
    {
      id: 2,
      title: "FGear Debarati",
      category: "COMMERCIAL",
      image: "https://res.cloudinary.com/dky7vj2hx/video/upload/v1774687843/FGear_C_Debarati_cxurek.jpg",
      video: "https://res.cloudinary.com/dky7vj2hx/video/upload/v1774687843/FGear_C_Debarati_cxurek.mp4",
    },
    {
      id: 3,
      title: "FGear Darjeeling 2",
      category: "COMMERCIAL",
      image: "https://res.cloudinary.com/dky7vj2hx/video/upload/v1774687715/FGear_C_Darjeeling_2_vfhsbv.jpg",
      video: "https://res.cloudinary.com/dky7vj2hx/video/upload/v1774687715/FGear_C_Darjeeling_2_vfhsbv.mp4",
    },
    {
      id: 4,
      title: "Tintbox Goa",
      category: "COMMERCIAL",
      image: "https://res.cloudinary.com/dky7vj2hx/video/upload/v1774688362/Tintbox_Goa_2_qyutgp.jpg",
      video: "https://res.cloudinary.com/dky7vj2hx/video/upload/v1774688362/Tintbox_Goa_2_qyutgp.mp4",
    },
    {
      id: 5,
      title: "Beauty Priyanka",
      category: "FASHION",
      image: "https://res.cloudinary.com/dky7vj2hx/video/upload/v1774688337/Beauty_Priyanka_ypjdok.jpg",
      video: "https://res.cloudinary.com/dky7vj2hx/video/upload/v1774688337/Beauty_Priyanka_ypjdok.mp4",
    },
    {
      id: 6,
      title: "Juneberry Satabdi",
      category: "FASHION",
      image: "https://res.cloudinary.com/dky7vj2hx/video/upload/v1774688352/Juneberry_Satabdi_w1lmo1.jpg",
      video: "https://res.cloudinary.com/dky7vj2hx/video/upload/v1774688352/Juneberry_Satabdi_w1lmo1.mp4",
    },
    {
      id: 7,
      title: "Hammer Priyanka",
      category: "FASHION",
      image: "https://res.cloudinary.com/dky7vj2hx/video/upload/v1774692104/Hammer_Priyanka_yahzmk.jpg",
      video: "https://res.cloudinary.com/dky7vj2hx/video/upload/v1774692104/Hammer_Priyanka_yahzmk.mp4",
    },
    {
      id: 8,
      title: "Savana Satabdi",
      category: "FASHION",
      image: "https://res.cloudinary.com/dky7vj2hx/video/upload/v1774692301/Savana_Satabdi_bum4ko.jpg",
      video: "https://res.cloudinary.com/dky7vj2hx/video/upload/v1774692301/Savana_Satabdi_bum4ko.mp4",
    },
    {
      id: 9,
      title: "Piku Wilderra",
      category: "FASHION",
      image: "https://res.cloudinary.com/dky7vj2hx/video/upload/v1774693011/Piku_Wilderra_vhjrsa.jpg",
      video: "https://res.cloudinary.com/dky7vj2hx/video/upload/v1774693011/Piku_Wilderra_vhjrsa.mp4",
    },
    {
      id: 10,
      title: "Inkbolt Satabdi",
      category: "FASHION",
      image: "https://res.cloudinary.com/dky7vj2hx/video/upload/v1774693008/Inkbolt_Satabdi_astl2v.jpg",
      video: "https://res.cloudinary.com/dky7vj2hx/video/upload/v1774693008/Inkbolt_Satabdi_astl2v.mp4",
    },
    {
      id: 11,
      title: "Savana Satabdi 2",
      category: "FASHION",
      image: "https://res.cloudinary.com/dky7vj2hx/video/upload/v1774693007/Savana_Satabdi_2_m1sfwj.jpg",
      video: "https://res.cloudinary.com/dky7vj2hx/video/upload/v1774693007/Savana_Satabdi_2_m1sfwj.mp4",
    },
    {
      id: 12,
      title: "Tintbox Satabdi",
      category: "COMMERCIAL",
      image: "https://res.cloudinary.com/dky7vj2hx/video/upload/v1774694553/Tintbox_Satabdi_jhcgfr.jpg",
      video: "https://res.cloudinary.com/dky7vj2hx/video/upload/v1774694553/Tintbox_Satabdi_jhcgfr.mp4",
    },
  ];

  return (
    <div className="min-h-screen selection:bg-white selection:text-black overflow-x-hidden">
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
      <section className="h-screen flex flex-col p-6 md:p-10 pt-24 md:pt-32 pb-8 gap-4 md:gap-8">
        
        {/* Cinematic Cover Video with Parallax Effect */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          style={{ y: heroY, opacity: heroOpacity }}
          className="flex-grow w-full rounded-2xl md:rounded-3xl overflow-hidden relative bg-zinc-900 border border-white/5"
        >
          <video 
            src="https://res.cloudinary.com/dky7vj2hx/video/upload/v1774695361/Cover_Website_a1qzxe.mp4" 
            autoPlay 
            muted 
            loop 
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
          />
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          style={{ scale: titleScale, opacity: heroOpacity }}
          className="max-w-[1400px] origin-left"
        >
          <h1 className="text-[12vw] md:text-[10vw] leading-[0.85] font-extrabold tracking-tighter uppercase relative z-10">
            Cinematographer <br />
            <span className="text-transparent stroke-white stroke-1" style={{ WebkitTextStroke: '1px white' }}>+ Editor</span>
          </h1>
        </motion.div>
        
        <div className="mt-2 md:mt-4 flex flex-col md:flex-row justify-between items-end gap-6">
          <div className="font-mono text-[10px] tracking-widest uppercase max-w-xs opacity-60">
            Based in India. Crafting visual signatures with story-building at the heart of every frame.
          </div>
          <div className="flex flex-col items-center md:items-end gap-2 font-mono text-[10px] tracking-widest uppercase opacity-40 shrink-0">
            <span>Scroll to explore</span>
            <motion.div 
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <ArrowDown size={14} />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Selected Work Grid */}
      <section id="work" className="p-6 md:p-10 border-t border-white/10">
        <div className="flex justify-between items-baseline mb-12">
          <h2 className="text-4xl md:text-6xl font-semibold tracking-tight">Selected Work<sup className="text-xs font-mono ml-2 opacity-40">[0{selectedWork.length}]</sup></h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 md:auto-rows-[350px] gap-4 md:gap-6">
          {selectedWork.map((work, i) => {
            const spans = [
              "md:col-span-2 md:row-span-2", // 0: Large main feature
              "md:col-span-1 md:row-span-1", // 1: Small square
              "md:col-span-1 md:row-span-1", // 2: Small square
              "md:col-span-1 md:row-span-2", // 3: Tall vertical
              "md:col-span-1 md:row-span-2", // 4: Tall vertical
              "md:col-span-1 md:row-span-2", // 5: Tall vertical
              "md:col-span-2 md:row-span-2", // 6: Large feature
              "md:col-span-1 md:row-span-1", // 7: Small square
              "md:col-span-1 md:row-span-1", // 8: Small square
              "md:col-span-1 md:row-span-2", // 9: Tall vertical
              "md:col-span-1 md:row-span-2", // 10: Tall vertical
              "md:col-span-1 md:row-span-2", // 11: Tall vertical
            ];
            
            return (
              <motion.div 
                key={work.id}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.8, delay: (i % 3) * 0.1, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ scale: 0.99 }}
                onClick={() => {
                  if (work.video) setActiveModalVideo({ url: work.video, title: work.title });
                }}
                className={`group relative overflow-hidden rounded-3xl bg-zinc-900 cursor-pointer ${spans[i] || "md:col-span-1 md:row-span-1"} aspect-[9/16] md:aspect-auto`}
                onMouseEnter={(e: React.MouseEvent<HTMLDivElement>) => {
                  const video = e.currentTarget.querySelector('video');
                  if (video) video.play();
                }}
                onMouseLeave={(e: React.MouseEvent<HTMLDivElement>) => {
                  const video = e.currentTarget.querySelector('video');
                  if (video) {
                    video.pause();
                  }
                }}
              >
                {work.video ? (
                  <video 
                    src={work.video}
                    poster={work.image}
                    muted 
                    loop 
                    playsInline
                    className="absolute inset-0 w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 scale-105 group-hover:scale-100"
                  />
                ) : (
                  <img 
                    src={work.image} 
                    alt={work.title}
                    referrerPolicy="no-referrer"
                    className="absolute inset-0 w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 scale-105 group-hover:scale-100"
                  />
                )}
                
                {/* Gradient Overlay for Text Visibility */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                
                {/* Content Inside Bento Box */}
                <div className="absolute inset-x-0 bottom-0 p-6 flex flex-col justify-end z-10 pointer-events-none">
                  <div className="flex justify-between items-end">
                    <div className="translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                      <h3 className="text-2xl md:text-3xl font-medium tracking-tight mb-2 text-white/90 group-hover:text-white">"{work.title}"</h3>
                      <span className="font-mono text-[10px] tracking-widest uppercase text-white/50 group-hover:text-white/80 transition-colors">{work.category}</span>
                    </div>
                    <div className="bg-white/10 backdrop-blur-md p-3 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-4 group-hover:translate-y-0 border border-white/10 overflow-hidden">
                      <motion.div
                        whileHover={{ scale: 1.2, rotate: 15 }}
                        transition={{ type: "spring", stiffness: 400, damping: 10 }}
                        className="text-white flex items-center justify-center"
                      >
                        <ArrowUpRight size={20} />
                      </motion.div>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Info / About Section */}
      <section id="about" className="relative border-t border-white/10 bg-[#0f0f0f]">
        
        {/* Animated Background Asset */}
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
          className="absolute -top-[10%] md:-top-[20%] -right-[10%] text-white/[0.02] z-0 pointer-events-none"
        >
          <Aperture size={800} strokeWidth={0.5} />
        </motion.div>

        {/* Bio Section — JS Scroll Lock + Word-by-Word Reveal */}
        <div 
          ref={bioSectionRef} 
          className="relative z-10 min-h-screen flex flex-col justify-center p-6 md:p-10"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-20">
            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-4 aspect-[4/5] bg-zinc-900 rounded-3xl overflow-hidden relative group"
            >
              <motion.img 
                src="https://picsum.photos/seed/mrinmoy/800/1000" 
                alt="Mrinmoy Portrait" 
                initial={{ scale: 1.25 }}
                whileInView={{ scale: 1 }}
                transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                viewport={{ once: true }}
                className="absolute inset-0 w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000"
              />
            </motion.div>

            <div className="lg:col-span-8 flex flex-col justify-center">
              <h3 className="flex flex-wrap text-2xl sm:text-3xl md:text-4xl lg:text-5xl leading-[1.3] font-medium tracking-tight">
                {bioWords.map((word, i) => (
                  <motion.span
                    key={i}
                    animate={{ 
                      opacity: i < revealedCount ? 1 : 0.08,
                      y: i < revealedCount ? 0 : 6,
                    }}
                    transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                    className="mr-2 md:mr-3 mt-2 inline-block"
                  >
                    {word}
                  </motion.span>
                ))}
              </h3>
              {/* Scroll hint — shown while text is being revealed */}
              <motion.div 
                animate={{ opacity: revealedCount >= bioWords.length ? 0 : 0.4 }}
                transition={{ duration: 0.5 }}
                className="flex items-center gap-2 mt-8 font-mono text-[10px] tracking-widest uppercase"
              >
                <motion.div animate={{ y: [0, 6, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
                  <ArrowDown size={12} />
                </motion.div>
                <span>Keep scrolling to reveal</span>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Technical Details Grid */}
        <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-10 p-6 md:p-10 pb-32 pt-20 border-t border-white/10">
          <div>
            <div className="flex items-center gap-3 mb-8 opacity-40">
              <motion.div animate={{ rotate: [0, 15, -15, 0] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}>
                <Sparkles size={16} />
              </motion.div>
              <h4 className="font-mono text-[10px] tracking-widest uppercase">Expertise</h4>
            </div>
            <ul className="space-y-4 text-xl md:text-2xl tracking-tight">
              <li>Narrative Cinematography</li>
              <li>Color Grading</li>
              <li>Post-Production Workflow</li>
              <li>Visual Storytelling</li>
              <li>Sound Design</li>
            </ul>
          </div>
          <div>
            <div className="flex items-center gap-3 mb-8 opacity-40">
              <motion.div animate={{ y: [0, -3, 0] }} transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1 }}>
                <Monitor size={16} />
              </motion.div>
              <h4 className="font-mono text-[10px] tracking-widest uppercase">Software</h4>
            </div>
            <ul className="space-y-4 text-xl md:text-2xl tracking-tight">
              <li>DaVinci Resolve Studio</li>
              <li>Adobe Premiere Pro</li>
              <li>After Effects</li>
              <li>Blender</li>
              <li>Unreal Engine</li>
            </ul>
          </div>
          <div>
            <div className="flex items-center gap-3 mb-8 opacity-40">
              <motion.div animate={{ scale: [1, 1.1, 1], rotate: [0, 5, 0] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 2 }}>
                <Video size={16} />
              </motion.div>
              <h4 className="font-mono text-[10px] tracking-widest uppercase">Gear</h4>
            </div>
            <ul className="space-y-4 text-xl md:text-2xl tracking-tight">
              <li>Sony Alpha A7IV</li>
              <li>Sigma Art Series Prime Lens</li>
              <li>Ronin RS4 Mini Gimbal</li>
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
              <a href="mailto:mrinmoy4u4ever@gmail.com" className="text-2xl md:text-4xl hover:opacity-50 transition-opacity underline underline-offset-8 decoration-1">mrinmoy4u4ever@gmail.com</a>
              <a href="tel:+919883785205" className="text-xl opacity-60 hover:opacity-100 transition-opacity">+91 9883785205</a>
            </div>
          </div>
          
          <div className="flex flex-col justify-end md:items-end gap-12">
            <div className="flex flex-col md:items-end gap-4 font-mono text-[10px] tracking-widest uppercase">
              <span className="opacity-40">Socials</span>
              <a href="https://www.instagram.com/mrinmoy4u4ever/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:opacity-50 transition-opacity">
                Instagram <ArrowUpRight size={12} />
              </a>
              <a href="https://vimeo.com/user37719814" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:opacity-50 transition-opacity">
                Vimeo <ArrowUpRight size={12} />
              </a>
              <a href="https://www.linkedin.com/in/mrinmoy-das-730bb83ba" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:opacity-50 transition-opacity">
                LinkedIn <ArrowUpRight size={12} />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-32 pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-end gap-8 relative overflow-hidden">
          <motion.h1 
            style={{ y: footerTitleY, scale: footerTitleScale, opacity: footerTitleOpacity }}
            className="text-[15vw] leading-[0.8] font-black tracking-tighter select-none pointer-events-none origin-bottom-left"
          >
            MRINMOY
          </motion.h1>
          <div className="flex flex-col items-end gap-2 font-mono text-[10px] tracking-widest uppercase opacity-40 z-10">
            <span>© 2026 Mrinmoy</span>
            <span>All rights reserved</span>
          </div>
        </div>
      </footer>

      {/* Video Modal Popup */}
      <AnimatePresence>
        {activeModalVideo && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-10 bg-zinc-950/90 backdrop-blur-xl"
            onClick={() => setActiveModalVideo(null)}
          >
            <button 
              className="absolute top-6 right-6 text-white/50 hover:text-white transition-colors z-50 p-2"
              onClick={() => setActiveModalVideo(null)}
            >
              <X size={40} />
            </button>
            
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative w-full h-[85vh] md:h-[90vh] max-w-5xl rounded-2xl overflow-hidden shadow-2xl flex justify-center items-center"
              onClick={(e) => e.stopPropagation()}
            >
              <video 
                src={activeModalVideo.url} 
                controls 
                autoPlay 
                playsInline
                className="h-full w-auto max-w-full rounded-2xl object-contain shadow-2xl"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
