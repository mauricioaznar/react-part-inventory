import React from 'react';
import {Box, Stack} from "@mui/material";
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
            <Stack
                direction="row"
                flexWrap={'wrap'}
                sx={{ my: 4 }}
            >
                <PartsList parts={partCategory.parts} />
            </Stack>
        </Box>
    );
};

export default PartCategoryContainer;

