/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { SocketIOContext } from '../context/SocketIOContext';

const useChatWithSocket = (dataGroup, id) => {
  const [messages, setMessages] = useState([]);
  const { userProfile } = useSelector(state => state.userData);

  const { socket } = useContext(SocketIOContext);

  const findUserCurrent = () => {
    return dataGroup?.users?.find(user => user.id === userProfile.id);
  };
  useEffect(() => {
    if (dataGroup?.users !== undefined) {
      const findUser = findUserCurrent();
      const info = {
        list_user: dataGroup?.users,
        roomId: dataGroup?._id,
        positionUserCurrent: dataGroup?.users?.indexOf(findUser)
      };

      socket.emit('join', info);

      socket.on('load_message', function (room) {
        const { messages: _messages, users } = room;
        const userLogin = users.find(user => user.id == userProfile?.id);
        setMessages(
          _messages.filter(
            msg => new Date(msg.createdAt) > new Date(userLogin?.startDate)
          )
        );
      });
    } else {
      if (dataGroup?.id === id) {
        const infoUser = {
          list_user: [userProfile, dataGroup],
          positionUserCurrent: 0
        };
        socket.emit('join', infoUser);
        socket.on('load_message', function (room) {
          const { messages: _messages, users } = room;
          const userLogin = users.find(user => user.id == userProfile?.id);
          setMessages(
            _messages.filter(
              msg => new Date(msg.createdAt) > new Date(userLogin?.startDate)
            )
          );
        });
      }
    }
  }, [dataGroup]);

  useEffect(() => {
    socket.on('send_and_recive', function (msg) {
      setMessages(preMess => [...preMess, msg]);
    });
  }, []);

  return { messages, setMessages };
};

export default useChatWithSocket;
