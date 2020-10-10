import USER_TYPE from 'constant/userTypes';

const initialState = {
  imageChangedDefault: null,
  userProfile: {},
  isLoading: false,
  error: null
};
const userReducers = (state = initialState, action) => {
  switch (action.type) {
    case USER_TYPE.GET_DATA_USER_REQUEST:
      return {
        ...state,
        isLoading: true
      };
    case USER_TYPE.GET_DATA_USER_SUCCESS:
      return {
        ...state,
        userProfile: action.payload,
        isLoading: false
      };
    case USER_TYPE.GET_DATA_USER_FAILURE:
      return {
        ...state,
        isLoading: false
      };
    case USER_TYPE.UPDATE_DEFAULT_IMAGE_REQUEST:
      return {
        ...state,
        imageChangedDefault: action.payload
      };
    case USER_TYPE.UPDATE_USER_REQUEST:
      return {
        ...state,
        isLoading: true
      };
    case USER_TYPE.UPDATE_USER_SUCCESS:
      return {
        ...state,
        userProfile: action.payload,
        isLoading: false
      };
    case USER_TYPE.UPDATE_USER_FAILURE:
      return {
        ...state,
        isLoading: false
      };
    default:
      return state;
  }
};
export default userReducers;
