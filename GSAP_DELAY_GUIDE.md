# GSAP Delay Guide - Complete Reference

## What is Delay?

**Delay** is a property that makes an animation wait before starting. It's measured in seconds.

```js
// Start immediately (no delay)
gsap.to('.element', { opacity: 1, duration: 1 });

// Wait 0.5 seconds, then animate
gsap.to('.element', { opacity: 1, duration: 1, delay: 0.5 });
```

---

## 1. Basic Delay Usage

### Simple Delay
```js
gsap.to('.button', {
  opacity: 1,
  y: 0,
  duration: 0.6,
  delay: 0.3  // Wait 0.3 seconds before starting
});
```

### Multiple Elements with Different Delays
```js
// Element 1 - starts immediately
gsap.to('.element-1', { opacity: 1, duration: 0.5, delay: 0 });

// Element 2 - starts after 0.3s
gsap.to('.element-2', { opacity: 1, duration: 0.5, delay: 0.3 });

// Element 3 - starts after 0.6s
gsap.to('.element-3', { opacity: 1, duration: 0.5, delay: 0.6 });
```

---

## 2. Stagger (Automatic Per-Element Delays)

**Stagger** automatically adds delays to each element in a list. Much cleaner than manual delays!

### Basic Stagger
```js
// Each element waits an additional 0.1s
gsap.fromTo(
  '.nav-link',                    // target multiple elements
  { opacity: 0, y: -10 },        // from
  {
    opacity: 1,
    y: 0,
    duration: 0.6,
    stagger: 0.1,                 // 0.1s delay between each element
    ease: 'power3.out'
  }
);
```

**Timeline:**
- `.nav-link:1` → starts at 0s
- `.nav-link:2` → starts at 0.1s
- `.nav-link:3` → starts at 0.2s
- `.nav-link:4` → starts at 0.3s

### Stagger with Initial Delay
```js
gsap.fromTo(
  '.nav-link',
  { opacity: 0, y: -10 },
  {
    opacity: 1,
    y: 0,
    duration: 0.6,
    delay: 0.2,        // Wait 0.2s BEFORE stagger starts
    stagger: 0.1,      // Then add 0.1s between each
    ease: 'power3.out'
  }
);
```

**Timeline:**
- `.nav-link:1` → starts at 0.2s (delay)
- `.nav-link:2` → starts at 0.3s (delay + stagger)
- `.nav-link:3` → starts at 0.4s (delay + stagger*2)
- `.nav-link:4` → starts at 0.5s (delay + stagger*3)

---

## 3. Advanced Stagger Options

### Stagger by Amount
```js
gsap.to('.card', {
  opacity: 1,
  stagger: 0.15,  // Each element is 0.15s apart
  duration: 0.6
});
```

### Stagger from End
```js
gsap.to('.item', {
  opacity: 1,
  stagger: {
    amount: 0.5,      // Total time spread: 0.5s
    from: 'end'       // Start from LAST element
  }
});
```

### Stagger from Center
```js
gsap.to('.item', {
  y: 0,
  stagger: {
    amount: 0.6,
    from: 'center'    // Animate from middle outward
  }
});
```

### Stagger with Grid Layout
```js
gsap.to('.grid-item', {
  opacity: 1,
  stagger: {
    amount: 1,
    grid: [4, 3],     // 4 columns, 3 rows
    from: 'center'    // Wave pattern from center
  }
});
```

---

## 4. Timeline for Complex Sequencing

Use **Timeline** when you need precise control over multiple animations.

### Basic Timeline
```js
const tl = gsap.timeline();

tl.to('.logo', { opacity: 1, duration: 0.5 })           // starts at 0s
  .to('.nav-links', { opacity: 1, duration: 0.5 }, 0.2) // starts at 0.2s
  .to('.button', { opacity: 1, duration: 0.5 }, 0.4)    // starts at 0.4s
```

### Timeline with Explicit Labels
```js
const tl = gsap.timeline();

tl.to('.logo', { opacity: 1, duration: 0.5 })
  .addLabel('linksStart')                      // Mark this point
  .to('.nav-links', { opacity: 1, duration: 0.5 })
  .addLabel('buttonStart')
  .to('.button', { opacity: 1, duration: 0.5 })

// Jump to specific point
tl.play('buttonStart');
```

### Timeline Position Parameters
```js
const tl = gsap.timeline();

// Position 1: At end of timeline (+=time)
tl.to('.box1', { x: 100 })
  .to('.box2', { x: 100 }, '+=0.5');  // 0.5s AFTER box1 finishes

// Position 2: Absolute time (number)
tl.to('.box1', { x: 100 })
  .to('.box2', { x: 100 }, 1);        // At 1 second mark

// Position 3: Relative to timeline start (<time)
tl.to('.box1', { x: 100 })
  .to('.box2', { x: 100 }, '-=0.2');  // Start 0.2s before box1 ends
```

