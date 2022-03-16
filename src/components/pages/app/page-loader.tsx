import React from "react";
import { Box, CircularProgress } from "@mui/material";

const PageLoader = () => {
    return (
        <Box
            sx={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <CircularProgress size={190} />
        </Box>
    );
};

export default PageLoader;
