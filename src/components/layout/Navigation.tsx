import React from 'react';
import { LayoutDashboard, Compass, MapPin, BrainCircuit, BarChart3, Settings } from 'lucide-react';

export type DashboardTab = 'dashboard' | 'forecast' | 'risk-map' | 'ai-explanation' | 'historical' | 'settings';

interface NavigationProps {
  activeTab: DashboardTab;
  onSelectTab: (tab: DashboardTab) => void;
  isMobileDrawerOpen?: boolean;
  onCloseMobileDrawer?: () => void;
}

export const NAV_ITEMS: Array<{ id: DashboardTab; label: string; icon: React.ReactNode }> = [
  { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard size={16} /> },
  { id: 'forecast', label: 'Forecast Analysis', icon: <Compass size={16} /> },
  { id: 'risk-map', label: 'Risk Map', icon: <MapPin size={16} /> },
  { id: 'ai-explanation', label: 'AI Explanation', icon: <BrainCircuit size={16} /> },
  { id: 'historical', label: 'Historical Data', icon: <BarChart3 size={16} /> },
  { id: 'settings', label: 'Settings', icon: <Settings size={16} /> }
];

export const Navigation: React.FC<NavigationProps> = ({
  activeTab,
  onSelectTab,
  isMobileDrawerOpen,
  onCloseMobileDrawer
}) => {
  return (
    <nav 
      className={`header-nav ${isMobileDrawerOpen ? 'mobile-drawer-open' : ''}`}
      role="tablist"
      aria-label="Main Navigation"
    >
      <div className="nav-items-wrapper">
        {NAV_ITEMS.map((item) => {
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              role="tab"
              id={`nav-tab-${item.id}`}
              aria-selected={isActive}
              aria-controls={`nav-panel-${item.id}`}
              className={`fg-tab-btn ${isActive ? 'active' : ''}`}
              onClick={() => {
                onSelectTab(item.id);
                if (onCloseMobileDrawer) onCloseMobileDrawer();
              }}
            >
              {item.icon}
              <span>{item.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
