import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { Quote, Award, ChevronLeft, ChevronRight } from 'lucide-react';

// ==========================================
// 1. Types & Interfaces
// ==========================================

export interface TestimonialTheme {
  accentColor: string;
  accentBg: string;
  borderAccent: string;
  badgeBg: string;
  badgeText: string;
}

export interface EsportsTestimonialItem {
  id: string | number;
  imageName: string;
  imageAlt?: string;
  teamName: string;
  roleOrTagline?: string;
  thoughts: string;
  achievementsOfTeam: string;
  theme?: TestimonialTheme;
}

export interface EsportsTestimonialsProps {
  data?: EsportsTestimonialItem[];
  autoSlideInterval?: number;
  className?: string;
}

const DEFAULT_TESTIMONIALS: EsportsTestimonialItem[] = [
  {
    id: 'buriram-united',
    imageName: '/homepage/burriram_united.png',
    imageAlt: 'Buriram United Esports Team Roster',
    teamName: 'Buriram United Esports',
    roleOrTagline: 'Free Fire World Champions',
    thoughts:
      "Esports was the Game changer for me and our teams as well. we were spending alot of times while playing the game now we are earning money and representing our coutntry which is a best Part of it",
    achievementsOfTeam: '2x Regional Champions • Free Fire Pro League Winner 2025 • Over $150K Earned in ArenaForage Tournaments',
    theme: {
      accentColor: '#D97706',
      accentBg: 'rgba(217, 119, 6, 0.12)',
      borderAccent: 'rgba(217, 119, 6, 0.35)',
      badgeBg: '#D97706',
      badgeText: '#000000',
    },
  },
  {
    id: 'total-gaming',
    imageName: '/homepage/total_gaming_background_image.jpg',
    imageAlt: 'Total Gaming Esports Player Showcase',
    teamName: 'Total Gaming Esports',
    roleOrTagline: 'Free Fire Squads',
    thoughts:
      "Competing against top-tier talent on a platform that guarantees fair play and anti-cheat reliability is everything to a professional squad. ArenaForage is setting the new industry benchmark.",
    achievementsOfTeam: 'PMGC Global Finalists • 5x National Qualifiers • ArenaForage Winter Series Defending Champions',
    theme: {
      accentColor: '#2563EB',
      accentBg: 'rgba(37, 99, 235, 0.12)',
      borderAccent: 'rgba(37, 99, 235, 0.35)',
      badgeBg: '#2563EB',
      badgeText: '#FFFFFF',
    },
  }
];

const DEFAULT_THEME: TestimonialTheme = {
  accentColor: '#D97706',
  accentBg: 'rgba(217, 119, 6, 0.12)',
  borderAccent: 'rgba(217, 119, 6, 0.3)',
  badgeBg: '#D97706',
  badgeText: '#000000',
};

