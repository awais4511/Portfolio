import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

export const useGSAPAnimation = () => {
  const containerRef = useRef(null);

  return { containerRef };
};

export const useScrollReveal = (ref, options = {}) => {
  useEffect(() => {
    if (!ref.current) return;

    const defaults = {
      scrollTrigger: {
        trigger: ref.current,
        start: 'top 80%',
        end: 'top 20%',
        scrub: false,
        markers: false,
      },
      duration: 0.8,
      opacity: 0,
      y: 50,
      ease: 'power3.out',
      ...options,
    };

    gsap.fromTo(
      ref.current,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        ...defaults,
        scrollTrigger: defaults.scrollTrigger,
      }
    );

    return () => {
      if (defaults.scrollTrigger) {
        ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      }
    };
  }, [ref, options]);
};

export const useParallax = (ref, offset = -50) => {
  useEffect(() => {
    if (!ref.current) return;

    gsap.to(ref.current, {
      scrollTrigger: {
        trigger: ref.current,
        onUpdate: (self) => {
          gsap.to(ref.current, {
            y: self.getVelocity() * offset,
            overwrite: 'auto',
          });
        },
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [ref, offset]);
};

export const useCountUp = (ref, endValue, duration = 2, options = {}) => {
  useEffect(() => {
    if (!ref.current) return;

    const obj = { value: 0 };
    gsap.to(obj, {
      value: endValue,
      duration: duration,
      scrollTrigger: {
        trigger: ref.current,
        start: 'top 80%',
      },
      onUpdate: () => {
        ref.current.textContent = Math.floor(obj.value);
      },
      ease: 'power3.out',
      ...options,
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [ref, endValue, duration, options]);
};
