import React from 'react';
import { classPrefixor } from 'utils/classPrefixor';
// import { FileImageOutlined, FileAddOutlined, SendOutlined } from '@ant-design/icons';
const prefix = 'message-room';
const c = classPrefixor(prefix);
const MessageRoom = () => {
  return (
    <section className={prefix}>
      <div className={c`header`}>
        <img alt="imgAddF" />
        <span></span>
      </div>
      <div className={c`content`}>
        <div className={c`content__inside`}></div>
      </div>
      <div className={c`chat_tab`}>
        <div className={c`content__inside`}></div>
      </div>
    </section>
  );
};
export default MessageRoom;
