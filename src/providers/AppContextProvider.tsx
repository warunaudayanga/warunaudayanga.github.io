/* eslint-disable @typescript-eslint/no-explicit-any */
import { ReactNode } from "react";
import AppProvider from "./AppProvider.tsx";
import { PrimeReactProvider } from "primereact/api";
import { combineProviders } from "../utils/";
import AuthProvider from "./AuthProvider.tsx";
import DialogProvider from "./DialogProvider.tsx";
import ToastProvider from "./ToastProvider.tsx";

const providers: ((props: { children: ReactNode }) => ReactNode)[] = [
    AuthProvider,
    AppProvider,
    ToastProvider,
    DialogProvider,
    PrimeReactProvider,
];

const AppContextProvider: (props: { children: ReactNode }) => ReactNode = combineProviders(...providers);

export default AppContextProvider;
