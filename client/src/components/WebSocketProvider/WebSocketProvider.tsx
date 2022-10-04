import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";

const WebSocketProvider:React.FC = () => {

  const dispatch = useAppDispatch();

  const userId = useAppSelector(state => state.auth.user?.id) || null;

  useEffect(() => {
    const socket = new WebSocket('ws://localhost:9000');

    socket.onopen = function() {
      const data = {
        type: 'connection',
        args: {
          id: userId
        }
      }
      socket.send(JSON.stringify(data));
    }
    socket.onmessage = function(ev: MessageEvent) {
      const data = JSON.parse(ev.data);
      console.log(data);
    }
    socket.onclose = function() {
      console.log('close');
    }
    return () => {
      socket.close();
    }
  }, [dispatch, userId]);

  return (
    <></>
  );
}

export default WebSocketProvider;