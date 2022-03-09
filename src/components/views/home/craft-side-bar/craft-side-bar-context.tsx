import React from "react";
import {GetPartCategoriesQuery} from "../../../../services/schema";

interface CraftSideBarContextProps {
	setOpen: (open: boolean) => void;
	open: boolean;
	part: GetPartCategoriesQuery["getPartCategories"][number]["parts"][number] | null;
	setPart: (part: GetPartCategoriesQuery["getPartCategories"][number]["parts"][number] | null) => void;
	mode: "craft" | "add";
	setMode: (mode: "craft" | "add") => void;
}

export const CraftSideBarContext = React.createContext<CraftSideBarContextProps>({
	setOpen: () => {},
	open: false,
	part: null,
	setPart: () => {},
	mode: "craft",
	setMode: () => {}
})

export default CraftSideBarContext

