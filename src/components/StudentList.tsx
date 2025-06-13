import React from 'react';
import { Eye, School, Award } from 'lucide-react';
import { Student } from '../types';

interface StudentListProps {
  title: string;
  subtitle: string;
  students: Student[];
  onViewStudent: (student: Student) => void;
  statusColor: 'amber' | 'blue' | 'green' | 'red';
}

export const StudentList: React.FC<StudentListProps> = ({
  title,
  subtitle,
  students,
  onViewStudent,
  statusColor
}) => {
  const getStatusBadgeClass = (status: Student['status']) => {
    const baseClasses = 'px-2 py-1 rounded-full text-xs font-medium';
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

  const getStatusIcon = () => {
    switch (statusColor) {
      case 'amber':
        return '⏳';
      case 'blue':
        return '📋';
      case 'green':
        return '✅';
      case 'red':
        return '❌';
      default:
        return '📄';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h1 className="text-2xl font-bold text-orange-600 mb-2">{title}</h1>
        <p className="text-gray-600">{subtitle}</p>
      </div>

      {/* Students Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center gap-2">
            <span className="text-2xl">{getStatusIcon()}</span>
            <h2 className="text-lg font-bold text-gray-800">
              {title.split(' ')[0]} ({students.length})
            </h2>
          </div>
          <p className="text-sm text-gray-600 mt-1">
            {students.length === 0 
              ? `No ${title.toLowerCase()} at this time.`
              : `These applications are qualified but are currently on the ${title.toLowerCase().includes('waitlist') ? 'waitlist due to slot limitations' : 'list'}.`
            }
          </p>
        </div>

        {students.length > 0 && (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Full Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    School
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    GPA
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Exam Score
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Submission Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {students.map((student) => (
                  <tr key={student.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <img
                          className="h-10 w-10 rounded-full object-cover"
                          src={student.profileImage}
                          alt={student.fullName}
                        />
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {student.fullName}
                          </div>
                          <div className="text-sm text-gray-500">
                            ID: {student.applicationId}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <School size={16} className="text-gray-400 mr-2" />
                        <div className="text-sm text-gray-900">{student.schoolAttended}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <Award size={16} className="text-gray-400 mr-2" />
                        <div className="text-sm text-gray-900">{student.grades}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {student.entranceExamScore}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {student.submissionDate}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={getStatusBadgeClass(student.status)}>
                        {student.status.charAt(0).toUpperCase() + student.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button
                        onClick={() => onViewStudent(student)}
                        className="text-orange-600 hover:text-orange-900 flex items-center gap-1 transition-colors duration-200"
                      >
                        <Eye size={16} />
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {students.length > 0 && (
          <div className="px-6 py-3 bg-gray-50 border-t border-gray-200">
            <p className="text-sm text-gray-500">
              Showing {students.length} {title.toLowerCase()}.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};