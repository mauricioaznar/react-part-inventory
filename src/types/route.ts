import React, { ReactElement } from "react";

export interface Route {
  title: string;
  icon?: ReactElement<any, any>;
  name: string;
  path: string;
  component?: React.ReactNode;
  exact?: boolean;
  navbar?: boolean;
}

export interface RouteGroup {
  title?: string;
  routes: Route[];
}
