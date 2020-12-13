// React Libary
import React, { useContext } from 'react';
import { Button } from 'antd';
import ScrollToBottom from 'react-scroll-to-bottom';

//NextJS
import dynamic from 'next/dynamic';

//Common
import { classPrefixor } from 'utils/classPrefixor';
import useChatWithSocket from 'components/common/hook/useChatWithSocket';
import { InfoRoomContext } from 'components/common/context/InfoRoomContext';

//Component
const InputChating = dynamic(() => import('./InputChat'));
const MessageList = dynamic(() => import('./MessageList'));
const RoomBar = dynamic(() => import('./RoomBar'));
const prefix = 'message-room';
const c = classPrefixor(prefix);

const MessageRoom = ({ ...props }) => {
  const { infoRoom } = useContext(InfoRoomContext);

  const { messages } = useChatWithSocket(infoRoom, props.id);

  return (
    <section className={prefix}>
      <div className={c`header`}>
        <RoomBar />
      </div>

      <div className={c`content`}>
        <ScrollToBottom className="scroll-chat">
          <MessageList messages={messages} />
        </ScrollToBottom>
      </div>
      <div className={c`icon_chat_tab`}>
        <div className={`content__inside`}>
          <Button>
            <i className="fa fa-image"></i>
          </Button>
          <Button>
            <i className="fa fa-paperclip"></i>
          </Button>
        </div>
      </div>
      <hr style={{ background: 'rgba(0, 0, 0, 0.1)' }} />
      <InputChating />
    </section>
  );
};
export default MessageRoom;
