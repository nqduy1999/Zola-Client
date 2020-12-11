const createRequestTypes = (base, act) =>
  ['REQUEST', 'SUCCESS', 'FAILURE'].reduce((acc, type) => {
    const key = `${act}_${type}`;
    acc[key] = `${base}_${act}_${type}`;
    return acc;
  }, {});
const ROOMS_TYPE = {
  ...createRequestTypes('ROOMS_TYPE', 'EDIT_ROOM_NAME')
};
export default ROOMS_TYPE;
