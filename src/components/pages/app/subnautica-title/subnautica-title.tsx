import React from 'react';
import './subnautica-title.css'
import {Box, Typography} from "@mui/material";

const SubnauticaTitle = () => {
    return (
        <Typography
            component="h2"
            variant="h2"
            color="inherit"
            noWrap
            sx={{flexGrow: 1, fontSize: "3.2rem", ml: 3}}
            className={'subnautica-title'}
        >
            <Box component={'span'} className={'red-to-yellow-text s-letter subnautica-left'}>S</Box>
            <Box component={'span'} className={'red-to-yellow-text first-u-letter subnautica-left'}>u</Box>
            <Box component={'span'} className={'red-to-yellow-text b-letter subnautica-left'}>b</Box>
            <Box component={"span"} className={"blue-to-white-text n-letter subnautica-left"}>n</Box>
            <Box component={"span"} className={"blue-to-white-text first-a-letter subnautica-left"}>a</Box>
            <Box component={"span"} className={"blue-to-white-text second-u-letter subnautica-right"}>u</Box>
            <Box component={"span"} className={"blue-to-white-text t-letter subnautica-right"}>t</Box>
            <Box component={"span"} className={"blue-to-white-text i-letter subnautica-right"}>i</Box>
            <Box component={"span"} className={"blue-to-white-text c-letter subnautica-right"}>c</Box>
            <Box component={"span"} className={"blue-to-white-text second-a-letter subnautica-right"}>a</Box>
        </Typography>
    )
};

export default SubnauticaTitle;