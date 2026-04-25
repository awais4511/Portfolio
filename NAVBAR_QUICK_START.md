# Navbar Animation Quick Reference

## ✨ What's Working Right Now

Your navbar has these animations enabled:

### 1️⃣ Logo Animation
- **Slide in** from left
- **Scale** effect (0.8 → 1)
- **Glow hover** effect
- Speed: 0.8s

### 2️⃣ Navigation Links
- **Stagger fade in** (0.1s between each)
- **Hover color change** to primary
- Smooth 0.6s duration

### 3️⃣ CTA Button
- **Slide in** from right
- **Scale** effect
- Delay: 0.4s after logo

### 4️⃣ Scroll Effects
- **Background blur** on scroll
- **Glass morphism** effect
- Transitions on scroll

### 5️⃣ Mobile Menu
- **Slide down** animation
- **Staggered items** fade in
- **Smooth collapse** on close

---

## 🔧 How to Add More Animations

### Add Underline Animation
Edit `src/layout/Navbar.jsx`, add to first useEffect:

```jsx
// Add this import at top
import { navLinkUnderline } from '@/components/advanced-navbar-animations';

// Add inside the gsap.context() in first useEffect
navLinkUnderline('.nav-link');
```

### Add Button Glow
```jsx
import { buttonGlowEffect } from '@/components/advanced-navbar-animations';

// Add inside gsap.context():
buttonGlowEffect(ctaButtonRef);
```

### Add Active Link Indicator
```jsx
import { activeNavLink } from '@/components/advanced-navbar-animations';

// Add inside gsap.context():
activeNavLink('[id]', '.nav-link');
```

### Hide Navbar on Scroll Down
```jsx
import { navbarHideOnScroll } from '@/components/advanced-navbar-animations';

// Add this useEffect:
useEffect(() => {
  return navbarHideOnScroll(headerRef);
}, []);
```

### Animate Logo Characters
```jsx
import { animatedLogoText } from '@/components/advanced-navbar-animations';

// Add inside gsap.context():
animatedLogoText(logoRef);
```

---

## 🎨 Customization Examples

### Speed Up Logo Animation
```jsx
// Change from 0.8 to 0.5s:
gsap.fromTo(
  logoRef.current,
  { opacity: 0, x: -50, scale: 0.8 },
  {
    opacity: 1,
    x: 0,
    scale: 1,
    duration: 0.5, // ← Changed from 0.8
    ease: 'back.out',
  }
);
```

### Slower Link Stagger
```jsx
// Change stagger from 0.1 to 0.2:
gsap.fromTo(
  '.nav-link',
  { opacity: 0, y: -10 },
  {
    opacity: 1,
    y: 0,
    duration: 0.6,
    stagger: 0.2, // ← Changed from 0.1
    ease: 'power3.out',
    delay: 0.2,
  }
);
```

### Change Scroll Blur Amount
```jsx
// Change blur from 10px to 15px:
gsap.to(headerRef.current, {
  backdropFilter: 'blur(15px)', // ← Changed from 10px
  backgroundColor: 'rgba(15, 23, 42, 0.8)',
  duration: 0.3,
  overwrite: 'auto',
});
```

### Different Logo Color on Hover
```jsx
// Change glow color from teal to purple:
logoRef.current?.addEventListener('mouseenter', () => {
  gsap.to(logoRef.current, {
    textShadow: '0 0 20px rgba(147, 51, 234, 0.6)', // ← Purple glow
    duration: 0.3,
  });
});
```

---

## 📱 Mobile Animations

All navbar animations work on mobile:
- Hamburger icon (Menu/X) transitions smoothly
- Mobile menu slides down from top
- Menu items fade in with stagger
- Links are touch-friendly

---

## 🚀 Quick Copy-Paste Snippets

