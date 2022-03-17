import React from 'react';
import {GetPartCategoriesQuery} from "../../../../services/schema";
import PartImageContainer from "./part-image-container/part-image-container";
import {Grid} from "@mui/material";

interface PartsListProps {
	parts: GetPartCategoriesQuery["getPartCategories"][number]["parts"];
}



const PartsList = (props: PartsListProps) => {
	const  { parts } = props
	
	return (
		<Grid
			container
			direction="row"
			flexWrap={'wrap'}
			sx={{ my: 4 }}
		>
			{
				parts.map(p => (
					<Grid key={p.part_id} item xs={4} sm={2} md={1.5}>
						<PartImageContainer  part={p} />
					</Grid>
				))
			}
		</Grid>
	);
};

export default PartsList;