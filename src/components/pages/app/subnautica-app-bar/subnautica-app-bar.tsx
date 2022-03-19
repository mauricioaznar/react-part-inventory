import React from 'react';
import './dot-flashing.css'
import {AppBar as MuiAppBar, Box, IconButton, Toolbar} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import SubnauticaTitle from "../subnautica-title/subnautica-title";
import LogoutIcon from "@mui/icons-material/Logout";
import {useApolloClient} from "@apollo/client";
import {useActions} from "../../../../hooks/redux-hooks/use-actions";

interface ISubnauticaAppBar {
    isDesktop: boolean;
    toggleDrawer: () => void;
    refetching: boolean;
}

const SubnauticaAppBar = (props: ISubnauticaAppBar) => {
    const { isDesktop, toggleDrawer, refetching } = props
    const client = useApolloClient();
    const {logout} = useActions();

    return (
        <MuiAppBar
            position="fixed"
            sx={{zIndex: (theme) => theme.zIndex.drawer + 1}}
        >
            <Toolbar
                sx={{
                    pr: "24px", // keep right padding when drawer closed
                }}
            >
                {!isDesktop ? (
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
                {
                    refetching ?
                        <Box className={'dot-flashing'} sx={{ mr: 4 }}/>
                        : null
                }
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
    );
};

export default SubnauticaAppBar;