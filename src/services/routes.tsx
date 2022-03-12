import * as React from "react";
import HomeIcon from "@mui/icons-material/Home";
import HomePage from "../components/views/home-page/home-page";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import UserList from "../components/views/auth/user-list";
import {Route, RouteGroup} from "../types/route";

export const routeGroups: RouteGroup[] = [
  {
    title: "Auth",
    routes: [
      {
        icon: <HomeIcon />,
        name: "HomePage",
        path: "/",
        component: <HomePage />,
        title: "HomePage",
        navbar: true,
        exact: true,
      },
      {
        icon: <PeopleAltIcon />,
        name: "UserList",
        path: "/users",
        component: <UserList />,
        navbar: true,
        title: "Users",
      },
    ],
  },
];

export const routes: Route[] = routeGroups.reduce((acc, curr) => {
  const routes = curr.routes;
  return acc.concat(routes);
}, [] as Route[]);
