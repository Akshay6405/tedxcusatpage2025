'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { useTheme } from '@/components/common/ThemeProvider';
import { colors } from '@/data/content';

const Navigation: React.FC = () => {
  const { isDarkMode, setIsDarkMode } = useTheme();

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${isDarkMode ? 'bg-gray-900/95' : 'bg-white/95'
      } backdrop-blur-md border-b ${isDarkMode ? 'border-gray-800' : 'border-gray-200'
      }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-2">
            <div className="text-2xl font-bold">
              <span style={{ color: colors.tedRed }}>TEDx</span>
              <span className={isDarkMode ? 'text-white' : 'text-black'}>CUSAT</span>
            </div>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <button
              onClick={() => scrollToSection('about')}
              className={`hover:text-red-500 transition-colors ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}
            >
              About
            </button>
            <button
              onClick={() => scrollToSection('speakers')}
              className={`hover:text-red-500 transition-colors ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}
            >
              Speakers
            </button>
            <button
              onClick={() => scrollToSection('journey')}
              className={`hover:text-red-500 transition-colors ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}
            >
              Journey
            </button>
          </div>

          <div className="flex items-center space-x-4">
            <Button
              size="sm"
              className="hidden md:block text-white font-semibold hover:scale-105 transition-transform duration-200"
              style={{ backgroundColor: colors.tedRed }}
            >
              BOOK TICKETS
            </Button>
            <span className={`hidden md:inline text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              {isDarkMode ? 'Dark' : 'Light'}
            </span>
            <Switch
              checked={isDarkMode}
              onCheckedChange={setIsDarkMode}
              className="hidden md:inline data-[state=checked]:bg-red-600"
            />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;