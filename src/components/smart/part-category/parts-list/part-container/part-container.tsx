import React from "react";
import { Box, Divider, List, Menu, MenuItem } from "@mui/material";
import { GetPartCategoriesQuery } from "../../../../../services/schema";
import PartAvatar from "./part-avatar/part-avatar";
import { useGeneratePartContext } from "../../../../pages/app/generate-part-form/i-generate-part-context/generate-part-context";
import PartComponentsListItems from "./part-components-list-items/part-components-list-items";
import { usePartClickedContext } from "../../../../pages/app/part-clicked-context/part-clicked-context";
import { useHistory } from "react-router-dom";
import { getPartCategoryRouteName } from "../../../../../helpers/get-part-category-route-name";

interface IPartContainer {
    part: GetPartCategoriesQuery["getPartCategories"][number]["parts"][number];
}

const PartContainer = (props: IPartContainer) => {
    const { part } = props;
    const { initAdd, initCraft } = useGeneratePartContext();
    const { partClicked, setPartClicked } = usePartClickedContext();
    const history = useHistory();

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
        <Box sx={{ mx: 2, my: 1, display: "flex", justifyContent: "center" }}>
            <Box
                onClick={handleMouseEvent}
                sx={{ cursor: "pointer", maxWidth: "5rem" }}
            >
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                    }}
                >
                    <PartAvatar
                        active={
                            partClicked !== null &&
                            partClicked.part_id === part.part_id
                        }
                        part_id={part.part_id}
                        name={part.name}
                        current_quantity={part.current_quantity}
                        image_url={part.image_url}
                        is_valid={isEveryQuantityValid}
                    />
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
                                    onComponentClick={(component) => {
                                        setPartClicked({
                                            part_id: component.part_id,
                                        });
                                        history.push(
                                            getPartCategoryRouteName(
                                                component.part_category_id,
                                            ),
                                        );
                                    }}
                                />
                            </>
                        ) : null}
                    </List>
                </Menu>
            </Box>
        </Box>
    );
};

export default PartContainer;
