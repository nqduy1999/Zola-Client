/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, useContext } from 'react';
import { useSelector } from 'react-redux';
import { SocketIOContext } from '../context/SocketIOContext';

const useFetchAllGroup = () => {
  const [listGroup, setListGroup] = useState([]);
  const { userProfile } = useSelector(state => state.userData);

  const { socket } = useContext(SocketIOContext);

  useEffect(() => {
    if (Object.keys(userProfile).length > 0) {
      const list_user = [
        {
          name: userProfile?.name,
          id: userProfile?.id
        }
      ];

      socket.emit('load_rooms', list_user);
      socket.on('load_rooms', function (data) {
        if (data?.id === list_user[0]?.id) {
          setListGroup(data?.rooms);
        }
      });
    }
  }, [userProfile]);

  return { listGroup, setListGroup };
};

export default useFetchAllGroup;
