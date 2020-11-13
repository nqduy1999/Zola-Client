// import useSocket from 'use-socket.io-client';
import React from 'react';
import { useSelector } from 'react-redux';

import { classPrefixor } from 'utils/classPrefixor';
import PropTypes from 'prop-types';

const prefix = 'message';
const c = classPrefixor(prefix);

const Message = props => {
  const { userProfile } = useSelector(state => state.userData);

  const { data } = props;

  const renderNameListRoom = () => {
    return data?.users?.map(user => {
      return (
        <>
          {user?.id !== userProfile.id && (
            <div className="list_user_room">
              <img
                src={`https://api-ret.ml/api/v0/images/download/${user.avatar}`}
              />

              <div className="info_user_room">
                <h1>{user.name}</h1>
              </div>
            </div>
          )}
        </>
      );
    });
  };

  const renderMessageRecent = (
    <div className="list_user_room">
      <span className="messageRecent">
        {data?.messages[data?.messages?.length - 1]?.content}
      </span>
    </div>
  );

  return (
    <div className={c`header`}>
      <div className="info_room">
        <>
          {renderNameListRoom()}
          {renderMessageRecent}
        </>
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
