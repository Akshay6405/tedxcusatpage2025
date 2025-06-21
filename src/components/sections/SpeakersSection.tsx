'use client';

import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Play, ChevronLeft, ChevronRight, ExternalLink, Award, Quote } from 'lucide-react';
import { Speaker, PreviousSpeaker } from '@/types';

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface SpeakersSectionProps {
  currentSpeakers: Speaker[];
  previousSpeakers: PreviousSpeaker[];
  isDarkMode: boolean;
}

const SpeakersSection: React.FC<SpeakersSectionProps> = ({
  currentSpeakers,
  previousSpeakers,
  isDarkMode
}) => {
  const sectionRef = useRef<HTMLElement>(null);
  const featuredRef = useRef<HTMLDivElement>(null);
  const previousRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const [currentSpeaker, setCurrentSpeaker] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  // TEDx brand colors
  const colors = {
    tedRed: '#E62B1E',
    darkBg: '#1a1a1a',
    lightBg: '#ffffff',
    accent: '#FF6B6B'
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title animation
      if (titleRef.current) {
        gsap.fromTo(titleRef.current,
          { 
            opacity: 0, 
            y: 50,
            scale: 0.9
          },
          { 
            opacity: 1, 
            y: 0,
            scale: 1,
            duration: 1.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: titleRef.current,
              start: "top 80%",
              end: "bottom 20%",
              toggleActions: "play none none reverse"
            }
          }
        );
      }

      // Featured speaker card animation
      if (featuredRef.current) {
        const featuredCard = featuredRef.current.querySelector('.featured-card');
        const speakerImage = featuredRef.current.querySelector('.speaker-image');
        const speakerContent = featuredRef.current.querySelector('.speaker-content');
        const speakerQuote = featuredRef.current.querySelector('.speaker-quote');

        // Card entrance animation
        if (featuredCard) {
          gsap.fromTo(featuredCard,
            { 
              opacity: 0, 
              y: 100,
              rotationY: -15,
              transformPerspective: 1000
            },
            { 
              opacity: 1, 
              y: 0,
              rotationY: 0,
              duration: 1.5,
              ease: "power3.out",
              scrollTrigger: {
                trigger: featuredCard,
                start: "top 85%",
                end: "bottom 15%",
                toggleActions: "play none none reverse"
              }
            }
          );
        }

        // Stagger content animations
        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: featuredCard,
            start: "top 70%",
            end: "bottom 30%",
            toggleActions: "play none none reverse"
          }
        });

        if (speakerImage) {
          timeline.fromTo(speakerImage, 
            { scale: 1.2, opacity: 0 },
            { scale: 1, opacity: 1, duration: 1, ease: "power2.out" }
          );
        }

        if (speakerContent && speakerContent.children.length > 0) {
          timeline.fromTo(speakerContent.children, 
            { opacity: 0, x: -50 },
            { opacity: 1, x: 0, duration: 0.8, stagger: 0.2, ease: "power2.out" },
            "-=0.5"
          );
        }

        if (speakerQuote) {
          timeline.fromTo(speakerQuote,
            { opacity: 0, y: 30, scale: 0.9 },
            { opacity: 1, y: 0, scale: 1, duration: 0.8, ease: "back.out(1.7)" },
            "-=0.3"
          );
        }

        // Floating animation for the featured card
        if (featuredCard) {
          gsap.to(featuredCard, {
            y: -10,
            duration: 3,
            ease: "power2.inOut",
            yoyo: true,
            repeat: -1,
            scrollTrigger: {
              trigger: featuredCard,
              start: "top 50%",
              end: "bottom 50%",
              toggleActions: "play pause resume pause"
            }
          });
        }
      }

      // Previous speakers grid animation
      if (previousRef.current) {
        const speakerCards = previousRef.current.querySelectorAll('.previous-speaker-card');
        
        gsap.fromTo(speakerCards,
          { 
            opacity: 0, 
            y: 80,
            scale: 0.8,
            rotationY: -20
          },
          { 
            opacity: 1, 
            y: 0,
            scale: 1,
            rotationY: 0,
            duration: 1,
            ease: "back.out(1.7)",
            stagger: {
              amount: 1.2,
              from: "start",
              ease: "power2.inOut"
            },
            scrollTrigger: {
              trigger: previousRef.current,
              start: "top 80%",
              end: "bottom 20%",
              toggleActions: "play none none reverse"
            }
          }
        );

        // Hover animations for previous speakers
        speakerCards.forEach((card) => {
          const image = card.querySelector('.speaker-avatar');
          const nameTag = card.querySelector('.speaker-name-tag');
          
          card.addEventListener('mouseenter', () => {
            if (image) {
              gsap.to(image, { scale: 1.1, duration: 0.3, ease: "power2.out" });
            }
            if (nameTag) {
              gsap.to(nameTag, { y: -5, duration: 0.3, ease: "power2.out" });
            }
            gsap.to(card, { y: -8, duration: 0.3, ease: "power2.out" });
          });
          
          card.addEventListener('mouseleave', () => {
            if (image) {
              gsap.to(image, { scale: 1, duration: 0.3, ease: "power2.out" });
            }
            if (nameTag) {
              gsap.to(nameTag, { y: 0, duration: 0.3, ease: "power2.out" });
            }
            gsap.to(card, { y: 0, duration: 0.3, ease: "power2.out" });
          });
        });
      }

      // Parallax effect for background elements
      const parallaxElements = sectionRef.current?.querySelectorAll('.parallax-element');
      parallaxElements?.forEach((element, index) => {
        gsap.to(element, {
          yPercent: -50 * (index + 1),
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true
          }
        });
      });

    }, sectionRef);

    return () => ctx.revert();
  }, [currentSpeaker, isDarkMode]);

  const nextSpeaker = () => {
    setCurrentSpeaker((prev) => (prev + 1) % currentSpeakers.length);
  };

  const prevSpeaker = () => {
    setCurrentSpeaker((prev) => (prev - 1 + currentSpeakers.length) % currentSpeakers.length);
  };

  const handlePlayVideo = () => {
    setIsPlaying(!isPlaying);
    // Add video play logic here
  };

  return (
    <section 
      id="speakers"
      ref={sectionRef}
      className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div 
          className="parallax-element absolute top-20 -left-20 w-96 h-96 rounded-full opacity-5"
          style={{ backgroundColor: colors.tedRed }}
        />
        <div 
          className="parallax-element absolute bottom-20 -right-20 w-80 h-80 rounded-full opacity-10"
          style={{ backgroundColor: colors.accent }}
        />
        <div 
          className="parallax-element absolute top-1/2 left-1/4 w-2 h-32 opacity-20"
          style={{ backgroundColor: colors.tedRed }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto">
        {/* Section Title */}
        <div className="text-center mb-16">
          <h2 
            ref={titleRef}
            className="text-3xl sm:text-4xl lg:text-6xl font-bold mb-6"
          >
            Featured{' '}
            <span 
              className="relative inline-block"
              style={{ color: colors.tedRed }}
            >
              Speakers
              <div 
                className="absolute -bottom-2 left-0 w-full h-1 rounded-full opacity-50"
                style={{ backgroundColor: colors.tedRed }}
              />
            </span>
          </h2>
          <p className={`text-lg lg:text-xl ${
            isDarkMode ? 'text-gray-300' : 'text-gray-600'
          } max-w-3xl mx-auto leading-relaxed`}>
            Meet the inspiring voices who will share groundbreaking ideas that challenge perspectives 
            and ignite transformative conversations at TEDxCUSAT 2024
          </p>
        </div>

        {/* Featured Speaker */}
        <div ref={featuredRef} className="mb-24">
          <Card className={`featured-card max-w-6xl mx-auto overflow-hidden shadow-2xl ${
            isDarkMode ? 'bg-gray-800/90 border-gray-700' : 'bg-white/90 border-gray-200'
          } backdrop-blur-sm hover:shadow-3xl transition-all duration-500`}>
            <CardContent className="p-0">
              <div className="grid grid-cols-1 lg:grid-cols-2">
                {/* Speaker Image */}
                <div className="relative overflow-hidden">
                  <div className="speaker-image relative">
                    <img
                      src={currentSpeakers[currentSpeaker]?.image}
                      alt={currentSpeakers[currentSpeaker]?.name}
                      className="w-full h-96 lg:h-full object-cover transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    
                    {/* Play button overlay */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
                      <Button
                        size="lg"
                        onClick={handlePlayVideo}
                        className="rounded-full w-16 h-16 bg-white/20 backdrop-blur-sm hover:bg-white/30 border-2 border-white/50"
                      >
                        <Play className="w-6 h-6 text-white ml-1" />
                      </Button>
                    </div>

                    {/* Speaker achievement badge */}
                    <div className="absolute top-4 right-4">
                      <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                        isDarkMode ? 'bg-red-500/20 text-red-300' : 'bg-red-50 text-red-600'
                      } backdrop-blur-sm`}>
                        <Award className="w-3 h-3 inline mr-1" />
                        Featured Speaker
                      </div>
                    </div>
                  </div>
                </div>

                {/* Speaker Content */}
                <div className="speaker-content p-8 lg:p-12 flex flex-col justify-center">
                  <div className={`text-sm font-medium mb-3 tracking-wider uppercase`} 
                       style={{ color: colors.tedRed }}>
                    {currentSpeakers[currentSpeaker]?.title}
                  </div>
                  
                  <h3 className="text-3xl lg:text-4xl font-bold mb-6 leading-tight">
                    {currentSpeakers[currentSpeaker]?.name}
                  </h3>
                  
                  <p className={`text-base lg:text-lg leading-relaxed mb-8 ${
                    isDarkMode ? 'text-gray-300' : 'text-gray-600'
                  }`}>
                    {currentSpeakers[currentSpeaker]?.bio}
                  </p>

                  {/* Speaker quote */}
                  <div className={`speaker-quote p-6 rounded-2xl ${
                    isDarkMode ? 'bg-gray-700/50' : 'bg-gray-50'
                  } border-l-4`} style={{ borderLeftColor: colors.tedRed }}>
                    <Quote className={`w-6 h-6 mb-3 opacity-60`} style={{ color: colors.tedRed }} />
                    <p className={`text-sm italic ${
                      isDarkMode ? 'text-gray-300' : 'text-gray-600'
                    }`}>
                      "Innovation happens when we dare to question the status quo and imagine 
                      what's possible beyond conventional boundaries."
                    </p>
                  </div>

                  {/* Action buttons */}
                  <div className="flex flex-wrap gap-4 mt-8">
                    <Button
                      className="text-white font-semibold hover:scale-105 transition-transform duration-200"
                      style={{ backgroundColor: colors.tedRed }}
                    >
                      Watch Previous Talks
                      <ExternalLink className="w-4 h-4 ml-2" />
                    </Button>
                    <Button
                      variant="outline"
                      className={`${
                        isDarkMode ? 'border-red-500 text-red-400 hover:bg-red-500/10' : 'border-red-500 text-red-600 hover:bg-red-50'
                      }`}
                    >
                      Learn More
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Speaker navigation */}
          {currentSpeakers.length > 1 && (
            <div className="flex justify-center items-center gap-6 mt-8">
              <Button
                variant="outline"
                size="sm"
                onClick={prevSpeaker}
                className={`rounded-full w-10 h-10 p-0 ${
                  isDarkMode ? 'border-gray-600 hover:bg-gray-700' : 'border-gray-300 hover:bg-gray-50'
                }`}
              >
                <ChevronLeft className="w-4 h-4" />
              </Button>
              
              <div className="flex gap-2">
                {currentSpeakers.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSpeaker(index)}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      index === currentSpeaker
                        ? 'w-8'
                        : 'opacity-50 hover:opacity-75'
                    }`}
                    style={{ backgroundColor: colors.tedRed }}
                  />
                ))}
              </div>
              
              <Button
                variant="outline"
                size="sm"
                onClick={nextSpeaker}
                className={`rounded-full w-10 h-10 p-0 ${
                  isDarkMode ? 'border-gray-600 hover:bg-gray-700' : 'border-gray-300 hover:bg-gray-50'
                }`}
              >
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          )}
        </div>

        {/* Previous Speakers */}
        <div className="text-center mb-12">
          <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4">
            Our Legacy of{' '}
            <span style={{ color: colors.tedRed }}>Voices</span>
          </h3>
          <p className={`text-base lg:text-lg ${
            isDarkMode ? 'text-gray-400' : 'text-gray-600'
          } max-w-2xl mx-auto`}>
            Celebrating the remarkable individuals who have graced our stage with their wisdom and vision
          </p>
        </div>

        <div ref={previousRef} className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 lg:gap-8">
          {previousSpeakers.map((speaker, index) => (
            <div 
              key={index}
              className="previous-speaker-card group cursor-pointer"
            >
              <div className="relative mb-4">
                <div className="speaker-avatar relative overflow-hidden rounded-full aspect-square">
                  <img
                    src={speaker.image}
                    alt={speaker.name}
                    className="w-full h-full object-cover transition-all duration-500 group-hover:brightness-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-red-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                
                {/* Decorative ring */}
                <div 
                  className="absolute inset-0 rounded-full border-2 opacity-0 group-hover:opacity-100 transition-all duration-300 scale-110 group-hover:scale-105"
                  style={{ borderColor: colors.tedRed }}
                />
              </div>
              
              <div className="speaker-name-tag text-center">
                <h4 className={`font-semibold text-sm mb-1 transition-colors duration-300 ${
                  isDarkMode ? 'group-hover:text-red-400' : 'group-hover:text-red-600'
                }`}>
                  {speaker.name}
                </h4>
                <p className={`text-xs ${
                  isDarkMode ? 'text-gray-400' : 'text-gray-600'
                } group-hover:opacity-80 transition-opacity duration-300`}>
                  {speaker.title}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Call to action */}
        <div className="text-center mt-16">
          <div className={`inline-block p-8 rounded-3xl ${
            isDarkMode ? 'bg-gray-800/50' : 'bg-gray-50'
          } backdrop-blur-sm`}>
            <h4 className="text-xl font-bold mb-4">
              Want to be a speaker at{' '}
              <span style={{ color: colors.tedRed }}>TEDxCUSAT</span>?
            </h4>
            <p className={`text-sm ${
              isDarkMode ? 'text-gray-400' : 'text-gray-600'
            } mb-6 max-w-md mx-auto`}>
              Share your ideas worth spreading with our community
            </p>
            <Button
              className="text-white font-semibold hover:scale-105 transition-transform duration-200"
              style={{ backgroundColor: colors.tedRed }}
            >
              Apply to Speak
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SpeakersSection;