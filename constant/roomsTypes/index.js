const createRequestTypes = (base, act) =>
  ['REQUEST', 'SUCCESS', 'FAILURE'].reduce((acc, type) => {
    const key = `${act}_${type}`;
    acc[key] = `${base}_${act}_${type}`;
    return acc;
  }, {});
const ROOMS_TYPE = {
  ...createRequestTypes('ROOMS_TYPE', 'EDIT_ROOM_NAME'),
  ...createRequestTypes('ROOMS_TYPE', 'ADD_USER_TO_GROUP'),
  ...createRequestTypes('ROOMS_TYPE', 'GET_DETAIL_GROUP'),
  ...createRequestTypes('ROOMS_TYPE', 'DELETE_ROOM')
};
export default ROOMS_TYPE;
