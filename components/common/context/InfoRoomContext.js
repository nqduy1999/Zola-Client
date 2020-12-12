import React, { createContext, useState } from 'react';

const InfoRoomContext = createContext(null);
const { Provider } = InfoRoomContext;

const InfoRoomContextProvider = ({ ...props }) => {
  const [infoRoom, setInfoRoom] = useState({});
  const [statusRoom, setStatusRoom] = useState(false);
  const [loading, setLoading] = useState(false);

  const store = {
    infoRoom,
    setInfoRoom,
    statusRoom,
    setStatusRoom,
    loading,
    setLoading
  };
  return <Provider value={{ ...store }}>{props.children}</Provider>;
};

export { InfoRoomContextProvider, InfoRoomContext };
