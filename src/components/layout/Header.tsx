import React, { useState, useEffect } from 'react';
import { Navigation, DashboardTab } from './Navigation';
import { Radio, RefreshCw, Menu, X, Clock, Calendar, ShieldCheck, FileText, Sliders } from 'lucide-react';
import { formatApiTimestamp } from '../../utils/forecastUtils';

interface HeaderProps {
  activeTab: DashboardTab;
  onSelectTab: (tab: DashboardTab) => void;
  updatedAt: string;
  isRefreshing: boolean;
  onTriggerRefresh: () => void;
  onOpenBulletin?: () => void;
  onOpenSandbox?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  onSelectTab,
  updatedAt,
  isRefreshing,
  onTriggerRefresh,
  onOpenBulletin,
  onOpenSandbox
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState<string>('');
  const [currentDate, setCurrentDate] = useState<string>('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleTimeString('en-GB', {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: false
        }) + ' UTC'
      );
      setCurrentDate(
        now.toLocaleDateString('en-GB', {
          day: '2-digit',
          month: 'short',
          year: 'numeric'
        })
      );
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="header-bar" role="banner">
      {/* Brand / Logo */}
      <div className="brand-container" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <div 
          style={{
            width: '36px',
            height: '36px',
            borderRadius: '8px',
            background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
            border: '1px solid rgba(59, 156, 255, 0.4)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--accent-blue)',
            boxShadow: '0 0 12px rgba(59, 156, 255, 0.2)'
          }}
        >
          <Radio size={20} className="ambient-pulse" />
        </div>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '17px', fontWeight: '700', letterSpacing: '-0.3px', color: 'var(--text-primary)' }}>
              ForecastGuard <span style={{ color: 'var(--accent-blue)' }}>AI</span>
            </span>
            <span 
              style={{
                fontSize: '10px',
                padding: '1px 6px',
                borderRadius: '4px',
                background: 'rgba(59, 156, 255, 0.15)',
                color: 'var(--accent-cyan)',
                border: '1px solid rgba(59, 156, 255, 0.3)',
                fontWeight: 600,
                letterSpacing: '0.4px'
              }}
            >
              OPERATIONAL
            </span>
          </div>
          <div style={{ fontSize: '11px', color: 'var(--text-secondary)', fontWeight: '400' }}>
            AI-Powered Forecast Intelligence
          </div>
        </div>
      </div>

      {/* Desktop Navigation */}
      <div className="desktop-nav-container">
        <Navigation activeTab={activeTab} onSelectTab={onSelectTab} />
      </div>

      {/* Right Telemetry & Status */}
      <div className="header-right" style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        {/* Live Clock */}
        <div className="clock-widget" style={{ display: 'flex', alignItems: 'center', gap: '14px', fontSize: '12px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-secondary)' }}>
            <Calendar size={13} style={{ color: 'var(--accent-cyan)' }} />
            <span className="mono-text">{currentDate}</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-primary)' }}>
            <Clock size={13} style={{ color: 'var(--accent-blue)' }} />
            <span className="mono-text" style={{ fontWeight: 600 }}>{currentTime}</span>
          </div>
        </div>

        {/* API Update & Manual Assimilation Refresh */}
        <div 
          className="last-run-box"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            background: 'rgba(255, 255, 255, 0.03)',
            border: '1px solid var(--card-border)',
            padding: '4px 10px',
            borderRadius: 'var(--radius-sm)',
            fontSize: '11px'
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ fontSize: '9px', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Last Assimilation</span>
            <span className="mono-text" style={{ color: 'var(--text-secondary)' }}>{formatApiTimestamp(updatedAt)}</span>
          </div>
          <button
            onClick={onTriggerRefresh}
            disabled={isRefreshing}
            title="Trigger NWP Cycle Assimilation"
            style={{
              padding: '4px',
              borderRadius: '4px',
              color: isRefreshing ? 'var(--accent-cyan)' : 'var(--text-secondary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <RefreshCw size={13} style={{ animation: isRefreshing ? 'spin 1s linear infinite' : 'none' }} />
          </button>
        </div>

        {/* Profile / Watch Mode */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '4px 10px',
            borderRadius: 'var(--radius-full)',
            background: 'rgba(34, 197, 94, 0.08)',
            border: '1px solid rgba(34, 197, 94, 0.25)',
            fontSize: '11px',
            color: 'var(--risk-low)',
            fontWeight: 500
          }}
        >
          <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--risk-low)' }} />
          <span>IMD / NCMRWF Live</span>
        </div>

        {/* 70% Milestone & Audit Quick Access Button */}
        <button
          onClick={() => onSelectTab('pipeline-audit')}
          title="Inspect 70% Milestone Evidence & Pipeline Architecture"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            padding: '4px 10px',
            borderRadius: 'var(--radius-full)',
            background: activeTab === 'pipeline-audit' ? 'rgba(34, 197, 94, 0.2)' : 'rgba(34, 197, 94, 0.08)',
            border: '1px solid rgba(34, 197, 94, 0.35)',
            fontSize: '11px',
            color: 'var(--risk-low)',
            fontWeight: 600,
            cursor: 'pointer'
          }}
        >
          <ShieldCheck size={13} style={{ color: 'var(--risk-low)' }} />
          <span>70% Milestone Certified</span>
        </button>

        {/* Early Warning Bulletin Trigger Button */}
        {onOpenBulletin && (
          <button
            onClick={onOpenBulletin}
            title="Generate Official IMD / SDMA Early Warning Action Bulletin"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '4px 10px',
              borderRadius: 'var(--radius-full)',
              background: 'rgba(239, 68, 68, 0.1)',
              border: '1px solid rgba(239, 68, 68, 0.35)',
              fontSize: '11px',
              color: 'var(--risk-high)',
              fontWeight: 600,
              cursor: 'pointer'
            }}
          >
            <FileText size={13} />
            <span>Early Warning Bulletin</span>
          </button>
        )}

        {/* Scenario Stress-Test Sandbox Trigger Button */}
        {onOpenSandbox && (
          <button
            onClick={onOpenSandbox}
            title="Inject Severe Weather Perturbation Scenarios"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '4px 10px',
              borderRadius: 'var(--radius-full)',
              background: 'rgba(59, 156, 255, 0.1)',
              border: '1px solid rgba(59, 156, 255, 0.35)',
              fontSize: '11px',
              color: 'var(--accent-blue)',
              fontWeight: 600,
              cursor: 'pointer'
            }}
          >
            <Sliders size={13} />
            <span>Stress-Test Sandbox</span>
          </button>
        )}

        {/* Mobile Hamburger Toggle */}
        <button
          className="mobile-menu-toggle"
          aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Menu'}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          style={{
            display: 'none',
            padding: '6px',
            color: 'var(--text-primary)',
            background: 'rgba(255, 255, 255, 0.05)',
            borderRadius: '6px'
          }}
        >
          {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div 
          className="fg-floating-glass mobile-nav-drawer"
          style={{
            position: 'absolute',
            top: 'var(--header-height)',
            left: '12px',
            right: '12px',
            padding: '16px',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
            border: '1px solid rgba(255,255,255,0.12)'
          }}
        >
          <div style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
            Navigation Sections
          </div>
          <Navigation 
            activeTab={activeTab} 
            onSelectTab={(tab) => {
              onSelectTab(tab);
              setMobileMenuOpen(false);
            }} 
            isMobileDrawerOpen={true}
            onCloseMobileDrawer={() => setMobileMenuOpen(false)}
          />
          <div style={{ paddingTop: '8px', borderTop: '1px solid rgba(255,255,255,0.06)', display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: 'var(--text-secondary)' }}>
            <span>Telemetry: Online</span>
            <span>06Z Ensemble Assimilated</span>
          </div>
        </div>
      )}
    </header>
  );
};
