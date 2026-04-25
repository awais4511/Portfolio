// Advanced GSAP Animation Examples for Portfolio
// These are production-ready code snippets you can use directly

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// ============================================
// 1. TIMELINE ANIMATION (Experience Section)
// ============================================
export const timelineAnimation = (containerRef) => {
  const ctx = gsap.context(() => {
    const timeline = gsap.timeline();

    // Animate timeline connector
    timeline.fromTo(
      '.timeline-connector',
      { scaleY: 0 },
      { scaleY: 1, duration: 1, scrollTrigger: { trigger: containerRef.current } },
      0
    );

    // Animate timeline items
    timeline.fromTo(
      '.timeline-item',
      { opacity: 0, x: -50 },
      { opacity: 1, x: 0, duration: 0.6, stagger: 0.2 },
      0
    );

    // Animate timeline dots
    timeline.fromTo(
      '.timeline-dot',
      { scale: 0 },
      { scale: 1, duration: 0.4, stagger: 0.2 },
      0.2
    );
  }, containerRef);

  return () => ctx.revert();
};

// ============================================
// 2. PARALLAX BACKGROUND (Hero Section)
// ============================================
export const parallaxBackground = (bgRef, strength = -50) => {
  if (!bgRef.current) return;

  gsap.to(bgRef.current, {
    scrollTrigger: {
      trigger: bgRef.current,
      onUpdate: (self) => {
        gsap.to(bgRef.current, {
          y: self.getVelocity() * strength,
          overwrite: 'auto',
        });
      },
    },
  });
};

// ============================================
// 3. MORPHING SHAPE ANIMATION
// ============================================
export const morphingShape = (shapeRef, duration = 3) => {
  const shapes = [
    'path("M20,50 Q50,90 80,50 T140,50")',
    'path("M20,80 L80,20 L140,80 Q80,120 20,80")',
    'path("M20,50 Q20,20 50,20 Q80,20 80,50 Q80,80 50,80 Q20,80 20,50")',
  ];

  gsap.timeline({ repeat: -1 }).to(shapeRef.current, {
    attr: { d: shapes[0] },
    duration,
  });
};

// ============================================
// 4. ANIMATED GRADIENT BACKGROUND
// ============================================
export const animatedGradient = (elementRef) => {
  const gradients = [
    'linear-gradient(45deg, #667eea 0%, #764ba2 100%)',
    'linear-gradient(45deg, #f093fb 0%, #f5576c 100%)',
    'linear-gradient(45deg, #4facfe 0%, #00f2fe 100%)',
  ];

  gsap.timeline({ repeat: -1 }).to(elementRef.current, {
    backgroundImage: gradients[0],
    duration: 3,
    ease: 'sine.inOut',
  });
};

// ============================================
// 5. WORD BY WORD REVEAL
// ============================================
export const wordByWordReveal = (textRef, duration = 0.05) => {
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
      duration,
      stagger: 0.1,
      scrollTrigger: {
        trigger: textRef.current,
        start: 'top 80%',
      },
      ease: 'power2.out',
    }
  );
};

