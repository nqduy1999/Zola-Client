import React from 'react';
import { classPrefixor } from 'utils/classPrefixor';
import carousel4 from 'assets/images/carousel-home-4.jpg';
import useChangeMeta from 'components/common/hook/useChangeMeta';

const prefix = 'homePage';
const c = classPrefixor(prefix);
const style = {
  top: '25px',
  position: 'absolute'
};
const FriendOnPhoneBook = () => {
  useChangeMeta('Danh sách đồng bộ');
  return (
    <div className={c`main-container`} style={style}>
      <div
        style={{
          width: '475px',
          color: 'rgb(34, 34, 34)'
        }}
        className="title-header"
      ></div>
      <div className="clear-float"></div>
      <div className="content"></div>
      <div className="img-home">
        <div>
          <img
            src={carousel4}
            className="img-carousel"
            style={{ marginLeft: '18%' }}
          />
          <div className="content" style={{ paddingBottom: '25px' }}>
            <span>
              Hãy lên điện thoại và đồng bộ hoá danh bạ của bạn để được gợi ý
              kết bạn
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
export default FriendOnPhoneBook;
