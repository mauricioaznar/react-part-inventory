import * as React from "react";
import { Route, Switch } from "react-router-dom";

// mui
import {
    Box,
    Container,
    Paper,
    Toolbar,
    useMediaQuery,
    useTheme,
} from "@mui/material";
import { staticRoutes } from "./static-routes";
import SubnauticaAppBar from "./app/subnautica-app-bar/subnautica-app-bar";
import SubnauticaDrawer from "./app/subnautica-drawer/subnautica-drawer";
import { useGetPartCategoriesQueryWithRoutes } from "./app/use-get-part-categories-query-with-routes";
import { GeneratePartContextProvider } from "./app/generate-part-form/i-generate-part-context/generate-part-context";
import GeneratePartForm from "./app/generate-part-form/generate-part-form";
import PageLoader from "./app/page-loader";
import NotFoundPage from "./app/not-found-page";
import { PartClickedContextProvider } from "./app/part-clicked-context/part-clicked-context";

export default function App() {
    const theme = useTheme();
    const mdAndUp = useMediaQuery(theme.breakpoints.up("lg"));

    const [open, setOpen] = React.useState(false);

    const toggleDrawer = () => {
        setOpen(!open);
    };

    const { categoriesRoutes, categoriesRouteGroup, hasSetupCompleted } =
        useGetPartCategoriesQueryWithRoutes();

    return (
        <Box sx={{ display: "flex" }}>
            <GeneratePartContextProvider>
                <PartClickedContextProvider>
                    <SubnauticaAppBar
                        isDesktop={mdAndUp}
                        toggleDrawer={toggleDrawer}
                    />
                    <SubnauticaDrawer
                        open={open}
                        setOpen={setOpen}
                        toggleDrawer={toggleDrawer}
                        isDesktop={mdAndUp}
                        categoriesRouteGroup={categoriesRouteGroup}
                    />

                    <Box
                        component="main"
                        sx={{
                            flexGrow: 1,
                            height: "100vh",
                            overflow: "auto",
                            display: "flex",
                            flexDirection: "column",
                        }}
                    >
                        <Toolbar />
                        <Container
                            maxWidth="lg"
                            sx={{
                                mt: 3,
                                mb: 3,
                                display: "flex",
                                flex: 1,
                            }}
                        >
                            <Paper
                                sx={{
                                    p: 2,
                                    flex: 1,
                                    display: "flex",
                                    flexDirection: "column",
                                }}
                            >
                                <Switch>
                                    {staticRoutes.map(
                                        ({
                                            name,
                                            path,
                                            component: Elem,
                                            exact,
                                        }) => {
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
                                        },
                                    )}
                                    {categoriesRoutes.map(
                                        ({
                                            name,
                                            path,
                                            component: Elem,
                                            exact,
                                        }) => {
                                            return (
                                                <Route
                                                    sensitive={true}
                                                    key={name}
                                                    path={path}
                                                    render={() => {
                                                        return Elem;
                                                    }}
                                                    exact={exact || false}
                                                />
                                            );
                                        },
                                    )}

                                    {!hasSetupCompleted ? (
                                        <Route render={PageLoader} path={"*"} />
                                    ) : (
                                        <Route
                                            render={NotFoundPage}
                                            path={"*"}
                                        />
                                    )}
                                </Switch>
                            </Paper>
                        </Container>
                    </Box>

                    <GeneratePartForm />
                </PartClickedContextProvider>
            </GeneratePartContextProvider>
        </Box>
    );
}
