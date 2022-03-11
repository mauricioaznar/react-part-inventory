import React from 'react'
import {useGetPartCategoriesQuery} from "../../../services/schema";
import {Container} from "@mui/material";
import PartCategoriesList from "./part-categories-list/part-categories-list";
import CraftSideBar from "./craft-side-bar/craft-side-bar";
import {CraftSideBarContextProvider} from "./craft-side-bar/craft-side-bar-context";
import PageLoader from "../../dum/loaders/page-loader";


export default function Home() {
	const {data, loading} = useGetPartCategoriesQuery()
	

	
	if (loading) return <PageLoader />
	
	return (
		<Container>
			<CraftSideBarContextProvider>
				<PartCategoriesList partCategories={data!.getPartCategories} />
				<CraftSideBar />
			</CraftSideBarContextProvider>
		</Container>
		
	)
}