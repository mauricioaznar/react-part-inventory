import React, {useState} from "react";
import {GetPartCategoriesQuery} from "../../../../services/schema";

interface CraftSideBarContextProps {
	open: boolean;
	setOpen: (open: boolean) => void;
	part: GetPartCategoriesQuery["getPartCategories"][number]["parts"][number] | null;
	setPart: (part: GetPartCategoriesQuery["getPartCategories"][number]["parts"][number] | null) => void;
	mode: "craft" | "add";
	setMode: (mode: "craft" | "add") => void;
}

const CraftSideBarContext = React.createContext<CraftSideBarContextProps>({
	open: false,
	setOpen: () => {},
	part: null,
	setPart: () => {},
	mode: "craft",
	setMode: () => {}
})




interface CraftSideBarContextProviderProps {
	children: React.ReactNode[] | React.ReactNode;
}

export const CraftSideBarContextProvider = (props: CraftSideBarContextProviderProps) => {
	const { children } = props
	
	const [open, setOpen] = useState(false)
	const [part, setPart] = useState<GetPartCategoriesQuery["getPartCategories"][number]["parts"][number] | null>(null)
	const [mode, setMode] = useState<"craft" | "add">("craft")
	
	
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
	
	
	const handleCraftClick = (partClicked: GetPartCategoriesQuery["getPartCategories"][number]["parts"][number]) => {
		setMode('craft')
		setPart(partClicked)
	}
	
	const handleAddClick = (partClicked: GetPartCategoriesQuery["getPartCategories"][number]["parts"][number]) => {
		setMode('add')
		setPart(partClicked)
	}
	
	
	
	return {
		handleCraftClick,
		handleAddClick,
		open,
		setOpen,
		part,
		mode
	}
}

