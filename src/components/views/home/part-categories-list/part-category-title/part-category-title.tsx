import React from 'react';
import {Typography} from "@mui/material";

const PartCategoryTitle = (props: { title: string }) => {
	const { title } = props
	
	return (
		<Typography variant={'h4'}>
			{ title }
		</Typography>
	);
};

export default PartCategoryTitle;