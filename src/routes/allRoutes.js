import React from "react";
import { Redirect } from "react-router-dom";

//Dashboard
import Dashboard from "../pages/Dashboard/index";

// Authentication related pages
import Login from "../pages/Authentication/Login";
import Logout from "../pages/Authentication/Logout";
import Register from "../pages/Authentication/Register";
import ForgetPwd from "../pages/Authentication/ForgetPassword";
import userProfile from "../pages/Authentication/user-profile";
import UserList from "../pages/UserList/UserList";
import ProjectList from "../pages/ProjectList/ProjectList";
import TemplatesList from "../pages/TemplatesList/TemplatesList";

import dmControls from "../pages/Dashboard/dm-controls-usecases";

const userRoutes = [
  //dashboard
  { path: "/dashboard", component: Dashboard },
  { path: "/user-list", component: UserList },
  { path: "/project-list", component: ProjectList },
  { path: "/templates-list", component: TemplatesList },

  //profile
  { path: "/profile", component: userProfile },

  { path: "/dm-controls", component: dmControls },

  // this route should be at the end of all other routes
  { path: "/", exact: true, component: () => <Redirect to="/dashboard" /> },
];

const authRoutes = [
  //authencation page
  { path: "/logout", component: Logout },
  { path: "/login", component: Login },
  { path: "/forgot-password", component: ForgetPwd },
  { path: "/register", component: Register },
];

export { userRoutes, authRoutes };
