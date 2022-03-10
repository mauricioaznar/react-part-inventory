import React from 'react';
import {
    Box,
    Divider, List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    ListSubheader,
    Menu,
    MenuItem,
    Typography
} from "@mui/material";
import {
    GetPartCategoriesQuery,
    Query,
    useAddPartMutation,
    useCraftPartMutation
} from "../../../../../../services/schema";
import PartAvatar from "./part-avatar/part-avatar";
import {nameof} from "../../../../../../helpers/nameof";

interface PartAvatarProps {
    part: GetPartCategoriesQuery["getPartCategories"][number]["parts"][number]
}

const PartImageContainer = (props: PartAvatarProps) => {
    const {part: p} = props

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

    const handleCraftClick = () => {
        void craftPartMutation({
            variables: {
                partId: p.part_id
            }
        })
        handleClose()
    }

    const handleAddMutation = () => {
        void addPartMutation({
            variables: {
                partId: p.part_id
            }
        })
        handleClose()
    }


    const isEveryQuantityValid = p.components.every(component => {
        return component.component.current_quantity >= component.required_quantity
    })

    const hasComponents = p.components.length > 0


    return (
        <div onContextMenu={handleMouseEvent}>
            <Box
                sx={{textAlign: 'center', px: 2, py: 1}}

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
                        ? {top: contextMenu.mouseY, left: contextMenu.mouseX}
                        : undefined
                }
            >
                <List>
                    {
                        hasComponents
                            ? <MenuItem
                                onClick={handleCraftClick}
                                disabled={isCraftMutationLoading || !isEveryQuantityValid}
                            >
                                Craft
                            </MenuItem>
                            : <MenuItem onClick={handleAddMutation} disabled={isAddMutationLoading}>Add</MenuItem>
                    }
                    {
                        hasComponents ?
                            <>
                                <Divider />
                                <ListSubheader>
                                    Components
                                </ListSubheader>
                                {
                                    p.components.map(component => {
                                        return (
                                            <ListItem key={component.component.part_id}>
                                                <ListItemAvatar>
                                                    <PartAvatar
                                                        name={component.component.name}
                                                        current_quantity={component.component.current_quantity}
                                                        image_url={component.component.image_url}
                                                        size={'sm'}
                                                        is_valid={component.component.current_quantity >= component.required_quantity}
                                                    />
                                                </ListItemAvatar>
                                                <ListItemText primary={component.component.name}/>
                                                <Typography
                                                    sx={{
                                                        ml: 2
                                                    }}
                                                    variant={'subtitle2'}
                                                >
                                                    {
                                                        `x${component.required_quantity}`
                                                    }
                                                </Typography>
                                            </ListItem>
                                        )
                                    })
                                }
                            </>
                            : null
                    }
                </List>
            </Menu>
        </div>
    );
};

export default PartImageContainer;