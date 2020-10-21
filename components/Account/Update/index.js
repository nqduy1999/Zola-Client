import { EditOutlined } from '@ant-design/icons';
import { Button, Input, Upload, Form } from 'antd';
import PropTypes from 'prop-types';
import ImgCrop from 'antd-img-crop';
import Modal from 'antd/lib/modal/Modal';
import React, { useEffect, useState } from 'react';
import { uploadImgSingle } from 'actions/uploadImgActions';
import avatar from 'assets/images/logo.png';
import { useDispatch } from 'react-redux';
import { updateProfileUser } from 'actions/userAction';
import { toast } from 'react-toastify';
import SendOtp from '../SendOtp';
import * as Validator from 'utils/validatorFormat';

const Update = props => {
  const [imageChange, setImageChange] = useState(avatar);
  const [imageFormData, setImageFormData] = useState();
  const [userData, setUserData] = useState(null);
  const [changeName, setChangeName] = useState(false);
  const [visibleOtp, setVisibleOtp] = useState(false);
  const { cancelAvatar, userProfile, visible, setVisible } = props;
  const [typeOfsendOtp, setTypeSentOtp] = useState(false);
  const dispatch = useDispatch();
  const cancelSendOtp = () => {
    setVisibleOtp(false);
  };
  const showSendOtpEmail = () => {
    setVisibleOtp(true);
    setTypeSentOtp(true);
  };
  const showSendOtpPhone = () => {
    setVisibleOtp(true);
    setTypeSentOtp(false);
  };
  const cancelModal = () => {
    cancelAvatar();
    setChangeName(false);
    setImageFormData(null);
    setUserData(userProfile);
    setImageChange(userProfile.avatar);
    setImageChange(avatar);
  };
  const handleOnChange = e => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value
    });
  };
  useEffect(() => {
    if (userProfile) {
      setUserData(userProfile);
      setImageChange(userProfile.avatar);
    }
  }, [userProfile]);
  const submitAvatar = () => {
    const formData = new FormData();
    formData.append('avatar', imageFormData);
    if (imageFormData) {
      uploadImgSingle(formData).then(res => {
        const dataUpdate = {
          name: userData?.name,
          avatar: `https://api-ret.ml/api/v0/images/download/${res.data}`
        };
        dispatch(updateProfileUser(dataUpdate)).then(() => {
          setVisible(false);
          toast.success('🦄 Update Successful!', {
            position: 'top-right',
            autoClose: 3000
          });
          setUserData(userProfile);
          setImageChange(
            `https://api-ret.ml/api/v0/images/download/${res.data}`
          );
        });
      });
    } else {
      const dataUpdate = {
        name: userData?.name,
        avatar: userData?.avatar
      };
      dispatch(updateProfileUser(dataUpdate)).then(() => {
        setVisible(false);
        toast.success('🦄 Update Successful!', {
          position: 'top-right',
          autoClose: 3000
        });
        setUserData(userProfile);
        setImageChange(userProfile.avatar);
      });
    }
  };
  function beforeUpload(file) {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      message.error('Chỉ có thể upload hình với định dạng jpg/png!');
    }
    const isLt2M = file.size / 1024 / 1024 < 5;
    if (!isLt2M) {
      message.error('Ảnh phải nhỏ hơn 5 MB!');
    }
    return isJpgOrPng && isLt2M;
  }
  const handleChangeFile = e => {
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setImageChange(reader.result);
      }
    };
    // if (e.file.status === 'uploading') {
    //   setLoading(true);
    // }
    if (e.file.originFileObj) {
      reader.readAsDataURL(e.file.originFileObj);
      setImageFormData(e.file.originFileObj);
    } else if (!e.file.originFileObj) {
      setImageChange(null);
    }
  };
  const sendOtpToPhone = () => {
    return (
      <Button className="addPhoneBtn" onClick={showSendOtpPhone}>
        <i className="fa fa-plus"></i>
        <span>Thêm số điện thoại</span>
      </Button>
    );
  };
  const sendOtpToEmail = () => {
    return (
      <Button className="addPhoneBtn" onClick={showSendOtpEmail}>
        <i className="fa fa-plus"></i>
        <span>Thêm Email</span>
      </Button>
    );
  };
  return (
    <Modal
      title="Cập nhật thông tin"
      visible={visible}
      onOk={submitAvatar}
      onCancel={cancelModal}
      footer={[
        <Button
          key="back"
          onClick={cancelModal}
          style={{
            border: 'none',
            fontSize: '16px',
            fontWeight: '500'
          }}
        >
          Huỷ
        </Button>,
        <Button
          key="submit"
          form="updateUser"
          onClick={submitAvatar}
          style={{
            border: 'none',
            color: '#0068ff',
            fontSize: '16px',
            fontWeight: '500'
          }}
        >
          Cập Nhật
        </Button>
      ]}
      style={{
        width: '150px'
      }}
    >
      <ImgCrop rotate>
        <Upload
          name="avatar"
          listType="picture-card"
          className="avatar-uploader"
          showUploadList={false}
          action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
          beforeUpload={beforeUpload}
          onChange={handleChangeFile}
        >
          <div className="avatar" style={{ cursor: 'pointer' }}>
            <img
              src={imageChange ? imageChange : userProfile?.avatar}
              className="img_avatar"
              data-reactid="23"
              alt="avatar"
            />
          </div>
        </Upload>
      </ImgCrop>
      <Form
        layout="vertical"
        id="updateUser"
        name="update"
        initialValues={{ remember: true }}
      >
        {changeName ? (
          <Form.Item
            rules={[Validator.required('Phone', 'Không được bỏ trống')]}
          >
            <Input
              name="name"
              value={userData ? userData?.name : ''}
              onChange={handleOnChange}
              onBlur={() => {
                setChangeName(false);
              }}
            />
          </Form.Item>
        ) : (
          <h1
            style={{
              lineHeight: '2em',
              fontSize: '1.1em',
              textAlign: 'center',
              paddingLeft: '5em'
            }}
          >
            {userData ? userData.name : ''}
            <Button
              style={{ border: 'none', paddingLeft: '6em' }}
              onClick={() => {
                setChangeName(true);
              }}
            >
              <EditOutlined />
            </Button>
          </h1>
        )}
        <Form.Item
          label="Email"
          rules={[
            Validator.emailFormat('Phone', 'Email không đúng định dạng'),
            Validator.required('Phone', 'Không được bỏ trống')
          ]}
        >
          {userData && userData.email ? (
            <Input name="email" disabled value={userData.email} />
          ) : (
            sendOtpToEmail()
          )}
        </Form.Item>
        <Form.Item
          label="Phone"
          rules={[
            Validator.phoneNumber(
              'Phone',
              'Số điện thoại không đúng định dạng'
            ),
            Validator.required('Phone', 'Không được bỏ trống')
          ]}
        >
          {userData && userData.phone ? (
            <Input name="phone" disabled value={userData.phone} />
          ) : (
            sendOtpToPhone()
          )}
        </Form.Item>
        <SendOtp
          visible={visibleOtp}
          cancelModal={cancelSendOtp}
          typeOfsendOtp={typeOfsendOtp}
        />
      </Form>
    </Modal>
  );
};
export default Update;

Update.propTypes = {
  children: PropTypes.objectOf(PropTypes.any),
  cancelAvatar: PropTypes.objectOf(PropTypes.any),
  userProfile: PropTypes.objectOf(PropTypes.any),
  visible: PropTypes.objectOf(PropTypes.any),
  setVisible: PropTypes.objectOf(PropTypes.any)
};
Update.defaultProps = {
  children: {},
  cancelAvatar: {},
  userProfile: {},
  visible: {},
  setVisible: {}
};
