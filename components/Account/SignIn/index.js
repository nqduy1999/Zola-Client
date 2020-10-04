import React from 'react';
import { classPrefixor } from 'utils/classPrefixor';

// Hook

const prefix = 'sign-in';
const c = classPrefixor(prefix);

const SignIn = () => {
  return (
    <div className="wrapper-page">
      <div className={c`main`}></div>
    </div>
  );
};
export default SignIn;
