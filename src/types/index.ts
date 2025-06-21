export interface Speaker {
    id: number;
    name: string;
    title: string;
    image: string;
    bio: string;
  }
  
  export interface PreviousSpeaker {
    name: string;
    title: string;
    image: string;
  }
  
  export interface JourneyEvent {
    id: number;
    title: string;
    date: string;
    number: string;
    description: string;
    image: string;
  }
  
  export interface Stat {
    number: string;
    label: string;
    icon: React.ComponentType<{ className?: string }>;
  }
  
  export interface ThemeContextType {
    isDarkMode: boolean;
    setIsDarkMode: (value: boolean) => void;
  }
  
  export interface Colors {
    tedRed: string;
    darkBg: string;
    lightBg: string;
    accent: string;
  }