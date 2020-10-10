import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';

const SignUpContext = React.createContext();
const SignUpConsumer = SignUpContext.Consumer;

const SignUpProvider = props => {
  const [apiDefault, setApiDefault] = useState('active/send?phone=${phone}');
  const [values, setValue] = useState(null);

  const onHandleChangeApi = useCallback(
    value => {
      switch (value) {
        case 'phone':
          setApiDefault(`active/send?phone=${values?.phone}`);
          break;
        case 'email':
          setApiDefault(`active/send?email=${values?.email}`);
          break;
        default:
          break;
      }
    },
    [values?.email, values?.phone]
  );
  return (
    <SignUpContext.Provider
      value={{ apiDefault, values, onHandleChangeApi, setValue }}
    >
      {props.children}
    </SignUpContext.Provider>
  );
};

export { SignUpProvider, SignUpContext, SignUpConsumer };

SignUpProvider.propTypes = {
  children: PropTypes.objectOf(PropTypes.any)
};
SignUpProvider.defaultProps = {
  children: {}
};
