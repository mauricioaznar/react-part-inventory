import React, { useEffect, useState } from "react";
import { GetPartCategoriesQuery } from "../../../../../services/schema";

type Mode = "craft" | "farm" | null;
export type GeneratePartFormPart =
    | GetPartCategoriesQuery["getPartCategories"][number]["parts"][number]
    | null;

interface IGeneratePartContext {
    open: boolean;
    setOpen: (open: boolean) => void;
    part: GeneratePartFormPart;
    setPart: (part: GeneratePartFormPart) => void;
    mode: Mode;
    setMode: (mode: Mode) => void;
}

const GeneratePartContext = React.createContext<IGeneratePartContext>({
    open: false,
    setOpen: () => {},
    part: null,
    setPart: () => {},
    mode: null,
    setMode: () => {},
});

interface IGeneratePartContextProvider {
    children: React.ReactNode[] | React.ReactNode;
}

export const GeneratePartContextProvider = (
    props: IGeneratePartContextProvider,
) => {
    const { children } = props;

    const [open, setOpen] = useState(false);
    const [part, setPart] = useState<GeneratePartFormPart>(null);
    const [mode, setMode] = useState<Mode>(null);

    return (
        <GeneratePartContext.Provider
            value={{
                open,
                setOpen,
                part,
                setPart,
                mode,
                setMode,
            }}
        >
            {children}
        </GeneratePartContext.Provider>
    );
};

export const useGeneratePartContext = () => {
    const { open, setOpen, setMode, part, setPart, mode } =
        React.useContext(GeneratePartContext);

    const initCraft = (partClicked: GeneratePartFormPart) => {
        setMode("craft");
        setOpen(true);
        setPart(partClicked);
    };

    const initAdd = (partClicked: GeneratePartFormPart) => {
        setMode("farm");
        setOpen(true);
        setPart(partClicked);
    };

    useEffect(() => {
        if (!open) {
            setPart(null);
            setMode(null);
        }
    }, [open]);

    return {
        initCraft,
        initAdd,
        open,
        setOpen,
        part,
        mode,
    };
};