### Complete Logo Animation
```jsx
gsap.fromTo(
  logoRef.current,
  { opacity: 0, x: -50, scale: 0.8 },
  {
    opacity: 1,
    x: 0,
    scale: 1,
    duration: 0.8,
    ease: 'back.out',
  }
);

// Hover glow
logoRef.current?.addEventListener('mouseenter', () => {
  gsap.to(logoRef.current, {
    textShadow: '0 0 20px rgba(32, 178, 166, 0.6)',
    duration: 0.3,
  });
});

logoRef.current?.addEventListener('mouseleave', () => {
  gsap.to(logoRef.current, {
    textShadow: '0 0 0px rgba(32, 178, 166, 0)',
    duration: 0.3,
  });
});
```

### Complete Link Hover
```jsx
const links = document.querySelectorAll('.nav-link');
links.forEach((link) => {
  link.addEventListener('mouseenter', () => {
    gsap.to(link, {
      color: '#20B2A6',
      duration: 0.2,
      overwrite: 'auto',
    });
  });

  link.addEventListener('mouseleave', () => {
    gsap.to(link, {
      color: 'var(--color-muted-foreground)',
      duration: 0.2,
      overwrite: 'auto',
    });
  });
});
```

### Complete Mobile Menu
```jsx
if (isMobileMenuOpen) {
  gsap.fromTo(
    mobileMenuRef.current,
    { opacity: 0, y: -20, height: 0 },
    {
      opacity: 1,
      y: 0,
      height: 'auto',
      duration: 0.4,
      ease: 'power2.out',
    }
  );

  gsap.fromTo(
    '.mobile-link',
    { opacity: 0, x: -20 },
    {
      opacity: 1,
      x: 0,
      duration: 0.4,
      stagger: 0.08,
      ease: 'power2.out',
    }
  );
}
```

---

## 🎯 Animation Timing Guide

| Animation | Delay | Duration | Speed |
|-----------|-------|----------|-------|
| Logo | 0ms | 800ms | Normal |
| Nav Links | 200ms | 600ms | Normal |
| Link Items | N/A | 600ms | 100ms stagger |
| CTA Button | 400ms | 800ms | Normal |
| Mobile Menu | On click | 400ms | Fast |
| Scroll Blur | On scroll | 300ms | Fast |

---

## 💡 Pro Tips

1. **Test on Mobile** - Open DevTools, toggle device mode
2. **Adjust Timing** - Find what feels good for YOUR portfolio
3. **Consistent Easing** - Use same easing across navbar (power3.out)
4. **Don't Overdo** - Subtle is better than flashy
5. **Performance** - Monitor in DevTools Performance tab

---

## 🔍 Debugging

### Animation Not Playing?
```jsx
// Make sure refs are properly connected:
ref={logoRef}        // Logo needs this ref
ref={headerRef}      // Header needs this ref
className="nav-link" // Links need this class
```

### Animation Conflicting?
```jsx
// Use overwrite: 'auto' to prevent conflicts
gsap.to(element, {
  color: '#20B2A6',
  duration: 0.2,
  overwrite: 'auto' // ← Add this
});
```

### Animation Too Fast/Slow?
```jsx
// Adjust duration:
duration: 0.5  // Fast
duration: 0.8  // Normal
duration: 1.2  // Slow
```

---

## 📚 File References

- **Navbar Component**: `src/layout/Navbar.jsx`
- **Advanced Examples**: `src/components/advanced-navbar-animations.js`
- **Full Guide**: `NAVBAR_ANIMATION_GUIDE.md`
- **GSAP Cheatsheet**: `GSAP_CHEATSHEET.md`

---

## ✅ Testing Checklist

- [ ] Logo animates on page load
- [ ] Navigation links fade in with stagger
- [ ] CTA button slides in from right
- [ ] Links change color on hover
- [ ] Navbar background blurs on scroll
- [ ] Mobile menu slides down smoothly
- [ ] Mobile menu items stagger in
- [ ] No console errors
- [ ] Animations feel smooth (60 FPS)

---

## 🎉 You're Ready!

Run this to see your animated navbar:
```bash
npm run dev
```

Visit `http://localhost:5173` and:
1. See logo animate on load
2. Scroll to see navbar blur effect
3. Hover over links to see color change
4. Click menu icon on mobile (or resize window)

**Enjoy your professional navbar! 🚀✨**
