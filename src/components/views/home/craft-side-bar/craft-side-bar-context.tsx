import React, {useEffect, useState} from "react";
import {GetPartCategoriesQuery} from "../../../../services/schema";

interface CraftSideBarContextProps {
	open: boolean;
	setOpen: (open: boolean) => void;
	part: GetPartCategoriesQuery["getPartCategories"][number]["parts"][number] | null;
	setPart: (part: GetPartCategoriesQuery["getPartCategories"][number]["parts"][number] | null) => void;
	mode: "craft" | "add" | null;
	setMode: (mode: "craft" | "add" | null) => void;
}

const CraftSideBarContext = React.createContext<CraftSideBarContextProps>({
	open: false,
	setOpen: () => {},
	part: null,
	setPart: () => {},
	mode: null,
	setMode: () => {}
})




interface CraftSideBarContextProviderProps {
	children: React.ReactNode[] | React.ReactNode;
}

export const CraftSideBarContextProvider = (props: CraftSideBarContextProviderProps) => {
	const { children } = props
	
	const [open, setOpen] = useState(false)
	const [part, setPart] = useState<GetPartCategoriesQuery["getPartCategories"][number]["parts"][number] | null>(null)
	const [mode, setMode] = useState<"craft" | "add" | null>(null)
	
	
	return <CraftSideBarContext.Provider value={{ open, setOpen, part, setPart, mode, setMode}}>
		{ children }
	</CraftSideBarContext.Provider>
}



export const useCraftSideBarContext = () => {
	const {
		open,
		setOpen,
		setMode,
		part,
		setPart,
		mode
	} = React.useContext(CraftSideBarContext)
	
	
	const initCraft = (partClicked: GetPartCategoriesQuery["getPartCategories"][number]["parts"][number]) => {
		setMode('craft')
		setOpen(true)
		setPart(partClicked)
	}
	
	const initAdd = (partClicked: GetPartCategoriesQuery["getPartCategories"][number]["parts"][number]) => {
		setMode('add')
		setOpen(true)
		setPart(partClicked)
	}

	useEffect(() => {
		if (!open) {
			setPart(null)
			setMode(null)
		}
	}, [open])
	
	
	
	return {
		initCraft,
		initAdd,
		open,
		setOpen,
		part,
		mode
	}
}

