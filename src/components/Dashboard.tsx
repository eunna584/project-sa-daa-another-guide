import React from 'react';
import { BarChart, Users, Clock, CheckCircle, XCircle, ListX } from 'lucide-react';
import { SlotData } from '../types';

interface DashboardProps {
  slotData: SlotData;
  onNavigate: (page: string) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ slotData, onNavigate }) => {
  const statsCards = [
    {
      title: 'Total Available Slots',
      value: slotData.totalSlots,
      subtitle: '2 slots filled',
      icon: BarChart,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
      borderColor: 'border-orange-100'
    },
    {
      title: 'Approved Students',
      value: slotData.studentsApproved,
      subtitle: '4% of total slots',
      icon: CheckCircle,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      borderColor: 'border-green-100'
    },
    {
      title: 'Pending Applications',
      value: slotData.pendingApplications,
      subtitle: 'Awaiting review and ranking',
      icon: Clock,
      color: 'text-amber-600',
      bgColor: 'bg-amber-50',
      borderColor: 'border-amber-100'
    },
    {
      title: 'Waitlisted Applications',
      value: slotData.waitlistedApplications,
      subtitle: 'Awaiting slot availability',
      icon: ListX,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-100'
    },
    {
      title: 'Rejected Applications',
      value: slotData.rejectedApplications,
      subtitle: 'Did not meet criteria',
      icon: XCircle,
      color: 'text-red-600',
      bgColor: 'bg-red-50',
      borderColor: 'border-red-100'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Admin Dashboard</h1>
        <p className="text-gray-600">Overview of school enrollment applications.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {statsCards.map((card, index) => {
          const Icon = card.icon;
          return (
            <div
              key={index}
              className={`bg-white rounded-lg shadow-sm border ${card.borderColor} p-6 hover:shadow-md transition-shadow duration-200`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-1">{card.title}</p>
                  <p className="text-3xl font-bold text-gray-800 mb-1">{card.value}</p>
                  <p className="text-sm text-gray-500">{card.subtitle}</p>
                </div>
                <div className={`${card.bgColor} p-3 rounded-lg`}>
                  <Icon className={`${card.color}`} size={24} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Welcome Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-2">Welcome, Administrator!</h2>
          <p className="text-gray-600 mb-4">
            Manage student applications efficiently and fairly. Total applications: 10
          </p>
          <p className="text-gray-700 mb-6">
            This dashboard provides a quick overview of the current application status. 
            Navigate using the sidebar to view detailed application lists, manage rankings, 
            and visualize slot allocations.
          </p>
          
          <div className="flex gap-3">
            <button
              onClick={() => onNavigate('pending-applications')}
              className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200"
            >
              View Pending Applications
            </button>
            <button
              onClick={() => onNavigate('application-rankings')}
              className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200"
            >
              Process Rankings
            </button>
          </div>

          {/* Placeholder for chart */}
          <div className="mt-6 h-48 bg-gray-100 rounded-lg flex items-center justify-center">
            <div className="text-center text-gray-500">
              <BarChart size={48} className="mx-auto mb-2" />
              <p>Application Trends Chart</p>
              <p className="text-sm">(Visualization placeholder)</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Quick Actions</h3>
          <div className="space-y-3">
            <button
              onClick={() => onNavigate('application-rankings')}
              className="w-full flex items-center gap-3 p-3 text-left hover:bg-gray-50 rounded-lg transition-colors duration-200"
            >
              <BarChart size={20} className="text-orange-600" />
              <span className="text-sm font-medium text-gray-700">Process Rankings</span>
            </button>
            <button
              onClick={() => onNavigate('slot-visualization')}
              className="w-full flex items-center gap-3 p-3 text-left hover:bg-gray-50 rounded-lg transition-colors duration-200"
            >
              <Clock size={20} className="text-blue-600" />
              <span className="text-sm font-medium text-gray-700">View Slot Chart</span>
            </button>
            <button
              className="w-full flex items-center gap-3 p-3 text-left hover:bg-gray-50 rounded-lg transition-colors duration-200"
            >
              <Users size={20} className="text-green-600" />
              <span className="text-sm font-medium text-gray-700">Manage Users (Future)</span>
            </button>
            <button
              className="w-full flex items-center gap-3 p-3 text-left hover:bg-gray-50 rounded-lg transition-colors duration-200"
            >
              <CheckCircle size={20} className="text-purple-600" />
              <span className="text-sm font-medium text-gray-700">System Settings (Future)</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};