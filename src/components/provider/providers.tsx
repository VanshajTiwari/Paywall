"use client";

import { QueryProvider } from "./query-provider";

interface providerProps{
    children:React.ReactNode;
}

export function Providers({children}:providerProps){
 return <QueryProvider>{children}</QueryProvider>
}