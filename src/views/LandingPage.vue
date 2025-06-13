<template>
  <div class="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50">
    <!-- Header -->
    <header class="bg-white/80 backdrop-blur-sm shadow-sm">
      <div class="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 bg-orange-500 rounded-lg flex items-center justify-center">
            <GraduationCap class="text-white" :size="24" />
          </div>
          <span class="text-xl font-bold text-gray-800">AlgoForDaSeat</span>
        </div>
        <button
          @click="login"
          class="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-lg font-medium transition-colors duration-200"
        >
          Admin Login
        </button>
      </div>
    </header>

    <!-- Hero Section -->
    <div class="max-w-7xl mx-auto px-6 py-16">
      <div class="text-center mb-16">
        <h1 class="text-5xl font-bold text-gray-800 mb-6">
          Welcome to <span class="text-orange-500">AlgoForDaSeat</span>
        </h1>
        <p class="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Fair Slots for School Slots
        </p>
        
        <!-- Hero Image Placeholder -->
        <div class="w-full max-w-2xl mx-auto h-64 bg-gray-200 rounded-lg mb-12 flex items-center justify-center">
          <div class="text-gray-400 text-center">
            <GraduationCap :size="64" class="mx-auto mb-2" />
            <p>School Enrollment Visualization</p>
          </div>
        </div>

        <div class="bg-white/60 backdrop-blur-sm rounded-lg p-6 max-w-md mx-auto border border-orange-100">
          <h3 class="text-lg font-semibold text-gray-800 mb-4">Admin Access</h3>
          <div class="space-y-3 text-sm text-gray-600">
            <div class="flex justify-between">
              <span>Username:</span>
              <span class="font-mono bg-gray-100 px-2 py-1 rounded">admin@algofordaseat.edu</span>
            </div>
            <div class="flex justify-between">
              <span>Password:</span>
              <span class="font-mono bg-gray-100 px-2 py-1 rounded">admin123</span>
            </div>
          </div>
          <button
            @click="login"
            class="w-full mt-4 bg-orange-500 hover:bg-orange-600 text-white py-2 rounded-lg font-medium transition-colors duration-200"
          >
            Login to Dashboard
          </button>
        </div>
      </div>

      <!-- Mission Section -->
      <div class="text-center mb-16">
        <h2 class="text-3xl font-bold text-orange-600 mb-6">Our Mission</h2>
        <div class="max-w-4xl mx-auto bg-white/60 backdrop-blur-sm rounded-lg p-8 border border-orange-100">
          <p class="text-gray-700 leading-relaxed">
            AlgoForDaSeat is a public school enrollment management system committed to fairly 
            allocating limited school slots. We ensure equitable access to education by leveraging 
            transparent, data-driven criteria, promoting a brighter future for every student in our 
            community.
          </p>
        </div>
      </div>

      <!-- Core Principles -->
      <div class="mb-16">
        <h2 class="text-3xl font-bold text-orange-600 text-center mb-12">Core Principles</h2>
        <div class="grid md:grid-cols-3 gap-8">
          <div class="bg-white/60 backdrop-blur-sm rounded-lg p-8 text-center border border-orange-100 hover:shadow-lg transition-shadow duration-200">
            <div class="w-16 h-16 bg-orange-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Award class="text-orange-600" :size="32" />
            </div>
            <h3 class="text-xl font-bold text-gray-800 mb-4">Academic Excellence</h3>
            <p class="text-gray-600">
              Prioritizing strong scholastic achievements and student potential to foster a thriving 
              learning environment.
            </p>
          </div>

          <div class="bg-white/60 backdrop-blur-sm rounded-lg p-8 text-center border border-orange-100 hover:shadow-lg transition-shadow duration-200">
            <div class="w-16 h-16 bg-orange-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <MapPin class="text-orange-600" :size="32" />
            </div>
            <h3 class="text-xl font-bold text-gray-800 mb-4">School Proximity</h3>
            <p class="text-gray-600">
              Considering students' distance to school for better accessibility and 
              stronger community integration.
            </p>
          </div>

          <div class="bg-white/60 backdrop-blur-sm rounded-lg p-8 text-center border border-orange-100 hover:shadow-lg transition-shadow duration-200">
            <div class="w-16 h-16 bg-orange-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Users class="text-orange-600" :size="32" />
            </div>
            <h3 class="text-xl font-bold text-gray-800 mb-4">Socioeconomic Equity</h3>
            <p class="text-gray-600">
              Supporting equitable opportunities for students from diverse socioeconomic 
              backgrounds to ensure fairness.
            </p>
          </div>
        </div>
      </div>

      <!-- Footer -->
      <div class="text-center py-8 border-t border-orange-200">
        <p class="text-gray-500">© 2025 AlgoForDaSeat. All rights reserved.</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { GraduationCap, Award, MapPin, Users } from 'lucide-vue-next'
import { studentStore } from '../stores/studentStore'
import { useRouter } from 'vue-router'

const router = useRouter()

const login = () => {
  studentStore.login()
  router.push('/dashboard')
}
</script>