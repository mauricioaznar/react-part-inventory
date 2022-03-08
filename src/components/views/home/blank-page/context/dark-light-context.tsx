import React from 'react'

interface AuthObjDefinition {
	username: string;
	setUsername: (val: string) => void;
}


export const DarkLightContext = React.createContext<AuthObjDefinition | undefined>(undefined);


