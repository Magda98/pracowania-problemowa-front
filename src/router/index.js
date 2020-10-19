import Vue from "vue";
import VueRouter from "vue-router";
import Login from "../views/Login.vue";
import Register from "../views/Register.vue";
import About from "../views/About.vue";
import Home from "../views/Home.vue";
import KidsList from "../views/KidsList.vue";
import DishList from "../views/DishList.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/login",
    name: "Login",
    component: Login
  },
  {
    path: "/list",
    name: "KidsList",
    component: KidsList
  },
  {
    path: "/list/:id",
    name: "DishList",
    component: DishList
  },
  {
    path: "/register",
    name: "Register",
    component: Register
  },
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: About
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
