import React from 'react';
import { Redirect } from "react-router-dom";

//Dashboard
import Dashboard from "../pages/Dashboard/index";

// Authentication related pages
import ForgetPwd from "../pages/Authentication/ForgetPassword";
import Login from "../pages/Authentication/Login";
import Logout from "../pages/Authentication/Logout";
import Register from "../pages/Authentication/Register";

//
import ApplicationNetwork from "pages/ApplicationNetwork";
import Overview from "pages/ApplicationNetwork/Application/Overview";
import CompanyHierarchy from "pages/Company";
import UserDetails from "pages/UserList/UserDetails";
import userProfile from "../pages/Authentication/user-profile";
import dmControls from "../pages/Dashboard/dm-controls-usecases";
import ProjectList from "../pages/ProjectList/Index";
import TemplatesList from "../pages/TemplatesList/Index";
import EmailVerification from "pages/Authentication/EmailVerification";
import ResetPassword from "pages/Authentication/ResetPassword";
import UserList from "../pages/UserList/Index";
import FindingAddEdit from "pages/ApplicationNetwork/Application/Finding/FindingAddEdit";

const userRoutes = [
  //dashboard
  { path: "/dashboard", component: Dashboard },

  //application/Network
  { path: "/applications", component: ApplicationNetwork },
  { path: "/application/:applicationId/overview", component: Overview },
  { path: "/application/:applicationId/add-finding", component: FindingAddEdit },

  //user
  { path: "/user-list", component: UserList },
  { path: "/user-list/user/:userId", component: UserDetails },

  //project
  { path: "/project-list", component: ProjectList },

  // template
  { path: "/templates-list", component: TemplatesList },

  //profile
  { path: "/profile", component: userProfile },


  { path: "/dm-controls", component: dmControls },

  //Company
  { path: "/company", component: CompanyHierarchy },

  // this route should be at the end of all other routes
  { path: "/", exact: true, component: () => <Redirect to="/dashboard" /> },
];

const authRoutes = [
  //authencation page
  { path: "/logout", component: Logout },
  { path: "/login", component: Login },
  { path: "/forgot-password", component: ForgetPwd },
  { path: "/reset-password/:token", component: ResetPassword },
  { path: "/register", component: Register },
  { path: "/email-verification/:token", component: EmailVerification },
];

export { userRoutes, authRoutes };
