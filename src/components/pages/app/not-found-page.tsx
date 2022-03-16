import React from "react";
import { Box, Typography } from "@mui/material";

const NotFoundPage = () => {
    return (
        <Box
            sx={{
                flex: 1,
                justifyContent: "center",
                display: "flex",
                alignItems: "center",
            }}
            height={100}
        >
            <Typography variant={"h3"}>Not found</Typography>
        </Box>
    );
};

export default NotFoundPage;
