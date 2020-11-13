import { Button, Input } from 'antd';
import React, { useState } from 'react';
import { classPrefixor } from 'utils/classPrefixor';
import { SendOutlined, SmileOutlined, LikeOutlined } from '@ant-design/icons';
const prefix = 'message-room';
const c = classPrefixor(prefix);

const MessageRoom = () => {
  const [message, SetMessege] = useState();

  const onHandleChangeMessage = e => {
    SetMessege(e.target.value);
  };

  return (
    <section className={prefix}>
      <div className={c`header`}>
        <div className="info_room">
          <img src="https://kenhcine.cgv.vn/media/catalog/product/s/e/secret-life-of-pets-snowball-spicypulp.jpg" />
          <div className="content_room">
            <h1
              style={{
                fontSize: '24px',
                lineHeight: 1.4,
                color: '#222',
                paddingLeft: 0,
                left: '8px',
                fontWeight: 500,
                overflow: 'hidden',
                whiteSpace: 'nowrap',
                minWidth: 0,
                cursor: 'default'
              }}
            >
              Ngoc Mai
            </h1>
            <div className="info_user_room">
              <span style={{ fontSize: '14px', color: '#99a4b0' }}>
                Truy cập 2h trước
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className={c`content`}>
        <div className={c`content__inside`}></div>
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
      <div className={c`chat_tab`}>
        <Input
          onChange={onHandleChangeMessage}
          value={message}
          placeholder="Nhập tin nhắn của bạn"
        />
        <div className="icon">
          <Button>
            <SmileOutlined style={{ color: '#767676' }} />
          </Button>
          {message ? (
            <Button>
              <SendOutlined />
            </Button>
          ) : (
            <Button>
              <LikeOutlined />
            </Button>
          )}
        </div>
      </div>
    </section>
  );
};
export default MessageRoom;
