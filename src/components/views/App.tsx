import * as React from "react";
import {Route, Switch,} from "react-router-dom";

// mui
import {Box, Container, Grid, Paper, Toolbar, useMediaQuery, useTheme,} from "@mui/material";
import {staticRoutes} from "../../services/static-routes";
import SubnauticaAppBar from "./app/subnautica-app-bar/subnautica-app-bar";
import SubnauticaDrawer from "./app/subnautica-drawer/subnautica-drawer";
import {useGetPartCategoriesQueryWithRoutes} from "./app/use-get-part-categories-query-with-routes";
import {
    GeneratePartContextProvider
} from "./home-page/generate-part-form/i-generate-part-context/generate-part-context";
import GeneratePartForm from "./home-page/generate-part-form/generate-part-form";


export default function App() {
    const theme = useTheme();
    const mdAndUp = useMediaQuery(theme.breakpoints.up("lg"));

    const [open, setOpen] = React.useState(false);

    const toggleDrawer = () => {
        setOpen(!open);
    };



    const {
        categoriesRoutes,
        categoriesRouteGroup
    } = useGetPartCategoriesQueryWithRoutes()

    return (
        <Box sx={{display: "flex"}}>

            <GeneratePartContextProvider>
                <SubnauticaAppBar  isDesktop={mdAndUp} toggleDrawer={toggleDrawer} />
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
                                        {
                                            staticRoutes.map(({name, path, component: Elem, exact}) => {
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
                                            })
                                        }
                                        {
                                            categoriesRoutes.map(({name, path, component: Elem, exact}) => {
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
                                            })
                                        }
                                    </Switch>
                                </Paper>
                            </Grid>
                        </Grid>
                    </Container>
                </Box>

                <GeneratePartForm />

            </GeneratePartContextProvider>
        </Box>
    );
}

