import React from 'react';
import {DarkLightContext} from "../context/dark-light-context";
import ChildOfChild from "./child-of-child";

const ChildBlankPage = (
) => {
	const value = React.useContext(DarkLightContext)
	
	React.useEffect(() => {
		value?.setUsername('john')
	}, [])
	
	console.log('Child Blank page')
	
	
	return (
		<div>
			{
				value?.username !== undefined && value?.username !== ""
					? <ChildOfChild />
					: null
			}
			
		</div>
	);
};

export default ChildBlankPage;