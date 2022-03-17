import React from 'react';
import {Box} from "@mui/material";
import PartsList from "./parts-list/parts-list";
import {GetPartCategoriesQuery} from "../../../services/schema";
import PartCategoryTitle from "./part-category-title/part-category-title";

interface IPartCategoryContainer {
    partCategory: GetPartCategoriesQuery["getPartCategories"][number]
}
const PartCategoryContainer = (props: IPartCategoryContainer) => {
    const { partCategory } = props
    return (
        <Box>
            <PartCategoryTitle title={partCategory.name} />
            <PartsList parts={partCategory.parts} />
        </Box>
    );
};

export default PartCategoryContainer;

