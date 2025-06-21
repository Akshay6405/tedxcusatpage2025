'use client';

import React, { useRef, useEffect, forwardRef, ReactNode, useCallback } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TextPlugin } from 'gsap/TextPlugin';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';

// Register GSAP plugins
if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger, TextPlugin, MotionPathPlugin);
}

// Animation types
export type AnimationType =
    | 'fadeIn'
    | 'fadeInUp'
    | 'fadeInDown'
    | 'fadeInLeft'
    | 'fadeInRight'
    | 'slideInUp'
    | 'slideInDown'
    | 'slideInLeft'
    | 'slideInRight'
    | 'scaleIn'
    | 'scaleInRotate'
    | 'staggerFadeIn'
    | 'typewriter'
    | 'morphText'
    | 'parallax'
    | 'magneticHover'
    | 'floatingElements'
    | 'revealText'
    | 'countUp'
    | 'drawSVG'
    | 'morphShape'
    | 'particleReveal'
    | 'glitchEffect'
    | 'liquidMorph'
    | 'custom';

// Fixed snap type to match GSAP's ScrollTrigger snap options
type SnapFunction = (progress: number) => number;
type SnapConfig = {
    snapTo: number | number[] | 'labels' | 'labelsDirectional' | SnapFunction;
    duration?: number;
    delay?: number;
    ease?: string;
};

export interface AnimationConfig {
    type: AnimationType;
    duration?: number;
    delay?: number;
    ease?: string;
    stagger?: number;
    repeat?: number;
    yoyo?: boolean;
    trigger?: string | Element;
    start?: string;
    end?: string;
    scrub?: boolean | number;
    pin?: boolean;
    snap?: number | number[] | 'labels' | 'labelsDirectional' | SnapFunction | SnapConfig;
    toggleActions?: string;
    onComplete?: () => void;
    onStart?: () => void;
    customAnimation?: (element: Element, tl: gsap.core.Timeline) => void;
    // Advanced options
    morphPath?: string;
    text?: string;
    countFrom?: number;
    countTo?: number;
    particleCount?: number;
    magneticStrength?: number;
    glitchIntensity?: number;
    liquidPath?: string;
}

interface AnimationWrapperProps {
    children: ReactNode;
    animation?: AnimationConfig;
    className?: string;
    tag?: keyof React.JSX.IntrinsicElements;
    disabled?: boolean;
    once?: boolean;
    threshold?: number;
    rootMargin?: string;
}

// Predefined animation configurations - optimized for performance
const animationPresets: Record<AnimationType, Partial<AnimationConfig>> = {
    fadeIn: { duration: 0.8, ease: 'power2.out' },
    fadeInUp: { duration: 0.8, ease: 'power3.out' },
    fadeInDown: { duration: 0.8, ease: 'power3.out' },
    fadeInLeft: { duration: 0.8, ease: 'power3.out' },
    fadeInRight: { duration: 0.8, ease: 'power3.out' },
    slideInUp: { duration: 1, ease: 'power3.out' },
    slideInDown: { duration: 1, ease: 'power3.out' },
    slideInLeft: { duration: 1, ease: 'power3.out' },
    slideInRight: { duration: 1, ease: 'power3.out' },
    scaleIn: { duration: 0.6, ease: 'back.out(1.7)' },
    scaleInRotate: { duration: 0.8, ease: 'back.out(1.7)' },
    staggerFadeIn: { duration: 0.6, stagger: 0.08, ease: 'power2.out' },
    typewriter: { duration: 2, ease: 'none' },
    morphText: { duration: 1.2, ease: 'power2.inOut' },
    parallax: { ease: 'none', scrub: true },
    magneticHover: { duration: 0.3, ease: 'power2.out' },
    floatingElements: { duration: 3, ease: 'power1.inOut', repeat: -1, yoyo: true },
    revealText: { duration: 1, ease: 'power3.out' },
    countUp: { duration: 1.5, ease: 'power2.out' },
    drawSVG: { duration: 1.8, ease: 'power2.inOut' },
    morphShape: { duration: 1.2, ease: 'power2.inOut' },
    particleReveal: { duration: 1.2, ease: 'power2.out' },
    glitchEffect: { duration: 0.08, repeat: 8, ease: 'power2.inOut' },
    liquidMorph: { duration: 1.8, ease: 'power2.inOut' },
    custom: { duration: 1, ease: 'power2.out' }
};

