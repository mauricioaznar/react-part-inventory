import React from "react";
import { Box, List, ListItemButton, Typography } from "@mui/material";
import PartAssignmentsList from "../../smart/part-category/parts-list/part-container/part-assignments-list/part-assignments-list";
import PartAvatar from "../../smart/part-category/parts-list/part-container/part-avatar/part-avatar";

export default function HomePage() {
    return (
        <Box display={"flex"} flexDirection={"column"}>
            <Typography variant={"h3"} sx={{ mb: 4, textAlign: "center" }}>
                About
            </Typography>
            <Typography variant={"body1"} sx={{ mb: 5 }}>
                This application resembles subnautica&apos;s crafting system.
            </Typography>
            <Typography variant={"h6"} sx={{ mb: 3 }}>
                Parts:
            </Typography>
            <Typography variant={"body1"} sx={{ mb: 2 }}>
                Each part is portrayed as an avatar that has a badge. The number
                on the badge specifies how many parts the system currently has
                of that part. Example:
            </Typography>
            <Box sx={{ mb: 2 }} flexDirection={"row"} display={"flex"}>
                <Box>
                    <PartAvatar
                        name={"Part 1"}
                        current_quantity={2}
                        is_valid={true}
                        part_id={0}
                        active={false}
                    />
                </Box>
                <Box sx={{ ml: 2 }}>
                    <PartAvatar
                        name={"Part 2"}
                        current_quantity={1}
                        is_valid={false}
                        part_id={0}
                        active={false}
                    />
                </Box>
            </Box>

            <Typography variant={"body1"} sx={{ mb: 5 }}>
                If the badge is green, a new part can be added. If the badge is
                orange, some required amount of components need to be added
                first. In the previous example, the left avatar has two has two
                available parts on the system and the right one has one. The
                left part allows for more parts to be added, but the right one
                doesnt (it doesnt meet requirements, see next section).
            </Typography>
            <Typography variant={"h6"} sx={{ mb: 3 }}>
                Adding a part:
            </Typography>
            <Typography variant={"body1"}>
                To add a part, right click an avatar item to open a context
                menu. The context menu will display two actions depending on the
                part: farming or crafting.
            </Typography>
            <ul>
                <li>
                    Farming: adds a certain amount of parts. Only parts that do
                    not have components can be farmed. Example of part that has
                    farm action:
                    <List sx={{ maxWidth: "20rem", border: 1 }}>
                        <ListItemButton>Farm</ListItemButton>
                    </List>
                </li>
                <li>
                    Crafting action: adds a certain amount of parts, requires a
                    certain amount of components to be made. You can acquire
                    those components either by farming or crafting. Example of a
                    part that has craft actions and requires components:
                    <List sx={{ maxWidth: "20rem", border: 1 }}>
                        <ListItemButton>Craft</ListItemButton>
                        <PartAssignmentsList
                            title={"Components"}
                            isLink={false}
                            onPartClick={() => {}}
                            partAssignment={[
                                {
                                    part: {
                                        part_id: 2,
                                        part_category_id: 2,
                                        image_url: null,
                                        current_quantity: 4,
                                        name: "Component 1",
                                    },
                                    requiredQuantity: 2,
                                },
                            ]}
                        />
                    </List>
                    The &apos;x2&apos; specifies the amount required of the
                    component per part
                </li>
            </ul>
        </Box>
    );
}
