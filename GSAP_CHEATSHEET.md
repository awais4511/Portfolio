# GSAP Animation Quick Reference

## Installation ✅
```bash
npm install gsap
```

## Basic Setup
```jsx
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);
```

## Core Methods Cheat Sheet

### Animate TO a state
```js
gsap.to('.element', { duration: 1, opacity: 1, x: 100 });
```

### Animate FROM a state
```js
gsap.from('.element', { duration: 1, opacity: 0, y: -50 });
```

### Animate FROM → TO
```js
gsap.fromTo('.element',
  { opacity: 0 },    // FROM
  { opacity: 1 }     // TO
);
```

## Animation Properties

| Property | Example | Effect |
|----------|---------|--------|
| `duration` | `0.8` | Length in seconds |
| `delay` | `0.2` | Wait before start |
| `stagger` | `0.1` | Delay per item |
| `ease` | `'power3.out'` | Animation curve |
| `repeat` | `-1` | Loop forever |
| `yoyo` | `true` | Reverse animation |
| `opacity` | `1` | Fade effect |
| `x` / `y` | `100` | Move position |
| `scale` | `1.5` | Size change |
| `rotation` | `360` | Spin in degrees |

## Scroll Animations

```jsx
// Fade in on scroll
gsap.fromTo('.element',
  { opacity: 0 },
  {
    opacity: 1,
    scrollTrigger: {
      trigger: '.element',
      start: 'top 80%',
      end: 'top 20%',
    }
  }
);
```

## Common Patterns

### ✨ Hero Stagger
```js
gsap.fromTo('.hero-text',
  { opacity: 0, y: 30 },
  {
    opacity: 1,
    y: 0,
    duration: 0.8,
    stagger: 0.2,
    ease: 'power3.out'
  }
);
```

### 🎨 Hover Scale
```js
element.addEventListener('mouseenter', () => {
  gsap.to(element, { scale: 1.05, duration: 0.3 });
});
element.addEventListener('mouseleave', () => {
  gsap.to(element, { scale: 1, duration: 0.3 });
});
```

### 📊 Count Numbers
```js
const obj = { value: 0 };
gsap.to(obj, {
  value: 100,
  duration: 2,
  onUpdate: () => {
    element.textContent = Math.floor(obj.value);
  }
});
```

### 🔄 Floating
```js
gsap.to('.badge', {
  y: -15,
  duration: 3,
  repeat: -1,
  yoyo: true,
  ease: 'sine.inOut'
});
```

### 📸 Image Zoom
```js
gsap.to(image, {
  scale: 1.1,
  duration: 0.6,
  overwrite: 'auto' // Don't conflict with other animations
});
```

## Easing Cheat Sheet

| Ease | Feel | Use Case |
|------|------|----------|
| `power1.inOut` | Subtle | Delicate animations |
| `power3.out` | Natural | Default, smooth |
| `back.out` | Bouncy | Energetic elements |
| `elastic.out` | Spring | Playful interactions |
| `sine.inOut` | Smooth | Floating objects |
| `circ.out` | Arc-like | Curved motion |

## React Hook Pattern

```jsx
useEffect(() => {
  const ctx = gsap.context(() => {
    // All animations here
    gsap.to('.element', { opacity: 1 });
  }, ref); // scope to ref

  return () => ctx.revert(); // Cleanup
}, []);
```

## Scroll Triggers

| Option | Value | Purpose |
|--------|-------|---------|
| `trigger` | element | Watch this element |
| `start` | 'top 80%' | When viewport top hits 80% down |
| `end` | 'top 20%' | Stop animation here |
| `scrub` | true / 1 | Tie to scroll |
| `pin` | true | Stick element while scrolling |
| `markers` | true | Debug visualization |

## Timeline (Advanced)

```js
const tl = gsap.timeline();
tl.to('.element1', { duration: 1, opacity: 1 });
tl.to('.element2', { duration: 1, opacity: 1 }, 0); // Same time as first
tl.to('.element3', { duration: 1, opacity: 1 }, '+=0.5'); // 0.5s after
```

## Performance Tips

✅ **Fast:**
- `x`, `y` (transform)
- `scale` (transform)
- `rotation` (transform)
- `opacity` (composite)

❌ **Slow:**
- `width`, `height`
- `left`, `right`, `top`, `bottom`
- `margin`, `padding`
- `background-color`

## Debugging

```js
// Show scroll trigger markers
scrollTrigger: {
  markers: true, // ← Shows start/end points
}

// Check animation progress
console.log(myAnimation.progress()); // 0-1 value
```

## Common Gotchas

| Issue | Solution |
|-------|----------|
| Animation doesn't trigger | Add `scrollTrigger` plugin |
| Duplicate animations | Use `overwrite: 'auto'` |
| Animation won't stop | Call `.kill()` on animation |
| Memory leak | Return cleanup function |
| Hover conflicts | Use `overwrite: 'auto'` in hover |

## Quick Copy-Paste Snippets

### Fade In Section
```jsx
useEffect(() => {
  gsap.fromTo(sectionRef.current,
    { opacity: 0, y: 50 },
    {
      opacity: 1,
      y: 0,
      duration: 0.8,
      scrollTrigger: { trigger: sectionRef.current }
    }
  );
}, []);
```

### Stagger Cards
```jsx
gsap.fromTo('.card',
  { opacity: 0, scale: 0.9 },
  {
    opacity: 1,
    scale: 1,
    stagger: 0.15,
    duration: 0.6,
    scrollTrigger: { trigger: containerRef.current }
  }
);
```

### Hover Effect
```jsx
card.onmouseenter = () => gsap.to(card, { scale: 1.05, duration: 0.3 });
card.onmouseleave = () => gsap.to(card, { scale: 1, duration: 0.3 });
```

### Text Reveal
```jsx
gsap.fromTo('.text-item',
  { opacity: 0, x: -50 },
  {
    opacity: 1,
    x: 0,
    stagger: 0.1,
    duration: 0.5
  }
);
```

## Resources

- [GSAP Docs](https://greensock.com/gsap/)
- [ScrollTrigger Docs](https://greensock.com/scrolltrigger/)
- [Ease Visualizer](https://greensock.com/ease-visualizer/)
- [Pen Examples](https://codepen.io/GreenSock/)

## Your Current Animations

✅ **Hero Section**
- Text stagger fade in
- Profile image scale + rotate
- Floating badges
- Marquee skills

✅ **About Section**
- Text fade from left
- Card scale animation
- Icon hover scale

✅ **Projects Section**
- Cards stagger reveal
- Image zoom on hover

---

**Next to Add:**
- Experience timeline
- Testimonials carousel
- Contact form animations
- Page transitions
