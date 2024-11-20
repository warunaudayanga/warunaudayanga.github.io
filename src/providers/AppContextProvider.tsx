/* eslint-disable @typescript-eslint/no-explicit-any */
import { ReactNode } from "react";
import AppProvider from "./AppProvider.tsx";
import { combineProviders } from "../utils/";
import AuthProvider from "./AuthProvider.tsx";
import DialogProvider from "./DialogProvider.tsx";

const providers: ((props: { children: ReactNode }) => ReactNode)[] = [AuthProvider, AppProvider, DialogProvider];

const AppContextProvider: (props: { children: ReactNode }) => ReactNode = combineProviders(...providers);

export default AppContextProvider;
