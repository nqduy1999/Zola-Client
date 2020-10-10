const createRequestTypes = (base, act) =>
  ['REQUEST', 'SUCCESS', 'FAILURE'].reduce((acc, type) => {
    const key = `${act}_${type}`;
    acc[key] = `${base}_${act}_${type}`;
    return acc;
  }, {});
// const createSingleRequested = (base, act) =>
//   ['REQUEST'].reduce((acc, type) => {
//     const key = `${act}_${type}`;
//     acc[key] = `${base}_${act}_${type}`;
//     return acc;
//   }, {});
const USER_TYPE = {
  ...createRequestTypes('USER_TYPE', 'GET_DATA_USER'),
  ...createRequestTypes('USER_TYPE', 'UPDATE_USER')
};
export default USER_TYPE;
