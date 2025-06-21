import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export const useGSAP = (
  animation: () => void,
  dependencies: any[] = []
) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const ctx = gsap.context(() => {
        animation();
      }, ref);

      return () => ctx.revert();
    }
  }, dependencies);

  return ref;
};

export const useScrollAnimation = (
  element: string,
  animationProps: any,
  triggerProps: any = {}
) => {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const ctx = gsap.context(() => {
        gsap.fromTo(element, animationProps.from, {
          ...animationProps.to,
          scrollTrigger: {
            trigger: element,
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse',
            ...triggerProps
          }
        });
      });

      return () => ctx.revert();
    }
  }, []);
};