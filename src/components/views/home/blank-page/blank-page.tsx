import React from 'react';
import {DarkLightContext} from "./context/dark-light-context";
import ChildBlankPage from "./components/child-blank-page";

function BlankPage() {
	const [username, setUsername] = React.useState('')
	
	console.log('blank page')
	
	return (
		<DarkLightContext.Provider value={{ username, setUsername }}>
			<ChildBlankPage />
		</DarkLightContext.Provider>
	);
}

export default BlankPage;