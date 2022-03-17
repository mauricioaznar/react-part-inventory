import React, { useEffect, useState } from "react";

type Part = { part_id: number } | null;

interface IPartClickedContext {
    partClicked: Part;
    setPartClicked: (part: Part) => void;
}

const PartClickedContext = React.createContext<IPartClickedContext>({
    partClicked: null,
    setPartClicked: () => {},
});

interface IPartClickedContextProvider {
    children: React.ReactNode[] | React.ReactNode;
}

export const PartClickedContextProvider = (
    props: IPartClickedContextProvider,
) => {
    const { children } = props;

    const [partClicked, setPartClicked] = useState<Part>(null);
    useEffect(() => {
        if (partClicked !== null) {
            const timeout = setTimeout(() => {
                setPartClicked(null);
            }, 4500);
            return () => {
                clearTimeout(timeout);
            };
        }
    });

    return (
        <PartClickedContext.Provider
            value={{
                partClicked,
                setPartClicked,
            }}
        >
            {children}
        </PartClickedContext.Provider>
    );
};

export const usePartClickedContext = () => {
    const { partClicked, setPartClicked } =
        React.useContext(PartClickedContext);

    return {
        partClicked,
        setPartClicked,
    };
};