// Animation factory functions for better performance
const createBaseAnimation = (
    element: Element,
    tl: gsap.core.Timeline,
    type: AnimationType,
    config: AnimationConfig
) => {
    switch (type) {
        case 'fadeIn':
            gsap.set(element, { opacity: 0 });
            tl.to(element, { opacity: 1, duration: config.duration, ease: config.ease });
            break;

        case 'fadeInUp':
            gsap.set(element, { opacity: 0, y: 50 });
            tl.to(element, { opacity: 1, y: 0, duration: config.duration, ease: config.ease });
            break;

        case 'fadeInDown':
            gsap.set(element, { opacity: 0, y: -50 });
            tl.to(element, { opacity: 1, y: 0, duration: config.duration, ease: config.ease });
            break;

        case 'fadeInLeft':
            gsap.set(element, { opacity: 0, x: -50 });
            tl.to(element, { opacity: 1, x: 0, duration: config.duration, ease: config.ease });
            break;

        case 'fadeInRight':
            gsap.set(element, { opacity: 0, x: 50 });
            tl.to(element, { opacity: 1, x: 0, duration: config.duration, ease: config.ease });
            break;

        case 'slideInUp':
            gsap.set(element, { y: 80, opacity: 0 });
            tl.to(element, { y: 0, opacity: 1, duration: config.duration, ease: config.ease });
            break;

        case 'slideInDown':
            gsap.set(element, { y: -80, opacity: 0 });
            tl.to(element, { y: 0, opacity: 1, duration: config.duration, ease: config.ease });
            break;

        case 'slideInLeft':
            gsap.set(element, { x: -80, opacity: 0 });
            tl.to(element, { x: 0, opacity: 1, duration: config.duration, ease: config.ease });
            break;

        case 'slideInRight':
            gsap.set(element, { x: 80, opacity: 0 });
            tl.to(element, { x: 0, opacity: 1, duration: config.duration, ease: config.ease });
            break;

        case 'scaleIn':
            gsap.set(element, { scale: 0, opacity: 0 });
            tl.to(element, { scale: 1, opacity: 1, duration: config.duration, ease: config.ease });
            break;

        case 'scaleInRotate':
            gsap.set(element, { scale: 0, rotation: 180, opacity: 0 });
            tl.to(element, { scale: 1, rotation: 0, opacity: 1, duration: config.duration, ease: config.ease });
            break;

        case 'staggerFadeIn':
            const children = element.children;
            if (children.length > 0) {
                gsap.set(children, { opacity: 0, y: 20 });
                tl.to(children, {
                    opacity: 1,
                    y: 0,
                    duration: config.duration,
                    stagger: config.stagger,
                    ease: config.ease
                });
            }
            break;

        case 'typewriter':
            if (config.text && element instanceof HTMLElement) {
                element.textContent = '';
                tl.to(element, { text: config.text, duration: config.duration, ease: config.ease });
            }
            break;

        case 'morphText':
            if (config.text) {
                tl.to(element, {
                    text: config.text,
                    duration: config.duration,
                    ease: config.ease
                });
            }
            break;

        case 'floatingElements':
            tl.to(element, {
                y: -15,
                rotation: 3,
                duration: config.duration,
                repeat: config.repeat,
                yoyo: config.yoyo,
                ease: config.ease
            });
            break;

        case 'revealText':
            gsap.set(element, { clipPath: 'inset(0 100% 0 0)' });
            tl.to(element, {
                clipPath: 'inset(0 0% 0 0)',
                duration: config.duration,
                ease: config.ease
            });
            break;

        case 'countUp':
            if (config.countFrom !== undefined && config.countTo !== undefined && element instanceof HTMLElement) {
                const counter = { value: config.countFrom };
                tl.to(counter, {
                    value: config.countTo,
                    duration: config.duration,
                    ease: config.ease,
                    onUpdate: () => {
                        element.textContent = Math.floor(counter.value).toString();
                    }
                });
            }
            break;

        case 'drawSVG':
            const paths = element.querySelectorAll('path');
            if (paths.length > 0) {
                gsap.set(paths, { drawSVG: '0%' });
                tl.to(paths, {
                    drawSVG: '100%',
                    duration: config.duration,
                    stagger: config.stagger || 0.15,
                    ease: config.ease
                });
            }
            break;

        case 'morphShape':
            if (config.morphPath) {
                tl.to(element, {
                    morphSVG: config.morphPath,
                    duration: config.duration,
                    ease: config.ease
                });
            }
            break;

        case 'particleReveal':
            createParticleReveal(element, tl, config);
            break;

        case 'glitchEffect':
            const glitchIntensity = config.glitchIntensity || 8;
            tl.to(element, {
                x: `+=${Math.random() * glitchIntensity - glitchIntensity / 2}`,
                y: `+=${Math.random() * glitchIntensity - glitchIntensity / 2}`,
                duration: config.duration,
                repeat: config.repeat,
                ease: config.ease,
                yoyo: true
            });
            break;

        case 'liquidMorph':
            if (config.liquidPath) {
                tl.to(element, {
                    motionPath: {
                        path: config.liquidPath,
                        autoRotate: true
                    },
                    duration: config.duration,
                    ease: config.ease
                });
            }
            break;

        case 'custom':
            if (config.customAnimation) {
                config.customAnimation(element, tl);
            }
            break;
    }
};

