import { EditOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Input, Upload, Form, Avatar } from 'antd';
import PropTypes, { func } from 'prop-types';
import ImgCrop from 'antd-img-crop';
import Modal from 'antd/lib/modal/Modal';
import React, { useEffect, useState } from 'react';
import { uploadImgSingle } from 'actions/uploadImgActions';
import { useDispatch } from 'react-redux';
import { updateProfileUser } from 'actions/userAction';
import { toast } from 'react-toastify';
import SendOtp from '../SendOtp';
import * as Validator from 'utils/validatorFormat';

const Update = props => {
  const { NAME_RGX } = Validator.RGX;
  const [imageFormData, setImageFormData] = useState();
  const [changeName, setChangeName] = useState(false);
  const [visibleOtp, setVisibleOtp] = useState(false);
  const {
    cancelAvatar,
    visible,
    setVisible,
    userProfile,
    setUserProfile
  } = props;
  const [typeOfsendOtp, setTypeSentOtp] = useState(false);
  const [imageChange, setImageChange] = useState(null);
  const [statusImageChange, setStatusImageChange] = useState(false);
  const dispatch = useDispatch();
  const cancelSendOtp = () => {
    setVisibleOtp(false);
  };
  useEffect(() => {
    if (userProfile) {
      setImageChange(userProfile.avatar);
    }
  }, [userProfile]);
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
    setImageChange(userProfile.avatar);
    setStatusImageChange(false);
  };
  const handleOnChange = e => {
    setUserProfile({
      ...userProfile,
      [e.target.name]: e.target.value
    });
  };
  const submitAvatar = () => {
    const formData = new FormData();
    formData.append('files', imageFormData);
    if (imageFormData) {
      uploadImgSingle(formData).then(res => {
        const dataUpdate = {
          name: userProfile?.name,
          avatar: res.data[0],
          phone: userProfile?.phone,
          email: userProfile?.email
        };
        dispatch(updateProfileUser(dataUpdate)).then(() => {
          setVisible(false);
          toast.success('🦄 Update Successful!', {
            position: 'top-right',
            autoClose: 3000
          });
          setImageChange(res.data);
          setStatusImageChange(false);
        });
      });
    } else {
      const dataUpdate = {
        name: userProfile?.name,
        avatar: userProfile?.avatar,
        phone: userProfile?.phone,
        email: userProfile?.email
      };
      dispatch(updateProfileUser(dataUpdate)).then(() => {
        setVisible(false);
        toast.success('🦄 Update Successful!', {
          position: 'top-right',
          autoClose: 3000
        });
        setImageChange(userProfile.avatar);
        setStatusImageChange(false);
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
        setStatusImageChange(true);
      }
    };
    if (e.file.originFileObj) {
      reader.readAsDataURL(e.file.originFileObj);
      setImageFormData(e.file.originFileObj);
    } else if (!e.file.originFileObj) {
      setImageChange(avatar);
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
      className="modalUpdateUser"
      visible={visible}
      onOk={submitAvatar}
      onCancel={cancelModal}
      footer={null}
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
            {imageChange ? (
              <img
                className="img_avatar"
                src={statusImageChange ? imageChange : userProfile?.avatar}
              />
            ) : (
              <Avatar
                size={84}
                icon={<UserOutlined />}
                style={{ marginLeft: '30%' }}
              />
            )}
          </div>
        </Upload>
      </ImgCrop>
      <Form
        layout="vertical"
        id="updateUser"
        name="update"
        initialValues={{
          name: userProfile?.name
        }}
      >
        {changeName ? (
          <Form.Item
            name="name"
            rules={[
              { required: true, message: 'Vui lòng nhập tên!' },
              {
                max: 32,
                min: 6,
                message: 'Tên có ít nhất 6 ký tự và tối đa 32 ký tự'
              },
              {
                pattern: NAME_RGX,
                message: 'Không chứa ký tự đặc biệt'
              }
            ]}
            onBlur={() => {
              setChangeName(false);
            }}
          >
            <Input name="name" onChange={handleOnChange} />
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
            {userProfile ? userProfile.name : ''}
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
          {userProfile && userProfile.email ? (
            <Input name="email" disabled value={userProfile.email} />
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
          {userProfile && userProfile.phone ? (
            <Input name="phone" disabled value={userProfile.phone} />
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
      <Button
        type="primary"
        onClick={submitAvatar}
        style={{
          fontSize: '12px',
          fontWeight: '500',
          margin: '0px auto',
          display: 'block'
        }}
      >
        Cập Nhật
      </Button>
    </Modal>
  );
};
export default Update;

Update.propTypes = {
  children: PropTypes.objectOf(PropTypes.any),
  cancelAvatar: func,
  userProfile: PropTypes.objectOf(PropTypes.any),
  visible: PropTypes.any,
  setVisible: PropTypes.func,
  setUserProfile: func
};
Update.defaultProps = {
  children: {},
  cancelAvatar: {},
  visible: {},
  setVisible: {},
  setUserProfile: {}
};
