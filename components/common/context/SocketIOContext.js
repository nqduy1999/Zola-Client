import React, { createContext } from 'react';
import { useSelector } from 'react-redux';
import io from 'socket.io-client';

const SocketIOContext = createContext(null);
const { Provider } = SocketIOContext;

const SocketIOProvider = ({ ...props }) => {
  const { auth_token } = useSelector(state => state.accountData);

  const socket = io(`https://api-chat.ga?token=${auth_token?.accessToken}`, {
    reconnectionDelay: 1000,
    reconnection: false,
    reconnectionAttempts: 10,
    transports: ['polling'],
    agent: false, // [2] Please don't set this to true
    upgrade: false,
    rejectUnauthorized: false
  });

  return <Provider value={{ socket }}>{props.children}</Provider>;
};

export { SocketIOProvider, SocketIOContext };
