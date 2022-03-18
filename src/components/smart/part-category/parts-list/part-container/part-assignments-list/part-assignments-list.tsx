import React from "react";
import {
    List,
    ListItemAvatar,
    ListItemButton,
    ListItemText,
    ListSubheader,
    Typography,
} from "@mui/material";
import PartAvatar from "../part-avatar/part-avatar";
import { useHistory } from "react-router-dom";
import { getPartCategoryRouteName } from "../../../../../../helpers/get-part-category-route-name";

type Part = {
    part_id: number;
    part_category_id: number;
    currentQuantity: number;
    image_url?: string | null;
    name: string;
};

type PartAssignment = { part: Part; requiredQuantity: number }[];

interface IPartAssignmentListItems {
    partAssignment: PartAssignment;
    onPartClick: (part: Part) => void;
    isLink?: boolean;
    hideRequiredQuantity?: boolean;
    title: string;
}

const PartAssignmentsList = (props: IPartAssignmentListItems) => {
    const {
        partAssignment,
        isLink = true,
        onPartClick,
        hideRequiredQuantity = false,
        title,
    } = props;
    const history = useHistory();

    return (
        <List sx={{ mb: 1 }}>
            <ListSubheader sx={{ my: 0 }}>{title}</ListSubheader>
            {partAssignment.map(({ part, requiredQuantity }) => {
                return (
                    <ListItemButton
                        key={part.part_id}
                        onClick={() => {
                            if (isLink) {
                                onPartClick(part);
                                history.push(
                                    getPartCategoryRouteName(
                                        part.part_category_id,
                                    ),
                                );
                            }
                        }}
                    >
                        <ListItemAvatar>
                            <PartAvatar
                                part_id={part.part_id}
                                name={part.name}
                                current_quantity={part.currentQuantity}
                                image_url={part.image_url}
                                size={"sm"}
                                is_valid={
                                    part.currentQuantity >= requiredQuantity
                                }
                                active={false}
                                hide_name
                            />
                        </ListItemAvatar>
                        <ListItemText primary={part.name} />
                        <Typography
                            sx={{
                                ml: 2,
                            }}
                            variant={"body1"}
                        >
                            {!hideRequiredQuantity
                                ? `x${requiredQuantity}`
                                : ""}
                        </Typography>
                    </ListItemButton>
                );
            })}
        </List>
    );
};

export default PartAssignmentsList;
