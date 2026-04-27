import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export const CustomCursor = () => {
  const cursorRef = useRef(null);
  const circleRef = useRef(null);
  const mousePos = useRef({ x: 0, y: 0 });
  const circlePos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const cursor = cursorRef.current;
    const circle = circleRef.current;

    // Update mouse position
    const handleMouseMove = (e) => {
      mousePos.current.x = e.clientX;
      mousePos.current.y = e.clientY;

      // Animate cursor to follow mouse
      gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0,
        overwrite: 'auto',
      });

      // Smooth animation for circle (with delay)
      gsap.to(circle, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.5,
        ease: 'power2.out',
        overwrite: 'auto',
      });
    };

    // Scale circle on hover of interactive elements
    const handleMouseEnter = (e) => {
      const target = e.target;

      // Check if element is interactive
      if (
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.closest('button') ||
        target.closest('a') ||
        target.classList.contains('interactive') ||
        target.classList.contains('nav-link') ||
        target.classList.contains('project-card')
      ) {
        gsap.to(circle, {
          scale: 2,
          borderWidth: '2px',
          opacity: 0.8,
          duration: 0.3,
          overwrite: 'auto',
        });

        gsap.to(cursor, {
          scale: 0.5,
          opacity: 0,
          duration: 0.3,
          overwrite: 'auto',
        });
      }
    };

    const handleMouseLeave = (e) => {
      gsap.to(circle, {
        scale: 1,
        borderWidth: '1px',
        opacity: 0.6,
        duration: 0.3,
        overwrite: 'auto',
      });

      gsap.to(cursor, {
        scale: 1,
        opacity: 1,
        duration: 0.3,
        overwrite: 'auto',
      });
    };

    // Hide cursor on mouse leave window
    const handleMouseLeaveWindow = () => {
      gsap.to([cursor, circle], {
        opacity: 0,
        duration: 0.2,
      });
    };

    const handleMouseEnterWindow = () => {
      gsap.to([cursor, circle], {
        opacity: 1,
        duration: 0.2,
      });
    };

    // Add event listeners
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnterWindow);
    document.addEventListener('mouseleave', handleMouseLeaveWindow);

    // Hide default cursor
    document.body.style.cursor = 'none';

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnterWindow);
      document.removeEventListener('mouseleave', handleMouseLeaveWindow);
      document.body.style.cursor = 'auto';
    };
  }, []);

  return (
    <>
      {/* Main Cursor Dot */}
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 w-2 h-2 bg-primary rounded-full pointer-events-none z-[9999] transform -translate-x-1/2 -translate-y-1/2"
        style={{
          boxShadow: '0 0 10px rgba(32, 178, 166, 0.5)',
        }}
      />

      {/* Tracking Circle */}
      <div
        ref={circleRef}
        className="fixed top-0 left-0 w-8 h-8 border border-primary rounded-full pointer-events-none z-[9998] transform -translate-x-1/2 -translate-y-1/2 opacity-60 transition-opacity duration-300"
        style={{
          boxShadow: '0 0 20px rgba(32, 178, 166, 0.3)',
        }}
      />
    </>
  );
};

export default CustomCursor;
