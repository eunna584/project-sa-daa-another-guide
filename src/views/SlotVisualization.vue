<template>
  <div v-if="!studentStore.isLoggedIn" class="flex items-center justify-center min-h-screen">
    <div class="text-center">
      <h2 class="text-2xl font-bold text-gray-800 mb-4">Access Denied</h2>
      <p class="text-gray-600 mb-4">Please login to access slot visualization.</p>
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
          <h1 class="text-2xl font-bold text-gray-800 mb-2">Slot Allocation Status</h1>
          <p class="text-gray-600">
            Total Slots: {{ slotData.totalSlots }} | Filled Slots: {{ slotData.filledSlots }} | Available Slots: {{ slotData.availableSlots }}
          </p>
        </div>

        <!-- Pie Chart -->
        <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
          <div class="flex flex-col items-center">
            <div class="relative">
              <div
                class="w-80 h-80 rounded-full"
                :style="pieChartStyles"
              ></div>
              <div class="absolute inset-0 flex items-center justify-center">
                <div class="bg-white rounded-full p-4 shadow-lg border-4 border-gray-100">
                  <div class="text-center">
                    <p class="text-sm text-gray-600">Available Slots</p>
                    <p class="text-2xl font-bold text-gray-800">{{ slotData.availableSlots }} slots</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div class="mt-6 flex items-center gap-6">
              <div class="flex items-center gap-2">
                <div class="w-4 h-4 bg-orange-500 rounded"></div>
                <span class="text-sm text-gray-700">Filled Slots</span>
              </div>
              <div class="flex items-center gap-2">
                <div class="w-4 h-4 bg-gray-300 rounded"></div>
                <span class="text-sm text-gray-700">Available Slots</span>
              </div>
            </div>
            
            <div class="mt-4 text-center">
              <p class="text-lg text-orange-600 font-semibold">
                Filled Slots: {{ filledPercentage.toFixed(1) }}%
              </p>
            </div>
          </div>
        </div>

        <!-- Key Statistics -->
        <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 class="text-xl font-bold text-gray-800 mb-6">Key Statistics</h2>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div class="text-center">
              <div class="text-3xl font-bold text-orange-600 mb-2">{{ slotData.totalSlots }}</div>
              <div class="text-gray-600">Total Capacity</div>
            </div>
            <div class="text-center">
              <div class="text-3xl font-bold text-green-600 mb-2">{{ slotData.studentsApproved }}</div>
              <div class="text-gray-600">Students Approved</div>
            </div>
            <div class="text-center">
              <div class="text-3xl font-bold text-gray-600 mb-2">{{ slotData.availableSlots }}</div>
              <div class="text-gray-600">Slots Remaining</div>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { studentStore, mockSlotData } from '../stores/studentStore'
import Sidebar from '../components/Sidebar.vue'

const slotData = mockSlotData

const filledPercentage = computed(() => (slotData.filledSlots / slotData.totalSlots) * 100)

const pieChartStyles = computed(() => ({
  background: `conic-gradient(
    #f97316 0deg ${filledPercentage.value * 3.6}deg,
    #e5e7eb ${filledPercentage.value * 3.6}deg 360deg
  )`
}))
</script>