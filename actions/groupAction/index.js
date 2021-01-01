import { GROUP_CHAT_TYPE } from 'constant/groupType';
import { groupChatService } from 'services';

export const createGroupChatAction = values => dispatch => {
  dispatch({
    type: GROUP_CHAT_TYPE.CREATE_CHAT_GROUP_REQUEST
  });

  groupChatService
    .createGroupChat(values)
    .then(res => {
      const { data } = res.data;
      dispatch({
        type: GROUP_CHAT_TYPE.CREATE_CHAT_GROUP_SUCCESS,
        payload: data
      });
    })
    .catch(err => {
      dispatch({
        type: GROUP_CHAT_TYPE.CREATE_CHAT_GROUP_FAILURE,
        payload: {
          data: err.response
        }
      });
    });
};

export const exitGroupChatAction = id => dispatch => {
  dispatch({
    type: GROUP_CHAT_TYPE.EXIT_GROUP_REQUEST
  });

  groupChatService
    .exitGroupChat(id)
    .then(res => {
      dispatch({
        type: GROUP_CHAT_TYPE.EXIT_GROUP_SUCCESS,
        payload: res.data.message
      });
    })
    .catch(err => {
      dispatch({
        type: GROUP_CHAT_TYPE.EXIT_GROUP_FAILURE,
        payload: {
          data: err.response.data
        }
      });
    });
};

export const dispatchDefaultAction = () => ({
  type: 'DEFAULT_ACTION'
});
