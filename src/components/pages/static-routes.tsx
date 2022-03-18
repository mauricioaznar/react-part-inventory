import * as React from "react";
import HomeIcon from "@mui/icons-material/Home";
import SchemaIcon from "@mui/icons-material/Schema";
import ScienceIcon from "@mui/icons-material/Science";
import HomePage from "./home-page/home-page";
import { Route, RouteGroup } from "../../types/route";
import ErDiagramPage from "./technical/er-diagram-page";
import TestingPage from "./home-page/testing-page";

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
            },
            {
                icon: <ScienceIcon />,
                name: "TestingPage",
                path: "/testing",
                component: <TestingPage />,
                title: "Testing",
                navbar: true,
                exact: true,
            },
        ],
    },
    {
        title: "Technical features",
        routes: [
            {
                icon: <SchemaIcon />,
                name: "ErDiagramPage",
                path: "/erd",
                component: <ErDiagramPage />,
                title: "Er diagram",
                navbar: true,
                exact: true,
            },
        ],
    },
];

export const staticRoutes: Route[] = staticRouteGroups.reduce((acc, curr) => {
    const routes = curr.routes;
    return acc.concat(routes);
}, [] as Route[]);
