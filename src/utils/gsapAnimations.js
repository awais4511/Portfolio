// src/utils/gsapAnimations.js
// Consolidated GSAP Animation Utilities for your Portfolio
// All animations configured with duration: 1 and delay: 1

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
    duration: 1,
    delay: 1,
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
          duration: 1,
          delay: 1,
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
    duration: 1,
    delay: 1,
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
export const hoverScale = (selector, scale = 1.05) => {
  const elements = document.querySelectorAll(selector);
  elements.forEach((el) => {
    el.addEventListener('mouseenter', () => {
      gsap.to(el, { scale, duration: 1, delay: 1, overwrite: 'auto' });
    });
    el.addEventListener('mouseleave', () => {
      gsap.to(el, { scale: 1, duration: 1, delay: 1, overwrite: 'auto' });
    });
  });
};

/**
 * Count Up Animation - Animate numbers
 */
export const countUp = (selector, endValue, options = {}) => {
  const elements = document.querySelectorAll(selector);
  elements.forEach((el) => {
    const obj = { value: 0 };
    gsap.to(obj, {
      value: endValue,
      duration: 1,
      delay: 1,
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
export const textSplitReveal = (selector) => {
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
        duration: 1,
        delay: 1,
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
export const marquee = (selector) => {
  const marquee = document.querySelector(selector);
  if (!marquee) return;

  gsap.fromTo(
    marquee,
    { x: 0 },
    {
      x: -marquee.offsetWidth / 2,
      duration: 1,
      delay: 1,
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
export const rotate = (selector) => {
  gsap.to(selector, {
    rotation: 360,
    duration: 1,
    delay: 1,
    repeat: -1,
    ease: 'none',
  });
};

/**
 * Pulse Animation - Scale up and down repeatedly
 */
export const pulse = (selector, scale = 1.05) => {
  gsap.to(selector, {
    scale,
    duration: 1,
    delay: 1,
    repeat: -1,
    yoyo: true,
    ease: 'sine.inOut',
  });
};

/**
 * Floating Animation - Move element up and down
 */
export const floating = (selector, distance = 15) => {
  gsap.to(selector, {
    y: -distance,
    duration: 1,
    delay: 1,
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
    duration: 1,
    delay: 1,
  };

  const settings = { ...defaults, ...options };

  gsap.fromTo(
    selector,
    { opacity: 0, filter: 'blur(10px)' },
    {
      opacity: 1,
      filter: 'blur(0px)',
      duration: settings.duration,
      delay: settings.delay,
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
    duration: 1,
    delay: 1,
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
      delay: settings.delay,
      scrollTrigger: settings.scrollTrigger,
      ease: 'power3.out',
    }
  );
};

// ============================================
// ADVANCED ANIMATIONS
// ============================================

/**
 * Timeline Animation - Experience Section
 */
export const timelineAnimation = (containerRef) => {
  const ctx = gsap.context(() => {
    const timeline = gsap.timeline();

    timeline.fromTo(
      '.timeline-connector',
      { scaleY: 0 },
      { scaleY: 1, duration: 1, delay: 1, scrollTrigger: { trigger: containerRef.current } },
      0
    );

    timeline.fromTo(
      '.timeline-item',
      { opacity: 0, x: -50 },
      { opacity: 1, x: 0, duration: 1, delay: 1, stagger: 0.2 },
      0
    );

    timeline.fromTo(
      '.timeline-dot',
      { scale: 0 },
      { scale: 1, duration: 1, delay: 1, stagger: 0.2 },
      0.2
    );
  }, containerRef);

  return () => ctx.revert();
};

/**
 * Parallax Background - Hero Section
 */
export const parallaxBackground = (bgRef, strength = -50) => {
  if (!bgRef.current) return;

  gsap.to(bgRef.current, {
    scrollTrigger: {
      trigger: bgRef.current,
      onUpdate: (self) => {
        gsap.to(bgRef.current, {
          y: self.getVelocity() * strength,
          overwrite: 'auto',
          duration: 1,
          delay: 1,
        });
      },
    },
  });
};

/**
 * Morphing Shape Animation
 */
export const morphingShape = (shapeRef) => {
  const shapes = [
    'path("M20,50 Q50,90 80,50 T140,50")',
    'path("M20,80 L80,20 L140,80 Q80,120 20,80")',
    'path("M20,50 Q20,20 50,20 Q80,20 80,50 Q80,80 50,80 Q20,80 20,50")',
  ];

  gsap.timeline({ repeat: -1 }).to(shapeRef.current, {
    attr: { d: shapes[0] },
    duration: 1,
    delay: 1,
  });
};

/**
 * Animated Gradient Background
 */
export const animatedGradient = (elementRef) => {
  const gradients = [
    'linear-gradient(45deg, #667eea 0%, #764ba2 100%)',
    'linear-gradient(45deg, #f093fb 0%, #f5576c 100%)',
    'linear-gradient(45deg, #4facfe 0%, #00f2fe 100%)',
  ];

  gsap.timeline({ repeat: -1 }).to(elementRef.current, {
    backgroundImage: gradients[0],
    duration: 1,
    delay: 1,
    ease: 'sine.inOut',
  });
};

/**
 * Word By Word Reveal
 */
export const wordByWordReveal = (textRef) => {
  if (!textRef.current) return;

  const text = textRef.current.textContent;
  textRef.current.innerHTML = text
    .split(' ')
    .map((word) => `<span class="word-span">${word}</span>`)
    .join(' ');

  gsap.fromTo(
    textRef.current.querySelectorAll('.word-span'),
    { opacity: 0, y: 10 },
    {
      opacity: 1,
      y: 0,
      duration: 1,
      delay: 1,
      stagger: 0.1,
      scrollTrigger: {
        trigger: textRef.current,
        start: 'top 80%',
      },
      ease: 'power2.out',
    }
  );
};

/**
 * Skill Progress Bar Animation
 */
export const skillProgressAnimation = (containerRef) => {
  const ctx = gsap.context(() => {
    gsap.fromTo(
      '.skill-bar',
      { width: 0 },
      {
        width: (i, target) => target.getAttribute('data-width') + '%',
        duration: 1,
        delay: 1,
        stagger: 0.2,
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 80%',
        },
        ease: 'power3.out',
      }
    );
  }, containerRef);

  return () => ctx.revert();
};

/**
 * Carousel/Slider Animation
 */
export const carouselAnimation = (containerRef, autoplay = true) => {
  const slides = document.querySelectorAll('.carousel-slide');
  let currentIndex = 0;

  const goToSlide = (index) => {
    const slide = slides[index];
    gsap.to(containerRef.current, {
      x: -slide.offsetLeft,
      duration: 1,
      delay: 1,
      ease: 'power2.inOut',
    });
    currentIndex = index;
  };

  if (autoplay) {
    setInterval(() => {
      currentIndex = (currentIndex + 1) % slides.length;
      goToSlide(currentIndex);
    }, 5000);
  }

  return goToSlide;
};

/**
 * Button Ripple Effect
 */
export const buttonRippleEffect = (buttonRef) => {
  buttonRef.current?.addEventListener('click', (e) => {
    const ripple = document.createElement('span');
    const rect = buttonRef.current.getBoundingClientRect();

    ripple.style.position = 'absolute';
    ripple.style.borderRadius = '50%';
    ripple.style.backgroundColor = 'rgba(255, 255, 255, 0.6)';
    ripple.style.pointerEvents = 'none';

    const size = Math.max(rect.width, rect.height);
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = e.clientX - rect.left - size / 2 + 'px';
    ripple.style.top = e.clientY - rect.top - size / 2 + 'px';

    buttonRef.current.appendChild(ripple);

    gsap.to(ripple, {
      scale: 2,
      opacity: 0,
      duration: 1,
      delay: 1,
      ease: 'power2.out',
      onComplete: () => ripple.remove(),
    });
  });
};

// ============================================
// NAVBAR ANIMATIONS
// ============================================

/**
 * Animated Underline on Hover
 * Creates a sliding underline effect under navigation links
 */
export const navLinkUnderline = (selector) => {
  const links = document.querySelectorAll(selector);
  
  links.forEach((link) => {
    link.addEventListener('mouseenter', () => {
      const underline = link.querySelector('span');
      if (underline) {
        gsap.to(underline, {
          scaleX: 1,
          duration: 1,
          delay: 1,
          ease: 'power2.out',
          transformOrigin: 'left',
        });
      }
    });

    link.addEventListener('mouseleave', () => {
      const underline = link.querySelector('span');
      if (underline) {
        gsap.to(underline, {
          scaleX: 0,
          duration: 1,
          delay: 1,
          ease: 'power2.in',
          transformOrigin: 'left',
        });
      }
    });
  });
};

/**
 * Navbar Hide/Show on Scroll
 * Hide navbar when scrolling down, show when scrolling up
 */
export const navbarHideOnScroll = (navbarRef) => {
  let tl = gsap.timeline({ paused: true });

  tl.to(navbarRef.current, {
    yPercent: -100,
    duration: 1,
    delay: 1,
    ease: 'power2.in',
  });

  ScrollTrigger.create({
    onUpdate: (self) => {
      if (self.getVelocity() < -500) {
        tl.reverse();
      } else if (self.getVelocity() > 500) {
        tl.play();
      }
    },
  });

  return () => tl.kill();
};

/**
 * Active Link Indicator
 * Shows which section is currently being viewed
 */
export const activeNavLink = (navSelector, linkSelector) => {
  const sections = document.querySelectorAll('[id]');
  const navLinks = document.querySelectorAll(linkSelector);

  ScrollTrigger.create({
    onUpdate: (self) => {
      let current = '';
      
      sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        if (scrollY >= sectionTop - 200) {
          current = section.getAttribute('id');
        }
      });

      navLinks.forEach((link) => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
          link.classList.add('active');
          gsap.to(link, {
            color: '#20B2A6',
            duration: 1,
            delay: 1,
          });
        } else {
          gsap.to(link, {
            color: '#ffffff',
            duration: 1,
            delay: 1,
          });
        }
      });
    },
  });
};

// ============================================
// EXPORTS
// ============================================

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
  timelineAnimation,
  parallaxBackground,
  morphingShape,
  animatedGradient,
  wordByWordReveal,
  skillProgressAnimation,
  carouselAnimation,
  buttonRippleEffect,
  navLinkUnderline,
  navbarHideOnScroll,
  activeNavLink,
};
