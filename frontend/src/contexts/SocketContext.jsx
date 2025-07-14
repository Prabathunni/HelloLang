import { useEffect } from "react";
import { useContext } from "react";
import { createContext, useRef } from "react";
import { io } from 'socket.io-client';
 

const SocketContext = createContext();

export const SocketProvider = ({ children }) =>{
    const socket = useRef();

    useEffect(()=>{
        socket.current = io('http://localhost:3000')

        return ()=>{
            socket.current.disconnect()
        }

    },[])

    return(
        <SocketContext.Provider value={socket.current}>
            {children}
        </SocketContext.Provider>
    )

}

export const useSocket = () => useContext(SocketContext);