import { LikeOutlined, SendOutlined, SmileOutlined } from '@ant-design/icons';
import { Button, Input, Form } from 'antd';
import { SocketIOContext } from 'components/common/context/SocketIOContext';
import React, { useContext, useState } from 'react';
import { classPrefixor } from 'utils/classPrefixor';
const prefix = 'message-room';
const c = classPrefixor(prefix);
const InputChat = () => {
  const [message, SetMessage] = useState('');
  const onHandleChangeMessage = e => {
    SetMessage(e.target.value);
  };
  const [form] = Form.useForm();
  const { socket } = useContext(SocketIOContext);

  const onFinish = values => {
    socket.emit('send_and_recive', {
      message: values.chatting,
      type: 'String'
    });
    form.resetFields();
  };

  return (
    <Form className={c`chat_tab`} onFinish={onFinish} form={form}>
      <Form.Item
        name="chatting"
        style={{ width: '85%', display: 'inline-block' }}
      >
        <Input
          onChange={onHandleChangeMessage}
          value={message}
          placeholder="Nhập tin nhắn của bạn"
          autoFocus
        />
      </Form.Item>
      <div className="icon">
        <Button>
          <SmileOutlined style={{ color: '#767676' }} />
        </Button>
        {message ? (
          <Button htmlType="submit">
            <SendOutlined />
          </Button>
        ) : (
          <Button>
            <LikeOutlined />
          </Button>
        )}
      </div>
    </Form>
  );
};

export default InputChat;
