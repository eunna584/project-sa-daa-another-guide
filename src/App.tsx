import React, { useState } from 'react';
import { LandingPage } from './components/LandingPage';
import { Layout } from './components/Layout';
import { Dashboard } from './components/Dashboard';
import { SlotVisualization } from './components/SlotVisualization';
import { StudentList } from './components/StudentList';
import { StudentProfile } from './components/StudentProfile';
import { ApplicationRankings } from './components/ApplicationRankings';
import { mockSlotData, mockStudents } from './data/mockData';
import { Student } from './types';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [students, setStudents] = useState<Student[]>(mockStudents);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentPage('dashboard');
    setSelectedStudent(null);
  };

  const handleNavigate = (page: string) => {
    setCurrentPage(page);
    setSelectedStudent(null);
  };

  const handleViewStudent = (student: Student) => {
    setSelectedStudent(student);
    setCurrentPage('student-profile');
  };

  const handleUpdateStudentStatus = (studentId: string, newStatus: Student['status']) => {
    setStudents(prev => 
      prev.map(student => 
        student.id === studentId 
          ? { ...student, status: newStatus }
          : student
      )
    );
    
    // Update selected student if it's the one being updated
    if (selectedStudent && selectedStudent.id === studentId) {
      setSelectedStudent(prev => prev ? { ...prev, status: newStatus } : null);
    }
  };

  const handleBackToList = () => {
    if (selectedStudent) {
      // Navigate back to the appropriate list based on student status
      const statusPageMap = {
        pending: 'pending-applications',
        approved: 'approved-applications',
        waitlisted: 'waitlisted-applications',
        rejected: 'rejected-applications'
      };
      setCurrentPage(statusPageMap[selectedStudent.status]);
      setSelectedStudent(null);
    }
  };

  const getFilteredStudents = (status: Student['status']) => {
    return students.filter(student => student.status === status);
  };

  const renderCurrentPage = () => {
    if (currentPage === 'student-profile' && selectedStudent) {
      return (
        <StudentProfile
          student={selectedStudent}
          onBack={handleBackToList}
          onUpdateStatus={handleUpdateStudentStatus}
        />
      );
    }

    switch (currentPage) {
      case 'dashboard':
        return <Dashboard slotData={mockSlotData} onNavigate={handleNavigate} />;
      case 'slot-visualization':
        return <SlotVisualization slotData={mockSlotData} />;
      case 'pending-applications':
        return (
          <StudentList
            title="Pending Applications"
            subtitle="Applications awaiting review and decision"
            students={getFilteredStudents('pending')}
            onViewStudent={handleViewStudent}
            statusColor="amber"
          />
        );
      case 'waitlisted-applications':
        return (
          <StudentList
            title="Waitlisted Applications"
            subtitle="Applications awaiting slot availability"
            students={getFilteredStudents('waitlisted')}
            onViewStudent={handleViewStudent}
            statusColor="blue"
          />
        );
      case 'approved-applications':
        return (
          <StudentList
            title="Approved Applications"
            subtitle="Students accepted into the program"
            students={getFilteredStudents('approved')}
            onViewStudent={handleViewStudent}
            statusColor="green"
          />
        );
      case 'rejected-applications':
        return (
          <StudentList
            title="Rejected Applications"
            subtitle="Applications that did not meet admission criteria"
            students={getFilteredStudents('rejected')}
            onViewStudent={handleViewStudent}
            statusColor="red"
          />
        );
      case 'application-rankings':
        return <ApplicationRankings students={students} onViewStudent={handleViewStudent} />;
      default:
        return <Dashboard slotData={mockSlotData} onNavigate={handleNavigate} />;
    }
  };

  if (!isLoggedIn) {
    return <LandingPage onLogin={handleLogin} />;
  }

  return (
    <Layout
      currentPage={currentPage}
      onNavigate={handleNavigate}
      onLogout={handleLogout}
    >
      {renderCurrentPage()}
    </Layout>
  );
}

export default App;