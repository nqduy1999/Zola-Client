import _ from 'lodash';
export const filterUserExitedRoom = arrayUser => {
  return _.filter(arrayUser, user => {
    return !user.exited;
  });
};
