import React from 'react';
import {GetPartCategoriesQuery} from "../../../../../services/schema";
import PartImageContainer from "./part-image-container/part-image-container";

interface PartsListProps {
	parts: GetPartCategoriesQuery["getPartCategories"][number]["parts"];
}



const PartsList = (props: PartsListProps) => {
	const  { parts } = props
	
	return (
		<>
			{
				parts.map(p => {
					return <PartImageContainer key={p.part_id} part={p} />
				})
			}
		</>
	);
};

export default PartsList;