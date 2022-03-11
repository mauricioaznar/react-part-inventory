import React from 'react';
import {
	Box,
	Divider,
	IconButton,
	List,
	ListItem,
	ListItemIcon,
	ListItemText,
	SwipeableDrawer,
	Toolbar
} from "@mui/material";
import InboxIcon from '@mui/icons-material/Inbox'
import MailIcon from '@mui/icons-material/Mail'
import {useCraftSideBarContext} from "./craft-side-bar-context";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";

const drawerWidth: number = 340;

const CraftSideBar = () => {
	const {
		open,
		setOpen
	} = useCraftSideBarContext()
	
	return (
		<SwipeableDrawer
			sx={{
				width: drawerWidth,
				flexShrink: 0,
				[`& .MuiDrawer-paper`]: {
					width: drawerWidth,
					boxSizing: "border-box",
				},
			}}
			variant={"temporary"}
			anchor={"right"}
			open={open}
			onClose={() => {setOpen(false)}}
			onOpen={() => {setOpen(true)}}
		>
			<Box
				role="presentation"
			>
				<Toolbar
					sx={{
						display: "flex",
						alignItems: "center",
						justifyContent: "flex-end",
						px: [1],
					}}
				>
					<IconButton onClick={() => { setOpen(!open) }}>
						<ChevronLeftIcon />
					</IconButton>
				</Toolbar>
				<List>
					{['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
						<ListItem button key={text}>
							<ListItemIcon>
								{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
							</ListItemIcon>
							<ListItemText primary={text} />
						</ListItem>
					))}
				</List>
				<Divider />
				<List>
					{['All mail', 'Trash', 'Spam'].map((text, index) => (
						<ListItem button key={text}>
							<ListItemIcon>
								{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
							</ListItemIcon>
							<ListItemText primary={text} />
						</ListItem>
					))}
				</List>
			</Box>
		</SwipeableDrawer>
	);
};

export default CraftSideBar;