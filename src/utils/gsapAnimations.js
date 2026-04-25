// src/utils/gsapAnimations.js
// Comprehensive GSAP Animation Utilities for your Portfolio

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Scroll Reveal Animation - Fades in and slides elements as they enter viewport
 */
export const scrollReveal = (selector, options = {}) => {
  const defaults = {
    scrollTrigger: {
      trigger: selector,
      start: 'top 80%',
      end: 'top 20%',
      scrub: false,
      markers: false,
    },
    duration: 0.8,
    opacity: 0,
    y: 50,
    ease: 'power3.out',
  };

  const settings = { ...defaults, ...options };

  gsap.fromTo(
    selector,
    { opacity: 0, y: settings.y },
    {
      opacity: 1,
      y: 0,
      ...settings,
      scrollTrigger: {
        ...defaults.scrollTrigger,
        ...settings.scrollTrigger,
      },
    }
  );
};

/**
 * Parallax Effect - Move elements based on scroll velocity
 */
export const parallaxEffect = (selector, offset = -50) => {
  gsap.to(selector, {
    scrollTrigger: {
      trigger: selector,
      onUpdate: (self) => {
        gsap.to(selector, {
          y: self.getVelocity() * offset,
          overwrite: 'auto',
        });
      },
    },
  });
};

/**
 * Staggered Animation - Animate multiple elements with delays
 */
export const staggerIn = (selector, options = {}) => {
  const defaults = {
    duration: 0.6,
    delay: 0,
    stagger: 0.1,
    opacity: 0,
    y: 30,
    ease: 'power3.out',
  };

  const settings = { ...defaults, ...options };

  gsap.fromTo(
    selector,
    { opacity: 0, y: settings.y },
    {
      opacity: 1,
      y: 0,
      duration: settings.duration,
      delay: settings.delay,
      stagger: settings.stagger,
      ease: settings.ease,
    }
  );
};

/**
 * Hover Scale Effect - Scale element on hover
 */
export const hoverScale = (selector, scale = 1.05, duration = 0.3) => {
  const elements = document.querySelectorAll(selector);
  elements.forEach((el) => {
    el.addEventListener('mouseenter', () => {
      gsap.to(el, { scale, duration, overwrite: 'auto' });
    });
    el.addEventListener('mouseleave', () => {
      gsap.to(el, { scale: 1, duration, overwrite: 'auto' });
    });
  });
};

/**
 * Count Up Animation - Animate numbers
 */
export const countUp = (selector, endValue, duration = 2, options = {}) => {
  const elements = document.querySelectorAll(selector);
  elements.forEach((el) => {
    const obj = { value: 0 };
    gsap.to(obj, {
      value: endValue,
      duration,
      onUpdate: () => {
        el.textContent = Math.floor(obj.value);
      },
      scrollTrigger: {
        trigger: el,
        start: 'top 80%',
      },
      ease: 'power3.out',
      ...options,
    });
  });
};

/**
 * Text Split Animation - Animate text character by character
 */
export const textSplitReveal = (selector, duration = 1) => {
  const elements = document.querySelectorAll(selector);
  elements.forEach((el) => {
    const text = el.textContent;
    el.innerHTML = text
      .split('')
      .map((char) => `<span class="text-char">${char}</span>`)
      .join('');

    gsap.fromTo(
      el.querySelectorAll('.text-char'),
      { opacity: 0, y: 10 },
      {
        opacity: 1,
        y: 0,
        duration: duration / text.length,
        stagger: 0.02,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 80%',
        },
      }
    );
  });
};

/**
 * Marquee Effect - Continuous scrolling text
 */
export const marquee = (selector, duration = 20) => {
  const marquee = document.querySelector(selector);
  if (!marquee) return;

  gsap.fromTo(
    marquee,
    { x: 0 },
    {
      x: -marquee.offsetWidth / 2,
      duration,
      repeat: -1,
      ease: 'none',
      modifiers: {
        x: gsap.utils.unitize((x) => parseFloat(x) % marquee.offsetWidth),
      },
    }
  );
};

/**
 * Rotate Element - Continuous rotation
 */
export const rotate = (selector, duration = 20) => {
  gsap.to(selector, {
    rotation: 360,
    duration,
    repeat: -1,
    ease: 'none',
  });
};

/**
 * Pulse Animation - Scale up and down repeatedly
 */
export const pulse = (selector, scale = 1.05, duration = 2) => {
  gsap.to(selector, {
    scale,
    duration,
    repeat: -1,
    yoyo: true,
    ease: 'sine.inOut',
  });
};

/**
 * Floating Animation - Move element up and down
 */
export const floating = (selector, distance = 15, duration = 3) => {
  gsap.to(selector, {
    y: -distance,
    duration,
    repeat: -1,
    yoyo: true,
    ease: 'sine.inOut',
  });
};

/**
 * Blur and Fade Effect
 */
export const blurFade = (selector, options = {}) => {
  const defaults = {
    scrollTrigger: {
      trigger: selector,
      start: 'top 80%',
    },
    duration: 0.8,
  };

  const settings = { ...defaults, ...options };

  gsap.fromTo(
    selector,
    { opacity: 0, filter: 'blur(10px)' },
    {
      opacity: 1,
      filter: 'blur(0px)',
      duration: settings.duration,
      scrollTrigger: settings.scrollTrigger,
      ease: 'power3.out',
    }
  );
};

/**
 * Slide In From Side Animation
 */
export const slideIn = (selector, direction = 'left', options = {}) => {
  const defaults = {
    scrollTrigger: {
      trigger: selector,
      start: 'top 80%',
    },
    duration: 0.8,
  };

  const settings = { ...defaults, ...options };
  const fromX = direction === 'left' ? -100 : 100;

  gsap.fromTo(
    selector,
    { opacity: 0, x: fromX },
    {
      opacity: 1,
      x: 0,
      duration: settings.duration,
      scrollTrigger: settings.scrollTrigger,
      ease: 'power3.out',
    }
  );
};

export default {
  scrollReveal,
  parallaxEffect,
  staggerIn,
  hoverScale,
  countUp,
  textSplitReveal,
  marquee,
  rotate,
  pulse,
  floating,
  blurFade,
  slideIn,
};
