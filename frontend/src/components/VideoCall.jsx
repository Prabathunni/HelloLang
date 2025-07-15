// src/components/VideoCall.jsx
import React, { useEffect, useRef, useState } from 'react';
import Peer from 'simple-peer';
import { useSocket } from '../contexts/SocketContext';

export default function VideoCall({ peerId, onClose }) {
  const { socket, stream, setStream, receivingCall, callerSignal, callAccepted, setCallAccepted} = useSocket();


  const localStreamRef = useRef(null)

  const myVideoRef = useRef();
  const partnerVideoRef = useRef();
  const peerRef = useRef();

  // Local UI state
  const [micOn, setMicOn] = useState(true);
  const [camOn, setCamOn] = useState(true);

  // 1️Get user media once
  useEffect(() => {
    async function initMedia() {
      try {
        const mediaStream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true
        });
        // setStream(mediaStream);
        localStreamRef.current = mediaStream;
        myVideoRef.current.srcObject = mediaStream;
      } catch (err) {
        console.error('Media error:', err);
      }
    }
    initMedia();
  }, [setStream]);

  //  Incoming call handler
  const answerCall = () => {
    setCallAccepted(true);
    peerRef.current = new Peer({
      initiator: false,
      trickle: false,
      stream
    });

    peerRef.current.on('signal', signal => {
      socket.emit('answerCall', { to: callerSignal.from, signal });
    });

    peerRef.current.on('stream', partnerStream => {
      partnerVideoRef.current.srcObject = partnerStream;
    });

    peerRef.current.signal(callerSignal.signal);
  };

  //  Outgoing call initiator
  const callUser = () => {
    peerRef.current = new Peer({
      initiator: true,
      trickle: false,
      stream
    });

    peerRef.current.on('signal', signal => {
      socket.emit('callUser', { userToCall: peerId, signalData: signal });
    });

    peerRef.current.on('stream', partnerStream => {
      partnerVideoRef.current.srcObject = partnerStream;
    });

    socket.on('callAccepted', signal => {
      setCallAccepted(true);
      peerRef.current.signal(signal);
    });
  };

  //  Hang up the call
  const hangUp = () => {
    // 1. Destroy the WebRTC peer connection
    if (peerRef.current) {
      peerRef.current.destroy();
      peerRef.current = null;
    }

    // 2. Stop all media tracks (camera + mic)
    if (stream) {
      stream.getTracks().forEach(track => {
        track.stop(); 
      });
      localStreamRef.current = null;
      setStream(null); 
    }

    // 3. Clear video element sources
    if (myVideoRef.current) {
      myVideoRef.current.srcObject = null;
    }
    if (partnerVideoRef.current) {
      partnerVideoRef.current.srcObject = null;
    }

    // 4. Emit socket event to inform other user
    socket.emit('endCall', { to: peerId });

    // 5. Close video UI
    onClose?.();
  };



  // 5️ Toggle mic/cam
  const toggleMic = () => {
    stream.getAudioTracks().forEach(track => (track.enabled = !track.enabled));
    setMicOn(prev => !prev);
  };
  const toggleCam = () => {
    stream.getVideoTracks().forEach(track => (track.enabled = !track.enabled));
    setCamOn(prev => !prev);
  };

  // // 6️ Listen for remote hangup
  // useEffect(() => {
  //   if (!socket) return;
  //   const handleEndCall = () => {
  //     peerRef.current && peerRef.current.destroy();
  //     onClose?.();
  //   };
  //   socket.on('endCall', handleEndCall);
  //   return () => socket.off('endCall', handleEndCall);
  // }, [socket, onClose]);


  useEffect(()=>{
    const handleEndCall = () =>{
        if(peerRef.current) peerRef.current.display();

        const localStream = localStreamRef.current;

        if(localStream){
          localStream.getTracks().forEach(track => track.stop());
          localStreamRef.current = null;
          setStream(null);
        }

        if(myVideoRef.current) myVideoRef.current.srcObject = null;
        if(partnerVideoRef.current) partnerVideoRef.current.srcObject = null;

        onClose?.();
    }

    socket.on('endCall', handleEndCall);
    return () => socket.off('endCall', handleEndCall);

  },[socket, onClose])



  return (
    <div style={{ textAlign: 'center' }}>
      <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem' }}>
        <video ref={myVideoRef} autoPlay muted style={{ width: "100%", height: '500px', borderRadius: 8 }} />
        {callAccepted && (
          <video ref={partnerVideoRef} autoPlay style={{ width: "100%", height: '500px', borderRadius: 8 }} />
        )}


      </div>

      <div style={{ marginTop: 12 }}>
        {!callAccepted && !receivingCall && (
          <button onClick={callUser}>📞 Start Call</button>
        )}

        {receivingCall && !callAccepted && (
          <>
            <p>Incoming call…</p>
            <button onClick={answerCall}>✅ Answer</button>
          </>
        )}

        <button onClick={toggleMic}>
          {micOn ? '🔇 Mute' : '🎙️ Unmute'}
        </button>
        <button onClick={toggleCam}>
          {camOn ? '🚫 Cam Off' : '📹 Cam On'}
        </button>
        <button onClick={hangUp}>❌ Hang Up</button>

      </div>


    </div>
  );
}
