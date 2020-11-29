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
import MyKidList from "../views/MyKidList.vue";
import Institutions from "../views/Institutions.vue";
import KidsListInstitution from "../views/KidsListInstitution.vue";
import OrdersList from "../views/OrdersList.vue";
import Stats from "../views/Stats.vue";

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
    path: "/kidlist",
    name: "MyKidList",
    component: MyKidList
  },
  {
    path: "/kidlistinstitution",
    name: "KidsListInstitution",
    component: KidsListInstitution
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
  },
  {
    path: "/institutions",
    name: "Institutions",
    component: Institutions
  },
  {
    path: "/orderslist",
    name: "OrdersList",
    component: OrdersList
  },
  {
    path: "/stats",
    name: "Stats",
    component: Stats
  }
];

const router = new VueRouter({
  mode: "hash",
  base: process.env.BASE_URL,
  routes
});

export default router;
