"use client";

import { useRef } from "react";
import { useGSAP, gsap } from "@/hooks/use-gsap";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

const skills = [
  {
    title: "ORIGAMI",
    description: "Can fold anything into art. Paper cranes, roses, your heart.",
    accent: "#00F5A0",
    shadowClass: "neopop-shadow-green",
    borderClass: "neopop-border-green",
    video: "/videos/origami.MOV",
    icon: (
      <svg
        width="48"
        height="48"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#00F5A0"
        strokeWidth="1.5"
        strokeLinecap="square"
        strokeLinejoin="miter"
      >
        <polygon points="12 2 22 8.5 22 15.5 12 22 2 15.5 2 8.5 12 2" />
        <line x1="12" y1="22" x2="12" y2="15.5" />
        <line x1="22" y1="8.5" x2="12" y2="15.5" />
        <line x1="2" y1="8.5" x2="12" y2="15.5" />
      </svg>
    ),
  },
  {
    title: "DUNKING",
    description:
      "Jordan like energy in a regular body. The hoop fears me (sometimes).",
    accent: "#FF2D87",
    shadowClass: "neopop-shadow-pink",
    borderClass: "neopop-border-pink",
    video: "/videos/IMG_4307.mov",
    icon: (
      <svg
        width="48"
        height="48"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#FF2D87"
        strokeWidth="1.5"
        strokeLinecap="square"
        strokeLinejoin="miter"
      >
        <circle cx="12" cy="8" r="6" />
        <line x1="12" y1="14" x2="12" y2="22" />
        <line x1="8" y1="18" x2="16" y2="18" />
      </svg>
    ),
  },
  {
    title: "REMOVING T-SHIRT",
    description:
      "One fluid motion. No fumbling. Cinematic. Standing ovation every time.",
    accent: "#FFE600",
    shadowClass: "neopop-shadow-yellow",
    borderClass: "neopop-border-yellow",
    video: "/videos/tshirt.mp4",
    icon: (
      <svg
        width="48"
        height="48"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#FFE600"
        strokeWidth="1.5"
        strokeLinecap="square"
        strokeLinejoin="miter"
      >
        <path d="M8 2 L2 6 L5 8 L5 22 L19 22 L19 8 L22 6 L16 2" />
        <path d="M8 2 C8 5 10 7 12 7 C14 7 16 5 16 2" />
        <line x1="12" y1="12" x2="12" y2="18" />
        <line x1="9" y1="15" x2="15" y2="15" />
      </svg>
    ),
  },
];

export function SkillsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useGSAP(() => {
    const section = sectionRef.current;
    if (!section) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        pin: true,
        start: "top top",
        end: "+=2000",
        scrub: 1,
      },
    });

    tl.from(titleRef.current, {
      y: 100,
      opacity: 0,
      duration: 0.6,
      ease: "power3.out",
    })
      .from(
        subtitleRef.current,
        {
          y: 60,
          opacity: 0,
          duration: 0.5,
        },
        "-=0.2"
      )
      .from(
        cardsRef.current.filter(Boolean),
        {
          y: 120,
          opacity: 0,
          rotateX: 15,
          rotateY: -5,
          stagger: 0.3,
          duration: 0.8,
          ease: "power2.out",
        },
        "-=0.1"
      )
      .to(
        cardsRef.current.filter(Boolean),
        {
          rotateY: 3,
          rotateX: -2,
          stagger: 0.1,
          duration: 0.5,
          ease: "power1.inOut",
        }
      );
  });

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-[#0D0D0D] px-6 py-20"
    >
      {/* Decorative diagonal lines */}
      <div className="absolute inset-0 overflow-hidden opacity-[0.03]">
        {Array.from({ length: 20 }, (_, i) => (
          <div
            key={i}
            className="absolute h-px bg-white"
            style={{
              width: "200%",
              top: `${i * 5}%`,
              left: "-50%",
              transform: "rotate(-30deg)",
            }}
          />
        ))}
      </div>

      <div className="relative z-10 mb-16 text-center">
        <h2
          ref={titleRef}
          className="font-heading text-4xl font-bold tracking-tight text-white md:text-6xl"
        >
          SPECIAL <span className="text-neon-green">SKILLS</span>
        </h2>
        <p
          ref={subtitleRef}
          className="mt-4 font-heading text-sm tracking-widest text-white/40 uppercase"
        >
          Things that make me dangerously attractive
        </p>
      </div>

      <div className="relative z-10 grid w-full max-w-5xl grid-cols-1 gap-8 md:grid-cols-3">
        {skills.map((skill, index) => (
          <div
            key={skill.title}
            ref={(el) => { cardsRef.current[index] = el; }}
            style={{ perspective: "1000px" }}
          >
            <Card
              className={`${skill.shadowClass} ${skill.borderClass} group relative bg-surface transition-all duration-300 hover:translate-x-[-2px] hover:translate-y-[-2px]`}
            >
              <CardHeader>
                <div className="mb-2">{skill.icon}</div>
                <CardTitle
                  className="font-heading text-xl tracking-wider"
                  style={{ color: skill.accent }}
                >
                  {skill.title}
                </CardTitle>
                <CardDescription className="text-sm leading-relaxed text-white/60">
                  {skill.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div
                  className="relative flex h-40 w-full items-center justify-center overflow-hidden border-2"
                  style={{ borderColor: skill.accent }}
                >
                  {skill.video ? (
                    <video
                      src={skill.video}
                      autoPlay
                      loop
                      muted
                      playsInline
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <>
                      <div
                        className="absolute inset-0 opacity-20"
                        style={{
                          background: `linear-gradient(135deg, ${skill.accent}22, transparent, ${skill.accent}11)`,
                        }}
                      />
                      <div className="z-10 flex flex-col items-center gap-2">
                        <svg
                          width="36"
                          height="36"
                          viewBox="0 0 24 24"
                          fill={skill.accent}
                          opacity={0.6}
                        >
                          <polygon points="5 3 19 12 5 21 5 3" />
                        </svg>
                        <span
                          className="font-heading text-[10px] tracking-widest uppercase"
                          style={{ color: skill.accent, opacity: 0.6 }}
                        >
                          Video Coming Soon
                        </span>
                      </div>
                    </>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        ))}
      </div>

      {/* Bottom accent line */}
      <div className="absolute bottom-0 left-0 h-1 w-full bg-linear-to-r from-neon-pink via-neon-green to-neon-yellow" />
    </section>
  );
}
