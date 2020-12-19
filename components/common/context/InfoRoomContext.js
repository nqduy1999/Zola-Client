/* eslint-disable react-hooks/exhaustive-deps */
import React, { createContext, useState, useContext, useEffect } from 'react';
import usePrevious from '../hook/usePrevious';
import { SocketIOContext } from './SocketIOContext';
const InfoRoomContext = createContext(null);
const { Provider } = InfoRoomContext;

const InfoRoomContextProvider = ({ ...props }) => {
  const { socket } = useContext(SocketIOContext);
  const [infoRoom, setInfoRoom] = useState({});
  const [statusRoom, setStatusRoom] = useState(false);
  const [loading, setLoading] = useState(false);
  const [sendMessage, setSendMessage] = useState(false);
  const [visibleAddFriend, setVisibleAddFriend] = useState(false);
  const prevInfoRoom = usePrevious(infoRoom?._id);

  useEffect(() => {
    socket.emit('leave', prevInfoRoom);
  }, [infoRoom]);

  const store = {
    infoRoom,
    setInfoRoom,
    statusRoom,
    setStatusRoom,
    loading,
    setLoading,
    sendMessage,
    setSendMessage,
    visibleAddFriend,
    setVisibleAddFriend
  };
  return <Provider value={{ ...store }}>{props.children}</Provider>;
};

export { InfoRoomContextProvider, InfoRoomContext };
