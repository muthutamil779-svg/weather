import React from 'react';

export const LoadingSkeleton: React.FC = () => {
  return (
    <div className="main-content" aria-label="Loading forecast intelligence dashboard" aria-busy="true">
      {/* 4 Summary Cards Skeleton */}
      <div className="summary-grid">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="fg-panel skeleton" style={{ height: '140px', padding: '20px' }} />
        ))}
      </div>

      {/* Timeline Strip Skeleton */}
      <div className="fg-panel skeleton" style={{ height: '120px' }} />

      {/* Main Grid Skeleton */}
      <div className="dashboard-main-grid">
        <div className="fg-panel skeleton" style={{ height: '520px' }} />
        <div className="fg-panel skeleton" style={{ height: '520px' }} />
      </div>

      {/* Lower Grid Skeleton */}
      <div className="dashboard-lower-grid">
        <div className="fg-panel skeleton" style={{ height: '360px' }} />
        <div className="fg-panel skeleton" style={{ height: '360px' }} />
      </div>
    </div>
  );
};
