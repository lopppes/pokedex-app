import React, { useEffect, useState } from 'react';
import './BackToTop.css';

const BackToTop = () => {
  const [isActive, setIsActive] = useState(false);

  const handleScroll = () => {
    setIsActive(window.scrollY >= 100);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <a
      href="#top"
      className={`back-to-top ${isActive ? 'active' : ''}`}
      onClick={(e) => {
        e.preventDefault();
        scrollToTop();
      }}
      data-back-top-btn
    >
       <i className='bx bxs-left-arrow back'></i>
    </a>
  );
};

export default BackToTop;
