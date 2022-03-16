import React from "react";
import { Box, List, ListItemButton, Typography } from "@mui/material";
import PartComponentsListItems from "../../smart/part-category/parts-list/part-image-container/part-components-list-items/part-components-list-items";
import PartAvatar from "../../smart/part-category/parts-list/part-image-container/part-avatar/part-avatar";

export default function HomePage() {
    return (
        <Box display={"flex"} flexDirection={"column"}>
            <Typography variant={"h3"} sx={{ mb: 3, textAlign: "center" }}>
                Home
            </Typography>
            <Typography variant={"body1"} sx={{ mb: 3 }}>
                This application resembles subnautica&apos;s crafting system.
            </Typography>
            <Typography variant={"h6"} sx={{ mb: 3 }}>
                Usage:
            </Typography>
            <Typography variant={"body1"} sx={{ mb: 3 }}>
                Each part is portrayed as an avatar that has a badge. The number
                on the badge specifies how many parts the system currently has
                of that part. Example:
                <Box sx={{ my: 2 }}>
                    <PartAvatar
                        name={"Part 1"}
                        current_quantity={2}
                        is_valid={true}
                    />
                </Box>
                If the badge is green, a new part can be added. If the badge is
                orange, some components need to be added first, in order for the
                part to be added.
            </Typography>
            <Typography variant={"body1"}>
                To add a part, right click an avatar item to open a context
                menu. The context menu will display two actions depending on the
                part: farming or crafting.
                <ul>
                    <li>
                        Farming: adds a certain amount of parts. Only parts that
                        do not have components can be farmed. Example of part
                        that has farm action:
                        <List sx={{ maxWidth: "20rem", border: 1 }}>
                            <ListItemButton>Farm</ListItemButton>
                        </List>
                    </li>
                    <li>
                        Crafting action: adds a certain amount of parts,
                        requires a certain amount of components to be made. You
                        can acquire those components either by farming or
                        crafting. Example of part that has craft actions and
                        requires components:
                        <List sx={{ maxWidth: "20rem", border: 1 }}>
                            <ListItemButton>Craft</ListItemButton>
                            <PartComponentsListItems
                                components={[
                                    {
                                        component: {
                                            part_id: 2,
                                            image_url: null,
                                            current_quantity: 4,
                                            name: "Component 1",
                                            __typename: "Part",
                                        },
                                        required_quantity: 2,
                                    },
                                ]}
                            />
                        </List>
                        The &apos;x2&apos; specifies the amount required of the
                        component per part
                    </li>
                </ul>
            </Typography>
        </Box>
    );
}
