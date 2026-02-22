"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function useGSAP(
  callback: (gsapInstance: typeof gsap) => void | (() => void),
  deps: React.DependencyList = []
) {
  const cleanupRef = useRef<(() => void) | void>(undefined);

  useEffect(() => {
    cleanupRef.current = callback(gsap);

    return () => {
      if (typeof cleanupRef.current === "function") {
        cleanupRef.current();
      }
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}

export { gsap, ScrollTrigger };
