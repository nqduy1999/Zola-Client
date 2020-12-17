import {
  LikeOutlined,
  SendOutlined,
  SmileOutlined,
  UploadOutlined
} from '@ant-design/icons';
import 'emoji-mart/css/emoji-mart.css';
import { uploadImgSingle } from 'actions/uploadImgActions';
import { Button, Input, Form, Upload, Menu, Dropdown } from 'antd';
import { SocketIOContext } from 'components/common/context/SocketIOContext';
import { Picker } from 'emoji-mart';
import React, { useContext, useState } from 'react';
import { classPrefixor } from 'utils/classPrefixor';
import Modal from 'antd/lib/modal/Modal';
import { Spin } from 'antd';

const prefix = 'message-room';
const c = classPrefixor(prefix);
const InputChat = () => {
  const [message, SetMessage] = useState();
  // const [showPicker, setPickerState] = useState(false);
  const [form] = Form.useForm();
  const { socket } = useContext(SocketIOContext);
  const [type, setType] = useState('String');
  const [status, setStatus] = useState(false);
  const [visible, setVisible] = useState(false);
  const [imageFormData, setImageFormData] = useState();
  const [loading, setLoading] = useState(false);
  const onFinish = values => {
    const formData = new FormData();
    setLoading(true);
    if (imageFormData) {
      formData.append('files', imageFormData);
      uploadImgSingle(formData).then(res => {
        if (res.data[0]) {
          setLoading(false);
          socket.emit('send_and_recive', {
            message: res.data[0],
            type: type
          });
          setVisible(false);
        }
      });
    } else {
      socket.emit('send_and_recive', {
        message: values.chatting,
        type: type
      });
    }
    resetFieldOnSubmit();
  };
  const resetFieldOnSubmit = () => {
    form.resetFields();
    setStatus(false);
  };
  const onHandleChangeMessage = e => {
    SetMessage(e.target.value);
    setType('String');
    if (e.target.value == '') {
      setStatus(false);
    } else {
      setStatus(true);
    }
  };
  const addEmoji = e => {
    console.log();
    let emoji = e.native;
    SetMessage(message + emoji);
  };
  const menu = () => (
    <Menu>
      <Menu.Item key="0">
        <Picker onSelect={addEmoji} emojiTooltip={true} title="Zola" theme="" />
      </Menu.Item>
    </Menu>
  );
  const onUploadImage = () => {
    setVisible(true);
    setType('Image');
  };
  const onUploadVideo = () => {
    setVisible(true);
    setType('Video');
  };
  const cancelUpload = () => {
    setVisible(false);
  };
  const handleChangeFile = e => {
    const reader = new FileReader();
    if (e.file.originFileObj) {
      reader.readAsDataURL(e.file.originFileObj);
      setImageFormData(e.file.originFileObj);
    }
  };
  function beforeUpload(file) {
    if (type == 'Image') {
      const isJpgOrPng =
        file.type === 'image/jpeg' || file.type === 'image/png';
      if (!isJpgOrPng) {
        message.error('Chỉ có thể upload hình với định dạng jpg/png!');
      }
      const isLt2M = file.size / 1024 / 1024 < 5;
      if (!isLt2M) {
        message.error('Ảnh phải nhỏ hơn 5 MB!');
      }
      return isJpgOrPng && isLt2M;
    } else if (type == 'Video' || type == 'file') {
      const isLt2M = file.size / 1024 / 1024 < 100;
      if (!isLt2M) {
        message.error('File phải nhỏ hơn 100 MB!');
      }
      return isLt2M;
    }
  }
  return (
    <>
      {visible && type == 'Image' ? (
        <Modal
          title="Upload ảnh"
          className="modalUpdateUser"
          visible={visible}
          onOk={onFinish}
          onCancel={cancelUpload}
          footer={[
            <Button key="submit" onClick={onFinish}>
              Gửi
            </Button>
          ]}
          style={{
            width: '150px'
          }}
        >
          {loading ? (
            <Spin
              tip="Đang tải ..."
              style={{ width: '100%', justifyContent: 'center' }}
            ></Spin>
          ) : (
            <Upload
              action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
              listType="picture-card"
              onChange={handleChangeFile}
              beforeUpload={beforeUpload}
              style={{ border: '1px dotted black' }}
            >
              <div style={{ cursor: 'pointer' }}>
                <UploadOutlined />
              </div>
            </Upload>
          )}
        </Modal>
      ) : (
        <Modal
          title="Upload File"
          className="modalUpdateUser"
          visible={visible}
          onOk={onFinish}
          onCancel={cancelUpload}
          footer={[
            <Button key="submit" onClick={onFinish}>
              Gửi
            </Button>
          ]}
          style={{
            width: '150px'
          }}
        >
          {loading ? (
            <Spin
              tip="Đang tải ..."
              style={{ width: '100%', justifyContent: 'center' }}
            ></Spin>
          ) : (
            <Upload
              action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
              listType="picture"
              onChange={handleChangeFile}
              beforeUpload={beforeUpload}
              style={{ border: '1px dotted black' }}
            >
              <div style={{ cursor: 'pointer' }}>
                <UploadOutlined />
              </div>
            </Upload>
          )}
        </Modal>
      )}
      <Form className={c`chat_tab`} onFinish={onFinish} form={form}>
        <div className={c`icon_chat_tab`}>
          <div className={`content__inside`}>
            <Button
              icon={<i className="fa fa-image"></i>}
              onClick={onUploadImage}
            ></Button>
            <Button
              icon={<i className="fa fa-paperclip" aria-hidden="true"></i>}
              onClick={onUploadVideo}
              style={{ paddingLeft: '50px' }}
            ></Button>
          </div>
        </div>
        <hr style={{ background: 'rgba(0, 0, 0, 0.1)' }} />
        <Form.Item
          name="chatting"
          style={{ width: '85%', display: 'inline-block' }}
        >
          {type && type === 'String' ? (
            <Input
              onChange={onHandleChangeMessage}
              value={message}
              placeholder="Nhập tin nhắn của bạn"
              autoFocus
              style={{ border: 'none', height: '64px' }}
            />
          ) : (
            <></>
          )}
        </Form.Item>
        <div className="icon" style={{ marginTop: '15px' }}>
          <Dropdown overlay={() => menu()} trigger={['click']}>
            <SmileOutlined
              style={{
                fontSize: '20px',
                color: '#0068ff',
                paddingRight: '10px'
              }}
            />
          </Dropdown>
          {status ? (
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
    </>
  );
};

export default InputChat;
