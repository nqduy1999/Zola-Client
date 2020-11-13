// import { useEffect, useState } from 'react';
// import useSocket from 'use-socket.io-client';
// import CookiesService from 'utils/service/cookiesServices';

// const ENDPOINT = `https://api-chat.ga?token=${CookiesService.getAccessToken()}`;

// const useSocketIO = () => {
//   // const [token , setToken] = useState("")
//   const [socket] = useSocket(ENDPOINT, {
//     transports: ['polling'],
//     autoConnect: false
//   });
//   const [listRoom, setListRoom] = useState([]);

//   useEffect(() => {
//     socket.connect();

//     socket.emit('rooms_request', 19);

//     socket.on('load_rooms', rooms => {
//       setListRoom(rooms);
//     });
//   }, [socket]);

//   // useEffect(() => {
//   //   const data = CookiesService.getAccessToken();
//   //   setToken(data);
//   // }, []);

//   return { ENDPOINT, listRoom };
// };

// export default useSocketIO;
