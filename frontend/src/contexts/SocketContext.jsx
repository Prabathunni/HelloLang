import { useAuth } from "./AuthContext";
import { io } from 'socket.io-client'
import { createContext, useRef, useContext } from 'react'




const SocketContext = createContext();


export function SocketProvider({ children }) {
    const socketRef = useRef();
    const { user } = useAuth();

    const connectSocket = ()=> {
        if(!socketRef.current && user){
            socketRef.current = io('http://localhost:3000', {
                withCredentials: true
            })
        }
    }


    const disconnectSocket = () => {
        if(socketRef.current) {
            socketRef.current.disconnect();
            socketRef.current = null;
        }
    }


    return(
        <SocketContext.Provider value={{
            socket: socketRef.current,
            connectSocket,
            disconnectSocket
        }}>
            { children }
        </SocketContext.Provider>
    )

} 


export const useSocket = () => useContext(SocketContext)