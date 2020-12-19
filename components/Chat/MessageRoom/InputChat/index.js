/* eslint-disable no-unused-vars */
import {
  InboxOutlined,
  LikeOutlined,
  SendOutlined,
  SmileOutlined,
  UploadOutlined
} from '@ant-design/icons';
import 'emoji-mart/css/emoji-mart.css';
import { uploadImgSingle } from 'actions/uploadImgActions';
import InputEmoji from 'react-input-emoji';
import { Button, Form, Upload, Menu, Dropdown } from 'antd';
import { SocketIOContext } from 'components/common/context/SocketIOContext';
import React, { useContext, useState } from 'react';
import { classPrefixor } from 'utils/classPrefixor';
import Modal from 'antd/lib/modal/Modal';
import { Spin } from 'antd';
const { Dragger } = Upload;

const prefix = 'message-room';
const c = classPrefixor(prefix);
const InputChat = () => {
  const [message, setMessage] = useState();
  // const [showPicker, setPickerState] = useState(false);
  const [form] = Form.useForm();
  const { socket } = useContext(SocketIOContext);
  const [type, setType] = useState('String');
  const [visible, setVisible] = useState(false);
  const [imageFormData, setImageFormData] = useState();
  const [loading, setLoading] = useState(false);
  const [messErr, setMessErr] = useState(false);
  const [_, setListItem] = useState([]);
  const onFinish = values => {
    if (!messErr) {
      const formData = new FormData();
      if (imageFormData) {
        formData.append('files', imageFormData);
        setLoading(true);
        uploadImgSingle(formData).then(res => {
          if (res.data[0]) {
            console.log(res.data[0]);
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
    setImageFormData();
    setType('String');
  };
  const onHandleChangeMessage = mess => {
    setMessage(mess);
    setType('String');
    setLoading(false);
  };

  const sendTextMess = mess => {
    if (mess.trim()) {
      onFinish({
        chatting: mess
      });
    }
  };

  const onUpload = () => {
    setVisible(true);
    setType('ImageAndVideo');
  };
  const cancelUpload = () => {
    setVisible(false);
    setMessErr(false);
    setListItem([]);
    setLoading(false);
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
        setListItem(e.file.originFileObj);
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
        title={type == 'File' ? 'Tải File lên' : 'Tải Ảnh và Video'}
        className="modalUploadImageMessage"
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
        ) : type == 'File' ? (
          <Dragger
            multiple
            beforeUpload={beforeUploadFile}
            onChange={handleChangeFile}
          >
            <p className="ant-upload-drag-icon">
              <InboxOutlined />
            </p>
            <p className="ant-upload-text">
              Kéo thả file hoặc click vào đây để Upload
            </p>
            <p className="ant-upload-hint">
              Giúp việc gửi file trở nên dễ dàng hơn bao giờ hết
            </p>
          </Dragger>
        ) : (
          <Upload
            action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
            listType="picture-card"
            multiple
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
      <Form className={c`chat_tab`} form={form}>
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
        <InputEmoji
          onChange={onHandleChangeMessage}
          value={message}
          placeholder="Nhập tin nhắn của bạn"
          cleanOnEnter
          borderColor="rgb(80 81 119)"
          onEnter={sendTextMess}
        />
      </Form>
    </>
  );
};

export default InputChat;
