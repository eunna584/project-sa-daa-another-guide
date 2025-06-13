import React from 'react';
import { Award, TrendingUp, Eye } from 'lucide-react';
import { Student } from '../types';

interface ApplicationRankingsProps {
  students: Student[];
  onViewStudent: (student: Student) => void;
}

export const ApplicationRankings: React.FC<ApplicationRankingsProps> = ({
  students,
  onViewStudent
}) => {
  // Simple ranking algorithm based on grades, exam score, and inverse of income/distance
  const calculateScore = (student: Student) => {
    const gradeScore = student.grades * 25; // Max 100 points for 4.0 GPA
    const examScore = student.entranceExamScore * 0.5; // Max 50 points for 100 exam score
    const incomeScore = Math.max(0, 50 - (student.householdIncome / 1000)); // Lower income = higher score
    const proximityScore = Math.max(0, 25 - (student.proximityToSchool * 5)); // Closer = higher score
    
    return gradeScore + examScore + incomeScore + proximityScore;
  };

  const rankedStudents = students
    .map(student => ({
      ...student,
      score: calculateScore(student)
    }))
    .sort((a, b) => b.score - a.score);

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

  const getRankBadgeClass = (rank: number) => {
    if (rank <= 3) return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    if (rank <= 6) return 'bg-green-100 text-green-800 border-green-200';
    return 'bg-gray-100 text-gray-800 border-gray-200';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h1 className="text-2xl font-bold text-orange-600 mb-2">Application Rankings</h1>
        <p className="text-gray-600">
          Students ranked by composite score based on academic performance, socioeconomic factors, and proximity.
        </p>
      </div>

      {/* Ranking Algorithm Info */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center gap-3 mb-4">
          <TrendingUp className="text-orange-600" size={24} />
          <h2 className="text-lg font-bold text-gray-800">Ranking Methodology</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
          <div className="bg-blue-50 p-3 rounded-lg">
            <div className="font-medium text-blue-800">Academic Performance</div>
            <div className="text-blue-600">GPA (40%) + Exam Score (25%)</div>
          </div>
          <div className="bg-green-50 p-3 rounded-lg">
            <div className="font-medium text-green-800">Socioeconomic Equity</div>
            <div className="text-green-600">Household Income (20%)</div>
          </div>
          <div className="bg-purple-50 p-3 rounded-lg">
            <div className="font-medium text-purple-800">School Proximity</div>
            <div className="text-purple-600">Distance to School (15%)</div>
          </div>
          <div className="bg-orange-50 p-3 rounded-lg">
            <div className="font-medium text-orange-800">Total Score</div>
            <div className="text-orange-600">Max 225 points</div>
          </div>
        </div>
      </div>

      {/* Rankings Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center gap-2">
            <Award className="text-orange-600" size={24} />
            <h2 className="text-lg font-bold text-gray-800">Student Rankings ({rankedStudents.length})</h2>
          </div>
          <p className="text-sm text-gray-600 mt-1">
            Comprehensive ranking based on multiple criteria for fair slot allocation.
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Rank
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Student
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total Score
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  GPA
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Exam Score
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Income
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Distance
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
              {rankedStudents.map((student, index) => {
                const rank = index + 1;
                return (
                  <tr key={student.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-sm font-medium border ${getRankBadgeClass(rank)}`}>
                        #{rank}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <img
                          className="h-8 w-8 rounded-full object-cover"
                          src={student.profileImage}
                          alt={student.fullName}
                        />
                        <div className="ml-3">
                          <div className="text-sm font-medium text-gray-900">
                            {student.fullName}
                          </div>
                          <div className="text-sm text-gray-500">
                            {student.applicationId}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-bold text-gray-900">
                        {student.score.toFixed(1)}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {student.grades}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {student.entranceExamScore}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      ₱{student.householdIncome.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {student.proximityToSchool} km
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
                        View Profile
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className="px-6 py-3 bg-gray-50 border-t border-gray-200">
          <p className="text-sm text-gray-500">
            Showing all {rankedStudents.length} applications ranked by composite score.
          </p>
        </div>
      </div>
    </div>
  );
};