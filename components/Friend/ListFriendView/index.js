import useChangeMeta from 'components/common/hook/useChangeMeta';
import React from 'react';
import { classPrefixor } from 'utils/classPrefixor';
import logo from 'assets/images/zola-logo.png';
const prefix = 'list-friend-view';
const c = classPrefixor(prefix);

const ListFriendView = () => {
  useChangeMeta('Danh sách bạn bè');
  return (
    <div className={c`main-container`}>
      <div
        style={{
          width: '475px',
          textAlign: 'center',
          color: 'rgb(34, 34, 34)'
        }}
        className="title-header"
      >
        <div
          style={{
            fontSize: '36px',
            color: '#8E8E93',
            marginTop: '30px',
            width: '70%',
            float: 'left'
          }}
        >
          <span>Danh sách bạn bè </span>
        </div>
        <div className="img-title">
          <img src={logo} style={{ width: '50%' }} />
        </div>
      </div>
      <div className="clear-float"></div>
      <div className="img-home"></div>
    </div>
  );
};
export default ListFriendView;
