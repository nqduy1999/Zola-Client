import { GROUP_CHAT_TYPE } from 'constant/groupType';
import { groupChatService } from 'services';

export const createGroupChatAction = values => dispatch => {
  dispatch({
    type: GROUP_CHAT_TYPE.CREATE_CHAT_GROUP_REQUEST
  });

  groupChatService
    .createGroupChat(values)
    .then(res => {
      const { error, data } = res.data;
      if (!error) {
        dispatch({
          type: GROUP_CHAT_TYPE.CREATE_CHAT_GROUP_SUCCESS,
          payload: data
        });
      }
    })
    .catch(err => {
      const { error, data } = err.response?.data;
      dispatch({
        type: GROUP_CHAT_TYPE.CREATE_CHAT_GROUP_FAILURE,
        payload: {
          error,
          data
        }
      });
    });
};
