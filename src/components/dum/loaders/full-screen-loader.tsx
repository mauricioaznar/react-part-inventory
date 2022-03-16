import React from "react";
import { Box, CircularProgress, Grid } from "@mui/material";

const FullScreenLoader = () => {
    return (
        <Box sx={{ height: "100vh" }}>
            <Grid
                container
                direction={"column"}
                justifyContent={"center"}
                sx={{ height: "100%" }}
                alignItems={"center"}
            >
                <Grid item>
                    <CircularProgress size={300} />
                </Grid>
            </Grid>
        </Box>
    );
};

export default FullScreenLoader;
