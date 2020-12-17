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
  const [messErr, setMessErr] = useState(false);
  const onFinish = values => {
    const formData = new FormData();
    if (!messErr) {
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
    } else {
      setVisible(false);
      setMessErr(false);
    }
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
  const onUpload = () => {
    setVisible(true);
    setType('ImageAndVideo');
  };
  const cancelUpload = () => {
    setVisible(false);
    setMessErr(false);
  };
  const onUploadFile = () => {
    setVisible(true);
    setType('File');
  };
  const handleChangeFile = e => {
    const reader = new FileReader();
    if (!messErr) {
      let type = e.file.originFileObj?.type;
      if (type == 'image/png' || type == 'image/jpeg') {
        setType('Image');
      } else if (
        type == 'video/mp4' ||
        type == 'video/mov' ||
        type == 'video/quicktime'
      ) {
        setType('Video');
      } else {
        setType('File');
      }
      if (e.file.originFileObj) {
        reader.readAsDataURL(e.file.originFileObj);
        setImageFormData(e.file.originFileObj);
      }
    }
  };
  function beforeUploadFile(file) {
    const isLt2M = file.size / 1024 / 1024 < 10;
    if (!isLt2M) {
      setMessErr(true);
    }
    return isLt2M;
  }
  const ModalFile = () => {
    return (
      <Modal
        title={type == 'File' ? 'Upload File' : 'Upload Image And Video'}
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
            listType={type == 'File' ? 'picture' : 'picture-card'}
            onChange={handleChangeFile}
            beforeUpload={beforeUploadFile}
            style={{ border: '1px dotted black' }}
          >
            <div style={{ cursor: 'pointer' }}>
              <UploadOutlined />
            </div>
          </Upload>
        )}
        {messErr ? (
          <p style={{ color: 'red', fontWeight: 'bold' }}>
            Chỉ được gửi file dưới 10MB{' '}
          </p>
        ) : (
          ''
        )}
      </Modal>
    );
  };
  return (
    <>
      {visible ? ModalFile() : ''}
      <Form className={c`chat_tab`} onFinish={onFinish} form={form}>
        <div className={c`icon_chat_tab`}>
          <div className={`content__inside`}>
            <Button
              icon={<i className="fa fa-image"></i>}
              onClick={onUpload}
            ></Button>
            <Button
              icon={<i className="fa fa-paperclip" aria-hidden="true"></i>}
              onClick={onUploadFile}
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
