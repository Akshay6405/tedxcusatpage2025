"use client";

import HeroSection from "@/components/sections/HeroSection";
import AboutSection from "@/components/sections/AboutSection";
import SpeakersSection from "@/components/sections/SpeakersSection";
import JourneySection from "@/components/sections/JourneySection";
import AnimationWrapper from "@/components/common/AnimationWrapper";
import { currentSpeakers, previousSpeakers } from "@/data/content";
import { useTheme } from "@/components/common/ThemeProvider";

export default function Home() {
  const { isDarkMode } = useTheme();

  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <AnimationWrapper
        animation={{
          type: 'fadeInUp',
          duration: 1.2,
          delay: 0.2
        }}
      >
        <HeroSection />
      </AnimationWrapper>

      {/* About Section */}
      <AnimationWrapper
        animation={{
          type: 'fadeInLeft',
          duration: 1,
          delay: 0.1
        }}
      >
        <AboutSection />
      </AnimationWrapper>

      {/* Speakers Section */}
      <AnimationWrapper
        animation={{
          type: 'staggerFadeIn',
          duration: 0.8,
          stagger: 0.15
        }}
      >
        <SpeakersSection
          currentSpeakers={currentSpeakers}
          previousSpeakers={previousSpeakers}
          isDarkMode={isDarkMode}
        />
      </AnimationWrapper>

      {/* Journey Section */}
      <AnimationWrapper
        animation={{
          type: 'scaleIn',
          duration: 1,
          ease: 'back.out(1.4)'
        }}
      >
        <JourneySection isDarkMode={isDarkMode} />
      </AnimationWrapper>
    </div>
  );
}