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
    partId: number;
    partCategoryId: number;
    currentQuantity?: number;
    imageUrl?: string | null;
    name: string;
};

type PartAssignment = { part: Part; requiredQuantity: number }[];

interface IPartAssignmentListItems {
    partAssignment: PartAssignment;
    onPartClick: (part: Part) => void;
    isLink?: boolean;
    title: string;
    hideRequiredQuantity?: boolean;
}

const PartAssignmentsList = (props: IPartAssignmentListItems) => {
    const {
        partAssignment,
        isLink = true,
        onPartClick,
        title,
        hideRequiredQuantity = false,
    } = props;
    const history = useHistory();

    return (
        <List sx={{ mb: 1 }}>
            <ListSubheader sx={{ my: 0 }}>{title}</ListSubheader>
            {partAssignment.map(({ part, requiredQuantity }) => {
                return (
                    <ListItemButton
                        key={part.partId}
                        onClick={() => {
                            if (isLink) {
                                onPartClick(part);
                                history.push(
                                    getPartCategoryRouteName(
                                        part.partCategoryId,
                                    ),
                                );
                            }
                        }}
                    >
                        <ListItemAvatar>
                            <PartAvatar
                                partId={part.partId}
                                name={part.name}
                                current_quantity={part.currentQuantity}
                                image_url={part.imageUrl}
                                size={"sm"}
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
