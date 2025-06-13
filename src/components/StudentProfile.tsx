import React, { useState } from 'react';
import { ArrowLeft, User, MapPin, School, DollarSign, Target, Users, Save, Edit } from 'lucide-react';
import { Student } from '../types';

interface StudentProfileProps {
  student: Student;
  onBack: () => void;
  onUpdateStatus: (studentId: string, newStatus: Student['status']) => void;
}

export const StudentProfile: React.FC<StudentProfileProps> = ({
  student,
  onBack,
  onUpdateStatus
}) => {
  const [currentStatus, setCurrentStatus] = useState<Student['status']>(student.status);
  const [showSaveButton, setShowSaveButton] = useState(false);

  const handleStatusChange = (newStatus: Student['status']) => {
    setCurrentStatus(newStatus);
    setShowSaveButton(newStatus !== student.status);
  };

  const handleSaveStatus = () => {
    onUpdateStatus(student.id, currentStatus);
    setShowSaveButton(false);
  };

  const getStatusBadgeClass = (status: Student['status']) => {
    const baseClasses = 'px-3 py-1 rounded-full text-sm font-medium';
    switch (status) {
      case 'pending':
        return `${baseClasses} bg-amber-100 text-amber-800`;
      case 'approved':
        return `${baseClasses} bg-green-100 text-green-800`;
      case 'waitlisted':
        return `${baseClasses} bg-blue-100 text-blue-800`;
      case 'rejected':
        return `${baseClasses} bg-red-100 text-red-800`;
      default:
        return `${baseClasses} bg-gray-100 text-gray-800`;
    }
  };

  const detailItems = [
    {
      icon: User,
      label: 'Full Name',
      value: student.fullName,
      color: 'text-blue-600'
    },
    {
      icon: MapPin,
      label: 'Address',
      value: student.address,
      color: 'text-green-600'
    },
    {
      icon: School,
      label: 'School Attended',
      value: student.schoolAttended,
      color: 'text-purple-600'
    },
    {
      icon: Users,
      label: 'Parent/Guardian Names',
      value: student.parentGuardianNames,
      color: 'text-orange-600'
    }
  ];

  const scoreItems = [
    {
      icon: Target,
      label: 'Grades/GPA',
      value: student.grades.toString(),
      color: 'text-indigo-600'
    },
    {
      icon: Target,
      label: 'Entrance Exam Score',
      value: student.entranceExamScore.toString(),
      color: 'text-green-600'
    },
    {
      icon: DollarSign,
      label: 'Household Monthly Income',
      value: `₱${student.householdIncome.toLocaleString()}`,
      color: 'text-amber-600'
    },
    {
      icon: MapPin,
      label: 'Proximity to School (km)',
      value: `${student.proximityToSchool} km`,
      color: 'text-red-600'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center gap-4 mb-4">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors duration-200"
          >
            <ArrowLeft size={20} />
            Back to List
          </button>
        </div>
        
        <div className="flex items-center gap-6">
          <img
            src={student.profileImage}
            alt={student.fullName}
            className="w-20 h-20 rounded-full object-cover border-4 border-orange-100"
          />
          <div>
            <h1 className="text-2xl font-bold text-gray-800">{student.fullName}</h1>
            <p className="text-gray-600">Application ID: {student.applicationId}</p>
          </div>
        </div>
      </div>

      {/* Application Details */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-800">Application Details</h2>
          <span className={getStatusBadgeClass(student.status)}>
            {student.status.charAt(0).toUpperCase() + student.status.slice(1)}
          </span>
        </div>
        
        <p className="text-gray-600 mb-6">
          Submitted on: {student.submissionDate}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {detailItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <div key={index} className="flex items-start gap-3">
                <div className="p-2 bg-gray-50 rounded-lg">
                  <Icon className={item.color} size={20} />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">{item.label}</p>
                  <p className="text-gray-800 font-medium">{item.value}</p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-6 pt-6 border-t border-gray-200">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {scoreItems.map((item, index) => {
              const Icon = item.icon;
              return (
                <div key={index} className="flex items-start gap-3">
                  <div className="p-2 bg-gray-50 rounded-lg">
                    <Icon className={item.color} size={20} />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600">{item.label}</p>
                    <p className="text-gray-800 font-medium">{item.value}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Manage Application Status */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-2">Manage Application Status</h2>
        <p className="text-gray-600 mb-6">Update the student's application status.</p>
        
        <div className="flex items-center gap-4 mb-4">
          <select
            value={currentStatus}
            onChange={(e) => handleStatusChange(e.target.value as Student['status'])}
            className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
          >
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="waitlisted">Waitlisted</option>
            <option value="rejected">Rejected</option>
          </select>
          
          {showSaveButton && (
            <button
              onClick={handleSaveStatus}
              className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200 flex items-center gap-2"
            >
              <Save size={16} />
              Save Status (Auto-saves on select)
            </button>
          )}
        </div>

        <button
          className="text-gray-600 hover:text-gray-800 flex items-center gap-2 transition-colors duration-200"
        >
          <Edit size={16} />
          Edit Application Data (Future)
        </button>
      </div>
    </div>
  );
};