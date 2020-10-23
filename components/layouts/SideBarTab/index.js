import React, { useEffect } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { Button } from 'antd';
import avatar from 'assets/images/logo.png';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';

import { classPrefixor } from 'utils/classPrefixor';
import { accountLogout, isTokenExpired } from 'actions/accountAction';
import SearchComponent from './Search';
import HomePage from 'components/HomePage';
import Directory from './Directory';
import FriendList from './Directory/FriendList';
const prefix = 'sidebar-tab';
const c = classPrefixor(prefix);

const SideBarTab = () => {
  const { userProfile, isAuthenticated } = useSelector(state => state.userData);
  const dispatch = useDispatch();
  const { push } = useRouter();

  useEffect(() => {
    if (!isAuthenticated) dispatch(isTokenExpired());
  }, [isAuthenticated, dispatch]);

  const renderData = () => {
    return (
      <>
        <section className={prefix}>
          <Tabs
            forceRenderTabPanel
            defaultIndex={0}
            className={c`tabs`}
            selectedTabClassName="is-selected"
          >
            <TabList className={c`tabs__tablist`}>
              <div className="tablist__content">
                <div className="avatar" style={{ cursor: 'pointer' }}>
                  <img
                    src={
                      userProfile?.avatar
                        ? `https://api-ret.ml/api/v0/images/download/${userProfile?.avatar}`
                        : avatar
                    }
                    className="img_avatar"
                    data-reactid="23"
                  />

                  <div className="icon-online"></div>
                </div>
                <Tab>
                  <i className="fa fa-comment"></i>
                </Tab>
                <Tab>
                  <i className="fa fa-address-book"></i>
                </Tab>
                <div className="sign-out">
                  <Button
                    onClick={() => {
                      dispatch(accountLogout(push));
                    }}
                  >
                    <i className="fa fa-sign-out-alt"></i>
                  </Button>
                </div>
              </div>
            </TabList>
            <TabPanel>
              <Tabs forceRenderTabPanel>
                <TabList className={c`tabs__tablist`}>
                  <SearchComponent />
                  <Tab>Homer Simpson</Tab>
                  <Tab>Marge Simpson</Tab>
                </TabList>
                <TabPanel>
                  <HomePage />
                </TabPanel>
                <TabPanel>
                  <p>Wife of Homer; mother of Bart, Lisa, and Maggie.</p>
                  <img
                    src="https://upload.wikimedia.org/wikipedia/en/thumb/0/0b/Marge_Simpson.png/220px-Marge_Simpson.png"
                    alt="Marge Simpson"
                  />
                </TabPanel>
              </Tabs>
            </TabPanel>
            <TabPanel>
              <Tabs forceRenderTabPanel>
                <TabList className={c`tabs__tablist`}>
                  <SearchComponent />
                  <Tab className="tab">
                    <img
                      src="https://zalo-chat-static.zadn.vn/v1/NewFr@2x.png"
                      alt="imgAddF"
                    />
                    <span>Danh Sách Kết Bạn</span>
                  </Tab>
                  <Directory />
                </TabList>
                <TabPanel>
                  <FriendList />
                </TabPanel>
              </Tabs>
            </TabPanel>
          </Tabs>
        </section>
      </>
    );
  };
  return <>{renderData()}</>;
};

export default SideBarTab;
