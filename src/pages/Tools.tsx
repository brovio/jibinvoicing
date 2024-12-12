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
        <div className="w-full aspect-[16/9] overflow-hidden rounded-[10px] bg-[#3f475e]">
          <iframe
            src="https://j-parser.lovable.app/"
            className="w-full h-full border border-dashboard-border rounded-[10px]"
            title="Timesheet Parser Tool"
            style={{ 
              minHeight: '600px',
              backgroundColor: '#3f475e',
              color: '#FFFFFF'
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Tools;