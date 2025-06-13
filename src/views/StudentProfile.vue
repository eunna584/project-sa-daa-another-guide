<template>
  <div v-if="!studentStore.isLoggedIn" class="flex items-center justify-center min-h-screen">
    <div class="text-center">
      <h2 class="text-2xl font-bold text-gray-800 mb-4">Access Denied</h2>
      <p class="text-gray-600 mb-4">Please login to access student profiles.</p>
      <router-link to="/" class="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-lg font-medium transition-colors duration-200">
        Go to Login
      </router-link>
    </div>
  </div>

  <div v-else-if="!student" class="flex items-center justify-center min-h-screen">
    <div class="text-center">
      <h2 class="text-2xl font-bold text-gray-800 mb-4">Student Not Found</h2>
      <p class="text-gray-600 mb-4">The requested student profile could not be found.</p>
      <router-link to="/dashboard" class="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-lg font-medium transition-colors duration-200">
        Back to Dashboard
      </router-link>
    </div>
  </div>

  <div v-else class="flex min-h-screen bg-gray-50">
    <Sidebar />
    <main class="flex-1 p-6">
      <div class="space-y-6">
        <!-- Header -->
        <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div class="flex items-center gap-4 mb-4">
            <button
              @click="goBack"
              class="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors duration-200"
            >
              <ArrowLeft :size="20" />
              Back to List
            </button>
          </div>
          
          <div class="flex items-center gap-6">
            <img
              :src="student.profileImage"
              :alt="student.fullName"
              class="w-20 h-20 rounded-full object-cover border-4 border-orange-100"
            />
            <div>
              <h1 class="text-2xl font-bold text-gray-800">{{ student.fullName }}</h1>
              <p class="text-gray-600">Application ID: {{ student.applicationId }}</p>
            </div>
          </div>
        </div>

        <!-- Application Details -->
        <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div class="flex items-center justify-between mb-4">
            <h2 class="text-xl font-bold text-gray-800">Application Details</h2>
            <span :class="getStatusBadgeClass(student.status)">
              {{ student.status.charAt(0).toUpperCase() + student.status.slice(1) }}
            </span>
          </div>
          
          <p class="text-gray-600 mb-6">
            Submitted on: {{ student.submissionDate }}
          </p>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div v-for="(item, index) in detailItems" :key="index" class="flex items-start gap-3">
              <div class="p-2 bg-gray-50 rounded-lg">
                <component :is="item.icon" :class="item.color" :size="20" />
              </div>
              <div>
                <p class="text-sm font-medium text-gray-600">{{ item.label }}</p>
                <p class="text-gray-800 font-medium">{{ item.value }}</p>
              </div>
            </div>
          </div>

          <div class="mt-6 pt-6 border-t border-gray-200">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div v-for="(item, index) in scoreItems" :key="index" class="flex items-start gap-3">
                <div class="p-2 bg-gray-50 rounded-lg">
                  <component :is="item.icon" :class="item.color" :size="20" />
                </div>
                <div>
                  <p class="text-sm font-medium text-gray-600">{{ item.label }}</p>
                  <p class="text-gray-800 font-medium">{{ item.value }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Manage Application Status -->
        <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 class="text-xl font-bold text-gray-800 mb-2">Manage Application Status</h2>
          <p class="text-gray-600 mb-6">Update the student's application status.</p>
          
          <div class="flex items-center gap-4 mb-4">
            <select
              v-model="selectedStatus"
              @change="handleStatusChange"
              class="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
            >
              <option value="pending">Pending</option>
              <option value="approved">Approved</option>
              <option value="waitlisted">Waitlisted</option>
              <option value="rejected">Rejected</option>
            </select>
            
            <button
              v-if="hasUnsavedChanges"
              @click="saveStatus"
              class="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200 flex items-center gap-2"
            >
              <Save :size="16" />
              Save Status
            </button>

            <div v-if="saveMessage" class="text-green-600 font-medium">
              {{ saveMessage }}
            </div>
          </div>

          <button
            class="text-gray-600 hover:text-gray-800 flex items-center gap-2 transition-colors duration-200"
          >
            <Edit :size="16" />
            Edit Application Data (Future)
          </button>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { ArrowLeft, User, MapPin, School, DollarSign, Target, Users, Save, Edit } from 'lucide-vue-next'
import { studentStore } from '../stores/studentStore'
import type { Student } from '../types'
import Sidebar from '../components/Sidebar.vue'

const route = useRoute()
const router = useRouter()

const student = ref<Student | undefined>()
const selectedStatus = ref<Student['status']>('pending')
const hasUnsavedChanges = ref(false)
const saveMessage = ref('')

onMounted(() => {
  const studentId = route.params.id as string
  student.value = studentStore.getStudentById(studentId)
  if (student.value) {
    selectedStatus.value = student.value.status
  }
})

const detailItems = computed(() => {
  if (!student.value) return []
  
  return [
    {
      icon: User,
      label: 'Full Name',
      value: student.value.fullName,
      color: 'text-blue-600'
    },
    {
      icon: MapPin,
      label: 'Address',
      value: student.value.address,
      color: 'text-green-600'
    },
    {
      icon: School,
      label: 'School Attended',
      value: student.value.schoolAttended,
      color: 'text-purple-600'
    },
    {
      icon: Users,
      label: 'Parent/Guardian Names',
      value: student.value.parentGuardianNames,
      color: 'text-orange-600'
    }
  ]
})

const scoreItems = computed(() => {
  if (!student.value) return []
  
  return [
    {
      icon: Target,
      label: 'Grades/GPA',
      value: student.value.grades.toString(),
      color: 'text-indigo-600'
    },
    {
      icon: Target,
      label: 'Entrance Exam Score',
      value: student.value.entranceExamScore.toString(),
      color: 'text-green-600'
    },
    {
      icon: DollarSign,
      label: 'Household Monthly Income',
      value: `₱${student.value.householdIncome.toLocaleString()}`,
      color: 'text-amber-600'
    },
    {
      icon: MapPin,
      label: 'Proximity to School (km)',
      value: `${student.value.proximityToSchool} km`,
      color: 'text-red-600'
    }
  ]
})

const getStatusBadgeClass = (status: Student['status']) => {
  const baseClasses = 'px-3 py-1 rounded-full text-sm font-medium'
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

const handleStatusChange = () => {
  if (student.value) {
    hasUnsavedChanges.value = selectedStatus.value !== student.value.status
    saveMessage.value = ''
  }
}

const saveStatus = () => {
  if (student.value && hasUnsavedChanges.value) {
    const success = studentStore.updateStudentStatus(student.value.id, selectedStatus.value)
    if (success) {
      student.value.status = selectedStatus.value
      hasUnsavedChanges.value = false
      saveMessage.value = 'Status updated successfully!'
      
      // Clear message after 3 seconds
      setTimeout(() => {
        saveMessage.value = ''
      }, 3000)
    }
  }
}

const goBack = () => {
  router.go(-1)
}
</script>