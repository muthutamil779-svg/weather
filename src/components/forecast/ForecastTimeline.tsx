import React, { useRef } from 'react';
import { TimelineForecast } from '../../types/forecast';
import { DayForecastCard } from './DayForecastCard';
import { ChevronLeft, ChevronRight, CalendarClock } from 'lucide-react';

interface ForecastTimelineProps {
  timeline: TimelineForecast[];
  selectedDay: number;
  onSelectDay: (day: number) => void;
}

export const ForecastTimeline: React.FC<ForecastTimelineProps> = ({
  timeline,
  selectedDay,
  onSelectDay
}) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const handleScroll = (offset: number) => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: offset, behavior: 'smooth' });
    }
  };

  return (
    <section 
      className="fg-panel"
      style={{ padding: '16px 20px', display: 'flex', flexDirection: 'column', gap: '12px' }}
      aria-label="10-Day Medium-Range Forecast Horizon"
    >
      {/* Header controls */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <CalendarClock size={16} style={{ color: 'var(--accent-cyan)' }} />
          <div>
            <h2 style={{ fontSize: '14px', fontWeight: '600', color: 'var(--text-primary)' }}>
              Medium-Range Forecast Horizon (Day 1 – Day 10)
            </h2>
            <span style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>
              Assessing numerical weather prediction (NWP) model decay & divergence
            </span>
          </div>
        </div>

        {/* Scroll Arrows */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <button
            onClick={() => handleScroll(-220)}
            aria-label="Scroll timeline left"
            style={{
              padding: '6px',
              borderRadius: '4px',
              background: 'rgba(255, 255, 255, 0.04)',
              border: '1px solid var(--card-border)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--text-secondary)'
            }}
          >
            <ChevronLeft size={16} />
          </button>
          <button
            onClick={() => handleScroll(220)}
            aria-label="Scroll timeline right"
            style={{
              padding: '6px',
              borderRadius: '4px',
              background: 'rgba(255, 255, 255, 0.04)',
              border: '1px solid var(--card-border)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--text-secondary)'
            }}
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>

      {/* Horizontal Strip */}
      <div className="timeline-container" ref={scrollContainerRef}>
        <div className="timeline-strip" role="tablist" aria-label="10-day forecast selection">
          {timeline.map((item) => (
            <DayForecastCard
              key={item.day}
              item={item}
              isSelected={selectedDay === item.day}
              onSelect={onSelectDay}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
