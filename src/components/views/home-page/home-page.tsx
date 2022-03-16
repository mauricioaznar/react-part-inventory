import React from 'react'
import {useGetPartCategoriesQuery} from "../../../services/schema";
import PartCategoriesList from "./part-categories-list/part-categories-list";
import PageLoader from "../../dum/loaders/page-loader";


export default function HomePage() {
	const {data, loading} = useGetPartCategoriesQuery()
	
	if (loading) return <PageLoader />

	return (
		<PartCategoriesList partCategories={data!.getPartCategories} />
	)
}