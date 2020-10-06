import { AUTHENTICATION_TYPE } from 'constant';

// const prefix = 'accounts/';
export const accountRegister = dataDispatch => async dispatch => {
  console.log(dataDispatch);
  dispatch({
    type: AUTHENTICATION_TYPE.SIGNUP_REQUEST
  });
  //   return axiosServices.post(`${prefix}signup`, dataDispatch).then(res => {
  //     const { error, data } = res.data;
  //     if (error) {
  //       dispatch({
  //         type: AUTHENTICATION_TYPE.SIGNUP_FAILURE,
  //         payload: {
  //           error,
  //           data
  //         }
  //       });
  //       return { error, data };
  //     }
  //     if (!error) {
  //       dispatch({
  //         type: AUTHENTICATION_TYPE.SIGNUP_SUCCESS
  //       });
  //     }
  //   });
};