// ============================================
// 6. SKILL PROGRESS BAR ANIMATION
// ============================================
export const skillProgressAnimation = (containerRef) => {
  const ctx = gsap.context(() => {
    gsap.fromTo(
      '.skill-bar',
      { width: 0 },
      {
        width: (i, target) => target.getAttribute('data-width') + '%',
        duration: 1.5,
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

// ============================================
// 7. CAROUSEL/SLIDER ANIMATION
// ============================================
export const carouselAnimation = (containerRef, autoplay = true) => {
  const slides = document.querySelectorAll('.carousel-slide');
  let currentIndex = 0;

  const goToSlide = (index) => {
    const slide = slides[index];
    gsap.to(containerRef.current, {
      x: -slide.offsetLeft,
      duration: 0.8,
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

// ============================================
// 8. BUTTON RIPPLE EFFECT
// ============================================
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
      duration: 0.6,
      ease: 'power2.out',
      onComplete: () => ripple.remove(),
    });
  });
};

// ============================================
// 9. FLOATING OBJECTS
// ============================================
export const floatingObjects = () => {
  gsap.utils.toArray('.float-object').forEach((object) => {
    const duration = gsap.utils.random(3, 5);
    const yDistance = gsap.utils.random(-20, 20);

    gsap.to(object, {
      y: yDistance,
      duration,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
      delay: gsap.utils.random(0, 2),
    });
  });
};

// ============================================
// 10. STAGGERED GRID REVEAL
// ============================================
export const staggeredGridReveal = (gridRef, staggerAmount = 0.1) => {
  const ctx = gsap.context(() => {
    const items = gridRef.current.querySelectorAll('.grid-item');

    gsap.fromTo(
      items,
      {
        opacity: 0,
        scale: 0.8,
        rotation: -10,
      },
      {
        opacity: 1,
        scale: 1,
        rotation: 0,
        duration: 0.7,
        stagger: {
          amount: staggerAmount * items.length,
          grid: [3, 3], // 3 cols, 3 rows for grid stagger
          from: 'center', // start from center
        },
        scrollTrigger: {
          trigger: gridRef.current,
          start: 'top 70%',
        },
        ease: 'back.out',
      }
    );
  }, gridRef);

  return () => ctx.revert();
};

// ============================================
// 11. TEXT SPLIT CHARACTERS
// ============================================
export const splitCharacterReveal = (textRef) => {
  const text = textRef.current.textContent;
  textRef.current.innerHTML = text
    .split('')
    .map((char) => 
      char === ' ' 
        ? '<span style="width: 0.3em;"></span>' 
        : `<span class="char">${char}</span>`
    )
    .join('');

  gsap.fromTo(
    textRef.current.querySelectorAll('.char'),
    {
      opacity: 0,
      y: 20,
      rotationZ: -10,
    },
    {
      opacity: 1,
      y: 0,
      rotationZ: 0,
      duration: 0.5,
      stagger: 0.05,
      ease: 'back.out',
      scrollTrigger: {
        trigger: textRef.current,
        start: 'top 80%',
      },
    }
  );
};

// ============================================
// 12. SCROLL VELOCITY BASED ANIMATION
// ============================================
export const velocityAnimation = (elementRef) => {
  let proxy = { skew: 0 },
    skewSetter = gsap.quickSetter(elementRef.current, 'skewY', 'deg'),
    clamp = gsap.utils.clamp(-20, 20);

  gsap.set(elementRef.current, { transformOrigin: 'center center' });

  ScrollTrigger.create({
    onUpdate: (self) => {
      let skew = clamp(self.getVelocity() / 300);
      if (Math.abs(skew) > Math.abs(proxy.skew)) {
        proxy.skew = skew;
        skewSetter(skew);
      }
    },
  });

  gsap.set(elementRef.current, { skewY: 0, force3D: true });
  gsap.to(proxy, {
    skew: 0,
    duration: 0.8,
    ease: 'power3',
    overwrite: 'auto',
    onUpdate: () => skewSetter(proxy.skew),
  });
};

// ============================================
// USAGE EXAMPLES IN COMPONENTS
// ============================================

/*
// In About Section
useEffect(() => {
  return skillProgressAnimation(sectionRef);
}, []);

// HTML
<div className="skill-bar" data-width="85"></div>

// In Projects
useEffect(() => {
  return staggeredGridReveal(gridRef, 0.15);
}, []);

// In Hero
useEffect(() => {
  parallaxBackground(bgRef, -50);
}, []);

// For Text
useEffect(() => {
  wordByWordReveal(textRef);
}, []);
*/

export default {
  timelineAnimation,
  parallaxBackground,
  morphingShape,
  animatedGradient,
  wordByWordReveal,
  skillProgressAnimation,
  carouselAnimation,
  buttonRippleEffect,
  floatingObjects,
  staggeredGridReveal,
  splitCharacterReveal,
  velocityAnimation,
};
