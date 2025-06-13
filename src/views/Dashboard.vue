<template>
  <div v-if="!studentStore.isLoggedIn" class="flex items-center justify-center min-h-screen">
    <div class="text-center">
      <h2 class="text-2xl font-bold text-gray-800 mb-4">Access Denied</h2>
      <p class="text-gray-600 mb-4">Please login to access the dashboard.</p>
      <router-link to="/" class="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-lg font-medium transition-colors duration-200">
        Go to Login
      </router-link>
    </div>
  </div>

  <div v-else class="flex min-h-screen bg-gray-50">
    <Sidebar />
    <main class="flex-1 p-6">
      <div class="space-y-6">
        <!-- Header -->
        <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h1 class="text-2xl font-bold text-gray-800 mb-2">Admin Dashboard</h1>
          <p class="text-gray-600">Overview of school enrollment applications.</p>
        </div>

        <!-- Stats Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div
            v-for="(card, index) in statsCards"
            :key="index"
            :class="`bg-white rounded-lg shadow-sm border ${card.borderColor} p-6 hover:shadow-md transition-shadow duration-200`"
          >
            <div class="flex items-center justify-between">
              <div>
                <p class="text-sm font-medium text-gray-600 mb-1">{{ card.title }}</p>
                <p class="text-3xl font-bold text-gray-800 mb-1">{{ card.value }}</p>
                <p class="text-sm text-gray-500">{{ card.subtitle }}</p>
              </div>
              <div :class="`${card.bgColor} p-3 rounded-lg`">
                <component :is="card.icon" :class="card.color" :size="24" />
              </div>
            </div>
          </div>
        </div>

        <!-- Welcome Section -->
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div class="lg:col-span-2 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 class="text-xl font-bold text-gray-800 mb-2">Welcome, Administrator!</h2>
            <p class="text-gray-600 mb-4">
              Manage student applications efficiently and fairly. Total applications: {{ studentStore.students.length }}
            </p>
            <p class="text-gray-700 mb-6">
              This dashboard provides a quick overview of the current application status. 
              Navigate using the sidebar to view detailed application lists, manage rankings, 
              and visualize slot allocations.
            </p>
            
            <div class="flex gap-3">
              <router-link
                to="/pending-applications"
                class="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200"
              >
                View Pending Applications
              </router-link>
              <router-link
                to="/application-rankings"
                class="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200"
              >
                Process Rankings
              </router-link>
            </div>

            <!-- Placeholder for chart -->
            <div class="mt-6 h-48 bg-gray-100 rounded-lg flex items-center justify-center">
              <div class="text-center text-gray-500">
                <BarChart :size="48" class="mx-auto mb-2" />
                <p>Application Trends Chart</p>
                <p class="text-sm">(Visualization placeholder)</p>
              </div>
            </div>
          </div>

          <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 class="text-lg font-bold text-gray-800 mb-4">Quick Actions</h3>
            <div class="space-y-3">
              <router-link
                to="/application-rankings"
                class="w-full flex items-center gap-3 p-3 text-left hover:bg-gray-50 rounded-lg transition-colors duration-200"
              >
                <BarChart :size="20" class="text-orange-600" />
                <span class="text-sm font-medium text-gray-700">Process Rankings</span>
              </router-link>
              <router-link
                to="/slot-visualization"
                class="w-full flex items-center gap-3 p-3 text-left hover:bg-gray-50 rounded-lg transition-colors duration-200"
              >
                <Clock :size="20" class="text-blue-600" />
                <span class="text-sm font-medium text-gray-700">View Slot Chart</span>
              </router-link>
              <button
                class="w-full flex items-center gap-3 p-3 text-left hover:bg-gray-50 rounded-lg transition-colors duration-200"
              >
                <Users :size="20" class="text-green-600" />
                <span class="text-sm font-medium text-gray-700">Manage Users (Future)</span>
              </button>
              <button
                class="w-full flex items-center gap-3 p-3 text-left hover:bg-gray-50 rounded-lg transition-colors duration-200"
              >
                <CheckCircle :size="20" class="text-purple-600" />
                <span class="text-sm font-medium text-gray-700">System Settings (Future)</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { BarChart, Users, Clock, CheckCircle, XCircle, ListX } from 'lucide-vue-next'
import { studentStore, mockSlotData } from '../stores/studentStore'
import Sidebar from '../components/Sidebar.vue'

const statsCards = computed(() => [
  {
    title: 'Total Available Slots',
    value: mockSlotData.totalSlots,
    subtitle: '2 slots filled',
    icon: BarChart,
    color: 'text-orange-600',
    bgColor: 'bg-orange-50',
    borderColor: 'border-orange-100'
  },
  {
    title: 'Approved Students',
    value: studentStore.getStudentsByStatus('approved').length,
    subtitle: '4% of total slots',
    icon: CheckCircle,
    color: 'text-green-600',
    bgColor: 'bg-green-50',
    borderColor: 'border-green-100'
  },
  {
    title: 'Pending Applications',
    value: studentStore.getStudentsByStatus('pending').length,
    subtitle: 'Awaiting review and ranking',
    icon: Clock,
    color: 'text-amber-600',
    bgColor: 'bg-amber-50',
    borderColor: 'border-amber-100'
  },
  {
    title: 'Waitlisted Applications',
    value: studentStore.getStudentsByStatus('waitlisted').length,
    subtitle: 'Awaiting slot availability',
    icon: ListX,
    color: 'text-blue-600',
    bgColor: 'bg-blue-50',
    borderColor: 'border-blue-100'
  },
  {
    title: 'Rejected Applications',
    value: studentStore.getStudentsByStatus('rejected').length,
    subtitle: 'Did not meet criteria',
    icon: XCircle,
    color: 'text-red-600',
    bgColor: 'bg-red-50',
    borderColor: 'border-red-100'
  }
])
</script>