import { Button } from 'antd';
import React from 'react';
import { classPrefixor } from 'utils/classPrefixor';
import PropTypes from 'prop-types';

const prefix = 'message';
const c = classPrefixor(prefix);

const Message = props => {
  return (
    <div className={c`header`}>
      <div className="info_room">
        <img src="https://kenhcine.cgv.vn/media/catalog/product/s/e/secret-life-of-pets-snowball-spicypulp.jpg" />
        <div className="content_room">
          <h1
            style={{
              fontSize: '17px',
              lineHeight: 1,
              color: '#222',
              paddingLeft: 0,
              fontWeight: 350,
              left: '8px',
              overflow: 'hidden',
              whiteSpace: 'nowrap',
              minWidth: 0,
              cursor: 'default'
            }}
          >
            {props.data?.users[1]?.name}
          </h1>
          <div className="info_user_room">
            <span style={{ fontSize: '14px', color: '#99a4b0' }}>
              a nho em nhiu lam
            </span>
          </div>
        </div>
        <div className="action">
          <Button>
            <span className="dot"></span>
            <span className="dot"></span>
            <span className="dot"></span>
          </Button>
        </div>
      </div>
    </div>
  );
};
export default Message;
Message.propTypes = {
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  data: PropTypes.any
};

Message.defaultProps = {
  children: {}
};
