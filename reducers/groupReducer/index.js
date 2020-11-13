import { GROUP_CHAT_TYPE } from 'constant/groupType';

const initialState = {
  idGroup: '',
  nameGroup: '',
  groupStatus: false,
  messageExitGroup: '',
  err: null
};

const GroupReducer = (state = initialState, action) => {
  switch (action.type) {
    case GROUP_CHAT_TYPE.CREATE_CHAT_GROUP_SUCCESS: {
      const { name, _id, group } = action.payload;
      return { ...state, nameGroup: name, idGroup: _id, groupStatus: group };
    }

    case GROUP_CHAT_TYPE.EXIT_GROUP_SUCCESS: {
      return { ...state, messageExitGroup: action.payload };
    }

    case 'DEFAULT_ACTION': {
      return { ...state, messageExitGroup: '', idGroup: '', nameGroup: '' };
    }
    default:
      return state;
  }
};

export default GroupReducer;
