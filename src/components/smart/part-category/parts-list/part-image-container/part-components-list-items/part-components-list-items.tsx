import React from "react";
import {
    Button,
    ListItemAvatar,
    ListItemButton,
    ListItemText,
    ListSubheader,
    Typography,
} from "@mui/material";
import PartAvatar from "../part-avatar/part-avatar";
import { GetPartCategoriesQuery } from "../../../../../../services/schema";
import { NavLink } from "react-router-dom";
import { getPartCategoryRouteName } from "../../../../../../helpers/get-part-category-route-name";

interface IPartComponentListItems {
    components: GetPartCategoriesQuery["getPartCategories"][number]["parts"][number]["components"];
    isLink?: boolean;
}

const PartComponentsListItems = (props: IPartComponentListItems) => {
    const { components, isLink = true } = props;

    return (
        <>
            <ListSubheader>Components</ListSubheader>
            {components.map(({ component, required_quantity }) => {
                return (
                    <ListItemButton
                        key={component.part_id}
                        component={isLink ? NavLink : Button}
                        to={getPartCategoryRouteName(
                            component.part_category_id,
                        )}
                    >
                        <ListItemAvatar>
                            <PartAvatar
                                name={component.name}
                                current_quantity={component.current_quantity}
                                image_url={component.image_url}
                                size={"sm"}
                                is_valid={
                                    component.current_quantity >=
                                    required_quantity
                                }
                            />
                        </ListItemAvatar>
                        <ListItemText primary={component.name} />
                        <Typography
                            sx={{
                                ml: 2,
                            }}
                            variant={"body1"}
                        >
                            {`x${required_quantity}`}
                        </Typography>
                    </ListItemButton>
                );
            })}
        </>
    );
};

export default PartComponentsListItems;
