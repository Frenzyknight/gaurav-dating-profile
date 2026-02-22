"use client";

import { useRef } from "react";
import { useGSAP, gsap } from "@/hooks/use-gsap";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { StarRating } from "@/components/star-rating";

const ratings = [
  {
    trait: "Patient for the yappers out there",
    stars: 5,
    color: "#00F5A0",
  },
  {
    trait: "Easy to convince = always win arguments",
    stars: 4,
    color: "#FFE600",
  },
  {
    trait: "Gives you free therapy, does not become the reason for it",
    stars: 5,
    color: "#FF2D87",
  },
  {
    trait: "Comedic timing on point (Kashmiri genes, can\u2019t help)",
    stars: 5,
    color: "#00F5A0",
  },
  {
    trait: "Great wingman for your girlies",
    stars: 4,
    color: "#FFE600",
  },
  {
    trait: "Easily bullied / very hitable = low stress",
    stars: 3,
    color: "#FF2D87",
  },
  {
    trait: "Ragebait you (just a lil)",
    stars: 2,
    color: "#FFE600",
  },
  {
    trait: "Great stamina, can run around you all day",
    stars: 5,
    color: "#00F5A0",
  },
];

export function DatebilitySection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const rowsRef = useRef<(HTMLDivElement | null)[]>([]);
  const progressRefs = useRef<(HTMLDivElement | null)[]>([]);

  useGSAP(() => {
    const section = sectionRef.current;
    if (!section) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        pin: true,
        start: "top top",
        end: "+=3000",
        scrub: 1,
      },
    });

    tl.from(titleRef.current, {
      y: 80,
      opacity: 0,
      duration: 0.5,
      ease: "power3.out",
    }).from(
      subtitleRef.current,
      {
        y: 40,
        opacity: 0,
        duration: 0.4,
      },
      "-=0.2"
    );

    const validRows = rowsRef.current.filter(Boolean);
    validRows.forEach((row, i) => {
      tl.from(
        row,
        {
          x: i % 2 === 0 ? -120 : 120,
          opacity: 0,
          duration: 0.4,
          ease: "power2.out",
        },
        `-=0.15`
      );

      const starsInRow = row!.querySelectorAll(".star-item");
      if (starsInRow.length) {
        tl.from(
          starsInRow,
          {
            scale: 0,
            opacity: 0,
            stagger: 0.05,
            duration: 0.15,
            ease: "back.out(2)",
          },
          "-=0.2"
        );
      }

      const progressBar = progressRefs.current[i];
      if (progressBar) {
        const indicator = progressBar.querySelector(
          '[data-slot="progress-indicator"]'
        );
        if (indicator) {
          tl.from(
            indicator,
            {
              scaleX: 0,
              transformOrigin: "left center",
              duration: 0.3,
              ease: "power2.out",
            },
            "-=0.2"
          );
        }
      }
    });
  });

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-[#0D0D0D] px-6 py-20"
    >
      {/* Corner accent blocks */}
      <div className="absolute top-8 left-8 h-16 w-16 border-t-2 border-l-2 border-neon-pink opacity-30" />
      <div className="absolute right-8 bottom-8 h-16 w-16 border-r-2 border-b-2 border-neon-green opacity-30" />

      <div className="relative z-10 mb-12 text-center">
        <h2
          ref={titleRef}
          className="font-heading text-4xl font-bold tracking-tight text-white md:text-6xl"
        >
          DATE<span className="text-neon-pink">BILITY</span>
          <br />
          <span className="font-heading text-lg tracking-widest text-white/30 md:text-2xl">
            RATINGS
          </span>
        </h2>
        <p
          ref={subtitleRef}
          className="mt-4 font-heading text-xs tracking-widest text-white/40 uppercase md:text-sm"
        >
          Objectively measured. Totally unbiased. Trust me.
        </p>
      </div>

      <div className="relative z-10 w-full max-w-3xl">
        {ratings.map((item, index) => (
          <div key={item.trait}>
            <div
              ref={(el) => { rowsRef.current[index] = el; }}
              className="group flex flex-col gap-3 py-5 transition-colors duration-200 hover:bg-white/2 md:flex-row md:items-center md:gap-6 md:px-4"
            >
              {/* Index number */}
              <span
                className="font-heading text-3xl font-bold md:text-4xl"
                style={{ color: item.color }}
              >
                {String(index + 1).padStart(2, "0")}
              </span>

              {/* Trait text */}
              <p className="flex-1 text-sm leading-relaxed text-white/80 md:text-base">
                {item.trait}
              </p>

              {/* Star rating + progress */}
              <div className="flex flex-col gap-2">
                <StarRating rating={item.stars} color={item.color} />
                <div
                  ref={(el) => { progressRefs.current[index] = el; }}
                  className="w-full md:w-48"
                >
                  <Progress
                    value={(item.stars / 5) * 100}
                    className="h-1.5 bg-white/10"
                    style={
                      {
                        "--progress-color": item.color,
                      } as React.CSSProperties
                    }
                  />
                </div>
              </div>
            </div>

            {index < ratings.length - 1 && (
              <Separator className="bg-white/5" />
            )}
          </div>
        ))}
      </div>

      {/* Footer tagline */}
      <div className="relative z-10 mt-12 text-center">
        <p className="font-heading text-xs tracking-[0.3em] text-white/20 uppercase">
          If you scrolled this far, you&apos;re already interested
        </p>
      </div>

      {/* Bottom accent line */}
      <div className="absolute bottom-0 left-0 h-1 w-full bg-linear-to-r from-neon-yellow via-neon-pink to-neon-green" />
    </section>
  );
}