// Optimized particle creation
const createParticleReveal = (element: Element, tl: gsap.core.Timeline, config: AnimationConfig) => {
    const particleCount = Math.min(config.particleCount || 15, 30); // Limit for performance
    const fragment = document.createDocumentFragment();

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'absolute w-1.5 h-1.5 bg-current rounded-full pointer-events-none';
        fragment.appendChild(particle);

        gsap.set(particle, {
            x: (Math.random() - 0.5) * 80,
            y: (Math.random() - 0.5) * 80,
            scale: 0,
            opacity: 0
        });

        tl.to(particle, {
            scale: Math.random() * 0.8 + 0.5,
            opacity: 1,
            duration: 0.4,
            delay: i * 0.03,
            ease: config.ease
        }, 0)
            .to(particle, {
                scale: 0,
                opacity: 0,
                duration: 0.4,
                delay: 0.3,
                ease: config.ease
            }, 0.4);
    }

    element.appendChild(fragment);
};

const AnimationWrapper = forwardRef<HTMLElement, AnimationWrapperProps>(({
    children,
    animation = { type: 'fadeInUp' },
    className = '',
    tag = 'div',
    disabled = false,
    once = true,
    threshold = 0.1,
    rootMargin = '0px 0px -10% 0px'
}, ref) => {
    const elementRef = useRef<HTMLElement>(null);
    const animationRef = useRef<gsap.core.Timeline | null>(null);
    const isAnimatedRef = useRef(false);
    const mouseListenersRef = useRef<{
        mousemove?: (e: MouseEvent) => void;
        mouseleave?: () => void;
    }>({});

    // Memoized config merge
    const config = React.useMemo(() =>
        ({ ...animationPresets[animation.type], ...animation }),
        [animation]
    );

    // Optimized magnetic hover handler
    const createMagneticHover = useCallback((element: HTMLElement) => {
        const handleMouseMove = (e: MouseEvent) => {
            const rect = element.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            const strength = config.magneticStrength || 0.25;

            gsap.to(element, {
                x: x * strength,
                y: y * strength,
                duration: config.duration,
                ease: config.ease,
                overwrite: true
            });
        };

        const handleMouseLeave = () => {
            gsap.to(element, {
                x: 0,
                y: 0,
                duration: config.duration,
                ease: config.ease,
                overwrite: true
            });
        };

        mouseListenersRef.current = { mousemove: handleMouseMove, mouseleave: handleMouseLeave };
        element.addEventListener('mousemove', handleMouseMove, { passive: true });
        element.addEventListener('mouseleave', handleMouseLeave, { passive: true });
    }, [config]);

    // Optimized parallax handler
    const createParallax = useCallback((element: Element) => {
        ScrollTrigger.create({
            trigger: element,
            start: 'top bottom',
            end: 'bottom top',
            scrub: config.scrub === true ? 1 : config.scrub || 1,
            animation: gsap.to(element, {
                y: '-30%',
                ease: 'none'
            })
        });
    }, [config.scrub]);

    useEffect(() => {
        if (disabled || typeof window === 'undefined') return;

        const element = elementRef.current;
        if (!element) return;

        const ctx = gsap.context(() => {
            const tl = gsap.timeline({ paused: true });
            animationRef.current = tl;

            // Handle special animation types
            if (animation.type === 'parallax') {
                createParallax(element);
                return;
            }

            if (animation.type === 'magneticHover') {
                createMagneticHover(element);
                return;
            }

            // Create base animation
            createBaseAnimation(element, tl, animation.type, config);

            // Add callbacks with error handling
            if (config.onStart) {
                tl.eventCallback('onStart', () => {
                    try {
                        config.onStart?.();
                    } catch (error) {
                        console.warn('Animation onStart callback error:', error);
                    }
                });
            }

            if (config.onComplete) {
                tl.eventCallback('onComplete', () => {
                    try {
                        config.onComplete?.();
                    } catch (error) {
                        console.warn('Animation onComplete callback error:', error);
                    }
                });
            }

            // Setup ScrollTrigger for non-special animations
            if (config.trigger !== 'none') {
                const scrollTriggerConfig: ScrollTrigger.StaticVars = {
                    trigger: config.trigger || element,
                    start: config.start || 'top 85%',
                    end: config.end || 'bottom 15%',
                    toggleActions: config.toggleActions || 'play none none reverse',
                    pin: config.pin || false,
                    scrub: config.scrub || false,
                    onEnter: () => {
                        if (!isAnimatedRef.current || !once) {
                            tl.play();
                            isAnimatedRef.current = true;
                        }
                    },
                    onLeave: () => {
                        if (!once) tl.reverse();
                    },
                    onEnterBack: () => {
                        if (!once) tl.play();
                    },
                    onLeaveBack: () => {
                        if (!once) tl.reverse();
                    }
                };

                // Fixed snap property assignment
                if (config.snap !== undefined) {
                    scrollTriggerConfig.snap = config.snap;
                }

                ScrollTrigger.create(scrollTriggerConfig);
            } else {
                // Play immediately if no trigger
                if (config.delay) {
                    tl.delay(config.delay);
                }
                tl.play();
            }

        }, elementRef);

        return () => {
            // Cleanup mouse listeners
            const element = elementRef.current;
            if (element) {
                if (mouseListenersRef.current.mousemove) {
                    element.removeEventListener('mousemove', mouseListenersRef.current.mousemove);
                }
                if (mouseListenersRef.current.mouseleave) {
                    element.removeEventListener('mouseleave', mouseListenersRef.current.mouseleave);
                }
            }

            ctx.revert();
            if (animationRef.current) {
                animationRef.current.kill();
            }
        };
    }, [animation, disabled, once, createMagneticHover, createParallax, config]);

    const Tag = tag as React.ElementType;

    return (
        <Tag
            ref={(el: HTMLElement) => {
                elementRef.current = el;
                if (typeof ref === 'function') {
                    ref(el);
                } else if (ref) {
                    ref.current = el;
                }
            }}
            className={className}
        >
            {children}
        </Tag>
    );
});

