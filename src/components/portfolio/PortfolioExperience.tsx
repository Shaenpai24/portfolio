"use client";

import { motion, useInView } from "framer-motion";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import { profile } from "@/data/profile";
import { projects } from "@/data/projects";
import { storyPhases } from "@/data/story";
import { expertiseNodes } from "@/data/expertise";
import { achievements } from "@/data/achievements";

gsap.registerPlugin(ScrollTrigger);

const HeroBackgroundScene = dynamic(() => import("./HeroBackgroundScene"), {
  ssr: false,
  loading: () => (
    <div className="h-full w-full bg-[radial-gradient(circle_at_28%_18%,#112a3d,transparent_45%),radial-gradient(circle_at_74%_72%,#0d4037,transparent_45%),#04070d]" />
  ),
});

function Counter({ value, suffix = "" }: { value: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-20%" });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    const duration = 1300;
    const startTime = performance.now();

    const tick = (time: number) => {
      const progress = Math.min((time - startTime) / duration, 1);
      setCount(Math.floor(progress * value));
      if (progress < 1) requestAnimationFrame(tick);
    };

    requestAnimationFrame(tick);
  }, [isInView, value]);

  return (
    <span ref={ref} className="text-4xl font-semibold tracking-tight text-white md:text-5xl">
      {count}
      {suffix}
    </span>
  );
}

function SectionHeading({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <div className="mb-12 max-w-3xl">
      <p className="mb-3 text-xs font-medium uppercase tracking-[0.28em] text-cyan-200/70">{eyebrow}</p>
      <h2 className="text-balance text-3xl font-semibold leading-tight text-white md:text-5xl">{title}</h2>
    </div>
  );
}

