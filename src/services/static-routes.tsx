import * as React from "react";
import HomeIcon from "@mui/icons-material/Home";
import HomePage from "../components/views/home-page/home-page";
import {Route, RouteGroup} from "../types/route";

export const staticRouteGroups: RouteGroup[] = [
  {
    routes: [
      {
        icon: <HomeIcon />,
        name: "HomePage",
        path: "/",
        component: <HomePage />,
        title: "Home",
        navbar: true,
        exact: true,
      }
    ],
  },
];

export const staticRoutes: Route[] = staticRouteGroups.reduce((acc, curr) => {
  const routes = curr.routes;
  return acc.concat(routes);
}, [] as Route[]);
