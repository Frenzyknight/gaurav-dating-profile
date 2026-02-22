"use client";

import { useRef } from "react";
import { useGSAP, gsap } from "@/hooks/use-gsap";
import { Badge } from "@/components/ui/badge";

export function HeroSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const photoRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLHeadingElement>(null);
  const taglineRef = useRef<HTMLParagraphElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const decoTopRef = useRef<HTMLDivElement>(null);
  const decoBottomRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const section = sectionRef.current;
    if (!section) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        pin: true,
        start: "top top",
        end: "+=1200",
        scrub: 1,
      },
    });

    tl.from(photoRef.current, {
      scale: 0.6,
      opacity: 0,
      duration: 1,
      ease: "power2.out",
    })
      .from(
        nameRef.current,
        {
          y: 80,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
        },
        "-=0.4"
      )
      .from(
        taglineRef.current,
        {
          y: 60,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
        },
        "-=0.4"
      )
      .from(
        badgeRef.current,
        {
          scale: 0,
          opacity: 0,
          duration: 0.5,
          ease: "back.out(1.7)",
        },
        "-=0.3"
      )
      .from(
        decoTopRef.current,
        {
          x: -200,
          y: -200,
          opacity: 0,
          rotation: -45,
          duration: 1,
        },
        0
      )
      .from(
        decoBottomRef.current,
        {
          x: 200,
          y: 200,
          opacity: 0,
          rotation: 45,
          duration: 1,
        },
        0
      )
      .to(photoRef.current, {
        y: -30,
        scale: 1.05,
        duration: 1,
      });
  });

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#0D0D0D]"
    >
      {/* Decorative isometric shapes */}
      <div
        ref={decoTopRef}
        className="absolute top-16 left-12 h-24 w-24 border-2 border-neon-green opacity-40 md:h-32 md:w-32"
        style={{
          transform: "rotate(45deg) skewX(-10deg) skewY(-10deg)",
        }}
      />
      <div
        ref={decoBottomRef}
        className="absolute right-12 bottom-16 h-20 w-20 border-2 border-neon-pink opacity-40 md:h-28 md:w-28"
        style={{
          transform: "rotate(12deg) skewX(10deg) skewY(10deg)",
        }}
      />

      {/* Grid lines decoration */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="h-full w-full"
          style={{
            backgroundImage:
              "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      <div className="relative z-10 flex flex-col items-center gap-8 px-6 text-center md:flex-row md:gap-16 md:text-left">
        {/* Photo frame */}
        <div ref={photoRef} className="relative">
          <div className="neopop-shadow-green relative h-72 w-72 border-3 border-white md:h-96 md:w-80">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/photo.jpg"
              alt="Profile photo"
              className="h-full w-full object-cover"
            />
          </div>
          {/* Isometric offset accent block */}
          <div className="absolute -right-3 -bottom-3 -z-10 h-full w-full bg-neon-green/20" />
        </div>

        {/* Text content */}
        <div className="flex max-w-lg flex-col gap-6">
          <div ref={badgeRef}>
            <Badge className="neopop-shadow-pink w-fit border-2 border-neon-pink bg-neon-pink/10 px-4 py-1.5 font-heading text-xs tracking-widest text-neon-pink uppercase hover:bg-neon-pink/20">
              Currently Available
            </Badge>
          </div>

          <h1
            ref={nameRef}
            className="font-heading text-5xl font-bold leading-tight tracking-tight text-white md:text-7xl"
          >
            THE
            <br />
            <span className="text-gradient-neon">BIODATA</span>
          </h1>

          <p
            ref={taglineRef}
            className="max-w-md text-lg leading-relaxed text-white/60 md:text-xl"
          >
            Not your average hinge profile.
            <br />
            <span className="font-heading text-sm tracking-wider text-neon-yellow">
              SCROLL TO DISCOVER WHY &darr;
            </span>
          </p>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2">
        <span className="font-heading text-[10px] tracking-[0.3em] text-white/30 uppercase">
          Scroll below to experience
        </span>
        <div className="flex h-8 w-5 items-start justify-center border border-white/20 p-1">
          <div className="h-1.5 w-1.5 animate-bounce bg-neon-green" />
        </div>
      </div>

      {/* Bottom accent line */}
      <div className="absolute bottom-0 left-0 h-1 w-full bg-linear-to-r from-neon-green via-neon-yellow to-neon-pink" />
    </section>
  );
}
