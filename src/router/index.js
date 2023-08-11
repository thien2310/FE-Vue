import { createRouter, createWebHistory } from "vue-router";
import admin from "./admin";
import home from "./home";
import { useUserStore } from "../store/use-user";


const routes = [...admin, ...home];

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeResolve((to, from) => {
  console.log(to.path);
  console.log(from.path);
})

router.beforeEach((to, from, next) => {
  const userStore = useUserStore();

  if (to.meta.requiresAdmin && !userStore.isAdmin) {
    // Chuyển hướng người dùng đến trang khác nếu không phải admin
    next({ name: 'home' }); // Thay 'Home' bằng route khác nếu cần
  } else {
    next(); // Cho phép truy cập nếu đủ quyền hoặc không yêu cầu quyền
  }
});

export default router;
