import { EditOutlined, SettingOutlined } from '@ant-design/icons';
import { isTokenExpired } from 'actions/accountAction';
import logo from 'assets/images/zola-logo.png';
import { Col, Dropdown, Input, Layout, Menu, Row } from 'antd';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { classPrefixor } from 'utils/classPrefixor';
import Update from 'components/Account/Update';
const prefix = 'side-bar';
const { Search } = Input;
const c = classPrefixor(prefix);
const Sidebar = () => {
  const [visible, setVisible] = useState(false);
  const [userData, setUserData] = useState(null);
  const { userProfile, isAuthenticated } = useSelector(state => state.userData);
  const dispatch = useDispatch();
  const showModal = () => {
    setVisible(true);
  };
  const cancelAvatar = () => {
    setVisible(false);
    setUserData(userProfile);
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
        icon={<SettingOutlined style={styleIcon} />}
        style={styleMenuItem}
      >
        <a target="_blank" rel="noopener noreferrer" onClick={showModal}>
          Cài đặt
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
  const messageList = (
    <Menu style={menuUser}>
      <Menu.Item style={styleMenuItem}>
        <a target="_blank" rel="noopener noreferrer" onClick={showModal}>
          Tin nhắn cá nhân{' '}
        </a>
      </Menu.Item>
      <Menu.Item style={styleMenuItem}>
        <a target="_blank" rel="noopener noreferrer" onClick={showModal}>
          Tin nhắn nhóm{' '}
        </a>
      </Menu.Item>
    </Menu>
  );
  useEffect(() => {
    if (!isAuthenticated) dispatch(isTokenExpired());
  }, [isAuthenticated, dispatch]);
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
              <Update
                cancelAvatar={cancelAvatar}
                userProfile={userProfile}
                visible={visible}
                setVisible={setVisible}
              />
            </div>
            <Menu
              mode="inline"
              style={{
                height: 'calc(13vh - 0px)'
              }}
            >
              <Menu.Item
                key="1"
                style={{
                  paddingBottom: '50px',
                  paddingTop: '20px'
                }}
              >
                <i className="fa fa-comment"></i>
              </Menu.Item>
              <Menu.Item
                key="2"
                style={{ paddingBottom: '50px', paddingTop: '20px' }}
              >
                <i className="fa fa-address-book"></i>
              </Menu.Item>
              <Menu.Item
                key="3"
                style={{ paddingBottom: '50px', paddingTop: '20px' }}
              >
                <i
                  className="fa fa-user-friends"
                  style={{ marginRight: '10px' }}
                ></i>
              </Menu.Item>
            </Menu>
          </Col>
          <Col span={20}>
            <div className="zola-section">
              <div className="zola-header">
                <div
                  className="logo-header"
                  style={{
                    display: 'inline-block',
                    width: '40%',
                    float: 'left'
                  }}
                >
                  <img src={logo} alt="hihi" />
                </div>
                <div
                  style={{
                    display: 'inline-block',
                    width: '40%',
                    marginTop: '24px',
                    float: 'left',
                    fontWeight: '350',
                    fontSize: '30px'
                  }}
                >
                  <span>- {userData ? userData.name : ''}</span>
                </div>
              </div>
              <Row className="zola-section-mid">
                <Col span={15} className="search-zola-message">
                  <Search
                    placeholder="Nhập vào tin nhắn"
                    onSearch={value => console.log(value)}
                    enterButton
                  />
                </Col>
                <Col span={6} className="icon-zola-message">
                  <i
                    className="fa fa-user-plus"
                    style={{ marginRight: '15px' }}
                  ></i>
                  <i className="fa fa-plus"></i>
                </Col>
              </Row>
              <div className="content-zola-message">
                <div className="header-content-zola-message">
                  <Dropdown overlay={messageList}>
                    <span className="message">
                      Tin nhắn <i className="fa fa-caret-down"></i>
                    </span>
                  </Dropdown>
                </div>
                <div className="main-content-zola-message">
                  <Row className="message-view">
                    <Col span={6} className="avatar">
                      <img
                        src={
                          userProfile?.avatar ? userProfile?.avatar : 'avatar'
                        }
                        className="img_avatar"
                        data-reactid="23"
                        alt="avatar"
                      />
                    </Col>
                    <Col span={15}>
                      <h4 className="name-message-room">{userData?.name}</h4>
                      <p className="content-message-room">
                        Tin nhan o day..........
                      </p>
                    </Col>
                    <Col span={3}>
                      <span className="last-time-message-room">1h</span>
                      <p className="open-option-message-room">...</p>
                    </Col>
                  </Row>
                  <Row className="message-view">
                    <Col span={6} className="avatar">
                      <img
                        src={
                          userProfile?.avatar ? userProfile?.avatar : 'avatar'
                        }
                        className="img_avatar"
                        data-reactid="23"
                        alt="avatar"
                      />
                    </Col>
                    <Col span={15}>
                      <h4 className="name-message-room">{userData?.name}</h4>
                      <p className="content-message-room">
                        Tin nhan o day..........
                      </p>
                    </Col>
                    <Col span={3}>
                      <span className="last-time-message-room">1h</span>
                      <p className="open-option-message-room">...</p>
                    </Col>
                  </Row>
                  <Row className="message-view">
                    <Col span={6} className="avatar">
                      <img
                        src={
                          userProfile?.avatar ? userProfile?.avatar : 'avatar'
                        }
                        className="img_avatar"
                        data-reactid="23"
                        alt="avatar"
                      />
                    </Col>
                    <Col span={15}>
                      <h4 className="name-message-room">{userData?.name}</h4>
                      <p className="content-message-room">
                        Tin nhan o day..........
                      </p>
                    </Col>
                    <Col span={3}>
                      <span className="last-time-message-room">1h</span>
                      <p className="open-option-message-room">...</p>
                    </Col>
                  </Row>
                  <Row className="message-view">
                    <Col span={6} className="avatar">
                      <img
                        src={
                          userProfile?.avatar ? userProfile?.avatar : 'avatar'
                        }
                        className="img_avatar"
                        data-reactid="23"
                        alt="avatar"
                      />
                    </Col>
                    <Col span={15}>
                      <h4 className="name-message-room">{userData?.name}</h4>
                      <p className="content-message-room">
                        Tin nhan o day..........
                      </p>
                    </Col>
                    <Col span={3}>
                      <span className="last-time-message-room">1h</span>
                      <p className="open-option-message-room">...</p>
                    </Col>
                  </Row>
                  <Row className="message-view">
                    <Col span={6} className="avatar">
                      <img
                        src={
                          userProfile?.avatar ? userProfile?.avatar : 'avatar'
                        }
                        className="img_avatar"
                        data-reactid="23"
                        alt="avatar"
                      />
                    </Col>
                    <Col span={15}>
                      <h4 className="name-message-room">{userData?.name}</h4>
                      <p className="content-message-room">
                        Tin nhan o day..........
                      </p>
                    </Col>
                    <Col span={3}>
                      <span className="last-time-message-room">1h</span>
                      <p className="open-option-message-room">...</p>
                    </Col>
                  </Row>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </Layout>
    </div>
  );
};
export default Sidebar;
