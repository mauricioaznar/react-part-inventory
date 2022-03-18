import React from "react";
import { Box, Divider, List, Menu, MenuItem } from "@mui/material";
import { GetPartCategoriesQuery } from "../../../../../services/schema";
import PartAvatar from "./part-avatar/part-avatar";
import { useGeneratePartContext } from "../../../../pages/app/generate-part-form/i-generate-part-context/generate-part-context";
import PartAssignmentsList from "./part-assignments-list/part-assignments-list";
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

    const isEveryQuantityValid = part.componentAssignments.every(
        ({ component, requiredQuantity }) => {
            return component.currentQuantity >= requiredQuantity;
        },
    );

    const hasComponentAssignments = part.componentAssignments.length > 0;
    const hasParentAssignments = part.parentAssignments.length > 0;

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
                            partClicked.partId === part.partId
                        }
                        partId={part.partId}
                        name={part.name}
                        current_quantity={part.currentQuantity}
                        image_url={part.imageUrl}
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
                    <List sx={{ pb: 0 }}>
                        {hasComponentAssignments ? (
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
                        {hasComponentAssignments ? (
                            <>
                                <Divider sx={{ my: 1 }} />
                                <PartAssignmentsList
                                    title={"Components"}
                                    partAssignment={part.componentAssignments.map(
                                        (ca) => {
                                            return {
                                                ...ca,
                                                part: ca.component,
                                            };
                                        },
                                    )}
                                    onPartClick={(component) => {
                                        setPartClicked({
                                            partId: component.partId,
                                        });
                                        history.push(
                                            getPartCategoryRouteName(
                                                component.partCategoryId,
                                            ),
                                        );
                                    }}
                                />
                            </>
                        ) : null}

                        {hasParentAssignments ? (
                            <>
                                <Divider sx={{ my: 1 }} />
                                <PartAssignmentsList
                                    title={"Parents"}
                                    partAssignment={part.parentAssignments.map(
                                        (ca) => {
                                            return {
                                                ...ca,
                                                part: ca.parent,
                                            };
                                        },
                                    )}
                                    onPartClick={(component) => {
                                        setPartClicked({
                                            partId: component.partId,
                                        });
                                        history.push(
                                            getPartCategoryRouteName(
                                                component.partCategoryId,
                                            ),
                                        );
                                    }}
                                    hideRequiredQuantity
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
