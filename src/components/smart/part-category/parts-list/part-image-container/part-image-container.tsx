import React from "react";
import { Box, Divider, List, Menu, MenuItem, Typography } from "@mui/material";
import { GetPartCategoriesQuery } from "../../../../../services/schema";
import PartAvatar from "./part-avatar/part-avatar";
import { useGeneratePartContext } from "../../../../pages/app/generate-part-form/i-generate-part-context/generate-part-context";
import PartComponentsListItems from "./part-components-list-items/part-components-list-items";

interface PartAvatarProps {
    part: GetPartCategoriesQuery["getPartCategories"][number]["parts"][number];
}

const PartImageContainer = (props: PartAvatarProps) => {
    const { part } = props;
    const { initAdd, initCraft } = useGeneratePartContext();

    const [contextMenu, setContextMenu] = React.useState<{
        mouseX: number;
        mouseY: number;
    } | null>(null);

    const handleMouseEvent = (event: React.MouseEvent) => {
        event.preventDefault();
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
    };

    const handleClose = () => {
        setContextMenu(null);
    };

    const isEveryQuantityValid = part.components.every((component) => {
        return (
            component.component.current_quantity >= component.required_quantity
        );
    });

    const hasComponents = part.components.length > 0;

    return (
        <Box sx={{ mx: 2, my: 1 }}>
            <div onClick={handleMouseEvent} style={{ cursor: "pointer" }}>
                <Box sx={{ textAlign: "center" }}>
                    <PartAvatar
                        name={part.name}
                        current_quantity={part.current_quantity}
                        image_url={part.image_url}
                        is_valid={isEveryQuantityValid}
                    />
                    <Typography sx={{ mt: 2, maxWidth: "5rem" }}>
                        {part.name}
                    </Typography>
                </Box>
                <Menu
                    open={contextMenu !== null}
                    onClose={handleClose}
                    anchorReference="anchorPosition"
                    anchorPosition={
                        contextMenu !== null
                            ? {
                                  top: contextMenu.mouseY,
                                  left: contextMenu.mouseX,
                              }
                            : undefined
                    }
                >
                    <List>
                        {hasComponents ? (
                            <MenuItem
                                onClick={() => {
                                    initCraft(part);
                                    handleClose();
                                }}
                            >
                                Craft
                            </MenuItem>
                        ) : (
                            <MenuItem
                                onClick={() => {
                                    initAdd(part);
                                    handleClose();
                                }}
                            >
                                Farm
                            </MenuItem>
                        )}
                        {hasComponents ? (
                            <>
                                <Divider />
                                <PartComponentsListItems
                                    components={part.components}
                                />
                            </>
                        ) : null}
                    </List>
                </Menu>
            </div>
        </Box>
    );
};

export default PartImageContainer;
