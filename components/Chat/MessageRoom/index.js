// React Libary
import React, { useContext, useEffect, useState } from 'react';

//NextJS
import dynamic from 'next/dynamic';

//Common
import { classPrefixor } from 'utils/classPrefixor';
import useChatWithSocket from 'components/common/hook/useChatWithSocket';
import { InfoRoomContext } from 'components/common/context/InfoRoomContext';
import { Spin } from 'antd';

//Component
const InputChating = dynamic(() => import('./InputChat'));
const MessageList = dynamic(() => import('./MessageList'));
const RoomBar = dynamic(() => import('./RoomBar'));
const prefix = 'message-room';
const c = classPrefixor(prefix);

const MessageRoom = ({ ...props }) => {
  const { infoRoom } = useContext(InfoRoomContext);
  const { messages } = useChatWithSocket(infoRoom, props.id);
  const [messageinRoom, setMessageInRoom] = useState([]);
  const [pos, setPos] = useState(1000);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    if (messages) {
      setPos(900);
      setMessageInRoom(messages.slice(messages.length - 10, messages.length));
    }
  }, [messages]);
  const onScrollMessage = e => {
    const position = e.target.scrollTop;
    setIsLoading(true);
    if (position <= 0 && pos >= 101) {
      setTimeout(() => {
        // setMessageInRoom(messages.slice(messages.length - 10, messages.length));
        setPos(pos - 100);
        setIsLoading(false);
      }, 1500);
    }
  };
  return (
    <section className={prefix}>
      <div className={c`header`}>
        <RoomBar />
      </div>
      <div className={c`content`}>
        <div className="scroll-chat" onScroll={onScrollMessage}>
          {isLoading ? (
            <Spin tip="Đang tải ..." style={{ margin: '0' }}></Spin>
          ) : (
            ''
          )}
          <MessageList messages={messageinRoom} />
        </div>
      </div>
      <InputChating />
    </section>
  );
};
export default MessageRoom;
