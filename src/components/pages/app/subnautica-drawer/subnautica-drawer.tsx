import React from "react";
import {
    CircularProgress,
    Divider,
    IconButton,
    Link,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    ListSubheader,
    SwipeableDrawer as MuiDrawer,
    Toolbar,
    useTheme,
} from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { staticRouteGroups } from "../../static-routes";
import CopyrightIcon from "@mui/icons-material/Copyright";
import { NavLink as RouterLink, useLocation } from "react-router-dom";
import { RouteGroup } from "../../../../types/route";

interface ISubnauticaDrawer {
    open: boolean;
    setOpen: (open: boolean) => void;
    toggleDrawer: () => void;
    isDesktop: boolean;
    categoriesRouteGroup: RouteGroup;
}

const drawerWidth: number = 240;

const SubnauticaDrawer = (props: ISubnauticaDrawer) => {
    const { open, setOpen, isDesktop, toggleDrawer, categoriesRouteGroup } =
        props;

    return (
        <MuiDrawer
            variant={isDesktop ? "permanent" : "temporary"}
            open={open}
            onClose={() => {
                setOpen(false);
            }}
            onOpen={() => {
                setOpen(true);
            }}
            sx={{
                width: drawerWidth,
                flexShrink: 0,
                [`& .MuiDrawer-paper`]: {
                    width: drawerWidth,
                    boxSizing: "border-box",
                },
            }}
        >
            <Toolbar
                sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-end",
                    px: [1],
                }}
            >
                <IconButton onClick={toggleDrawer}>
                    <ChevronLeftIcon />
                </IconButton>
            </Toolbar>
            {staticRouteGroups.map((rg, index) => {
                return (
                    <React.Fragment key={index}>
                        <List>
                            {rg.title ? (
                                <ListSubheader>{rg.title}</ListSubheader>
                            ) : null}
                            {rg.routes
                                .filter((route) => route.navbar === true)
                                .map((route) => {
                                    return (
                                        <ListItemLink
                                            key={route.name}
                                            primary={route.title}
                                            icon={route.icon}
                                            to={route.path}
                                            onClick={() => {
                                                setOpen(false);
                                            }}
                                        />
                                    );
                                })}
                        </List>
                        <Divider />
                    </React.Fragment>
                );
            })}
            {
                <React.Fragment>
                    <List>
                        <ListSubheader>
                            {categoriesRouteGroup.title}
                        </ListSubheader>
                        {categoriesRouteGroup.routes.length > 0 ? (
                            categoriesRouteGroup.routes
                                .filter((route) => route.navbar === true)
                                .map((route) => {
                                    return (
                                        <ListItemLink
                                            key={route.name}
                                            primary={route.title}
                                            icon={route.icon}
                                            to={route.path}
                                            onClick={() => {
                                                setOpen(false);
                                            }}
                                        />
                                    );
                                })
                        ) : (
                            <ListItem
                                sx={{
                                    display: "flex",
                                    justifyContent: "center",
                                }}
                            >
                                <CircularProgress />
                            </ListItem>
                        )}
                    </List>
                    <Divider />
                </React.Fragment>
            }
            <List style={{ marginTop: `auto` }}>
                <ListItem dense>
                    <ListItemIcon>
                        <CopyrightIcon />
                    </ListItemIcon>
                    <ListItemText>
                        <Link color="inherit" href="https://www.mauaznar.com/">
                            Mau Aznar
                        </Link>
                        {"   "}
                        {new Date().getFullYear()}
                        {"."}
                    </ListItemText>
                </ListItem>
            </List>
        </MuiDrawer>
    );
};

export default SubnauticaDrawer;

interface ListItemLinkProps {
    icon?: React.ReactElement;
    primary: string;
    to: string;
    exact?: boolean;
    onClick: () => void;
}

function ListItemLink(props: ListItemLinkProps) {
    const { icon, primary, to, exact } = props;
    const theme = useTheme();
    const location = useLocation();

    return (
        <li>
            <ListItemButton
                dense
                strict
                to={to}
                component={RouterLink}
                role={undefined}
                exact={exact || false}
                onClick={props.onClick}
            >
                {icon ? (
                    <ListItemIcon
                        style={{
                            color:
                                location.pathname === to
                                    ? theme.palette.primary.main
                                    : "unset",
                        }}
                    >
                        {icon}
                    </ListItemIcon>
                ) : null}
                <ListItemText
                    primary={primary}
                    style={{
                        color:
                            location.pathname === to
                                ? theme.palette.primary.main
                                : "unset",
                    }}
                />
            </ListItemButton>
        </li>
    );
}
