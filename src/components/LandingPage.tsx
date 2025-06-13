import React, { useState } from 'react';
import { Graduation2, Users, Award, MapPin } from 'lucide-react';

interface LandingPageProps {
  onLogin: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onLogin }) => {
  const [credentials] = useState({
    username: 'admin@algofordaseat.edu',
    password: 'admin123'
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-orange-500 rounded-lg flex items-center justify-center">
              <Graduation2 className="text-white" size={24} />
            </div>
            <span className="text-xl font-bold text-gray-800">AlgoForDaSeat</span>
          </div>
          <button
            onClick={onLogin}
            className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-lg font-medium transition-colors duration-200"
          >
            Admin Login
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-800 mb-6">
            Welcome to <span className="text-orange-500">AlgoForDaSeat</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Fair Slots for School Slots
          </p>
          
          {/* Hero Image Placeholder */}
          <div className="w-full max-w-2xl mx-auto h-64 bg-gray-200 rounded-lg mb-12 flex items-center justify-center">
            <div className="text-gray-400 text-center">
              <Graduation2 size={64} className="mx-auto mb-2" />
              <p>School Enrollment Visualization</p>
            </div>
          </div>

          <div className="bg-white/60 backdrop-blur-sm rounded-lg p-6 max-w-md mx-auto border border-orange-100">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Admin Access</h3>
            <div className="space-y-3 text-sm text-gray-600">
              <div className="flex justify-between">
                <span>Username:</span>
                <span className="font-mono bg-gray-100 px-2 py-1 rounded">{credentials.username}</span>
              </div>
              <div className="flex justify-between">
                <span>Password:</span>
                <span className="font-mono bg-gray-100 px-2 py-1 rounded">{credentials.password}</span>
              </div>
            </div>
            <button
              onClick={onLogin}
              className="w-full mt-4 bg-orange-500 hover:bg-orange-600 text-white py-2 rounded-lg font-medium transition-colors duration-200"
            >
              Login to Dashboard
            </button>
          </div>
        </div>

        {/* Mission Section */}
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-orange-600 mb-6">Our Mission</h2>
          <div className="max-w-4xl mx-auto bg-white/60 backdrop-blur-sm rounded-lg p-8 border border-orange-100">
            <p className="text-gray-700 leading-relaxed">
              AlgoForDaSeat is a public school enrollment management system committed to fairly 
              allocating limited school slots. We ensure equitable access to education by leveraging 
              transparent, data-driven criteria, promoting a brighter future for every student in our 
              community.
            </p>
          </div>
        </div>

        {/* Core Principles */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-orange-600 text-center mb-12">Core Principles</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white/60 backdrop-blur-sm rounded-lg p-8 text-center border border-orange-100 hover:shadow-lg transition-shadow duration-200">
              <div className="w-16 h-16 bg-orange-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Award className="text-orange-600" size={32} />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-4">Academic Excellence</h3>
              <p className="text-gray-600">
                Prioritizing strong scholastic achievements and student potential to foster a thriving 
                learning environment.
              </p>
            </div>

            <div className="bg-white/60 backdrop-blur-sm rounded-lg p-8 text-center border border-orange-100 hover:shadow-lg transition-shadow duration-200">
              <div className="w-16 h-16 bg-orange-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <MapPin className="text-orange-600" size={32} />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-4">School Proximity</h3>
              <p className="text-gray-600">
                Considering students' distance to school for better accessibility and 
                stronger community integration.
              </p>
            </div>

            <div className="bg-white/60 backdrop-blur-sm rounded-lg p-8 text-center border border-orange-100 hover:shadow-lg transition-shadow duration-200">
              <div className="w-16 h-16 bg-orange-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Users className="text-orange-600" size={32} />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-4">Socioeconomic Equity</h3>
              <p className="text-gray-600">
                Supporting equitable opportunities for students from diverse socioeconomic 
                backgrounds to ensure fairness.
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center py-8 border-t border-orange-200">
          <p className="text-gray-500">© 2025 AlgoForDaSeat. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
};