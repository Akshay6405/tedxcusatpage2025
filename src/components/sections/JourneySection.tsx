'use client';

import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Calendar, 
  MapPin, 
  Users, 
  Play, 
  Award, 
  ChevronLeft, 
  ChevronRight,
  ExternalLink,
  Youtube,
  Image as ImageIcon,
  Clock,
  Lightbulb
} from 'lucide-react';

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface JourneyEvent {
  id: number;
  title: string;
  date: string;
  number: string;
  description: string;
  image: string;
  highlights: string[];
  speakers?: string[];
  theme: string;
  attendance?: number;
  videoUrl?: string;
  galleryImages?: string[];
  keyTakeaways: string[];
}

interface JourneySectionProps {
  isDarkMode: boolean;
}

const JourneySection: React.FC<JourneySectionProps> = ({ isDarkMode }) => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const [selectedEvent, setSelectedEvent] = useState<number | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // TEDx brand colors
  const colors = {
    tedRed: '#E62B1E',
    darkBg: '#1a1a1a',
    lightBg: '#ffffff',
    accent: '#FF6B6B'
  };

  // Enhanced journey events with more details
  const journeyEvents: JourneyEvent[] = [
    {
      id: 1,
      title: "UN-QUINTESSENTIAL",
      date: "15-05-2020",
      number: "#1",
      theme: "Celebrating Imperfection",
      description: "The inaugural TEDxCUSAT celebrated imperfection and shared humanity, featuring prominent speakers like Dr. M.R. Rajagopal and S. Somnath. This groundbreaking event laid the foundation for TEDxCUSAT's mission to push boundaries and inspire transformative ideas.",
      image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=600&fit=crop",
      highlights: [
        "First-ever TEDx event at CUSAT",
        "Featured in The Times of India",
        "Virtual event during pandemic",
        "12+ inspiring speakers"
      ],
      speakers: ["Dr. M.R. Rajagopal", "S. Somnath", "Rajeev Alunkal"],
      attendance: 500,
      videoUrl: "https://youtube.com/watch?v=example1",
      galleryImages: [
        "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400&h=300&fit=crop",
        "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=300&fit=crop",
        "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=400&h=300&fit=crop"
      ],
      keyTakeaways: [
        "Embracing vulnerability as strength",
        "The power of authentic storytelling",
        "Building community through shared experiences"
      ]
    },
    {
      id: 2,
      title: "PAUSE. RESET. RESTART.",
      date: "05-04-2021",
      number: "#2",
      theme: "Reflection & Renewal",
      description: "In a moment of global reflection after the COVID-19 pandemic, TEDxCUSAT brought together diverse voices to share visions for a better future. The event provided a platform for introspection and rebuilding with renewed purpose.",
      image: "https://images.unsplash.com/photo-1531058020387-3be344556be6?w=800&h=600&fit=crop",
      highlights: [
        "Post-pandemic reflection theme",
        "Focus on mental health",
        "Innovative virtual format",
        "10+ thought leaders"
      ],
      speakers: ["Dr. Santhosh Babu", "Nimisha Sajayan", "Tovino Thomas"],
      attendance: 750,
      videoUrl: "https://youtube.com/watch?v=example2",
      galleryImages: [
        "https://images.unsplash.com/photo-1531058020387-3be344556be6?w=400&h=300&fit=crop",
        "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?w=400&h=300&fit=crop",
        "https://images.unsplash.com/photo-1556761175-b413da4baf72?w=400&h=300&fit=crop"
      ],
      keyTakeaways: [
        "Resilience in times of crisis",
        "The importance of mental wellness",
        "Innovation through constraint"
      ]
    },
    {
      id: 3,
      title: "TRANSCENDENCE: Beyond All Bounds",
      date: "05-04-2022",
      number: "#3",
      theme: "Breaking Barriers",
      description: "Explored stories of transcending limits and venturing into uncharted territories. The event encouraged the audience to aspire for greatness and embrace extraordinary possibilities through powerful narratives.",
      image: "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?w=800&h=600&fit=crop",
      highlights: [
        "Return to hybrid format",
        "Focus on limitless potential",
        "Interactive workshops",
        "15+ diverse speakers"
      ],
      speakers: ["Benyamin", "Rima Kallingal", "Fahadh Faasil"],
      attendance: 1000,
      videoUrl: "https://youtube.com/watch?v=example3",
      galleryImages: [
        "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?w=400&h=300&fit=crop",
        "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400&h=300&fit=crop",
        "https://images.unsplash.com/photo-1556761175-b413da4baf72?w=400&h=300&fit=crop"
      ],
      keyTakeaways: [
        "Pushing beyond comfort zones",
        "The art of creative expression",
        "Leadership through authenticity"
      ]
    },
    {
      id: 4,
      title: "DIVERGENCE: Reframing Radical",
      date: "19-11-2023",
      number: "#4",
      theme: "Revolutionary Perspectives",
      description: "The most recent event explored fresh perspectives on life, innovation, and change. Thought leaders who challenge traditional norms took the stage, inspiring transformative thinking and motivating attendees to embrace change.",
      image: "https://images.unsplash.com/photo-1556761175-b413da4baf72?w=800&h=600&fit=crop",
      highlights: [
        "Largest attendance yet",
        "Multi-track sessions",
        "Student speaker spotlight",
        "20+ industry leaders"
      ],
      speakers: ["Shariq Shamsudeen", "Suresh Pillai", "Divya S Iyer"],
      attendance: 1200,
      videoUrl: "https://youtube.com/watch?v=example4",
      galleryImages: [
        "https://images.unsplash.com/photo-1556761175-b413da4baf72?w=400&h=300&fit=crop",
        "https://images.unsplash.com/photo-1531058020387-3be344556be6?w=400&h=300&fit=crop",
        "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?w=400&h=300&fit=crop"
      ],
      keyTakeaways: [
        "Challenging conventional wisdom",
        "The power of diverse perspectives",
        "Innovation through disruption"
      ]
    }
  ];

  // GSAP Animations
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const ctx = gsap.context(() => {
      // Title animation
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

      // Timeline events animation
      const timelineItems = timelineRef.current?.querySelectorAll('.timeline-item');
      
      timelineItems?.forEach((item, index) => {
        gsap.fromTo(item,
          {
            opacity: 0,
            x: index % 2 === 0 ? -100 : 100,
            scale: 0.8
          },
          {
            opacity: 1,
            x: 0,
            scale: 1,
            duration: 0.8,
            delay: index * 0.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: item,
              start: "top 85%",
              end: "bottom 15%",
              toggleActions: "play none none reverse"
            }
          }
        );

        // Add hover animations
        const hoverTl = gsap.timeline({ paused: true });
        hoverTl.to(item, {
          scale: 1.05,
          duration: 0.3,
          ease: "power2.out"
        });

        item.addEventListener('mouseenter', () => hoverTl.play());
        item.addEventListener('mouseleave', () => hoverTl.reverse());
      });

      // Stagger animation for event cards
      gsap.fromTo('.event-highlight',
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.1,
          scrollTrigger: {
            trigger: '.event-highlights',
            start: "top 80%",
            toggleActions: "play none none reverse"
          }
        }
      );

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const openEventModal = (eventId: number) => {
    setSelectedEvent(eventId);
    setCurrentImageIndex(0);
    // Add modal animation
    gsap.fromTo('.modal-content', 
      { opacity: 0, scale: 0.8, y: 50 },
      { opacity: 1, scale: 1, y: 0, duration: 0.4, ease: "power3.out" }
    );
  };

  const closeEventModal = () => {
    gsap.to('.modal-content', {
      opacity: 0,
      scale: 0.8,
      y: 50,
      duration: 0.3,
      ease: "power3.in",
      onComplete: () => setSelectedEvent(null)
    });
  };

  const nextImage = () => {
    const event = journeyEvents.find(e => e.id === selectedEvent);
    if (event?.galleryImages) {
      setCurrentImageIndex((prev) => 
        (prev + 1) % event.galleryImages!.length
      );
    }
  };

  const prevImage = () => {
    const event = journeyEvents.find(e => e.id === selectedEvent);
    if (event?.galleryImages) {
      setCurrentImageIndex((prev) => 
        prev === 0 ? event.galleryImages!.length - 1 : prev - 1
      );
    }
  };

  const selectedEventData = journeyEvents.find(e => e.id === selectedEvent);

  return (
    <>
      <section 
        ref={sectionRef}
        id="journey"
        className={`py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden ${
          isDarkMode ? 'bg-gray-900' : 'bg-gray-50'
        }`}
        aria-label="TEDxCUSAT Journey Timeline"
      >
        {/* Background decorative elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className={`absolute top-20 -left-20 w-40 h-40 rounded-full ${
            isDarkMode ? 'bg-red-500/5' : 'bg-red-500/10'
          } blur-3xl`} />
          <div className={`absolute bottom-20 -right-20 w-60 h-60 rounded-full ${
            isDarkMode ? 'bg-red-500/5' : 'bg-red-500/10'
          } blur-3xl`} />
        </div>

        <div className="max-w-7xl mx-auto relative">
          {/* Section Header */}
          <div ref={titleRef} className="text-center mb-20">
            <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium mb-6 ${
              isDarkMode ? 'bg-red-500/20 text-red-300' : 'bg-red-50 text-red-600'
            }`}>
              <Clock className="w-4 h-4" />
              Our Journey
            </div>
            
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
              A Legacy of <span style={{ color: colors.tedRed }}>Ideas</span>
            </h2>
            
            <p className={`text-lg sm:text-xl max-w-3xl mx-auto leading-relaxed ${
              isDarkMode ? 'text-gray-300' : 'text-gray-600'
            }`}>
              From our first groundbreaking event to the present, explore the evolution of TEDxCUSAT 
              and the transformative ideas that have shaped our community over the years.
            </p>

            {/* Journey Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12 max-w-4xl mx-auto">
              {[
                { number: "5+", label: "Events", icon: Calendar },
                { number: "60+", label: "Speakers", icon: Users },
                { number: "3.5K+", label: "Attendees", icon: MapPin },
                { number: "100+", label: "Ideas Shared", icon: Lightbulb }
              ].map((stat, index) => (
                <div 
                  key={index} 
                  className={`p-6 rounded-2xl ${
                    isDarkMode ? 'bg-gray-800/50' : 'bg-white/80'
                  } backdrop-blur-sm border ${
                    isDarkMode ? 'border-gray-700/50' : 'border-gray-200/50'
                  } hover:scale-105 transition-all duration-300`}
                >
                  <stat.icon 
                    className="w-8 h-8 mx-auto mb-3" 
                    style={{ color: colors.tedRed }} 
                  />
                  <div className="text-2xl font-bold mb-1" style={{ color: colors.tedRed }}>
                    {stat.number}
                  </div>
                  <div className={`text-sm ${
                    isDarkMode ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Timeline */}
          <div ref={timelineRef} className="relative">
            {/* Timeline line */}
            <div className={`absolute left-1/2 top-0 bottom-0 w-1 ${
              isDarkMode ? 'bg-gray-700' : 'bg-gray-300'
            } transform -translate-x-1/2 hidden lg:block`} />

            <div className="space-y-16">
              {journeyEvents.map((event, index) => (
                <div 
                  key={event.id}
                  className={`timeline-item flex flex-col lg:flex-row items-center gap-8 ${
                    index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
                  }`}
                >
                  {/* Timeline dot */}
                  <div className={`hidden lg:block absolute left-1/2 w-6 h-6 rounded-full border-4 ${
                    isDarkMode ? 'bg-gray-900 border-red-500' : 'bg-white border-red-500'
                  } transform -translate-x-1/2 z-10`} />

                  {/* Event Image */}
                  <div className="flex-1 relative group">
                    <div className="relative overflow-hidden rounded-3xl shadow-2xl">
                      <img
                        src={event.image}
                        alt={`${event.title} event`}
                        className="w-full h-64 lg:h-80 object-cover transition-transform duration-500 group-hover:scale-110"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                      
                      {/* Event number overlay */}
                      <div 
                        className="absolute top-6 left-6 text-4xl font-bold px-4 py-2 rounded-xl backdrop-blur-sm"
                        style={{ 
                          backgroundColor: `${colors.tedRed}90`,
                          color: 'white'
                        }}
                      >
                        {event.number}
                      </div>

                      {/* View details button */}
                      <button
                        onClick={() => openEventModal(event.id)}
                        className="absolute bottom-6 right-6 p-3 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-all duration-300 hover:scale-110"
                        aria-label={`View details for ${event.title}`}
                      >
                        <ExternalLink className="w-5 h-5 text-white" />
                      </button>
                    </div>
                  </div>

                  {/* Event Content */}
                  <div className="flex-1 space-y-6">
                    <div className="space-y-4">
                      <div className="flex items-center gap-4 flex-wrap">
                        <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                          isDarkMode ? 'bg-red-500/20 text-red-300' : 'bg-red-50 text-red-600'
                        }`}>
                          {event.date}
                        </div>
                        <div className={`px-3 py-1 rounded-full text-sm ${
                          isDarkMode ? 'bg-gray-800 text-gray-300' : 'bg-gray-100 text-gray-600'
                        }`}>
                          {event.theme}
                        </div>
                      </div>
                      
                      <h3 className="text-3xl lg:text-4xl font-bold leading-tight">
                        {event.title}
                      </h3>
                      
                      <p className={`text-lg leading-relaxed ${
                        isDarkMode ? 'text-gray-300' : 'text-gray-600'
                      }`}>
                        {event.description}
                      </p>
                    </div>

                    {/* Event highlights */}
                    <div className="event-highlights space-y-2">
                      {event.highlights.map((highlight, idx) => (
                        <div 
                          key={idx}
                          className={`event-highlight flex items-center gap-3 text-sm ${
                            isDarkMode ? 'text-gray-400' : 'text-gray-600'
                          }`}
                        >
                          <div 
                            className="w-2 h-2 rounded-full flex-shrink-0"
                            style={{ backgroundColor: colors.tedRed }}
                          />
                          {highlight}
                        </div>
                      ))}
                    </div>

                    {/* Action buttons */}
                    <div className="flex flex-wrap gap-4">
                      <Button
                        onClick={() => openEventModal(event.id)}
                        size="lg"
                        className="text-white font-semibold hover:scale-105 transition-transform duration-200"
                        style={{ backgroundColor: colors.tedRed }}
                      >
                        <ImageIcon className="w-4 h-4 mr-2" />
                        View Gallery
                      </Button>
                      
                      {event.videoUrl && (
                        <Button
                          variant="outline"
                          size="lg"
                          className={`font-semibold hover:scale-105 transition-transform duration-200 ${
                            isDarkMode 
                              ? 'border-red-500 text-red-400 hover:bg-red-500/10' 
                              : 'border-red-500 text-red-600 hover:bg-red-50'
                          }`}
                          onClick={() => window.open(event.videoUrl, '_blank')}
                        >
                          <Youtube className="w-4 h-4 mr-2" />
                          Watch Talks
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Event Modal */}
      {selectedEvent && selectedEventData && (
        <div 
          className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={closeEventModal}
        >
          <div 
            className={`modal-content max-w-6xl w-full max-h-[90vh] overflow-y-auto rounded-3xl ${
              isDarkMode ? 'bg-gray-900' : 'bg-white'
            } shadow-2xl`}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="relative">
              {selectedEventData.galleryImages && (
                <div className="relative h-64 md:h-80">
                  <img
                    src={selectedEventData.galleryImages[currentImageIndex]}
                    alt={`${selectedEventData.title} gallery image ${currentImageIndex + 1}`}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  
                  {/* Gallery navigation */}
                  {selectedEventData.galleryImages.length > 1 && (
                    <>
                      <button
                        onClick={prevImage}
                        className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-all"
                        aria-label="Previous image"
                      >
                        <ChevronLeft className="w-6 h-6 text-white" />
                      </button>
                      <button
                        onClick={nextImage}
                        className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-all"
                        aria-label="Next image"
                      >
                        <ChevronRight className="w-6 h-6 text-white" />
                      </button>
                      
                      {/* Image indicators */}
                      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                        {selectedEventData.galleryImages.map((_, idx) => (
                          <button
                            key={idx}
                            onClick={() => setCurrentImageIndex(idx)}
                            className={`w-2 h-2 rounded-full transition-all ${
                              idx === currentImageIndex ? 'bg-white' : 'bg-white/50'
                            }`}
                            aria-label={`View image ${idx + 1}`}
                          />
                        ))}
                      </div>
                    </>
                  )}
                  
                  {/* Close button */}
                  <button
                    onClick={closeEventModal}
                    className="absolute top-4 right-4 p-2 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-all"
                    aria-label="Close modal"
                  >
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              )}
            </div>

            {/* Modal Content */}
            <div className="p-6 md:p-8 space-y-8">
              {/* Event title and info */}
              <div className="space-y-4">
                <div className="flex items-center gap-4 flex-wrap">
                  <div 
                    className="text-3xl font-bold px-4 py-2 rounded-xl"
                    style={{ 
                      backgroundColor: `${colors.tedRed}20`,
                      color: colors.tedRed 
                    }}
                  >
                    {selectedEventData.number}
                  </div>
                  <div className={`px-3 py-1 rounded-full text-sm ${
                    isDarkMode ? 'bg-gray-800 text-gray-300' : 'bg-gray-100 text-gray-600'
                  }`}>
                    {selectedEventData.date}
                  </div>
                  {selectedEventData.attendance && (
                    <div className={`px-3 py-1 rounded-full text-sm ${
                      isDarkMode ? 'bg-gray-800 text-gray-300' : 'bg-gray-100 text-gray-600'
                    }`}>
                      {selectedEventData.attendance} attendees
                    </div>
                  )}
                </div>
                
                <h3 className="text-3xl md:text-4xl font-bold">
                  {selectedEventData.title}
                </h3>
                
                <p className={`text-lg leading-relaxed ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-600'
                }`}>
                  {selectedEventData.description}
                </p>
              </div>

              {/* Key takeaways */}
              <div className="space-y-4">
                <h4 className="text-xl font-semibold flex items-center gap-2">
                  <Lightbulb className="w-5 h-5" style={{ color: colors.tedRed }} />
                  Key Takeaways
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {selectedEventData.keyTakeaways.map((takeaway, idx) => (
                    <div 
                      key={idx}
                      className={`p-4 rounded-xl ${
                        isDarkMode ? 'bg-gray-800/50' : 'bg-gray-50'
                      } border ${
                        isDarkMode ? 'border-gray-700/50' : 'border-gray-200/50'
                      }`}
                    >
                      <div className={`text-sm ${
                        isDarkMode ? 'text-gray-300' : 'text-gray-600'
                      }`}>
                        {takeaway}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Speakers */}
              {selectedEventData.speakers && (
                <div className="space-y-4">
                  <h4 className="text-xl font-semibold flex items-center gap-2">
                    <Users className="w-5 h-5" style={{ color: colors.tedRed }} />
                    Featured Speakers
                  </h4>
                  <div className="flex flex-wrap gap-3">
                    {selectedEventData.speakers.map((speaker, idx) => (
                      <div 
                        key={idx}
                        className={`px-4 py-2 rounded-full ${
                          isDarkMode ? 'bg-gray-800 text-gray-300' : 'bg-gray-100 text-gray-700'
                        }`}
                      >
                        {speaker}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Action buttons */}
              <div className="flex flex-wrap gap-4 pt-4">
                {selectedEventData.videoUrl && (
                  <Button
                    size="lg"
                    className="text-white font-semibold"
                    style={{ backgroundColor: colors.tedRed }}
                    onClick={() => window.open(selectedEventData.videoUrl, '_blank')}
                  >
                    <Youtube className="w-4 h-4 mr-2" />
                    Watch Event
                  </Button>
                )}
                <Button
                  variant="outline"
                  size="lg"
                  onClick={closeEventModal}
                  className={`${
                    isDarkMode 
                      ? 'border-gray-600 text-gray-300 hover:bg-gray-800' 
                      : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  Close
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default JourneySection;