import React from 'react';
import Avatar from 'react-avatar';

const useRenderAvatar = (group, styleImgGroup, sizeAvatar) => {
  const renderAvatarUserGroup = () => {
    const arrayImage = group?.users?.slice(0, 4);
    return (
      <>
        {arrayImage?.map((user, key) => {
          const checkUserAvatarType =
            user?.avatar === null || user?.avatar === '';
          return (
            <div className="avatar-group" key={key}>
              <div className="userInfoSideBar">
                {checkUserAvatarType ? (
                  <Avatar
                    className="avatar-user"
                    name={user.name}
                    size={sizeAvatar}
                    round={true}
                    maxInitials={4}
                  />
                ) : (
                  <img src={user.avatar} alt="avatar" style={styleImgGroup} />
                )}
              </div>
            </div>
          );
        })}
      </>
    );
  };
  return [renderAvatarUserGroup];
};

export default useRenderAvatar;
