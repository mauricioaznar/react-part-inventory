import React from 'react'
import {useGetPartCategoriesQuery} from "../../../services/schema";
import {Container} from "@mui/material";
import PartCategoriesList from "./part-categories-list/part-categories-list";
import GeneratePartForm from "./generate-part-form/generate-part-form";
import {GeneratePartContextProvider} from "./generate-part-form/i-generate-part-context/i-generate-part-context";
import PageLoader from "../../dum/loaders/page-loader";


export default function HomePage() {
	const {data, loading} = useGetPartCategoriesQuery()
	
	if (loading) return <PageLoader />

	return (
		<Container>
			<GeneratePartContextProvider>
				<PartCategoriesList partCategories={data!.getPartCategories} />
				<GeneratePartForm />
			</GeneratePartContextProvider>
		</Container>
		
	)
}