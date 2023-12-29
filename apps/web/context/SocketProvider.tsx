'use client'
import React, { useCallback, useContext, useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";


interface SocketProviderProps{
    children?: React.ReactNode
}

interface ISocketConstext{
    sendMessage: (msg: string) => any;
    messages: string[];
}
const SocketContext = React.createContext<ISocketConstext | null>(null);
export const useSocket = ()=>{
    const state = useContext(SocketContext);
    if(!state)  throw new Error('State is undefined'); 
    return state;

}

export const SocketProvider: React.FC<SocketProviderProps> = ({
    children
})=>{
const [socket, setSocket] = useState<Socket>()
const [messages, setMessages] = useState<string[]>([])

    const sendMessage: ISocketConstext['sendMessage'] = useCallback((msg)=>{
        console.log("send message: " + msg)
        if(socket){
            socket.emit('event:message',{message : msg})
        }
    },[socket])

    const onMessageRec = useCallback((msg: string)=>{
        console.log('from server message: ' + msg)
        const {message} = JSON.parse(msg) as {message: string}
        console.log('onMessage recieved: ' + message)
        setMessages((prev)=> [...prev, message])
    },[])

    useEffect(()=>{
        const _socket = io("http://localhost:8000/");
        _socket.on("message",onMessageRec)
        setSocket(_socket)
        return ()=>{
            _socket.disconnect();
            _socket.off('message', onMessageRec)
            setSocket(undefined)
        }
    },[])
    return(
        <SocketContext.Provider value={{sendMessage, messages}}>
            {children}
        </SocketContext.Provider>
    )
}