---

## 5. Real-World Example: Navbar Animation

```jsx
useEffect(() => {
  const ctx = gsap.context(() => {
    const tl = gsap.timeline();

    // Logo slides in first
    tl.fromTo(
      '.logo',
      { opacity: 0, x: -50 },
      { opacity: 1, x: 0, duration: 0.8, ease: 'back.out' }
    )

    // Nav links stagger in while logo is animating
    .fromTo(
      '.nav-link',
      { opacity: 0, y: -10 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.1
      },
      0.2  // Start at 0.2s (while logo is still animating)
    )

    // Button slides in last
    .fromTo(
      '.cta-button',
      { opacity: 0, x: 50 },
      { opacity: 1, x: 0, duration: 0.8, ease: 'back.out' },
      0.5  // Start at 0.5s
    );
  }, ref);

  return () => ctx.revert();
}, []);
```

---

## 6. Common Delay Patterns

### Pattern 1: Cascading Entrance
```js
// Each element waits progressively longer
gsap.to('.item', {
  opacity: 1,
  delay: (i) => i * 0.1,  // i = index, 0.1s per item
  duration: 0.5
});
```

### Pattern 2: Staggered with Easing
```js
gsap.fromTo(
  '.feature',
  { opacity: 0, y: 50 },
  {
    opacity: 1,
    y: 0,
    duration: 0.8,
    stagger: {
      amount: 0.5,        // Spread over 0.5 seconds
      from: 'start',
      each: 0.1           // Minimum 0.1s between
    },
    ease: 'power3.out'
  }
);
```

### Pattern 3: Sequential Button Click
```js
const handleClick = () => {
  gsap.to('.popup', {
    opacity: 1,
    delay: 0.1,
    duration: 0.3
  });

  gsap.to('.popup-content', {
    opacity: 1,
    y: 0,
    delay: 0.3,  // Wait for popup to appear first
    duration: 0.4
  });
};
```

---

## 7. Troubleshooting Delays

### Issue: Animation doesn't wait
**Solution:** Make sure you're using the correct property name
```js
❌ gsap.to('.element', { opacity: 1, wait: 0.5 });     // Wrong!
✅ gsap.to('.element', { opacity: 1, delay: 0.5 });    // Correct
```

### Issue: Delays not working with stagger
**Solution:** Combine delay + stagger properly
```js
❌ gsap.to('.item', { opacity: 1, stagger: 0.1, delay: 0.5 });
✅ // delay applies to first item, stagger to the rest
```

### Issue: Overlapping animations
**Solution:** Use `overwrite: 'auto'` to prevent conflicts
```js
gsap.to('.element', {
  opacity: 1,
  delay: 0.2,
  overwrite: 'auto'  // Kills previous animations
});
```

---

## 8. Performance Tips

✅ **DO:**
- Use stagger instead of manual delays (cleaner, faster)
- Use timelines for complex sequences
- Use `overwrite: 'auto'` to prevent conflicts
- Combine delays with `ease` for natural motion

❌ **DON'T:**
- Create excessive delays (feels unresponsive)
- Use delays longer than 1-2 seconds for UI elements
- Mix timeline and delay (use one or the other)
- Forget to clean up animations with `ctx.revert()`

---

## 9. Cheat Sheet - Quick Reference

```js
// 1. Simple delay
gsap.to(el, { opacity: 1, delay: 0.3 });

// 2. Stagger multiple elements
gsap.to('.items', { opacity: 1, stagger: 0.1 });

// 3. Delay + stagger
gsap.to('.items', { opacity: 1, delay: 0.2, stagger: 0.1 });

// 4. Timeline sequence
gsap.timeline()
  .to(el1, { opacity: 1 })
  .to(el2, { opacity: 1 }, '+=0.3');

// 5. Function-based delay
gsap.to('.items', { opacity: 1, delay: (i) => i * 0.1 });

// 6. Stagger with config
gsap.to('.items', {
  opacity: 1,
  stagger: { amount: 0.5, from: 'center' }
});
```

---

## Resources
- [GSAP Delay Docs](https://greensock.com/docs/v3/GSAP/Tween)
- [Stagger Docs](https://greensock.com/docs/v3/GSAP/Tween/stagger())
- [Timeline Docs](https://greensock.com/docs/v3/GSAP/Timeline)
