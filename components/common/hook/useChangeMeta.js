/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useContext } from 'react';
import { GlobalContext } from '../context/GlobalContext';
// Context Global

const useChangeMeta = title => {
  const context = useContext(GlobalContext);
  const { meta, setMeta } = context;

  useEffect(() => {
    setMeta({ ...meta, title: `${title}` });
  }, []);

  return !!context;
};

export default useChangeMeta;
