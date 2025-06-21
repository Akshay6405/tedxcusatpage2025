import { Calendar, MapPin, Users, Heart, Target } from 'lucide-react';
import { Speaker, PreviousSpeaker, JourneyEvent, Stat } from '@/types';

export const colors = {
  tedRed: '#E62B1E',
  darkBg: '#1a1a1a',
  lightBg: '#ffffff',
  accent: '#FF6B6B'
};

export const currentSpeakers: Speaker[] = [
  {
    id: 1,
    name: "Anantharaman Ajay",
    title: "Video Creator",
    image: "https://image.tmdb.org/t/p/original/xaa2mIc1oW9eN6bPtCY1qPC5T6B.jpg",
    bio: "A BITS Pilani alumnus who has made waves as both a popular YouTuber and a talented actor in the Malayalam film industry. His YouTube channel, known for insightful content on technology, lifestyle, and social issues, has garnered a significant following. As an actor, Ajay has impressed audiences with performances in films like 'Romancham' (2023)."
  }
];

export const previousSpeakers: PreviousSpeaker[] = [
  {
    name: "Akram Feroze",
    title: "Traveller",
    image: "https://images.crunchbase.com/image/upload/c_thumb,h_256,w_256,f_auto,g_face,z_0.7,q_auto:eco,dpr_1/v1449552830/p0mub6uduibw2g8bvb26.png"
  },
  {
    name: "Manish Advani",
    title: "Storyteller",
    image: "https://etimg.etb2bimg.com/photo/89892099.cms"
  },
  {
    name: "Mahesh Zagade",
    title: "IAS Officer",
    image: "https://cdn.dnaindia.com/sites/default/files/1925622.jpg?im=FitAndFill=(1200,900)"
  },
  {
    name: "Kaushiki Chakraborty",
    title: "Musician",
    image: "https://aliakbarkhan.com/wp-content/uploads/2022/04/DSC_0839.jpg"
  },
  {
    name: "Mohammed Dilawar",
    title: "Environmentalist",
    image: "https://i1.rgstatic.net/ii/profile.image/272168596537381-1441901458797_Q512/Mohammed-Dilawar.jpg"
  },
  {
    name: "Major Ravi",
    title: "Filmmaker",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRJ2JYp8HwuaEqm12e0-DwsUOih-2ExWHrKsw&s"
  }
];

export const journeyEvents: JourneyEvent[] = [
  {
    id: 1,
    title: "UN-QUINTESSENTIAL",
    date: "15-05-2020",
    number: "#1",
    description: "The first TEDxCUSAT celebrated imperfection and shared humanity, featuring prominent speakers like Dr. M.R. Rajagopal and S. Somnath. Highlighted in The Times of India, the event laid a strong foundation for TEDxCUSAT's mission to push boundaries and inspire transformative ideas.",
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&h=400&fit=crop"
  },
  {
    id: 2,
    title: "PAUSE. RESET. RESTART.",
    date: "05-04-2021",
    number: "#2",
    description: "In a moment of reflection and rejuvenation after the challenges of the COVID-19 pandemic, TEDxCUSAT brought together diverse voices to share visions for a better future. The event provided a platform for introspection, inspiring attendees to rebuild with renewed ambition.",
    image: "https://images.unsplash.com/photo-1531058020387-3be344556be6?w=600&h=400&fit=crop"
  },
  {
    id: 3,
    title: "TRANSCENDENCE: Beyond All Bounds",
    date: "05-04-2022",
    number: "#3",
    description: "Explored stories of surpassing limits and venturing into uncharted territories. The event encouraged the audience to aspire for greatness and embrace extraordinary possibilities through powerful narratives, inspiring them to break barriers and reach new heights.",
    image: "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?w=600&h=400&fit=crop"
  },
  {
    id: 4,
    title: "DIVERGENCE: Reframing Radical",
    date: "19-11-2023",
    number: "#4",
    description: "The event explored fresh perspectives on life, innovation, and change. Thought leaders who challenge traditional norms and inspire transformative thinking took the stage, motivating attendees to adopt new viewpoints and embrace change as a catalyst for progress.",
    image: "https://images.unsplash.com/photo-1556761175-b413da4baf72?w=600&h=400&fit=crop"
  }
];

export const stats: Stat[] = [
  { number: "5+", label: "EVENTS", icon: Calendar },
  { number: "25+", label: "SPEAKERS", icon: Users },
  { number: "50+", label: "ACTIVE MEMBERS", icon: Heart },
  { number: "1000+", label: "COMMUNITY MEMBERS", icon: Target }
];