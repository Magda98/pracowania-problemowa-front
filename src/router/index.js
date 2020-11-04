import Vue from "vue";
import VueRouter from "vue-router";
import Login from "../views/Login.vue";
import Register from "../views/Register.vue";
import About from "../views/About.vue";
import Home from "../views/Home.vue";
import Menu from "../views/Menu.vue";
import KidsList from "../views/KidsList.vue";
import DishList from "../views/DishList.vue";
import UserList from "../views/UserLists.vue";

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
    path: "/permissions",
    name: "UserList",
    component: UserList
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
    component: About
  },
  {
    path: "/menu",
    name: "Menu",
    component: Menu
  }
];

const router = new VueRouter({
  mode: "hash",
  base: process.env.BASE_URL,
  routes
});

export default router;
