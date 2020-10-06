import { AUTHENTICATION_TYPE } from 'constant';
import axiosServices from 'services/axiosServices';

const prefix = 'accounts/';
export const SignUpAccount = dataDispatch => dispatch => {
  dispatch({
    type: AUTHENTICATION_TYPE.REGISTER_REQUEST
  });
  return axiosServices.post(`${prefix}signup/phone`, dataDispatch).then(res => {
    console.log(res);
    const { error, data } = res.data;
    if (error) {
      dispatch({
        type: AUTHENTICATION_TYPE.REGISTER_FAILURE,
        payload: {
          error,
          data
        }
      });
      return { error, data };
    }
    if (!error) {
      dispatch({
        type: AUTHENTICATION_TYPE.REGISTER_SUCCESS
      });
    }
  });
};
