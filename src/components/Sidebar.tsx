import React from 'react';
import { 
  LayoutDashboard, 
  PieChart, 
  Clock, 
  ListX, 
  CheckCircle, 
  XCircle, 
  BarChart3, 
  LogOut,
  Graduation2
} from 'lucide-react';

interface SidebarProps {
  currentPage: string;
  onNavigate: (page: string) => void;
  onLogout: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ currentPage, onNavigate, onLogout }) => {
  const navigationItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'slot-visualization', label: 'Slot Visualization', icon: PieChart },
  ];

  const applicationItems = [
    { id: 'pending-applications', label: 'Pending Applications', icon: Clock },
    { id: 'waitlisted-applications', label: 'Waitlisted Applications', icon: ListX },
    { id: 'approved-applications', label: 'Approved Applications', icon: CheckCircle },
    { id: 'rejected-applications', label: 'Rejected Applications', icon: XCircle },
    { id: 'application-rankings', label: 'Application Rankings', icon: BarChart3 },
  ];

  const MenuItem: React.FC<{
    id: string;
    label: string;
    icon: React.ElementType;
    isActive: boolean;
    onClick: () => void;
  }> = ({ id, label, icon: Icon, isActive, onClick }) => (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-all duration-200 hover:bg-orange-100 ${
        isActive ? 'bg-orange-50 text-orange-700 border-r-2 border-orange-500' : 'text-gray-600 hover:text-orange-600'
      }`}
    >
      <Icon size={20} />
      <span className="text-sm font-medium">{label}</span>
    </button>
  );

  return (
    <div className="w-64 bg-white shadow-lg border-r border-gray-200">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-orange-500 rounded-lg flex items-center justify-center">
            <Graduation2 className="text-white" size={24} />
          </div>
          <span className="text-lg font-bold text-gray-800">AlgoForDaSeat</span>
        </div>
      </div>

      <nav className="py-4">
        {navigationItems.map((item) => (
          <MenuItem
            key={item.id}
            id={item.id}
            label={item.label}
            icon={item.icon}
            isActive={currentPage === item.id}
            onClick={() => onNavigate(item.id)}
          />
        ))}

        <div className="px-4 py-2 mt-6">
          <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Applications</h3>
        </div>

        {applicationItems.map((item) => (
          <MenuItem
            key={item.id}
            id={item.id}
            label={item.label}
            icon={item.icon}
            isActive={currentPage === item.id}
            onClick={() => onNavigate(item.id)}
          />
        ))}

        <div className="border-t border-gray-200 mt-6 pt-4">
          <button
            onClick={onLogout}
            className="w-full flex items-center gap-3 px-4 py-3 text-left text-gray-600 hover:bg-gray-50 hover:text-red-600 transition-colors duration-200"
          >
            <LogOut size={20} />
            <span className="text-sm font-medium">Logout</span>
          </button>
        </div>
      </nav>
    </div>
  );
};