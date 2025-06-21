'use client';

import React, { useEffect, useRef } from 'react';
import { Calendar, Users, Heart, Target, TrendingUp, Lightbulb } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface StatItem {
  number: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  description: string;
}

const AboutSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);

  const stats: StatItem[] = [
    { 
      number: "5+", 
      label: "EVENTS", 
      icon: Calendar,
      description: "Successful events since 2020"
    },
    { 
      number: "25+", 
      label: "SPEAKERS", 
      icon: Users,
      description: "Inspiring voices from diverse fields"
    },
    { 
      number: "50+", 
      label: "ACTIVE MEMBERS", 
      icon: Heart,
      description: "Passionate team members"
    },
    { 
      number: "1000+", 
      label: "COMMUNITY", 
      icon: Target,
      description: "Engaged community members"
    }
  ];

  const features = [
    {
      icon: Lightbulb,
      title: "Innovative Ideas",
      description: "Cutting-edge concepts that challenge conventional thinking"
    },
    {
      icon: TrendingUp,
      title: "Real Impact",
      description: "Transforming ideas into actionable solutions for society"
    },
    {
      icon: Users,
      title: "Diverse Voices",
      description: "Bringing together speakers from all walks of life"
    }
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title animation
      gsap.fromTo(titleRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: titleRef.current,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Content animation
      gsap.fromTo(contentRef.current?.children || [],
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: contentRef.current,
            start: "top 75%",
            end: "bottom 25%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Stats animation with counter effect
      const statsElements = statsRef.current?.children;
      if (statsElements) {
        Array.from(statsElements).forEach((stat, index) => {
          const numberElement = stat.querySelector('.stat-number');
          const iconElement = stat.querySelector('.stat-icon');
          
          // Animate stat cards
          gsap.fromTo(stat,
            { opacity: 0, y: 40, scale: 0.9 },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 0.8,
              delay: index * 0.1,
              ease: "back.out(1.7)",
              scrollTrigger: {
                trigger: statsRef.current,
                start: "top 80%",
                end: "bottom 20%",
                toggleActions: "play none none reverse"
              }
            }
          );

          // Counter animation
          if (numberElement) {
            const finalNumber = stats[index].number;
            const isNumeric = /^\d+/.test(finalNumber);
            
            if (isNumeric) {
              const numValue = parseInt(finalNumber);
              gsap.fromTo(numberElement,
                { textContent: 0 },
                {
                  textContent: numValue,
                  duration: 2,
                  ease: "power2.out",
                  snap: { textContent: 1 },
                  scrollTrigger: {
                    trigger: stat,
                    start: "top 85%",
                    toggleActions: "play none none none"
                  },
                  onUpdate: function() {
                    const current = Math.round(this.targets()[0].textContent);
                    numberElement.textContent = current + finalNumber.replace(/^\d+/, '');
                  }
                }
              );
            }
          }

          // Icon bounce effect
          if (iconElement) {
            gsap.to(iconElement, {
              y: -5,
              duration: 1.5,
              ease: "power2.inOut",
              repeat: -1,
              yoyo: true,
              delay: index * 0.2,
              scrollTrigger: {
                trigger: stat,
                start: "top 90%",
                toggleActions: "play none none pause"
              }
            });
          }
        });
      }

      // Logo animation
      gsap.fromTo(logoRef.current,
        { opacity: 0, scale: 0.8, rotation: -5 },
        {
          opacity: 1,
          scale: 1,
          rotation: 0,
          duration: 1.2,
          ease: "elastic.out(1, 0.5)",
          scrollTrigger: {
            trigger: logoRef.current,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Features animation
      gsap.fromTo(featuresRef.current?.children || [],
        { opacity: 0, x: -50 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          stagger: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: featuresRef.current,
            start: "top 75%",
            end: "bottom 25%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Parallax effect for background
      gsap.to(sectionRef.current, {
        backgroundPosition: "50% 100%",
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true
        }
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      id="about"
      ref={sectionRef}
      className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-800/30 relative overflow-hidden"
      style={{ backgroundPosition: "50% 0%" }}
      aria-labelledby="about-title"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5 dark:opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 25% 25%, #ef4444 2px, transparent 2px),
                           radial-gradient(circle at 75% 75%, #ef4444 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }}></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 
              id="about-title"
              ref={titleRef}
              className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-8"
            >
              About <span className="text-red-600 dark:text-red-500">TEDxCUSAT</span>
            </h2>
            
            <div ref={contentRef} className="space-y-6">
              <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                TEDxCUSAT is a dynamic platform where the brightest minds of Cochin University of Science And Technology come together to share ideas that have the power to inspire meaningful change. This year's event, centered around the theme <strong className="text-red-600 dark:text-red-400">"Kaleidoscope: Alchemy of Voices,"</strong> offers a blend of live talks and curated videos designed to spark thought-provoking conversations.
              </p>
              
              <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                TEDxCUSAT goes beyond the traditional format of talks; it's about creating a space where ideas can be transformed into actions that lead to real-world impact. Our goal is to make these ideas accessible and to inspire our community to turn them into catalysts for positive change.
              </p>

              <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                From groundbreaking scientific discoveries to innovative social solutions, our speakers represent the diversity of human thought and the power of collaborative innovation.
              </p>
            </div>

            {/* Features */}
            <div ref={featuresRef} className="mt-12 space-y-4">
              {features.map((feature, index) => (
                <div key={index} className="flex items-start space-x-4 p-4 rounded-lg bg-white/50 dark:bg-gray-700/30 backdrop-blur-sm hover:bg-white/70 dark:hover:bg-gray-700/50 transition-all duration-300">
                  <div className="flex-shrink-0">
                    <feature.icon className="w-6 h-6 text-red-600 dark:text-red-500 mt-1" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-1">
                      {feature.title}
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Stats Grid */}
            <div ref={statsRef} className="grid grid-cols-2 gap-6 mt-12">
              {stats.map((stat, index) => (
                <div 
                  key={index} 
                  className="text-center p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700 group cursor-pointer"
                  role="button"
                  tabIndex={0}
                  aria-label={`${stat.number} ${stat.label}: ${stat.description}`}
                >
                  <div className="flex justify-center mb-3">
                    <stat.icon className="stat-icon w-8 h-8 text-red-600 dark:text-red-500 group-hover:scale-110 transition-transform duration-300" />
                  </div>
                  <div className="stat-number text-3xl font-bold mb-2 text-red-600 dark:text-red-500">
                    {stat.number}
                  </div>
                  <div className="text-sm font-semibold text-gray-900 dark:text-white mb-1">
                    {stat.label}
                  </div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">
                    {stat.description}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Logo Section */}
          <div className="relative">
            <div 
              ref={logoRef}
              className="aspect-square rounded-3xl bg-gradient-to-br from-red-50 to-white dark:from-red-900/20 dark:to-gray-800 p-12 flex items-center justify-center shadow-2xl border border-red-100 dark:border-red-900/30 hover:shadow-3xl transition-all duration-500 group"
            >
              <div className="text-center">
                <div className="text-6xl sm:text-7xl font-bold mb-4 text-red-600 dark:text-red-500 group-hover:scale-105 transition-transform duration-300">
                  TEDx
                </div>
                <div className="text-3xl sm:text-4xl font-semibold text-gray-900 dark:text-white mb-3 group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors duration-300">
                  CUSAT
                </div>
                <div className="text-lg text-gray-600 dark:text-gray-400 font-medium">
                  Ideas Worth Spreading
                </div>
                <div className="mt-4 w-16 h-1 bg-red-600 dark:bg-red-500 mx-auto rounded-full group-hover:w-24 transition-all duration-300"></div>
              </div>
            </div>

            {/* Decorative elements */}
            <div className="absolute -top-4 -right-4 w-20 h-20 bg-red-500/10 rounded-full blur-xl"></div>
            <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-red-400/20 rounded-full blur-xl"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;