AnimationWrapper.displayName = 'AnimationWrapper';

export default AnimationWrapper;

// Optimized utility functions
export const createCustomAnimation = (
    animationFn: (element: Element, tl: gsap.core.Timeline) => void
): AnimationConfig => ({
    type: 'custom',
    customAnimation: animationFn
});

export const createParallaxAnimation = (
    yPercent: string = '-30%',
    scrub: boolean | number = 1
): AnimationConfig => ({
    type: 'parallax',
    scrub,
    customAnimation: (element, tl) => {
        ScrollTrigger.create({
            trigger: element,
            start: 'top bottom',
            end: 'bottom top',
            scrub,
            animation: gsap.to(element, {
                y: yPercent,
                ease: 'none'
            })
        });
    }
});

export const createMagneticHover = (strength: number = 0.25): AnimationConfig => ({
    type: 'magneticHover',
    magneticStrength: strength,
    duration: 0.3,
    ease: 'power2.out'
});

export const createCountUpAnimation = (
    from: number,
    to: number,
    duration: number = 1.5
): AnimationConfig => ({
    type: 'countUp',
    countFrom: from,
    countTo: to,
    duration,
    ease: 'power2.out'
});

export const createTypewriterAnimation = (
    text: string,
    duration: number = 2
): AnimationConfig => ({
    type: 'typewriter',
    text,
    duration,
    ease: 'none'
});

