import React, { createContext, useState } from 'react';

const ManagePeopleGroupContext = createContext(null);
const { Provider } = ManagePeopleGroupContext;

const ManagePeopleGroupProvider = ({ ...props }) => {
  const [clickPeopleIcon, setClickPeopleIcon] = useState('unClickPeopleIcon');

  const store = {
    clickPeopleIcon,
    setClickPeopleIcon
  };
  return <Provider value={{ ...store }}>{props.children}</Provider>;
};

export { ManagePeopleGroupProvider, ManagePeopleGroupContext };
