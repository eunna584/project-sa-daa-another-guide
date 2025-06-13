import React from 'react';
import { SlotData } from '../types';

interface SlotVisualizationProps {
  slotData: SlotData;
}

export const SlotVisualization: React.FC<SlotVisualizationProps> = ({ slotData }) => {
  const filledPercentage = (slotData.filledSlots / slotData.totalSlots) * 100;
  const availablePercentage = 100 - filledPercentage;

  // Simple pie chart using CSS
  const pieChartStyles = {
    background: `conic-gradient(
      #f97316 0deg ${filledPercentage * 3.6}deg,
      #e5e7eb ${filledPercentage * 3.6}deg 360deg
    )`
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Slot Allocation Status</h1>
        <p className="text-gray-600">
          Total Slots: {slotData.totalSlots} | Filled Slots: {slotData.filledSlots} | Available Slots: {slotData.availableSlots}
        </p>
      </div>

      {/* Pie Chart */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
        <div className="flex flex-col items-center">
          <div className="relative">
            <div
              className="w-80 h-80 rounded-full"
              style={pieChartStyles}
            ></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="bg-white rounded-full p-4 shadow-lg border-4 border-gray-100">
                <div className="text-center">
                  <p className="text-sm text-gray-600">Available Slots</p>
                  <p className="text-2xl font-bold text-gray-800">{slotData.availableSlots} slots</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-6 flex items-center gap-6">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-orange-500 rounded"></div>
              <span className="text-sm text-gray-700">Filled Slots</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-gray-300 rounded"></div>
              <span className="text-sm text-gray-700">Available Slots</span>
            </div>
          </div>
          
          <div className="mt-4 text-center">
            <p className="text-lg text-orange-600 font-semibold">
              Filled Slots: {filledPercentage.toFixed(1)}%
            </p>
          </div>
        </div>
      </div>

      {/* Key Statistics */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-6">Key Statistics</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-orange-600 mb-2">{slotData.totalSlots}</div>
            <div className="text-gray-600">Total Capacity</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-green-600 mb-2">{slotData.studentsApproved}</div>
            <div className="text-gray-600">Students Approved</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-gray-600 mb-2">{slotData.availableSlots}</div>
            <div className="text-gray-600">Slots Remaining</div>
          </div>
        </div>
      </div>
    </div>
  );
};