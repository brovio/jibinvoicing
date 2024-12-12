import React from 'react';

const Tools = () => {
  return (
    <div className="container mx-auto px-4">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-white mb-2">Tools</h1>
        <p className="text-gray-400">Access helpful tools and utilities</p>
      </div>
      
      <div className="dashboard-card">
        <h2 className="text-xl font-medium text-white mb-4">Timesheet Parser</h2>
        <div className="w-full aspect-[16/9] overflow-hidden rounded-[10px]">
          <iframe
            src="https://lovable.dev/projects/9a724189-bf6c-41f6-bdf6-28e566ba7242/preview"
            className="w-full h-full border border-dashboard-border rounded-[10px]"
            title="Timesheet Parser Tool"
          />
        </div>
      </div>
    </div>
  );
};

export default Tools;