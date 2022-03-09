import React from 'react';
import {
	Box,
	Divider,
	ListItem,
	ListItemAvatar,
	ListItemText,
	ListSubheader,
	Menu,
	MenuItem,
	Typography
} from "@mui/material";
import {GetPartCategoriesQuery} from "../../../../../../services/schema";
import PartAvatar from "./part-avatar/part-avatar";

interface PartAvatarProps {
	part: GetPartCategoriesQuery["getPartCategories"][number]["parts"][number]
}

const PartImageContainer = (props: PartAvatarProps) => {
	const {part: p} = props
	
	const [contextMenu, setContextMenu] = React.useState<{
		mouseX: number;
		mouseY: number;
	} | null>(null);
	
	const handleMouseEvent = (event: React.MouseEvent) => {
		event.preventDefault()
		setContextMenu(
			contextMenu === null
				? {
					mouseX: event.clientX - 2,
					mouseY: event.clientY - 4,
				}
				: // repeated contextmenu when it is already open closes it with Chrome 84 on Ubuntu
					// Other native context menus might behave different.
					// With this behavior we prevent contextmenu from the backdrop to re-locale existing context menus.
				null,
		);
	}
	
	const handleClose = () => {
		setContextMenu(null);
	};
	
	const isEveryQuantityValid = p.components.every(component => {
		return component.component.current_quantity >= component.quantity
	})
	
	return (
			<>
				<Box
					sx={{textAlign: 'center', px: 2, py: 1 }}
					onContextMenu={handleMouseEvent}
				>
					<PartAvatar
						name={p.name}
						current_quantity={p.current_quantity}
						image_url={p.image_url}
						is_valid={isEveryQuantityValid}
					/>
					<Typography sx={{mt: 2, maxWidth: "5rem"}}>
						{
							p.name
						}
					</Typography>
				</Box>
				<Menu
					open={contextMenu !== null}
					onClose={handleClose}
					anchorReference="anchorPosition"
					anchorPosition={
						contextMenu !== null
							? { top: contextMenu.mouseY, left: contextMenu.mouseX }
							: undefined
					}
				>
					<MenuItem onClick={handleClose}>Craft</MenuItem>
					<MenuItem onClick={handleClose}>Add</MenuItem>
					<Divider />
					<ListSubheader>
						Components
					</ListSubheader>
					{
						p.components.map(component => {
							return (
								<ListItem key={component.component.part_id}
								
								
								>
									<ListItemAvatar>
										<PartAvatar
											name={component.component.name}
											current_quantity={component.component.current_quantity}
											image_url={component.component.image_url}
											size={'sm'}
											is_valid={component.component.current_quantity >= component.quantity}
										/>
									</ListItemAvatar>
									<ListItemText primary={component.component.name} />
									<Typography
										sx={{
											ml: 2
										}}
										variant={'subtitle2'}
									>
										{
											`x${component.quantity}`
										}
									</Typography>
								</ListItem>
							)
						})
					}
				</Menu>
			</>
	);
};

export default PartImageContainer;