import { useAuth } from "./AuthContext";
import { io } from 'socket.io-client'
import { createContext, useRef, useContext, useState } from 'react'


const SocketContext = createContext();


export function SocketProvider({ children }) {
    const socketRef = useRef();
    const { user } = useAuth();
    const [stream, setStream] = useState(null);
    const [receivingCall, setReceivingCall] = useState(false);
    const [callerSignal, setCallerSignal] = useState(null);
    const [callAccepted, setCallAccepted] = useState(false);

    const connectSocket = () => {
        if (!socketRef.current && user) {
            socketRef.current = io('http://localhost:3000', {
                withCredentials: true
            })

            // listen for someone calling u
            socketRef.current.on('callUser', ({ from, signal }) => {
                setReceivingCall(true);
                setCallerSignal({ from, signal });
            })

            // listen for outgoing call being accepted
            socketRef.current.on('callAccepted', (signal) => {
                setCallAccepted(true);

            })
        }
    };


    const disconnectSocket = () => {
        if (socketRef.current) {
            socketRef.current.disconnect();
            socketRef.current = null;
        }
    }


    return (
        <SocketContext.Provider value={{
            socket: socketRef.current,
            connectSocket,
            disconnectSocket,
            stream,
            setStream,
            receivingCall,
            callerSignal,
            callAccepted,
            setCallAccepted
        }}>
            {children}
        </SocketContext.Provider>
    )

}


export const useSocket = () => useContext(SocketContext)