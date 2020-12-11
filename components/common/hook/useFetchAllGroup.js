/* eslint-disable react-hooks/exhaustive-deps */
import { dispatchDefaulRoomstAction } from 'actions/roomsAction';
import { useState, useEffect, useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { SocketIOContext } from '../context/SocketIOContext';

const useFetchAllGroup = () => {
  const dispatch = useDispatch();
  const [listGroup, setListGroup] = useState([]);
  const { userProfile } = useSelector(state => state.userData);
  const { messageEditName } = useSelector(state => state.RoomsReducer);

  const { socket } = useContext(SocketIOContext);

  useEffect(() => {
    if (Object.keys(userProfile).length > 0) {
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
      dispatch(dispatchDefaulRoomstAction());
    }
  }, [userProfile, messageEditName]);

  return { listGroup, setListGroup };
};

export default useFetchAllGroup;
