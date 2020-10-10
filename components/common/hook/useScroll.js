import { useEffect, useState } from 'react';

const useScroll = position => {
  const [scrolled, setScrolled] = useState();

  useEffect(() => {
    const handleScroll = () => {
      if (window.pageYOffset > position) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [position]);

  return scrolled;
};

export default useScroll;
