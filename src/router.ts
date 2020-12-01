import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import Home from '@/views/Home.vue';
import About from '@/views/About.vue';
import Projects from '@/views/Projects.vue';
import AuditDAO from '@/views/subviews/AuditDAO.vue';
import Chains from '@/views/subviews/CHAINS.vue';
import Enreach from '@/views/subviews/Enreach.vue';
import Eris from '@/views/subviews/ERIS.vue';
import Iyield from '@/views/subviews/IYield.vue';
import Learn from '@/views/subviews/LEARN.vue';
import Lucent from '@/views/subviews/Lucent.vue';
import Nftyearn from '@/views/subviews/NFTYearn.vue';
import Radar from '@/views/subviews/RADAR.vue';
import Renascent from '@/views/subviews/Renascent.vue';
import Rules from '@/views/subviews/RULES.vue';
import Telikos from '@/views/subviews/Telikos.vue';

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  { path: '/', name: 'home', component: Home },
  { path: '/about', name: 'about', component: About },
  { path: '/auditdao', name: 'auditdao', component: AuditDAO },
  { path: '/chains', name: 'chains', component: Chains },
  { path: '/iyield', name: 'iyield', component: Iyield },
  { path: '/enreach', name: 'enreach', component: Enreach },
  { path: '/eris', name: 'eris', component: Eris },
  { path: '/learn', name: 'learn', component: Learn },
  { path: '/lucent', name: 'lucent', component: Lucent },
  { path: '/nftyearn', name: 'nftyearn', component: Nftyearn },
  { path: '/radar', name: 'radar', component: Radar },
  { path: '/renascent', name: 'renascent', component: Renascent },
  { path: '/rules', name: 'rules', component: Rules },
  { path: '/telikos', name: 'telikos', component: Telikos },
  { path: '/projects', name: 'projects', component: Projects }
];

const router = new VueRouter({
  routes
});

export default router;