export default function PortfolioExperience() {
  const rootRef = useRef<HTMLDivElement>(null);
  const [mouse, setMouse] = useState({ x: 50, y: 50 });
  const [lightsOn, setLightsOn] = useState(false);
  const [ropePull, setRopePull] = useState(0);

  useEffect(() => {
    const onPointerMove = (event: PointerEvent) => {
      const x = (event.clientX / window.innerWidth) * 100;
      const y = (event.clientY / window.innerHeight) * 100;
      setMouse({ x, y });
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });

    const lenis = new Lenis({
      duration: 1.08,
      smoothWheel: true,
      wheelMultiplier: 0.92,
      touchMultiplier: 1,
    });

    let raf = 0;
    const loop = (time: number) => {
      lenis.raf(time);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".reveal").forEach((el) => {
        gsap.fromTo(
          el,
          { y: 36, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.95,
            ease: "power2.out",
            scrollTrigger: {
              trigger: el,
              start: "top 86%",
            },
          },
        );
      });

      gsap.to(".about-progress-fill", {
        width: "100%",
        ease: "none",
        scrollTrigger: {
          trigger: "#about-story",
          start: "top center",
          end: "bottom center",
          scrub: true,
        },
      });

      gsap.utils.toArray<HTMLElement>(".parallax-layer").forEach((layer) => {
        const depth = Number(layer.dataset.depth ?? 0.12);
        gsap.to(layer, {
          yPercent: depth * 110,
          ease: "none",
          scrollTrigger: {
            trigger: layer.closest("section"),
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });
      });

      gsap.fromTo(
        ".expertise-link",
        { strokeDashoffset: 120, opacity: 0.1 },
        {
          strokeDashoffset: 0,
          opacity: 0.45,
          duration: 1.4,
          stagger: 0.04,
          ease: "power2.out",
          scrollTrigger: {
            trigger: "#expertise-map",
            start: "top 72%",
          },
        },
      );

      ScrollTrigger.create({
        trigger: "#projects",
        start: "top top",
        end: "+=1600",
        pin: ".projects-sticky-title",
        pinSpacing: false,
      });

      gsap.utils.toArray<HTMLElement>(".project-card").forEach((card) => {
        gsap.fromTo(
          card,
          { opacity: 0, y: 70, scale: 0.96 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 83%",
            },
          },
        );
      });
    }, rootRef);

    return () => {
      window.removeEventListener("pointermove", onPointerMove);
      cancelAnimationFrame(raf);
      lenis.destroy();
      ctx.revert();
    };
  }, []);

  const graphLinks = useMemo(() => {
    const links: Array<[number, number]> = [];
    for (let i = 0; i < expertiseNodes.length; i += 1) {
      if (i + 1 < expertiseNodes.length) links.push([i, i + 1]);
      if (i + 3 < expertiseNodes.length) links.push([i, i + 3]);
    }
    return links;
  }, []);

  const githubHeat = useMemo(() => {
    return new Array(96).fill(null).map((_, i) => {
      if (i % 11 === 0) return "rgba(115,240,201,0.85)";
      if (i % 7 === 0) return "rgba(122,212,255,0.55)";
      return "rgba(255,255,255,0.08)";
    });
  }, []);

  const heroMask = lightsOn
    ? `radial-gradient(circle ${Math.max(18, 16 + (mouse.x / 100) * 12)}rem at ${mouse.x}% ${mouse.y}%, rgba(255,255,255,1) 0%, rgba(255,255,255,0.95) 26%, rgba(255,255,255,0.28) 54%, rgba(255,255,255,0) 76%)`
    : `radial-gradient(circle ${Math.max(10, 9 + (mouse.x / 100) * 8)}rem at ${mouse.x}% ${mouse.y}%, rgba(255,255,255,1) 0%, rgba(255,255,255,0.78) 20%, rgba(255,255,255,0.16) 44%, rgba(255,255,255,0) 68%)`;

  return (
    <div ref={rootRef} className="bg-[#04070d] text-slate-200">
      <main className="relative overflow-hidden">
        <div
          className="pointer-events-none fixed inset-0 z-20"
          style={{
            background: lightsOn
              ? `radial-gradient(circle at ${mouse.x}% ${mouse.y}%, rgba(113,240,201,0.10), transparent 26%)`
              : `radial-gradient(circle at ${mouse.x}% ${mouse.y}%, rgba(113,240,201,0.12), transparent 16%)`,
          }}
        />

        <section className="relative isolate flex min-h-screen items-center border-b border-white/10 px-6 pt-20 pb-24 md:px-14 lg:px-20">
          <div className="pointer-events-none absolute inset-0 opacity-95">
            <HeroBackgroundScene lightsOn={lightsOn} />
          </div>
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background: lightsOn
                ? `radial-gradient(circle at ${mouse.x}% ${mouse.y}%, rgba(140,223,255,0.13), transparent 34%), radial-gradient(circle at 78% 70%, rgba(88,233,193,0.10), transparent 36%), linear-gradient(to bottom, rgba(4,7,13,0.30), rgba(4,7,13,0.82))`
                : `radial-gradient(circle at ${mouse.x}% ${mouse.y}%, rgba(140,223,255,0.16), transparent 14%), radial-gradient(circle at ${mouse.x}% ${mouse.y}%, rgba(140,223,255,0.07), transparent 22%), radial-gradient(circle at 78% 70%, rgba(88,233,193,0.05), transparent 34%), linear-gradient(to bottom, rgba(1,2,5,0.82), rgba(1,2,5,0.98))`,
            }}
          />
          <div
            className="pointer-events-none absolute inset-0 z-[21] transition-opacity duration-700"
            style={{
              background: lightsOn
                ? `radial-gradient(circle 28rem at ${mouse.x}% ${mouse.y}%, rgba(255,247,214,0.12), transparent 44%)`
                : `radial-gradient(circle 10rem at ${mouse.x}% ${mouse.y}%, rgba(255,247,214,0.18), transparent 58%)`,
            }}
          />

          <div
            className="parallax-layer relative z-10 mx-auto w-full max-w-7xl"
            data-depth="0.08"
            style={{
              WebkitMaskImage: heroMask,
              maskImage: heroMask,
              WebkitMaskRepeat: "no-repeat",
              maskRepeat: "no-repeat",
              WebkitMaskSize: "100% 100%",
              maskSize: "100% 100%",
              opacity: lightsOn ? 1 : 0.88,
            }}
          >
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.12 }}
              className="mb-6 text-sm uppercase tracking-[0.3em] text-cyan-100/70"
            >
              {profile.subtitle}
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 34 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.15, ease: [0.16, 1, 0.3, 1] }}
              className="text-pretty text-5xl font-semibold leading-[0.92] text-white sm:text-6xl md:max-w-5xl md:text-8xl"
            >
              {profile.name}
              <span className="mt-4 block text-balance text-xl font-medium leading-snug text-slate-200/88 md:mt-8 md:text-4xl">
                {profile.heroTitle}
              </span>
            </motion.h1>
            <p className="mt-5 max-w-2xl text-sm uppercase tracking-[0.2em] text-cyan-100/65">{profile.heroEyebrow}</p>

            <div className="mt-12 flex flex-wrap items-center gap-3">
              <div className="inline-flex items-center gap-3 rounded-full border border-white/20 bg-white/5 px-5 py-2 text-xs uppercase tracking-[0.18em] text-cyan-100/85 backdrop-blur">
                Scroll to enter the lab
                <span className="animate-bounce text-base">v</span>
              </div>
            </div>
          </div>

          <div className="absolute right-4 top-16 z-10 hidden lg:block">
            <div className="relative flex h-[88vh] min-h-[42rem] w-[7rem] flex-col items-center justify-start">
              <Image
                src="/rope.svg"
                alt="Rope switch"
                width={218}
                height={2468}
                priority={false}
                className="pointer-events-none h-full w-auto select-none opacity-60 drop-shadow-[0_0_26px_rgba(255,225,170,0.14)]"
              />
              <motion.button
                type="button"
                drag="y"
                dragElastic={0.12}
                dragConstraints={{ top: 0, bottom: 112 }}
                onDrag={(_, info) => setRopePull(Math.max(0, Math.min(info.offset.y / 112, 1)))}
                onDragEnd={(_, info) => {
                  if (info.offset.y > 72) setLightsOn(true);
                  setRopePull(0);
                }}
                animate={{ y: lightsOn ? 130 : ropePull * 96 }}
                transition={{ type: "spring", stiffness: 260, damping: 24 }}
                aria-label="Pull the switch to turn on the lights"
                className="absolute bottom-2 h-16 w-16 rounded-full border border-amber-100/25 bg-[#120d08]/75 shadow-[0_0_40px_rgba(255,214,144,0.18)] backdrop-blur"
              >
                <span className="sr-only">Pull the switch to turn on the lights</span>
              </motion.button>
            </div>
          </div>
        </section>

        <section id="about-story" className="relative border-b border-white/10 px-6 py-24 md:px-14 lg:px-20">
          <div className="mx-auto max-w-6xl">
            <SectionHeading eyebrow="About / Story" title={profile.sectionCopy.aboutTitle} />
            <div className="mb-12 h-px w-full bg-white/10">
              <div className="about-progress-fill h-full w-0 bg-gradient-to-r from-cyan-300/80 via-emerald-300/70 to-sky-300/80" />
            </div>

            <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
              <div className="h-fit lg:sticky lg:top-20">
                <div className="reveal rounded-2xl border border-white/12 bg-white/[0.03] p-6 backdrop-blur-sm">
                  <p className="text-xs uppercase tracking-[0.24em] text-cyan-100/70">Narrative Trajectory</p>
                  <p className="mt-4 text-sm leading-relaxed text-slate-300">
                    Systems curiosity led to simulation-first thinking, then to optimization, reinforcement learning, graph structures, and adversarial robustness research.
                  </p>
                </div>
              </div>

              <div className="space-y-5">
                {storyPhases.map((phase, idx) => (
                  <article key={phase.id} className="reveal rounded-2xl border border-white/12 bg-white/[0.03] p-6 backdrop-blur-sm">
                    <p className="mb-3 text-xs uppercase tracking-[0.22em] text-cyan-100/70">{phase.label}</p>
                    <p className="text-sm leading-relaxed text-slate-300 md:text-base">{phase.text}</p>
                    <div className="mt-5 flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-slate-400">
                      <span className="inline-block h-px flex-1 bg-white/15" />
                      {String(idx + 1).padStart(2, "0")}
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="projects" className="relative border-b border-white/10 px-6 py-24 md:px-14 lg:px-20">
          <div className="mx-auto max-w-6xl">
            <div className="mb-10 grid gap-8 lg:grid-cols-[0.78fr_1.22fr] lg:items-start">
              <div className="projects-sticky-title rounded-3xl border border-white/12 bg-white/[0.03] p-6 lg:sticky lg:top-6">
                <SectionHeading eyebrow="Featured Projects" title={profile.sectionCopy.projectsTitle} />
                <p className="max-w-md text-sm leading-relaxed text-slate-300">
                  The project section now reads as a clean sequence instead of a pinned poster, so each build gets its own stage as you scroll.
                </p>
              </div>

              <div className="space-y-10">
                  {projects.map((project, index) => {
                const demoHref = project.demo ?? project.github;
                const demoLabel = project.demo ? "Live Demo" : "Prototype";

                return (
                  <motion.article
                    key={project.name}
                    whileHover={{ y: -6 }}
                    transition={{ type: "spring", stiffness: 180, damping: 18 }}
                    className="project-card group relative overflow-hidden rounded-3xl border border-white/15 bg-[#080d17]/90 p-8 md:p-10"
                  >
                    <div className={`parallax-layer pointer-events-none absolute inset-0 bg-gradient-to-br ${project.aestheticClass} opacity-45 blur-3xl transition-opacity duration-500 group-hover:opacity-70`} data-depth="0.18" />
                    <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(115deg,transparent,rgba(255,255,255,0.08),transparent)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                    <div className="relative z-10 grid gap-8 lg:grid-cols-[2fr_1fr]">
                      <div>
                        <p className="mb-3 text-xs uppercase tracking-[0.28em] text-cyan-100/65">Project {index + 1}</p>
                        <h3 className="mb-3 text-3xl font-semibold text-white md:text-5xl">{project.name}</h3>
                        <p className="mb-2 text-xs uppercase tracking-[0.2em] text-emerald-100/70">{project.motif}</p>
                        <p className="mb-6 max-w-2xl text-base leading-relaxed text-slate-300 md:text-lg">{project.oneLiner}</p>

                        <div className="mb-7 flex flex-wrap gap-2">
                          {project.tech.map((item) => (
                            <span key={item} className="rounded-full border border-cyan-100/30 bg-cyan-100/10 px-3 py-1 text-xs uppercase tracking-[0.14em] text-cyan-100/90">
                              {item}
                            </span>
                          ))}
                        </div>

                        <div className="grid gap-4 md:grid-cols-2">
                          <div className="rounded-2xl border border-white/15 bg-black/20 p-4">
                            <p className="mb-1 text-xs uppercase tracking-[0.2em] text-cyan-100/65">Engineering Challenge</p>
                            <p className="text-sm text-slate-300">{project.challenge}</p>
                          </div>
                          <div className="rounded-2xl border border-white/15 bg-black/20 p-4">
                            <p className="mb-1 text-xs uppercase tracking-[0.2em] text-cyan-100/65">Result</p>
                            <p className="text-sm text-slate-300">{project.metric}</p>
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-col justify-between gap-5 rounded-2xl border border-white/15 bg-black/25 p-5">
                        <div className="h-40 rounded-xl border border-white/10 bg-[radial-gradient(circle_at_20%_20%,rgba(156,223,255,0.22),transparent_45%),radial-gradient(circle_at_80%_80%,rgba(105,244,198,0.18),transparent_40%),#02060f] p-4">
                          <div className="flex h-full items-end justify-center gap-2">
                            {new Array(9).fill(null).map((_, i) => (
                              <span
                                key={i}
                                className="w-1 rounded-full bg-cyan-200/60"
                                style={{ height: `${14 + ((i * 19 + index * 7) % 52)}px` }}
                              />
                            ))}
                          </div>
                        </div>
                        <div className="flex gap-3">
                          <Link
                            href={project.github}
                            target="_blank"
                            className="inline-flex flex-1 items-center justify-center gap-2 rounded-full border border-white/20 bg-white/8 px-4 py-2 text-sm text-white transition hover:bg-white/16"
                          >
                            <span aria-hidden className="text-base">o</span>
                            GitHub
                          </Link>
                          <Link
                            href={demoHref}
                            target="_blank"
                            className="inline-flex flex-1 items-center justify-center gap-2 rounded-full border border-cyan-100/35 bg-cyan-200/15 px-4 py-2 text-sm text-cyan-100 transition hover:bg-cyan-200/28"
                          >
                            {demoLabel}
                            <span aria-hidden className="text-base">-&gt;</span>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </motion.article>
                );
              })}
              </div>
            </div>
          </div>
        </section>

        <section id="expertise-map" className="relative border-b border-white/10 px-6 py-24 md:px-14 lg:px-20">
          <div className="mx-auto max-w-6xl">
            <SectionHeading eyebrow="Technical Expertise" title={profile.sectionCopy.expertiseTitle} />

            <div className="relative grid gap-5 md:grid-cols-2 lg:grid-cols-4">
              {expertiseNodes.map((node, idx) => (
                <motion.article
                  key={node.title}
                  whileHover={{ scale: 1.02, y: -4 }}
                  className="reveal group relative rounded-2xl border border-white/15 bg-white/[0.03] p-5"
                >
                  <div className="pointer-events-none absolute -inset-0.5 rounded-2xl bg-gradient-to-r from-cyan-300/0 via-sky-300/20 to-emerald-300/0 opacity-0 blur-lg transition group-hover:opacity-100" />
                  <p className="relative mb-2 text-base font-semibold text-white">{node.title}</p>
                  <p className="relative text-sm text-slate-300">{node.detail}</p>
                  <span className="absolute right-4 top-4 text-xs text-cyan-100/60">{String(idx + 1).padStart(2, "0")}</span>
                </motion.article>
              ))}

              <svg className="pointer-events-none absolute inset-0 -z-10 h-full w-full opacity-40" aria-hidden>
                {graphLinks.map(([a, b]) => {
                  const ax = (a % 4) * 25 + 12;
                  const ay = Math.floor(a / 4) * 50 + 25;
                  const bx = (b % 4) * 25 + 12;
                  const by = Math.floor(b / 4) * 50 + 25;
                  return (
                    <line
                      key={`${a}-${b}`}
                      className="expertise-link"
                      x1={`${ax}%`}
                      y1={`${ay}%`}
                      x2={`${bx}%`}
                      y2={`${by}%`}
                      stroke="url(#expertiseGradient)"
                      strokeWidth="1.2"
                      strokeDasharray="120"
                      strokeDashoffset="120"
                    />
                  );
                })}
                <defs>
                  <linearGradient id="expertiseGradient" x1="0" x2="1" y1="0" y2="1">
                    <stop offset="0%" stopColor="#7ad4ff" stopOpacity="0.72" />
                    <stop offset="100%" stopColor="#73f0c9" stopOpacity="0.12" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
          </div>
        </section>

        <section className="relative border-b border-white/10 px-6 py-24 md:px-14 lg:px-20">
          <div className="mx-auto max-w-6xl">
            <SectionHeading eyebrow="Experience / Achievements" title={profile.sectionCopy.achievementsTitle} />

            <div className="grid gap-6 md:grid-cols-4">
              {achievements.map((achievement) => (
                <div key={achievement.label} className="reveal rounded-2xl border border-white/15 bg-white/[0.03] p-6">
                  <Counter value={achievement.value} suffix={achievement.suffix} />
                  <p className="mt-3 text-sm text-slate-300">{achievement.label}</p>
                </div>
              ))}
            </div>

            <div className="reveal mt-8 rounded-2xl border border-cyan-100/20 bg-gradient-to-r from-cyan-200/10 to-emerald-200/5 p-6">
              <p className="text-sm leading-relaxed text-slate-200">
                Timeline: leading technical initiatives, winning hackathon tracks, and continuously aligning side projects with research-grade rigor.
              </p>
            </div>
          </div>
        </section>

        <section className="relative border-b border-white/10 px-6 py-24 md:px-14 lg:px-20">
          <div className="mx-auto grid max-w-6xl gap-14 lg:grid-cols-[1.3fr_1fr] lg:items-start">
            <div>
              <SectionHeading eyebrow="GitHub / Build Philosophy" title={profile.sectionCopy.githubTitle} />
              <p className="reveal max-w-2xl text-base leading-relaxed text-slate-300 md:text-lg">{profile.philosophy}</p>
            </div>

            <div className="reveal rounded-3xl border border-white/15 bg-white/[0.03] p-6">
              <p className="mb-4 text-xs uppercase tracking-[0.2em] text-cyan-100/70">Contribution Pulse</p>
              <div className="grid grid-cols-12 gap-1">
                {githubHeat.map((cell, idx) => (
                  <span key={idx} className="aspect-square rounded-sm" style={{ background: cell }} />
                ))}
              </div>
              <Link
                href={profile.githubProfile}
                target="_blank"
                className="mt-5 inline-flex items-center gap-2 text-sm text-cyan-100 transition hover:text-white"
              >
                Explore repositories
                <span aria-hidden className="text-base">-&gt;</span>
              </Link>
            </div>
          </div>
        </section>

        <section className="relative px-6 pt-24 pb-28 md:px-14 lg:px-20">
          <div className="mx-auto max-w-5xl rounded-3xl border border-white/15 bg-[linear-gradient(140deg,rgba(122,212,255,0.2),rgba(115,240,201,0.09),rgba(4,7,13,0.6))] p-8 shadow-[0_0_80px_rgba(87,183,255,0.18)] md:p-12">
            <p className="mb-3 text-xs uppercase tracking-[0.24em] text-cyan-100/70">Contact</p>
            <h2 className="mb-6 text-3xl font-semibold text-white md:text-5xl">{profile.finalStatement}</h2>

            <div className="grid gap-3 text-sm text-slate-200 md:grid-cols-2">
              <Link href={`mailto:${profile.email}`} className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-black/30 px-4 py-3 transition hover:bg-black/45">
                <span aria-hidden className="text-base">@</span>
                {profile.email}
              </Link>
              <Link href={profile.linkedin} target="_blank" className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-black/30 px-4 py-3 transition hover:bg-black/45">
                <span aria-hidden className="text-base">o</span>
                LinkedIn
              </Link>
              <Link href={profile.githubProfile} target="_blank" className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-black/30 px-4 py-3 transition hover:bg-black/45">
                <span aria-hidden className="text-base">o</span>
                GitHub
              </Link>
              <Link href={profile.resumePath} className="inline-flex items-center gap-2 rounded-xl border border-cyan-100/35 bg-cyan-200/15 px-4 py-3 text-cyan-100 transition hover:bg-cyan-200/25">
                Resume Download
                <span aria-hidden className="text-base">-&gt;</span>
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
