import React from 'react';
import {
	Divider,
	IconButton,
	List,
	ListItem,
	ListItemButton,
	ListItemIcon,
	ListItemText,
	SwipeableDrawer,
	Toolbar
} from "@mui/material";
import InboxIcon from '@mui/icons-material/Inbox'
import MailIcon from '@mui/icons-material/Mail'
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import {Query, useAddPartMutation, useCraftPartMutation} from "../../../../services/schema";
import {nameof} from "../../../../helpers/nameof";
import {useCraftSideBarContext} from "./craft-side-bar-context";
import Typography from "@mui/material/Typography";
import {useActions} from "../../../../hooks/redux-hooks/use-actions";

const drawerWidth: number = 340;

const CraftSideBar = () => {
	const { open, setOpen, mode, part } = useCraftSideBarContext()

	const { pushSuccessMessage } = useActions()

	const [craftPartMutation, {loading: isCraftMutationLoading}] = useCraftPartMutation({
		update(cache) {
			cache.evict({
				id: "ROOT_QUERY",
				fieldName: nameof<Query>("getPartCategories"),
			});
		},
	})

	const [addPartMutation, {loading: isAddMutationLoading}] = useAddPartMutation({
		update(cache) {
			cache.evict({
				id: "ROOT_QUERY",
				fieldName: nameof<Query>("getPartCategories"),
			});
		},
	})

	async function handleSubmit () {
		try {
			if (mode === 'craft' && part !== null) {
				await craftPartMutation({
					variables: {
						partId: part.part_id
					}
				})
				pushSuccessMessage(`${part.name} successfully crafted!`)
			} else if (mode === 'add' && part !== null) {
				await addPartMutation({
					variables: {
						partId: part.part_id
					}
				})
				pushSuccessMessage(`${part.name} successfully added!`)
			}
		} catch (e) {
			console.error(e)
		}
	}
	
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
			<Toolbar
				sx={{
					display: "flex",
					alignItems: "center",
					justifyContent: "flex-end",
					px: [1],
				}}
			>
				<IconButton onClick={() => {
					setOpen(!open)
				}}>
					<ChevronLeftIcon />
				</IconButton>
			</Toolbar>
			<List>
				<ListItem>
					<ListItemText
						primary={
							<Typography variant={'h4'}>
								{ mode }
							</Typography>
						}
					/>
				</ListItem>
			</List>

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
			<List style={{marginTop: `auto`}}>
				<ListItemButton
					onClick={handleSubmit}
					disabled={isAddMutationLoading || isCraftMutationLoading}
				>
					<ListItemText>Submit</ListItemText>
				</ListItemButton>
			</List>
		</SwipeableDrawer>
	);
};

export default CraftSideBar;