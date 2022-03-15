import * as React from "react";
import {LinkProps as RouterLinkProps, NavLink as RouterLink, Route, Switch, useLocation,} from "react-router-dom";
import {useApolloClient} from "@apollo/client";

// mui
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import LogoutIcon from "@mui/icons-material/Logout";
import CopyrightIcon from "@mui/icons-material/Copyright";
import MenuIcon from "@mui/icons-material/Menu";
import {
    AppBar as MuiAppBar,
    Box,
    Container,
    Divider,
    Grid,
    IconButton,
    Link,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    ListSubheader,
    Paper,
    SwipeableDrawer as MuiDrawer,
    Toolbar,
    useMediaQuery,
    useTheme,
} from "@mui/material";

import {useActions} from "../../hooks/redux-hooks/use-actions";
import {routeGroups, routes} from "../../services/routes";
import SubnauticaTitle from "./app/subnautica-title/subnautica-title";

const drawerWidth: number = 240;

export default function App() {
    const theme = useTheme();
    const mdAndUp = useMediaQuery(theme.breakpoints.up("lg"));

    const [open, setOpen] = React.useState(false);
    const toggleDrawer = () => {
        setOpen(!open);
    };

    const client = useApolloClient();

    const {logout} = useActions();

    return (
        <Box sx={{display: "flex"}}>
            <MuiAppBar
                position="fixed"
                sx={{zIndex: (theme) => theme.zIndex.drawer + 1}}
            >
                <Toolbar
                    sx={{
                        pr: "24px", // keep right padding when drawer closed
                    }}
                >
                    {!mdAndUp ? (
                        <IconButton
                            edge="start"
                            color="inherit"
                            aria-label="open drawer"
                            onClick={toggleDrawer}
                            sx={{
                                marginRight: "36px",
                            }}
                        >
                            <MenuIcon/>
                        </IconButton>
                    ) : null}

                    <SubnauticaTitle />
                    <IconButton
                        color="inherit"
                        onClick={async () => {
                            await client.clearStore();
                            logout();
                        }}
                    >
                        <LogoutIcon/>
                    </IconButton>
                </Toolbar>
            </MuiAppBar>


            <MuiDrawer
                variant={mdAndUp ? "permanent" : "temporary"}
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
                        <ChevronLeftIcon/>
                    </IconButton>
                </Toolbar>
                {routeGroups.map((rg, index) => {
                    return (
                        <React.Fragment key={index}>
                            <List>
                                {
                                    rg.title ?
                                        <ListSubheader>{rg.title}</ListSubheader>
                                        : null
                                }
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
                            <Divider/>
                        </React.Fragment>
                    );
                })}
                <List style={{marginTop: `auto`}}>
                    <ListItem dense>
                        <ListItemIcon>
                            <CopyrightIcon/>
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
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    height: "100vh",
                    overflow: "auto",
                }}
            >
                <Toolbar/>
                <Container maxWidth="lg" sx={{mt: 4, mb: 4}}>
                    <Grid container spacing={3} justifyContent={"center"}>
                        <Grid item xs>
                            <Paper
                                sx={{
                                    p: 2,
                                    display: "flex",
                                    flexDirection: "column",
                                    justifyContent: "stretch",
                                    minHeight: "50vh",
                                }}
                            >
                                <Switch>
                                    {routes.map(({name, path, component: Elem, exact}) => {
                                        return (
                                            <Route
                                                key={name}
                                                path={path}
                                                render={() => {
                                                    return Elem;
                                                }}
                                                exact={exact || false}
                                            />
                                        );
                                    })}
                                </Switch>
                            </Paper>
                        </Grid>
                    </Grid>
                </Container>
            </Box>
        </Box>
    );
}

interface ListItemLinkProps {
    icon?: React.ReactElement;
    primary: string;
    to: string;
    exact?: boolean;
    onClick: () => void;
}

function ListItemLink(props: ListItemLinkProps) {
    const {icon, primary, to, exact} = props;
    const theme = useTheme();
    const location = useLocation();

    const renderLink = React.useMemo(
        () =>
            React.forwardRef<HTMLAnchorElement, Omit<RouterLinkProps, "to">>(
                function Link(itemProps, ref) {
                    return (
                        <RouterLink
                            strict
                            to={to}
                            ref={ref}
                            {...itemProps}
                            role={undefined}
                            exact={exact || false}
                            onClick={props.onClick}
                        />
                    );
                },
            ),
        [to],
    );

    return (
        <li>
            <ListItem button component={renderLink}>
                {icon ? (
                    <ListItemIcon
                        style={{
                            color:
                                location.pathname === to ? theme.palette.primary.main : "unset",
                        }}
                    >
                        {icon}
                    </ListItemIcon>
                ) : null}
                <ListItemText
                    primary={primary}
                    style={{
                        color:
                            location.pathname === to ? theme.palette.primary.main : "unset",
                    }}
                />
            </ListItem>
        </li>
    );
}
