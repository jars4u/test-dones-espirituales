import React, { useState, useEffect } from "react";

const SlideQuestion = ({ children, direction }) => {
  const [slide, setSlide] = useState('in');
  useEffect(() => {
    if (!direction) {
      setSlide('in');
      return;
    }
    setSlide('out');
    const timeout = setTimeout(() => {
      setSlide('in');
    }, 600);
    return () => clearTimeout(timeout);
  }, [direction, children]);

  const style = {
    transition: 'transform 0.6s cubic-bezier(0.4,0,0.2,1), opacity 0.6s cubic-bezier(0.4,0,0.2,1)',
    willChange: 'transform, opacity',
    minHeight: 180,
    opacity: slide === 'out' ? 0 : 1,
    transform:
      slide === 'out'
        ? (direction === 'left' ? 'translateX(-100%)' : 'translateX(100%)')
        : 'translateX(0)'
  };
  return (
    <div style={style}>{children}</div>
  );
};

export default SlideQuestion;