import React, {createContext, useContext, useState} from 'react'


interface IOpenSideBarContext {
	open: boolean;
	setOpen: (open: boolean) => void;
}

const OpenSideBarContext = createContext<IOpenSideBarContext>({
	open: false,
	setOpen: () => {}
})



interface OpenSideBarContextProviderProps {
	children: React.ReactNode | React.ReactNode[]
}


export const OpenSideBarContextProvider = (props: OpenSideBarContextProviderProps) => {
	const [open, setOpen] = useState(false)
	const { children } = props
	
	return <OpenSideBarContext.Provider value={{open, setOpen}}>
		{ children }
	</OpenSideBarContext.Provider>
}

export const useOpenSideBarContext = () => {
	const {open, setOpen} = useContext(OpenSideBarContext)

	
	return {
		open,
		setOpen
	}
}