export const EsportsTestimonials: React.FC<EsportsTestimonialsProps> = ({
  data = DEFAULT_TESTIMONIALS,
  autoSlideInterval = 3500,
  className = '',
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [slideDirection, setSlideDirection] = useState<'next' | 'prev'>('next');
  const [isPaused, setIsPaused] = useState(false);

  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const currentItem = useMemo(() => {
    return data[currentIndex] || data[0];
  }, [data, currentIndex]);

  const activeTheme = currentItem.theme || DEFAULT_THEME;

  const handleNext = useCallback(() => {
    if (isAnimating || data.length <= 1) return;
    setIsAnimating(true);
    setSlideDirection('next');
    setCurrentIndex((prev) => (prev + 1) % data.length);
  }, [isAnimating, data.length]);

  const handlePrev = useCallback(() => {
    if (isAnimating || data.length <= 1) return;
    setIsAnimating(true);
    setSlideDirection('prev');
    setCurrentIndex((prev) => (prev - 1 + data.length) % data.length);
  }, [isAnimating, data.length]);

  const handleDotClick = (index: number) => {
    if (isAnimating || index === currentIndex) return;
    setIsAnimating(true);
    setSlideDirection(index > currentIndex ? 'next' : 'prev');
    setCurrentIndex(index);
  };

  useEffect(() => {
    const animationTimer = setTimeout(() => {
      setIsAnimating(false);
    }, 500);

    return () => clearTimeout(animationTimer);
  }, [currentIndex]);

  useEffect(() => {
    if (isPaused || data.length <= 1) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }

    timerRef.current = setInterval(() => {
      handleNext();
    }, autoSlideInterval);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPaused, autoSlideInterval, handleNext, data.length]);

  if (!data || data.length === 0) return null;

  return (
    <section
      /* Replaced max-w-[1400px] & px-4 with full 100% width (w-full) */
      className={`w-full py-8 sm:py-12 ${className}`}
      aria-label="Esports Testimonials Showcase"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Container Box: Stretches full-width without side margins or border radius restricting it */}
      <div
        className="relative w-full bg-[#0F0F11]/90 border-y transition-colors duration-500 shadow-2xl overflow-hidden backdrop-blur-xl"
        style={{ borderColor: activeTheme.borderAccent }}
      >
        {/* Background Ambient Glows */}
        <div
          className="absolute -top-32 -left-32 w-96 h-96 rounded-full blur-3xl pointer-events-none transition-all duration-700 opacity-20"
          style={{ backgroundColor: activeTheme.accentColor }}
          aria-hidden="true"
        />
        <div
          className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full blur-3xl pointer-events-none transition-all duration-700 opacity-15"
          style={{ backgroundColor: activeTheme.accentColor }}
          aria-hidden="true"
        />

        {/* 50 / 50 Grid Layout extending edge to edge */}
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 items-center w-full min-h-[520px] lg:min-h-[580px] px-6 sm:px-12 lg:px-16 py-6">
          
          {/* LEFT SECTION: Image Presentation */}
          <div className="relative w-full h-[320px] sm:h-[420px] lg:h-full min-h-[320px] p-2 sm:p-4 flex items-center justify-center overflow-hidden">
            <div className="relative w-full h-full rounded-xl sm:rounded-2xl overflow-hidden shadow-xl bg-black/40 border border-white/10 flex items-center justify-center">
              <div
                key={`img-${currentItem.id}`}
                className={`relative w-full h-full flex items-center justify-center transition-all duration-500 ease-out transform ${
                  isAnimating
                    ? slideDirection === 'next'
                      ? 'opacity-0 -translate-x-6 scale-95'
                      : 'opacity-0 translate-x-6 scale-95'
                    : 'opacity-100 translate-x-0 scale-100'
                }`}
              >
                <img
                  src={currentItem.imageName}
                  alt={currentItem.imageAlt || `${currentItem.teamName} Showcase`}
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                  loading="lazy"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />

                {currentItem.roleOrTagline && (
                  <div
                    className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6 px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-black tracking-wider uppercase shadow-md transition-colors duration-500"
                    style={{
                      backgroundColor: activeTheme.badgeBg,
                      color: activeTheme.badgeText,
                    }}
                  >
                    {currentItem.roleOrTagline}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* RIGHT SECTION: Team Information & Story */}
          <div className="relative w-full p-4 sm:p-8 lg:p-12 flex flex-col justify-between h-full">
            <div
              key={`content-${currentItem.id}`}
              className={`space-y-6 sm:space-y-8 transition-all duration-500 ease-out transform ${
                isAnimating
                  ? slideDirection === 'next'
                    ? 'opacity-0 translate-x-8'
                    : 'opacity-0 -translate-x-8'
                  : 'opacity-100 translate-x-0'
              }`}
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <span
                    className="text-xs sm:text-sm font-extrabold uppercase tracking-widest block mb-1 transition-colors duration-500"
                    style={{ color: activeTheme.accentColor }}
                  >
                    Featured Esports Squad
                  </span>
                  <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight uppercase leading-tight">
                    {currentItem.teamName}
                  </h2>
                </div>

                <div
                  className="p-3 sm:p-4 rounded-xl backdrop-blur-md border transition-all duration-500 shrink-0"
                  style={{
                    backgroundColor: activeTheme.accentBg,
                    borderColor: activeTheme.borderAccent,
                  }}
                >
                  <Quote
                    className="w-6 h-6 sm:w-8 sm:h-8 transition-colors duration-500"
                    style={{ color: activeTheme.accentColor }}
                  />
                </div>
              </div>

              <div className="w-full h-px bg-gradient-to-r from-white/20 via-white/10 to-transparent" />

              <blockquote className="text-base sm:text-lg lg:text-xl text-neutral-200 font-medium leading-relaxed sm:leading-loose italic">
                "{currentItem.thoughts}"
              </blockquote>

              <div className="space-y-2 pt-2">
                <div className="flex items-center gap-2">
                  <Award
                    className="w-5 h-5 shrink-0 transition-colors duration-500"
                    style={{ color: activeTheme.accentColor }}
                  />
                  <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-neutral-400">
                    Key Achievements
                  </span>
                </div>
                <p className="text-sm sm:text-base font-semibold text-neutral-300 leading-normal pl-7">
                  {currentItem.achievementsOfTeam}
                </p>
              </div>
            </div>

            {/* Controls */}
            <div className="pt-8 sm:pt-10 flex items-center justify-between border-t border-white/10 mt-6 sm:mt-8">
              <div className="flex items-center gap-2">
                {data.map((item, idx) => (
                  <button
                    key={item.id}
                    onClick={() => handleDotClick(idx)}
                    aria-label={`Go to slide ${idx + 1}`}
                    className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                      idx === currentIndex ? 'w-8' : 'w-2.5 bg-white/20 hover:bg-white/40'
                    }`}
                    style={{
                      backgroundColor: idx === currentIndex ? activeTheme.accentColor : undefined,
                    }}
                  />
                ))}
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={handlePrev}
                  disabled={isAnimating}
                  aria-label="Previous Testimonial"
                  className="p-2.5 sm:p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white transition-all duration-200 active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={handleNext}
                  disabled={isAnimating}
                  aria-label="Next Testimonial"
                  className="p-2.5 sm:p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white transition-all duration-200 active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};

export default EsportsTestimonials;