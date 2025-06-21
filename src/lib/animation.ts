import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, ease: "power2.out" }
};

export const fadeInLeft = {
  initial: { opacity: 0, x: -60 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: 0.8, ease: "power2.out" }
};

export const fadeInRight = {
  initial: { opacity: 0, x: 60 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: 0.8, ease: "power2.out" }
};

export const staggerContainer = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

export const setupScrollTriggerAnimations = () => {
  // Hero section animation
  gsap.fromTo('.hero-content', {
    opacity: 0,
    y: 100
  }, {
    opacity: 1,
    y: 0,
    duration: 1.2,
    ease: "power3.out",
    delay: 0.2
  });

  // Stats animation
  gsap.fromTo('.stat-item', {
    opacity: 0,
    scale: 0.8
  }, {
    opacity: 1,
    scale: 1,
    duration: 0.6,
    ease: "back.out(1.7)",
    stagger: 0.1,
    scrollTrigger: {
      trigger: '.stats-container',
      start: 'top 80%',
      end: 'bottom 20%',
      toggleActions: 'play none none reverse'
    }
  });

  // Section reveal animations
  gsap.utils.toArray('.section-reveal').forEach((section: any) => {
    gsap.fromTo(section, {
      opacity: 0,
      y: 50
    }, {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: "power2.out",
      scrollTrigger: {
        trigger: section,
        start: 'top 85%',
        end: 'bottom 15%',
        toggleActions: 'play none none reverse'
      }
    });
  });
};

export const setupSpeakersAnimation = () => {
  // Current speaker animation
  gsap.fromTo('.current-speaker-card', {
    opacity: 0,
    scale: 0.9,
    y: 30
  }, {
    opacity: 1,
    scale: 1,
    y: 0,
    duration: 1,
    ease: "power2.out",
    scrollTrigger: {
      trigger: '.speakers-section',
      start: 'top 70%',
      end: 'bottom 30%',
      toggleActions: 'play none none reverse'
    }
  });

  // Previous speakers animation
  gsap.fromTo('.previous-speaker-item', {
    opacity: 0,
    y: 30,
    scale: 0.9
  }, {
    opacity: 1,
    y: 0,
    scale: 1,
    duration: 0.6,
    ease: "power2.out",
    stagger: {
      amount: 0.8,
      from: "start"
    },
    scrollTrigger: {
      trigger: '.previous-speakers-grid',
      start: 'top 80%',
      end: 'bottom 20%',
      toggleActions: 'play none none reverse'
    }
  });

  // Hover animations for speaker cards
  gsap.utils.toArray('.speaker-hover').forEach((card: any) => {
    const tl = gsap.timeline({ paused: true });
    
    tl.to(card, {
      scale: 1.05,
      duration: 0.3,
      ease: "power2.out"
    });

    card.addEventListener('mouseenter', () => tl.play());
    card.addEventListener('mouseleave', () => tl.reverse());
  });
};

export const setupJourneyAnimation = () => {
  gsap.utils.toArray('.journey-item').forEach((item: any, index: number) => {
    const isEven = index % 2 === 0;
    
    gsap.fromTo(item, {
      opacity: 0,
      x: isEven ? -100 : 100,
      y: 50
    }, {
      opacity: 1,
      x: 0,
      y: 0,
      duration: 1,
      ease: "power2.out",
      scrollTrigger: {
        trigger: item,
        start: 'top 85%',
        end: 'bottom 15%',
        toggleActions: 'play none none reverse'
      }
    });
  });
};

export const setupFloatingElements = () => {
  gsap.utils.toArray('.floating-element').forEach((element: any, index: number) => {
    gsap.to(element, {
      y: -20,
      duration: 2 + index * 0.5,
      ease: "power1.inOut",
      yoyo: true,
      repeat: -1
    });
  });
};