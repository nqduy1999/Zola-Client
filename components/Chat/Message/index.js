import React from 'react';
// import { useSelector } from 'react-redux';

import { classPrefixor } from 'utils/classPrefixor';
import PropTypes from 'prop-types';
// import avatar from 'assets/images/avatar.jpg';
const prefix = 'message';
const c = classPrefixor(prefix);

const Message = () => {
  // const { userProfile } = useSelector(state => state.userData);
  // const { messageRooms } = useSelector(state => state.messageData);

  // const renderNameListRoom = () => {
  //   return messageRooms?.map((group, key) => {
  //     return (
  //       <div className="message_tab_chat" key={key}>
  //         {group && (
  //           <div className="list_user_room">
  //             {/* <img src={user && user.avatar ? user?.avatar : avatar} /> */}
  //             <div className="info_user_room">
  //               <h1>{group.name}</h1>
  //             </div>
  //           </div>
  //         )}
  //       </div>
  //     );
  //   });
  // };

  // const renderMessageRecent = (
  //   <div className="list_user_room">
  //     <span className="messageRecent">
  //       {data?.messages[data?.messages?.length - 1]?.content}
  //     </span>
  //   </div>
  // );

  return (
    <div className={c`header`}>
      <div className="info_room">
        <>
          {/* {renderNameListRoom()} */}
          {/* {renderMessageRecent} */}
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
