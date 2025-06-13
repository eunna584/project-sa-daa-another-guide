<template>
  <div class="w-64 bg-white shadow-lg border-r border-gray-200">
    <div class="p-6 border-b border-gray-200">
      <div class="flex items-center gap-3">
        <div class="w-10 h-10 bg-orange-500 rounded-lg flex items-center justify-center">
          <GraduationCap class="text-white" :size="24" />
        </div>
        <span class="text-lg font-bold text-gray-800">AlgoForDaSeat</span>
      </div>
    </div>

    <nav class="py-4">
      <router-link
        to="/dashboard"
        class="w-full flex items-center gap-3 px-4 py-3 text-left transition-all duration-200 hover:bg-orange-100"
        :class="{ 'bg-orange-50 text-orange-700 border-r-2 border-orange-500': $route.path === '/dashboard' }"
      >
        <LayoutDashboard :size="20" />
        <span class="text-sm font-medium">Dashboard</span>
      </router-link>

      <router-link
        to="/slot-visualization"
        class="w-full flex items-center gap-3 px-4 py-3 text-left transition-all duration-200 hover:bg-orange-100"
        :class="{ 'bg-orange-50 text-orange-700 border-r-2 border-orange-500': $route.path === '/slot-visualization' }"
      >
        <PieChart :size="20" />
        <span class="text-sm font-medium">Slot Visualization</span>
      </router-link>

      <div class="px-4 py-2 mt-6">
        <h3 class="text-xs font-semibold text-gray-400 uppercase tracking-wider">Applications</h3>
      </div>

      <router-link
        to="/pending-applications"
        class="w-full flex items-center gap-3 px-4 py-3 text-left transition-all duration-200 hover:bg-orange-100"
        :class="{ 'bg-orange-50 text-orange-700 border-r-2 border-orange-500': $route.path === '/pending-applications' }"
      >
        <Clock :size="20" />
        <span class="text-sm font-medium">Pending Applications</span>
      </router-link>

      <router-link
        to="/waitlisted-applications"
        class="w-full flex items-center gap-3 px-4 py-3 text-left transition-all duration-200 hover:bg-orange-100"
        :class="{ 'bg-orange-50 text-orange-700 border-r-2 border-orange-500': $route.path === '/waitlisted-applications' }"
      >
        <ListX :size="20" />
        <span class="text-sm font-medium">Waitlisted Applications</span>
      </router-link>

      <router-link
        to="/approved-applications"
        class="w-full flex items-center gap-3 px-4 py-3 text-left transition-all duration-200 hover:bg-orange-100"
        :class="{ 'bg-orange-50 text-orange-700 border-r-2 border-orange-500': $route.path === '/approved-applications' }"
      >
        <CheckCircle :size="20" />
        <span class="text-sm font-medium">Approved Applications</span>
      </router-link>

      <router-link
        to="/rejected-applications"
        class="w-full flex items-center gap-3 px-4 py-3 text-left transition-all duration-200 hover:bg-orange-100"
        :class="{ 'bg-orange-50 text-orange-700 border-r-2 border-orange-500': $route.path === '/rejected-applications' }"
      >
        <XCircle :size="20" />
        <span class="text-sm font-medium">Rejected Applications</span>
      </router-link>

      <router-link
        to="/application-rankings"
        class="w-full flex items-center gap-3 px-4 py-3 text-left transition-all duration-200 hover:bg-orange-100"
        :class="{ 'bg-orange-50 text-orange-700 border-r-2 border-orange-500': $route.path === '/application-rankings' }"
      >
        <BarChart3 :size="20" />
        <span class="text-sm font-medium">Application Rankings</span>
      </router-link>

      <div class="border-t border-gray-200 mt-6 pt-4">
        <button
          @click="logout"
          class="w-full flex items-center gap-3 px-4 py-3 text-left text-gray-600 hover:bg-gray-50 hover:text-red-600 transition-colors duration-200"
        >
          <LogOut :size="20" />
          <span class="text-sm font-medium">Logout</span>
        </button>
      </div>
    </nav>
  </div>
</template>

<script setup lang="ts">
import { 
  LayoutDashboard, 
  PieChart, 
  Clock, 
  ListX, 
  CheckCircle, 
  XCircle, 
  BarChart3, 
  LogOut,
  GraduationCap
} from 'lucide-vue-next'
import { studentStore } from '../stores/studentStore'
import { useRouter } from 'vue-router'

const router = useRouter()

const logout = () => {
  studentStore.logout()
  router.push('/')
}
</script>