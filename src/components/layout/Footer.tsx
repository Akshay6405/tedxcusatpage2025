'use client';

import React from 'react';
import { useTheme } from '@/components/common/ThemeProvider';
import { colors } from '@/data/content';

const Footer: React.FC = () => {
  const { isDarkMode } = useTheme();

  return (
    <footer className={`py-12 px-4 sm:px-6 lg:px-8 ${
      isDarkMode ? 'bg-gray-900 border-t border-gray-800' : 'bg-white border-t border-gray-200'
    }`}>
      <div className="max-w-7xl mx-auto text-center">
        <div className="mb-8">
          <div className="text-3xl font-bold mb-2">
            <span style={{ color: colors.tedRed }}>TEDx</span>
            <span className={isDarkMode ? 'text-white' : 'text-black'}>CUSAT</span>
          </div>
          <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            Ideas Worth Spreading
          </p>
        </div>
        
        <div className={`text-sm ${isDarkMode ? 'text-gray-500' : 'text-gray-500'}`}>
          <p>© 2025 TEDxCUSAT. This independent TEDx event is operated under license from TED.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;