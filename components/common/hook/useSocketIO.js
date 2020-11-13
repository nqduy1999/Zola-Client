import { useEffect, useState } from 'react';
import useSocket from 'use-socket.io-client';
import CookiesService from 'utils/service/cookiesServices';

const ENDPOINT = `https://api-chat.ga?token=${CookiesService.getAccessToken()}`;

const useSocketIO = () => {
  const [socket] = useSocket(ENDPOINT, {
    transports: ['polling'],
    autoConnect: false
  });
  const [listRoom, setListRoom] = useState([]);

  useEffect(() => {
    socket.connect();

    socket.emit('rooms_request', 19);

    socket.on('load_rooms', rooms => {
      setListRoom(rooms);
    });
  }, [socket]);

  return { listRoom };
};

export default useSocketIO;
