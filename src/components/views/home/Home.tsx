import React from 'react'
import {useGetPartCategoriesQuery} from "../../../services/schema";
import {Container} from "@mui/material";
import PartCategoriesList from "./part-categories-list/part-categories-list";

export default function Home() {
	const {data, loading} = useGetPartCategoriesQuery()
	
	if (loading) return null
	
	return <Container>
			<PartCategoriesList partCategories={data!.getPartCategories} />



	</Container>
}