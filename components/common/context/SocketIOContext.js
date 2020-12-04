import React, { createContext } from 'react';
import io from 'socket.io-client';
import CookiesService from 'utils/service/cookiesServices';

const SocketIOContext = createContext(null);
const { Provider } = SocketIOContext;

const SocketIOProvider = ({ ...props }) => {
  const socket = io(
    `https://retech.cf?token=${CookiesService.getAccessToken()}`,
    {
      reconnectionDelay: 1000,
      reconnection: false,
      reconnectionAttempts: 10,
      transports: ['polling'],
      agent: false, // [2] Please don't set this to true
      upgrade: false,
      rejectUnauthorized: false
    }
  );

  return <Provider value={{ socket }}>{props.children}</Provider>;
};

export { SocketIOProvider, SocketIOContext };
