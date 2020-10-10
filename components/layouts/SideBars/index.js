import { HomeOutlined } from '@ant-design/icons';
import { Col, Layout, Menu, Row } from 'antd';
// import ImgCrop from 'antd-img-crop';
// import Modal from 'antd/lib/modal/Modal';
import React from 'react';
import { classPrefixor } from 'utils/classPrefixor';
const prefix = 'side-bar';
const c = classPrefixor(prefix);
const Sidebar = () => {
  // const [profile, setProfile] = useState();
  // const submitAvatar = () => {
  //   const formData = new FormData();
  //   formData.append('avatar', imageFormData);
  //   if (imageFormData) {
  //     //   for (var [key, value] of formData.entries()) {
  //     //     console.log(key, value);
  //     //   }
  //     Upload_Image_Single(formData).then(res => {
  //       console.log(res);
  //       const dataUpdate = {
  //         name: adminProfile?.name || '',
  //         avatar: `https://api-ret.ml/api/v0/images/download/${res.data}`,
  //         role: 'ADMIN'
  //       };
  //       dispatch(updateInfoAdmin(dataUpdate)).then(() => {
  //         setVisible(false);
  //         toast.success('🦄 Update Successful!', {
  //           position: 'top-right',
  //           autoClose: 3000
  //         });
  //       });
  //     });
  //   }
  // };
  // function beforeUpload(file) {
  //   const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  //   if (!isJpgOrPng) {
  //     message.error('Chỉ có thể upload hình với định dạng jpg/png!');
  //   }
  //   const isLt2M = file.size / 1024 / 1024 < 5;
  //   if (!isLt2M) {
  //     message.error('Ảnh phải nhỏ hơn 5 MB!');
  //   }
  //   return isJpgOrPng && isLt2M;
  // }
  // const handleChangeFile = e => {
  //   const reader = new FileReader();
  //   reader.onload = () => {
  //     console.log(reader);
  //     if (reader.readyState === 2) {
  //       setImageChange(reader.result);
  //     }
  //   };
  //   // if (e.file.status === 'uploading') {
  //   //   setLoading(true);
  //   // }
  //   if (e.file.originFileObj) {
  //     reader.readAsDataURL(e.file.originFileObj);
  //     setImageFormData(e.file.originFileObj);
  //   } else if (!e.file.originFileObj) {
  //     setImageChange(null);
  //   }
  //   setLoading(false);
  // };
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
                paddingTop: '15px',
                height: 'calc(13vh - 0px)'
              }}
              mode="inline"
            >
              <div className="avatar" style={{ cursor: 'pointer' }}>
                <img
                  // src={userProfile?.avatar ? userProfile?.avatar : 'avatar'}
                  className="img_avatar"
                  data-reactid="23"
                  alt="avatar"
                />
                {/* <Modal
                  title="Thay đổi Avatar"
                  visible={visible}
                  onOk={submitAvatar}
                  onCancel={cancelAvatar}
                  footer={[
                    <Button key="back" onClick={cancelAvatar}>
                      Close
                    </Button>,
                    <Button key="submit" type="primary" onClick={submitAvatar}>
                      Upload
                    </Button>
                  ]}
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
                      style={{ background: 'red' }}
                    >
                      {imageChange ? (
                        <img
                          src={imageChange}
                          alt="avatar"
                          style={{
                            width: '100%'
                          }}
                        />
                      ) : (
                        uploadButton
                      )}
                    </Upload>
                  </ImgCrop>
                </Modal> */}
              </div>
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
