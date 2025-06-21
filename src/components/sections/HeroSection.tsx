'use client';

import React, { useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Calendar, MapPin, Award, Play, ArrowDown } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const HeroSection = () => {
    const heroRef = useRef<HTMLElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const subtitleRef = useRef<HTMLParagraphElement>(null);
    const buttonsRef = useRef<HTMLDivElement>(null);
    const cardsRef = useRef<HTMLDivElement>(null);
    const floatingElementsRef = useRef<HTMLDivElement>(null);
    const scrollIndicatorRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Hero entrance animation
            const tl = gsap.timeline({ delay: 0.2 });

            tl.fromTo(titleRef.current,
                { opacity: 0, y: 50, scale: 0.95 },
                { opacity: 1, y: 0, scale: 1, duration: 1.2, ease: "power3.out" }
            )
                .fromTo(subtitleRef.current,
                    { opacity: 0, y: 30 },
                    { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" },
                    "-=0.8"
                )
                .fromTo(buttonsRef.current?.children || [],
                    { opacity: 0, y: 20 },
                    { opacity: 1, y: 0, duration: 0.6, stagger: 0.2, ease: "power2.out" },
                    "-=0.4"
                )
                .fromTo(cardsRef.current?.children || [],
                    { opacity: 0, y: 30, scale: 0.95 },
                    { opacity: 1, y: 0, scale: 1, duration: 0.8, stagger: 0.1, ease: "back.out(1.7)" },
                    "-=0.6"
                );

            // Floating elements animation
            gsap.to(floatingElementsRef.current?.children || [], {
                y: "random(-20, 20)",
                x: "random(-10, 10)",
                rotation: "random(-5, 5)",
                duration: "random(2, 4)",
                ease: "sine.inOut",
                repeat: -1,
                yoyo: true,
                stagger: 0.5
            });

            // Parallax effect for background elements
            gsap.to(floatingElementsRef.current, {
                y: -100,
                scrollTrigger: {
                    trigger: heroRef.current,
                    start: "top top",
                    end: "bottom top",
                    scrub: 1
                }
            });

            // Scroll indicator animation
            gsap.to(scrollIndicatorRef.current, {
                y: 10,
                duration: 1.5,
                ease: "power2.inOut",
                repeat: -1,
                yoyo: true
            });

            // Interactive hover effects
            const cards = cardsRef.current?.children;
            if (cards) {
                Array.from(cards).forEach((card) => {
                    const element = card as HTMLElement;

                    element.addEventListener('mouseenter', () => {
                        gsap.to(element, {
                            y: -5,
                            scale: 1.02,
                            duration: 0.3,
                            ease: "power2.out"
                        });
                    });

                    element.addEventListener('mouseleave', () => {
                        gsap.to(element, {
                            y: 0,
                            scale: 1,
                            duration: 0.3,
                            ease: "power2.out"
                        });
                    });
                });
            }

        }, heroRef);

        return () => ctx.revert();
    }, []);

    const scrollToNextSection = () => {
        const nextSection = document.getElementById('about');
        nextSection?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <section
            ref={heroRef}
            className="relative pt-20 pb-16 px-4 sm:px-6 lg:px-8 min-h-screen flex items-center overflow-hidden"
            role="banner"
            aria-label="TEDxCUSAT Hero Section"
        >
            {/* Animated Background */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-white via-gray-50 to-red-50 dark:from-gray-900 dark:via-gray-800 dark:to-red-900/20"></div>

                {/* Floating elements */}
                <div ref={floatingElementsRef} className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-20 left-10 w-20 h-20 rounded-full bg-red-500/10 blur-sm"></div>
                    <div className="absolute top-40 right-20 w-16 h-16 rounded-full bg-red-500/20 blur-sm"></div>
                    <div className="absolute bottom-20 left-20 w-12 h-12 rounded-full bg-red-500/15 blur-sm"></div>
                    <div className="absolute top-60 left-1/3 w-8 h-8 rounded-full bg-red-400/25 blur-sm"></div>
                    <div className="absolute bottom-40 right-1/3 w-14 h-14 rounded-full bg-red-300/20 blur-sm"></div>
                </div>
            </div>

            <div className="relative max-w-7xl mx-auto text-center z-10">
                <div className="mb-8">
                    {/* Event Badge */}
                    <div className="inline-block mb-6">
                        <div className="px-6 py-3 rounded-full text-sm font-semibold bg-red-50 text-red-600 dark:bg-red-500/20 dark:text-red-300 mb-4 border border-red-200 dark:border-red-500/30">
                            <span className="relative">
                                TEDxCUSAT 2025
                                {/* <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse"></span> */}
                            </span>
                        </div>
                    </div>

                    {/* Main Title */}
                    <h1
                        ref={titleRef}
                        className="text-4xl sm:text-6xl lg:text-8xl font-bold mb-6 leading-tight"
                    >
                        <div className="mb-2">
                            <span className="text-red-600 dark:text-red-500">Kaleidoscope:</span>
                        </div>
                        <div className="bg-gradient-to-r from-gray-900 via-red-600 to-gray-900 bg-clip-text text-transparent dark:from-white dark:via-red-400 dark:to-white">
                            Alchemy of Voices
                        </div>
                    </h1>

                    {/* Subtitle */}
                    <p
                        ref={subtitleRef}
                        className="text-lg sm:text-xl mb-8 text-gray-600 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed"
                    >
                        A dynamic platform where the brightest minds of Cochin University of Science And Technology come together to share ideas that have the power to inspire meaningful change and shape the future.
                    </p>
                </div>

                {/* Action Buttons */}
                <div ref={buttonsRef} className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
                    <Button
                        size="lg"
                        className="text-white font-semibold px-8 py-4 rounded-full hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl bg-red-600 hover:bg-red-700 focus:ring-4 focus:ring-red-200 dark:focus:ring-red-800"
                        aria-label="Get your tickets for TEDxCUSAT 2024"
                    >
                        <Calendar className="w-5 h-5 mr-2" />
                        Get Your Tickets
                    </Button>
                    <Button
                        variant="outline"
                        size="lg"
                        className="px-8 py-4 rounded-full hover:scale-105 transition-all duration-300 border-red-500 text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-500/10 dark:border-red-500 focus:ring-4 focus:ring-red-200 dark:focus:ring-red-800"
                        aria-label="Watch previous TEDxCUSAT talks"
                    >
                        <Play className="w-5 h-5 mr-2" />
                        Watch Previous Talks
                    </Button>
                </div>

                {/* Event Info Cards */}
                <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
                    <div className="p-6 rounded-2xl bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm border border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer">
                        <Calendar className="w-8 h-8 mb-4 mx-auto text-red-600 dark:text-red-500" />
                        <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">Coming Soon</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                            Stay tuned for the next chapter of transformative ideas
                        </p>
                    </div>

                    <div className="p-6 rounded-2xl bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm border border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer">
                        <MapPin className="w-8 h-8 mb-4 mx-auto text-red-600 dark:text-red-500" />
                        <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">CUSAT Campus</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                            Cochin University of Science and Technology
                        </p>
                    </div>

                    <div className="p-6 rounded-2xl bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm border border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer">
                        <Award className="w-8 h-8 mb-4 mx-auto text-red-600 dark:text-red-500" />
                        <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">5th Edition</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                            Continuing the legacy of transformative ideas
                        </p>
                    </div>
                </div>

                {/* Scroll Indicator */}
                {/* <div
                    ref={scrollIndicatorRef}
                    className="absolute bottom-0 left-1/2 transform -translate-x-1/2 cursor-pointer group"
                    onClick={scrollToNextSection}
                    role="button"
                    tabIndex={0}
                    aria-label="Scroll to next section"
                    onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                            scrollToNextSection();
                        }
                    }}
                >
                    <div className="flex flex-col items-center text-gray-600 dark:text-gray-400 group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors duration-300">
                        <span className="text-sm mb-2 font-medium">Scroll to explore</span>
                        <ArrowDown className="w-6 h-6 animate-bounce" />
                    </div>
                </div> */}
            </div>

            {/* Accessibility: Skip link */}
            <a
                href="#about"
                className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-red-600 text-white px-4 py-2 rounded-md z-50"
            >
                Skip to main content
            </a>
        </section>
    );
};

export default HeroSection;