export const createStaggerAnimation = (
    stagger: number = 0.08,
    duration: number = 0.6
): AnimationConfig => ({
    type: 'staggerFadeIn',
    stagger,
    duration,
    ease: 'power2.out'
});

// Enhanced animation compositions
export const createRevealTextAnimation = (
    direction: 'left' | 'right' | 'up' | 'down' = 'left'
): AnimationConfig => {
    const clipPaths = {
        left: { from: 'inset(0 100% 0 0)', to: 'inset(0 0% 0 0)' },
        right: { from: 'inset(0 0 0 100%)', to: 'inset(0 0 0 0%)' },
        up: { from: 'inset(100% 0 0 0)', to: 'inset(0% 0 0 0)' },
        down: { from: 'inset(0 0 100% 0)', to: 'inset(0 0 0% 0)' }
    };

    return {
        type: 'custom',
        duration: 1,
        ease: 'power3.out',
        customAnimation: (element, tl) => {
            gsap.set(element, { clipPath: clipPaths[direction].from });
            tl.to(element, {
                clipPath: clipPaths[direction].to,
                duration: 1,
                ease: 'power3.out'
            });
        }
    };
};

export const createMorphingAnimation = (
    paths: string[],
    duration: number = 1.2
): AnimationConfig => ({
    type: 'custom',
    duration,
    ease: 'power2.inOut',
    customAnimation: (element, tl) => {
        const segmentDuration = duration / paths.length;
        paths.forEach((path, index) => {
            tl.to(element, {
                morphSVG: path,
                duration: segmentDuration,
                ease: 'power2.inOut'
            }, index * segmentDuration);
        });
    }
});

export const createLiquidMorphAnimation = (
    path: string,
    duration: number = 1.8
): AnimationConfig => ({
    type: 'liquidMorph',
    liquidPath: path,
    duration,
    ease: 'power2.inOut'
});

export const createParticleExplosion = (
    particleCount: number = 20,
    colors: string[] = ['#E62B1E', '#FF6B6B', '#FFA07A']
): AnimationConfig => ({
    type: 'custom',
    duration: 1.5,
    ease: 'power2.out',
    customAnimation: (element, tl) => {
        const count = Math.min(particleCount, 25); // Performance limit
        const fragment = document.createDocumentFragment();

        for (let i = 0; i < count; i++) {
            const particle = document.createElement('div');
            particle.className = 'absolute w-1 h-1 rounded-full pointer-events-none';
            particle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            fragment.appendChild(particle);

            const angle = (Math.PI * 2 * i) / count;
            const distance = 60 + Math.random() * 40;
            const x = Math.cos(angle) * distance;
            const y = Math.sin(angle) * distance;

            gsap.set(particle, { x: 0, y: 0, scale: 0, opacity: 1 });

            tl.to(particle, {
                x,
                y,
                scale: Math.random() * 1.5 + 0.5,
                opacity: 0,
                duration: 1 + Math.random() * 0.3,
                ease: 'power2.out'
            }, 0);
        }

        element.appendChild(fragment);
    }
});

export { AnimationWrapper };