import React, {useState} from 'react'
import {GetPartCategoriesQuery, useGetPartCategoriesQuery} from "../../../services/schema";
import {Container} from "@mui/material";
import PartCategoriesList from "./part-categories-list/part-categories-list";
import CraftSideBar from "./craft-side-bar/craft-side-bar";
import CraftSideBarContext from "./craft-side-bar/craft-side-bar-context";
import PageLoader from "../../dum/loaders/page-loader";


export default function Home() {
	const {data, loading} = useGetPartCategoriesQuery()
	
	const [open, setOpen] = useState(false)
	const [part, setPart] = useState<GetPartCategoriesQuery["getPartCategories"][number]["parts"][number] | null>(null)
	const [mode, setMode] = useState<"craft" | "add">("craft")
	
	if (loading) return <PageLoader />
	
	return (
		<Container>
			<CraftSideBarContext.Provider value={{ open, setOpen, part, setPart, mode, setMode}}>
				<PartCategoriesList partCategories={data!.getPartCategories} />
				<CraftSideBar />
			</CraftSideBarContext.Provider>
		</Container>
		
	)
}