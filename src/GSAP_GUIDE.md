# GSAP Animation Guide for Your Portfolio

## Installation

Already installed! ✅ Run:
```bash
npm install gsap
```

## Quick Start Examples

### 1. **Fade In Scroll Animation**
```jsx
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const MyComponent = () => {
  const ref = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      ref.current,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        scrollTrigger: {
          trigger: ref.current,
          start: 'top 80%',
        },
      }
    );
  }, []);

  return <div ref={ref}>Animated Content</div>;
};
```

### 2. **Hover Scale Effect**
```jsx
useEffect(() => {
  const card = document.querySelector('.card');
  
  card.addEventListener('mouseenter', () => {
    gsap.to(card, { scale: 1.05, duration: 0.3 });
  });
  
  card.addEventListener('mouseleave', () => {
    gsap.to(card, { scale: 1, duration: 0.3 });
  });
}, []);
```

### 3. **Staggered Items**
```jsx
// Animate multiple elements with delays
gsap.fromTo(
  '.item',
  { opacity: 0, y: 20 },
  {
    opacity: 1,
    y: 0,
    duration: 0.6,
    stagger: 0.1, // 0.1s delay between each item
    ease: 'power3.out',
  }
);
```

### 4. **Count Up Animation**
```jsx
const countRef = useRef(null);

useEffect(() => {
  const obj = { value: 0 };
  gsap.to(obj, {
    value: 100,
    duration: 2,
    onUpdate: () => {
      countRef.current.textContent = Math.floor(obj.value);
    },
  });
}, []);

return <div ref={countRef}>0</div>;
```

### 5. **Floating Badge**
```jsx
gsap.to('.badge', {
  y: -15,
  duration: 3,
  repeat: -1,
  yoyo: true,
  ease: 'sine.inOut',
});
```

### 6. **Image Zoom on Hover**
```jsx
const cards = document.querySelectorAll('.project-card');
cards.forEach((card) => {
  const img = card.querySelector('img');
  
  card.addEventListener('mouseenter', () => {
    gsap.to(img, { scale: 1.1, duration: 0.6 });
  });
  
  card.addEventListener('mouseleave', () => {
    gsap.to(img, { scale: 1, duration: 0.6 });
  });
});
```

### 7. **Text Reveal Animation**
```jsx
useEffect(() => {
  const words = document.querySelectorAll('.word');
  
  gsap.fromTo(
    words,
    { opacity: 0, x: -50 },
    {
      opacity: 1,
      x: 0,
      duration: 0.8,
      stagger: 0.2,
      ease: 'power3.out',
    }
  );
}, []);
```

## Key GSAP Methods

| Method | Purpose |
|--------|---------|
| `gsap.to()` | Animate FROM current state TO values |
| `gsap.from()` | Animate FROM values TO current state |
| `gsap.fromTo()` | Animate FROM values TO other values |
| `gsap.context()` | Group animations for cleanup |

## Common Properties

```javascript
{
  duration: 0.8,          // Animation length in seconds
  delay: 0.2,             // Wait before starting
  stagger: 0.1,           // Delay between each item
  ease: 'power3.out',     // Animation curve
  repeat: -1,             // -1 for infinite
  yoyo: true,             // Reverse animation
  scrollTrigger: {...},   // Scroll-based triggers
  overwrite: 'auto',      // Override conflicting animations
}
```

## Easing Functions

Popular eases:
- `power1.inOut` - Subtle
- `power3.inOut` - Smooth
- `power4.inOut` - More dramatic
- `back.out` - Bouncy
- `elastic.out` - Spring-like
- `sine.inOut` - Very smooth
- `circ.out` - Circular arc

## ScrollTrigger Options

```javascript
{
  trigger: element,         // What to watch
  start: 'top 80%',        // When animation starts
  end: 'top 20%',          // When animation ends
  scrub: false,            // true = tied to scroll
  scrub: 1,                // 1 second smooth scrub
  pin: true,               // Pin element while scrolling
  pinSpacing: false,       // Don't add space for pin
  markers: true,           // Debug markers
}
```

## Best Practices

✅ **DO:**
- Use `gsap.context()` for cleanup in useEffect
- Register plugins: `gsap.registerPlugin(ScrollTrigger)`
- Cleanup animations on component unmount
- Use `overwrite: 'auto'` for hover effects
- Stagger animations for visual flow
- Use appropriate duration (0.3-1s for most)

❌ **DON'T:**
- Animate too many elements at once
- Use `useEffect` without cleanup
- Animate opacity and display together
- Use very long durations for scroll animations
- Forget to return cleanup function

## Performance Tips

1. **Batch animations** - Group related animations
2. **Avoid animating many elements** - Limit to 10-15 simultaneously
3. **Use `will-change` CSS** - For performant elements:
```css
.animated-element {
  will-change: transform;
}
```

4. **Debounce scroll events** - Let ScrollTrigger handle it
5. **Use transforms** - Animate `x`, `y`, `scale`, `rotation` (GPU accelerated)

## Testing in Your Portfolio

Try these in your sections:

### Section Entrance Animation
```jsx
useEffect(() => {
  const ctx = gsap.context(() => {
    gsap.fromTo(
      '.section-content',
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
        },
      }
    );
  }, sectionRef);

  return () => ctx.revert();
}, []);
```

### Card Stagger Animation
```jsx
gsap.fromTo(
  '.card',
  { opacity: 0, scale: 0.9 },
  {
    opacity: 1,
    scale: 1,
    duration: 0.6,
    stagger: 0.15,
    scrollTrigger: {
      trigger: containerRef.current,
      start: 'top 60%',
    },
  }
);
```

## Resources

- [GSAP Docs](https://greensock.com/gsap/)
- [ScrollTrigger Docs](https://greensock.com/scrolltrigger/)
- [GSAP Codepen Examples](https://codepen.io/GreenSock/)
- [Easing Visualizer](https://greensock.com/ease-visualizer/)

## Common Animations by Component

### Hero Section ⭐
- Staggered text reveal
- Profile image scale + rotate
- Floating badges
- Marquee scrolling skills

### Project Cards 🎨
- Scroll reveal + stagger
- Image zoom on hover
- Title/description fade
- Overlay transitions

### About Section 📝
- Text fade in from left
- Card scale animation
- Icon scale on hover
- Quote emphasis

### Experience Timeline ⏱️
- Items slide in from sides
- Connecting lines animate
- Icons pulse on scroll

### Contact Form 📧
- Input focus expand
- Button hover glow
- Success message pop
- Field highlight

## Next Steps

1. Update remaining sections (Experience, Testimonials, Contact)
2. Add parallax to hero background
3. Implement timeline for experience
4. Create custom cursor animations
5. Add page transition animations

Happy animating! 🚀
