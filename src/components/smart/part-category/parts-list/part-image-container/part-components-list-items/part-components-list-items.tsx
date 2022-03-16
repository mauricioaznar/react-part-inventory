import React from "react";
import {
    ListItem,
    ListItemAvatar,
    ListItemText,
    ListSubheader,
    Typography,
} from "@mui/material";
import PartAvatar from "../part-avatar/part-avatar";
import { GetPartCategoriesQuery } from "../../../../../../services/schema";

interface IPartComponentListItems {
    components: GetPartCategoriesQuery["getPartCategories"][number]["parts"][number]["components"];
}

const PartComponentsListItems = (props: IPartComponentListItems) => {
    const { components } = props;

    return (
        <>
            <ListSubheader>Components</ListSubheader>
            {components.map((component) => {
                return (
                    <ListItem key={component.component.part_id}>
                        <ListItemAvatar>
                            <PartAvatar
                                name={component.component.name}
                                current_quantity={
                                    component.component.current_quantity
                                }
                                image_url={component.component.image_url}
                                size={"sm"}
                                is_valid={
                                    component.component.current_quantity >=
                                    component.required_quantity
                                }
                            />
                        </ListItemAvatar>
                        <ListItemText primary={component.component.name} />
                        <Typography
                            sx={{
                                ml: 2,
                            }}
                            variant={"subtitle2"}
                        >
                            {`x${component.required_quantity}`}
                        </Typography>
                    </ListItem>
                );
            })}
        </>
    );
};

export default PartComponentsListItems;
