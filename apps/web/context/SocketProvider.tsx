'use client'
import React, { useCallback } from "react";

interface SocketProviderProps{
    children?: React.ReactNode
}

interface ISocketConstext{
    sendMessage: (msg: string) => any;
}
const SocketContext = React.createContext<ISocketConstext | null>(null);

export const SocketProvider: React.FC<SocketProviderProps> = ({
    children
})=>{
    const sendMessage: ISocketConstext['sendMessage'] = useCallback((msg)=>{
        console.log("send message: " + msg)
    },[])
    return(
        <SocketContext.Provider value={{sendMessage}}>
            {children}
        </SocketContext.Provider>
    )
}
