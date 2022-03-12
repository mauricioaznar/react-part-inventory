import React from 'react';
import {
	Box,
	Divider,
	IconButton,
	List,
	ListItem,
	ListItemButton,
	ListItemIcon,
	ListItemText,
	Modal,
	Toolbar
} from "@mui/material";
import InboxIcon from '@mui/icons-material/Inbox'
import MailIcon from '@mui/icons-material/Mail'
import {Query, useAddPartMutation, useCraftPartMutation} from "../../../../services/schema";
import {nameof} from "../../../../helpers/nameof";
import {useCraftSideBarContext} from "./craft-side-bar-context";
import Typography from "@mui/material/Typography";
import {useActions} from "../../../../hooks/redux-hooks/use-actions";
import ClearIcon from "@mui/icons-material/Clear";


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
		<Modal
			open={open}
			onClose={() => {setOpen(false)}}
		>
			<Box sx={{
				position: 'absolute',
				top: '50%',
				left: '50%',
				transform: 'translate(-50%, -50%)',
				width: 400,
				bgcolor: 'background.paper',
				borderRadius: "0.5rem",
				boxShadow: 24,
				overflow: "hidden"
			}}>
				<Toolbar
					sx={{
						display: "flex",
						alignItems: "center",
						bgcolor: 'secondary.main'
					}}
				>
					<Typography
						variant={'h4'}
						sx={{flexGrow: 1}}
					>
						{ mode }
					</Typography>
					<IconButton
						color="inherit"
						size={'small'}
						onClick={() => {
							setOpen(false)
						}}
					>
						<ClearIcon />
					</IconButton>
				</Toolbar>
				<Box>
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
				</Box>
			</Box>
		</Modal>
	);
};

export default CraftSideBar;