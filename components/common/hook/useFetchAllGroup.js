// /* eslint-disable react-hooks/exhaustive-deps */
// import { useState, useEffect, useContext } from 'react';
// import { useSelector } from 'react-redux';
// import { SocketIOContext } from '../context/SocketIOContext';

// const useFetchAllGroup = list_user => {
//   const [listGroup, setListGroup] = useState([]);
//   const { auth_token } = useSelector(state => state.accountData);
//   const { socket } = useContext(SocketIOContext);
//   useEffect(() => {
//     socket.emit('load_rooms', list_user);
//     socket.on('load_rooms', function (data) {
//       if (data?.id === list_user[0]?.id) {
//         setListGroup(data?.rooms);
//       }
//     });
//   }, [auth_token, list_user]);

//   return { listGroup, setListGroup };
// };

// export default useFetchAllGroup;

/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, useContext } from 'react';
import { useSelector } from 'react-redux';
import { SocketIOContext } from '../context/SocketIOContext';

const useFetchAllGroup = () => {
  const [listGroup, setListGroup] = useState([]);
  const { auth_token } = useSelector(state => state.accountData);
  const { userProfile } = useSelector(state => state.userData);

  const { socket } = useContext(SocketIOContext);
  console.log(socket);
  useEffect(() => {
    const list_user = [
      {
        name: userProfile.name,
        id: userProfile.id
      }
    ];
    socket.emit('load_rooms', list_user);
    socket.on('load_rooms', function (data) {
      if (data?.id === list_user[0]?.id) {
        setListGroup(data?.rooms);
      }
    });
  }, [auth_token, userProfile]);

  return { listGroup, setListGroup };
};

export default useFetchAllGroup;
