import React from "react";
import { Box, Typography } from "@mui/material";
import ErdDiagram from "./erd.png";

export default function HomePage() {
    return (
        <Box display={"flex"} alignItems={"center"} flexDirection={"column"}>
            <Typography variant={"h3"} sx={{ mb: 3 }}>
                Entity relation diagram
            </Typography>
            <Box
                sx={{
                    maxWidth: "100%",
                    maxHeight: "80vh",
                    boxShadow: 10,
                    borderRadius: 1,
                }}
                component={"img"}
                alt={"erd"}
                src={ErdDiagram}
            />
        </Box>
    );
}
