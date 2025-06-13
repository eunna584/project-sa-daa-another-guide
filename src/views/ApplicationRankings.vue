<template>
  <div v-if="!studentStore.isLoggedIn" class="flex items-center justify-center min-h-screen">
    <div class="text-center">
      <h2 class="text-2xl font-bold text-gray-800 mb-4">Access Denied</h2>
      <p class="text-gray-600 mb-4">Please login to access application rankings.</p>
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
          <h1 class="text-2xl font-bold text-orange-600 mb-2">Application Rankings</h1>
          <p class="text-gray-600">
            Students ranked by composite score based on academic performance, socioeconomic factors, and proximity.
          </p>
        </div>

        <!-- Ranking Algorithm Info -->
        <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div class="flex items-center gap-3 mb-4">
            <TrendingUp class="text-orange-600" :size="24" />
            <h2 class="text-lg font-bold text-gray-800">Ranking Methodology</h2>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
            <div class="bg-blue-50 p-3 rounded-lg">
              <div class="font-medium text-blue-800">Academic Performance</div>
              <div class="text-blue-600">GPA (40%) + Exam Score (25%)</div>
            </div>
            <div class="bg-green-50 p-3 rounded-lg">
              <div class="font-medium text-green-800">Socioeconomic Equity</div>
              <div class="text-green-600">Household Income (20%)</div>
            </div>
            <div class="bg-purple-50 p-3 rounded-lg">
              <div class="font-medium text-purple-800">School Proximity</div>
              <div class="text-purple-600">Distance to School (15%)</div>
            </div>
            <div class="bg-orange-50 p-3 rounded-lg">
              <div class="font-medium text-orange-800">Total Score</div>
              <div class="text-orange-600">Max 225 points</div>
            </div>
          </div>
        </div>

        <!-- Rankings Table -->
        <div class="bg-white rounded-lg shadow-sm border border-gray-200">
          <div class="p-6 border-b border-gray-200">
            <div class="flex items-center gap-2">
              <Award class="text-orange-600" :size="24" />
              <h2 class="text-lg font-bold text-gray-800">Student Rankings ({{ rankedStudents.length }})</h2>
            </div>
            <p class="text-sm text-gray-600 mt-1">
              Comprehensive ranking based on multiple criteria for fair slot allocation.
            </p>
          </div>

          <div class="overflow-x-auto">
            <table class="w-full">
              <thead class="bg-gray-50">
                <tr>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Rank
                  </th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Student
                  </th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Total Score
                  </th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    GPA
                  </th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Exam Score
                  </th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Income
                  </th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Distance
                  </th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody class="bg-white divide-y divide-gray-200">
                <tr v-for="(student, index) in rankedStudents" :key="student.id" class="hover:bg-gray-50">
                  <td class="px-6 py-4 whitespace-nowrap">
                    <span :class="`inline-flex items-center px-2 py-1 rounded-full text-sm font-medium border ${getRankBadgeClass(index + 1)}`">
                      #{{ index + 1 }}
                    </span>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="flex items-center">
                      <img
                        class="h-8 w-8 rounded-full object-cover"
                        :src="student.profileImage"
                        :alt="student.fullName"
                      />
                      <div class="ml-3">
                        <div class="text-sm font-medium text-gray-900">
                          {{ student.fullName }}
                        </div>
                        <div class="text-sm text-gray-500">
                          {{ student.applicationId }}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="text-sm font-bold text-gray-900">
                      {{ student.score.toFixed(1) }}
                    </div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {{ student.grades }}
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {{ student.entranceExamScore }}
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    ₱{{ student.householdIncome.toLocaleString() }}
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {{ student.proximityToSchool }} km
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <span :class="getStatusBadgeClass(student.status)">
                      {{ student.status.charAt(0).toUpperCase() + student.status.slice(1) }}
                    </span>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <router-link
                      :to="`/student/${student.id}`"
                      class="text-orange-600 hover:text-orange-900 flex items-center gap-1 transition-colors duration-200"
                    >
                      <Eye :size="16" />
                      View Profile
                    </router-link>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div class="px-6 py-3 bg-gray-50 border-t border-gray-200">
            <p class="text-sm text-gray-500">
              Showing all {{ rankedStudents.length }} applications ranked by composite score.
            </p>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { Award, TrendingUp, Eye } from 'lucide-vue-next'
import { studentStore } from '../stores/studentStore'
import type { Student } from '../types'
import Sidebar from '../components/Sidebar.vue'

const rankedStudents = computed(() => studentStore.getRankedStudents())

const getStatusBadgeClass = (status: Student['status']) => {
  const baseClasses = 'px-2 py-1 rounded-full text-xs font-medium'
  switch (status) {
    case 'pending':
      return `${baseClasses} bg-amber-100 text-amber-800`
    case 'approved':
      return `${baseClasses} bg-green-100 text-green-800`
    case 'waitlisted':
      return `${baseClasses} bg-blue-100 text-blue-800`
    case 'rejected':
      return `${baseClasses} bg-red-100 text-red-800`
    default:
      return `${baseClasses} bg-gray-100 text-gray-800`
  }
}

const getRankBadgeClass = (rank: number) => {
  if (rank <= 3) return 'bg-yellow-100 text-yellow-800 border-yellow-200'
  if (rank <= 6) return 'bg-green-100 text-green-800 border-green-200'
  return 'bg-gray-100 text-gray-800 border-gray-200'
}
</script>