import React from "react";
import {Path} from "~/routes/components/Map";

const MyContext = React.createContext<string | undefined>(undefined);

type MyContextProviderProps = {
    value: string;
    children: React.ReactNode;
};

function MyContextProvider({ children, value }: MyContextProviderProps) {
    return <MyContext.Provider value={value}>{children}</MyContext.Provider>;
}

export { MyContext, MyContextProvider };
