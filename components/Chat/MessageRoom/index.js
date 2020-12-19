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
  const [pos, setPos] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (messages) {
      const currentPost = messages.length - 10 <= 0 ? 0 : messages.length - 10; // Nếu post <=0 thì vị trí bị âm sẽ lõi nên phải check
      setPos(currentPost);
      setMessageInRoom(messages.slice(currentPost, messages.length));
      setIsLoading(false);
    }
  }, [messages]);
  const onScrollMessage = e => {
    const position = e.target.scrollTop;
    setIsLoading(true);
    if (position <= 20) {
      setTimeout(() => {
        setMessageInRoom(
          messages.slice(pos - 10 <= 0 ? 0 : pos - 10, messages.length) // Nếu post <=0 thì vị trí bị âm sẽ lõi nên phải check
        );
        setPos(pos - 10);
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
            <div>
              <Spin
                tip="Đang tải ..."
                style={{ width: '100%', justifyContent: 'center' }}
              ></Spin>
            </div>
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
