import { EditOutlined, HomeOutlined } from '@ant-design/icons';
import { isTokenExpired } from 'actions/accountAction';
import { uploadImgSingle } from 'actions/uploadImgActions';
import { updateProfileUser } from 'actions/userAction';
import {
  Button,
  Col,
  Dropdown,
  Input,
  Layout,
  Menu,
  Row,
  Upload,
  Form
} from 'antd';
import ImgCrop from 'antd-img-crop';
import Modal from 'antd/lib/modal/Modal';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { classPrefixor } from 'utils/classPrefixor';
const prefix = 'side-bar';
const c = classPrefixor(prefix);
const Sidebar = () => {
  const [imageChange, setImageChange] = useState();
  const [imageFormData, setImageFormData] = useState();
  const [visible, setVisible] = useState(false);
  const [userData, setUserData] = useState(null);
  const [changeName, setChangeName] = useState(false);
  const { userProfile, isAuthenticated } = useSelector(state => state.userData);
  const dispatch = useDispatch();
  const showModal = () => {
    setVisible(true);
    setImageChange(null);
  };
  const handleOnChange = e => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value
    });
  };
  const cancelAvatar = () => {
    setVisible(false);
    setUserData(userProfile);
    setChangeName(false);
  };
  useEffect(() => {
    if (userProfile) {
      setUserData(userProfile);
    }
  }, [userProfile]);
  const styleIcon = {
    marginRight: '8px',
    color: '#99a4b0'
  };
  const menuUser = {
    marginLeft: '30px',
    borderRadius: '2px',
    width: '270px',
    marginTop: '7px',
    fontSize: '14px'
  };
  const styleMenuItem = {
    padding: '10px 20px'
  };
  const menuList = (
    <Menu style={menuUser}>
      <Menu.Item
        icon={<EditOutlined style={styleIcon} />}
        style={styleMenuItem}
      >
        <a target="_blank" rel="noopener noreferrer" onClick={showModal}>
          Cập nhật thông tin
        </a>
      </Menu.Item>
      <Menu.Item
        style={{ padding: '10px 20px', color: 'red', fontWeight: '500' }}
      >
        <a target="_blank" rel="noopener noreferrer" style={{ color: 'red' }}>
          Đăng Xuất
        </a>
      </Menu.Item>
    </Menu>
  );
  useEffect(() => {
    if (!isAuthenticated) dispatch(isTokenExpired());
  }, [isAuthenticated, dispatch]);
  const submitAvatar = () => {
    const formData = new FormData();
    formData.append('avatar', imageFormData);
    if (imageFormData) {
      // for (var [key, value] of formData.entries()) {
      //   console.log(key, value);
      // }
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
        });
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
      console.log(reader);
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
  return (
    <div className={c`container`}>
      <Layout>
        <Row>
          <Col
            span={4}
            style={{
              paddingTop: '20px',
              backgroundImage: 'linear-gradient(#0cb3ff,#0068ff)',
              height: 'calc(100vh - 0px)'
            }}
          >
            <div
              style={{
                height: 'calc(13vh - 0px)'
              }}
              mode="inline"
            >
              <Dropdown overlay={menuList} placement="bottomRight">
                <div className="avatar" style={{ cursor: 'pointer' }}>
                  <img
                    src={userProfile?.avatar ? userProfile?.avatar : 'avatar'}
                    className="img_avatar"
                    data-reactid="23"
                    alt="avatar"
                  />
                  <div className="icon-online"></div>
                </div>
              </Dropdown>

              <Modal
                title="Cập nhật thông tin"
                visible={visible}
                onOk={submitAvatar}
                onCancel={cancelAvatar}
                footer={[
                  <Button
                    key="back"
                    onClick={cancelAvatar}
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
                      rules={[
                        { required: true, message: 'Tên không được để trống!' }
                      ]}
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
                      Chào mừng, {userData ? userData.name : ''}
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
                      { required: true, message: 'Tên không được để trống!' }
                    ]}
                  >
                    {userData && userData.email ? (
                      <Input name="email" disabled value={userData.email} />
                    ) : (
                      <Input name="email" onChange={handleOnChange} />
                    )}
                  </Form.Item>
                  <Form.Item
                    label="Phone"
                    rules={[
                      {
                        required: true,
                        message: 'Số điện thoại không để trống!'
                      }
                    ]}
                  >
                    {userData && userData.phone ? (
                      <Input name="phone" disabled value={userData.phone} />
                    ) : (
                      <Input name="phone" onChange={handleOnChange} />
                    )}
                  </Form.Item>
                </Form>
              </Modal>
            </div>
            <Menu mode="inline">
              <Menu.Item key="3">
                <HomeOutlined />
              </Menu.Item>
            </Menu>
          </Col>
          <Col span={20}></Col>
        </Row>
      </Layout>
    </div>
  );
};
export default Sidebar;
