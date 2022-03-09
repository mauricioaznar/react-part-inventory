import React from 'react';
import {GetPartCategoriesQuery} from "../../../../services/schema";
import {Box, Stack} from "@mui/material";
import PartCategoryTitle from "./part-category-title/part-category-title";
import PartsList from "./parts-list/parts-list";

interface PartCategoriesListProps {
	partCategories: GetPartCategoriesQuery["getPartCategories"]
}


const PartCategoriesList = (props: PartCategoriesListProps) => {
	const { partCategories } = props
	return <>
		{
			partCategories.map(pc => {
				return (
					<Box key={pc.part_category_id}>
						<PartCategoryTitle title={pc.name} />
						<Stack
							direction="row"
							flexWrap={'wrap'}
							sx={{ my: 4 }}
						>
							<PartsList parts={pc.parts} />
						</Stack>
					</Box>
				)
			})
		}
	</>;
};

export default PartCategoriesList;