<template>
  <div v-if="!studentStore.isLoggedIn" class="flex items-center justify-center min-h-screen">
    <div class="text-center">
      <h2 class="text-2xl font-bold text-gray-800 mb-4">Access Denied</h2>
      <p class="text-gray-600 mb-4">Please login to access student lists.</p>
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
          <h1 class="text-2xl font-bold text-orange-600 mb-2">{{ title }}</h1>
          <p class="text-gray-600">{{ subtitle }}</p>
        </div>

        <!-- Students Table -->
        <div class="bg-white rounded-lg shadow-sm border border-gray-200">
          <div class="p-6 border-b border-gray-200">
            <div class="flex items-center gap-2">
              <span class="text-2xl">{{ getStatusIcon() }}</span>
              <h2 class="text-lg font-bold text-gray-800">
                {{ title.split(' ')[0] }} ({{ filteredStudents.length }})
              </h2>
            </div>
            <p class="text-sm text-gray-600 mt-1">
              {{ filteredStudents.length === 0 
                ? `No ${title.toLowerCase()} at this time.`
                : `These applications are qualified but are currently on the ${title.toLowerCase().includes('waitlist') ? 'waitlist due to slot limitations' : 'list'}.`
              }}
            </p>
          </div>

          <div v-if="filteredStudents.length > 0" class="overflow-x-auto">
            <table class="w-full">
              <thead class="bg-gray-50">
                <tr>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Full Name
                  </th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    School
                  </th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    GPA
                  </th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Exam Score
                  </th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Submission Date
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
                <tr v-for="student in filteredStudents" :key="student.id" class="hover:bg-gray-50">
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="flex items-center">
                      <img
                        class="h-10 w-10 rounded-full object-cover"
                        :src="student.profileImage"
                        :alt="student.fullName"
                      />
                      <div class="ml-4">
                        <div class="text-sm font-medium text-gray-900">
                          {{ student.fullName }}
                        </div>
                        <div class="text-sm text-gray-500">
                          ID: {{ student.applicationId }}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="flex items-center">
                      <School :size="16" class="text-gray-400 mr-2" />
                      <div class="text-sm text-gray-900">{{ student.schoolAttended }}</div>
                    </div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="flex items-center">
                      <Award :size="16" class="text-gray-400 mr-2" />
                      <div class="text-sm text-gray-900">{{ student.grades }}</div>
                    </div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {{ student.entranceExamScore }}
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {{ student.submissionDate }}
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
                      View
                    </router-link>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div v-if="filteredStudents.length > 0" class="px-6 py-3 bg-gray-50 border-t border-gray-200">
            <p class="text-sm text-gray-500">
              Showing {{ filteredStudents.length }} {{ title.toLowerCase() }}.
            </p>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { Eye, School, Award } from 'lucide-vue-next'
import { studentStore } from '../stores/studentStore'
import type { Student } from '../types'
import Sidebar from '../components/Sidebar.vue'

const route = useRoute()

const currentStatus = computed(() => {
  const path = route.path
  if (path.includes('pending')) return 'pending'
  if (path.includes('waitlisted')) return 'waitlisted'
  if (path.includes('approved')) return 'approved'
  if (path.includes('rejected')) return 'rejected'
  return 'pending'
})

const title = computed(() => {
  switch (currentStatus.value) {
    case 'pending': return 'Pending Applications'
    case 'waitlisted': return 'Waitlisted Applications'
    case 'approved': return 'Approved Applications'
    case 'rejected': return 'Rejected Applications'
    default: return 'Applications'
  }
})

const subtitle = computed(() => {
  switch (currentStatus.value) {
    case 'pending': return 'Applications awaiting review and decision'
    case 'waitlisted': return 'Applications awaiting slot availability'
    case 'approved': return 'Students accepted into the program'
    case 'rejected': return 'Applications that did not meet admission criteria'
    default: return 'Student applications'
  }
})

const filteredStudents = computed(() => {
  return studentStore.getStudentsByStatus(currentStatus.value)
})

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

const getStatusIcon = () => {
  switch (currentStatus.value) {
    case 'pending': return '⏳'
    case 'waitlisted': return '📋'
    case 'approved': return '✅'
    case 'rejected': return '❌'
    default: return '📄'
  }
}
</script>