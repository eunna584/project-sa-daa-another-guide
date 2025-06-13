import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'
import './style.css'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: () => import('./views/LandingPage.vue') },
    { path: '/dashboard', component: () => import('./views/Dashboard.vue') },
    { path: '/slot-visualization', component: () => import('./views/SlotVisualization.vue') },
    { path: '/pending-applications', component: () => import('./views/StudentList.vue'), props: { status: 'pending' } },
    { path: '/waitlisted-applications', component: () => import('./views/StudentList.vue'), props: { status: 'waitlisted' } },
    { path: '/approved-applications', component: () => import('./views/StudentList.vue'), props: { status: 'approved' } },
    { path: '/rejected-applications', component: () => import('./views/StudentList.vue'), props: { status: 'rejected' } },
    { path: '/application-rankings', component: () => import('./views/ApplicationRankings.vue') },
    { path: '/student/:id', component: () => import('./views/StudentProfile.vue'), props: true }
  ]
})

createApp(App).use(router).mount('#app')