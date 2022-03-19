import React from 'react';
import {Box, styled} from "@mui/material";

const StyledBox = styled(Box)(({ theme,  }) => ({
    "&.dot-flashing": {
        position: "relative",
        width: "10px",
        height: "10px",
        "borderRadius": "5px",
        "backgroundColor":   theme.palette.background.default,
        "color":   theme.palette.background.default,
        animation: "dotFlashing 1s infinite linear alternate",
        "animationDelay": ".5s",
        "&::before, &::after": {
            content: '""',
            display: "inline-block",
            position: "absolute",
            "backgroundColor":   theme.palette.background.default,
            "color":   theme.palette.background.default,
            top: 0,
            width: "10px",
            height: "10px",
            "borderRadius": "5px",
        },
        "&::before": {
            "left": "-15px",
            animation: "dotFlashing 1s infinite alternate",
            "animationDelay": "0s",
        },
        "&::after": {
            left: "15px",
            animation: "dotFlashing 1s infinite alternate",
            "animationDelay": "1s",
        }
    },
    "@keyframes dotFlashing": {
        "0%": {
            "backgroundColor":  theme.palette.background.default,
        },
        "50%, 100%": {
            "backgroundColor":  theme.palette.text.primary,
        },
    },
}));

const DotFlashingLoader = () => {
    return (
        <StyledBox className={'dot-flashing'} />
    );
};

export default DotFlashingLoader;