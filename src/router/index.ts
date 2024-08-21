import {createRouter, createWebHashHistory} from 'vue-router';
const routes = [
    {
        path: '/',
        redirect: '/home',
    },
    {
        path: '/home',
        component: () => import('../pages/home.vue')
    },
    {
        path: '/detail',
        component: () => import('../pages/detail.vue')
    },
    {
      path: '/category',
      component: () => import('../pages/category.vue')
    },
    {
        path: '/timeList',
        component: () => import('../pages/timeList.vue')
    }
];

const router = createRouter({
    history: createWebHashHistory(), //替代之前的mode，是必须的
    routes
});
export default router;