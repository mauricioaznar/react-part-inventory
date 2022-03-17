import React from "react";
import {
    ListItemAvatar,
    ListItemButton,
    ListItemText,
    ListSubheader,
    Typography,
} from "@mui/material";
import PartAvatar from "../part-avatar/part-avatar";
import { GetPartCategoriesQuery } from "../../../../../../services/schema";
import { useHistory } from "react-router-dom";
import { getPartCategoryRouteName } from "../../../../../../helpers/get-part-category-route-name";

type Components =
    GetPartCategoriesQuery["getPartCategories"][number]["parts"][number]["components"];

interface IPartComponentListItems {
    components: Components;
    onComponentClick: (component: Components[number]["component"]) => void;
    isLink?: boolean;
}

const PartComponentsListItems = (props: IPartComponentListItems) => {
    const { components, isLink = true, onComponentClick } = props;
    const history = useHistory();

    return (
        <>
            <ListSubheader>Components</ListSubheader>
            {components.map(({ component, required_quantity }) => {
                return (
                    <ListItemButton
                        key={component.part_id}
                        onClick={() => {
                            if (isLink) {
                                onComponentClick(component);
                                history.push(
                                    getPartCategoryRouteName(
                                        component.part_category_id,
                                    ),
                                );
                            }
                        }}
                    >
                        <ListItemAvatar>
                            <PartAvatar
                                part_id={component.part_id}
                                name={component.name}
                                current_quantity={component.current_quantity}
                                image_url={component.image_url}
                                size={"sm"}
                                is_valid={
                                    component.current_quantity >=
                                    required_quantity
                                }
                                active={false}
                                hide_name
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
