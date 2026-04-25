# Navbar Animation Guide

## ✅ Current Navbar Animations

Your navbar now includes:

### 1. **Logo Animation** 🎯
- Slide in from left with scale effect
- Glow effect on hover
- Duration: 0.8s with `back.out` easing

```jsx
gsap.fromTo(
  logoRef.current,
  { opacity: 0, x: -50, scale: 0.8 },
  { opacity: 1, x: 0, scale: 1, duration: 0.8, ease: 'back.out' }
);
```

### 2. **Navigation Links** 🔗
- Staggered fade-in animation (0.1s delay)
- Hover color transition to primary color
- Smooth transition effects

```jsx
gsap.fromTo(
  '.nav-link',
  { opacity: 0, y: -10 },
  { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, delay: 0.2 }
);
```

### 3. **CTA Button** ✨
- Slide in from right with scale
- Hover effects ready

```jsx
gsap.fromTo(
  ctaButtonRef.current,
  { opacity: 0, x: 50 },
  { opacity: 1, x: 0, duration: 0.8, delay: 0.4, ease: 'back.out' }
);
```

### 4. **Scroll Animation** 📜
- Background blur effect on scroll
- Navbar glass morphism effect
- Smooth transition (0.3s)

```jsx
if (scrolled) {
  gsap.to(headerRef.current, {
    backdropFilter: 'blur(10px)',
    backgroundColor: 'rgba(15, 23, 42, 0.8)',
    duration: 0.3
  });
}
```

### 5. **Mobile Menu** 📱
- Slide down animation from top
- Staggered menu items
- Smooth collapse/expand

```jsx
gsap.fromTo(
  mobileMenuRef.current,
  { opacity: 0, y: -20, height: 0 },
  { opacity: 1, y: 0, height: 'auto', duration: 0.4 }
);
```

## 🚀 Advanced Animations to Add

### 1. **Underline Hover Effect**
```jsx
// Already has span in nav-link, add this in useEffect:
import { navLinkUnderline } from '@/components/advanced-navbar-animations';

useEffect(() => {
  navLinkUnderline('.nav-link');
}, []);
```

HTML (already present):
```jsx
<span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full 
               origin-left" style={{ transform: 'scaleX(0)' }}></span>
```

### 2. **Hide/Show Navbar on Scroll**
```jsx
import { navbarHideOnScroll } from '@/components/advanced-navbar-animations';

useEffect(() => {
  return navbarHideOnScroll(headerRef);
}, []);
```

### 3. **Active Link Indicator**
```jsx
import { activeNavLink } from '@/components/advanced-navbar-animations';

useEffect(() => {
  activeNavLink('[id]', '.nav-link');
}, []);
```

### 4. **Button Glow Effect**
```jsx
import { buttonGlowEffect } from '@/components/advanced-navbar-animations';

useEffect(() => {
  return buttonGlowEffect(ctaButtonRef);
}, []);
```

### 5. **Character-by-Character Logo**
```jsx
import { animatedLogoText } from '@/components/advanced-navbar-animations';

useEffect(() => {
  animatedLogoText(logoRef);
}, []);
```

## 📋 Complete Enhanced Navbar Example

Here's what a fully enhanced navbar looks like:

```jsx
import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  navLinkUnderline, 
  buttonGlowEffect,
  activeNavLink 
} from '@/components/advanced-navbar-animations';

gsap.registerPlugin(ScrollTrigger);

export const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const headerRef = useRef(null);
  const logoRef = useRef(null);
  const ctaButtonRef = useRef(null);
  const mobileMenuRef = useRef(null);

  // Initial animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Logo slide in
      gsap.fromTo(logoRef.current,
        { opacity: 0, x: -50, scale: 0.8 },
        { opacity: 1, x: 0, scale: 1, duration: 0.8, ease: 'back.out' }
      );

      // Nav links stagger
      gsap.fromTo('.nav-link',
        { opacity: 0, y: -10 },
        { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, delay: 0.2 }
      );

      // CTA button
      gsap.fromTo(ctaButtonRef.current,
        { opacity: 0, x: 50 },
        { opacity: 1, x: 0, duration: 0.8, delay: 0.4, ease: 'back.out' }
      );

      // Underline animation
      navLinkUnderline('.nav-link');

      // Button glow
      buttonGlowEffect(ctaButtonRef);

      // Active link indicator
      activeNavLink('[id]', '.nav-link');
    }, headerRef);

    return () => ctx.revert();
  }, []);

  // Mobile menu animation
  useEffect(() => {
    if (isMobileMenuOpen) {
      gsap.fromTo(mobileMenuRef.current,
        { opacity: 0, y: -20, height: 0 },
        { opacity: 1, y: 0, height: 'auto', duration: 0.4 }
      );
    } else {
      gsap.to(mobileMenuRef.current, {
        opacity: 0, y: -20, duration: 0.3
      });
    }
  }, [isMobileMenuOpen]);

  // Rest of component...
};
```

## 🎨 Customization Options

### Change Logo Animation Speed
```jsx
// In Navbar.jsx
gsap.fromTo(logoRef.current,
  { opacity: 0, x: -50, scale: 0.8 },
  {
    opacity: 1,
    x: 0,
    scale: 1,
    duration: 1.2, // ← Change this (0.5-1.5 recommended)
    ease: 'back.out'
  }
);
```

### Change Link Stagger Delay
```jsx
gsap.fromTo('.nav-link',
  { opacity: 0, y: -10 },
  {
    opacity: 1,
    y: 0,
    duration: 0.6,
    stagger: 0.15, // ← Increase for more delay between links
    ease: 'power3.out'
  }
);
```

### Change Scroll Blur Amount
```jsx
gsap.to(headerRef.current, {
  backdropFilter: 'blur(20px)', // ← Change blur amount
  backgroundColor: 'rgba(15, 23, 42, 0.9)', // ← Change opacity
  duration: 0.3
});
```

## 🎯 Animation Timeline

| Element | Delay | Duration | Effect |
|---------|-------|----------|--------|
| Logo | 0ms | 800ms | Slide in + Scale |
| Nav Links | 200ms | 600ms | Stagger fade (100ms) |
| CTA Button | 400ms | 800ms | Slide in |
| Mobile Menu | On click | 400ms | Slide down |
| Scroll Blur | On scroll | 300ms | Glass effect |

## 📱 Mobile Navbar Animations

Your mobile navbar includes:
- Hamburger menu icon animation
- Slide-down menu with staggered items
- Smooth open/close transitions
- Touch-friendly interactions

```jsx
// Mobile menu opens with stagger
gsap.fromTo('.mobile-link',
  { opacity: 0, x: -20 },
  { opacity: 1, x: 0, duration: 0.4, stagger: 0.08 }
);
```

## 🔧 Implementation Steps

### Step 1: Update Your Navbar
Your navbar is already updated! ✅

### Step 2: Add Advanced Animations (Optional)
```jsx
import { navLinkUnderline, buttonGlowEffect } from '@/components/advanced-navbar-animations';

useEffect(() => {
  navLinkUnderline('.nav-link');
  return buttonGlowEffect(ctaButtonRef);
}, []);
```

### Step 3: Test in Browser
```bash
npm run dev
```

### Step 4: Fine-tune Timings
Adjust durations and delays to match your preference:
- Fast: 0.3-0.5s
- Normal: 0.5-0.8s
- Slow: 0.8-1.2s

## 🎬 Animation Showcase

Your navbar now demonstrates:
✅ Entrance animations (slide + fade)
✅ Scroll-based effects (blur)
✅ Hover interactions (color change)
✅ Mobile responsiveness (menu slide)
✅ Staggered sequences (sequential delays)
✅ Smooth transitions (easing curves)

## 💡 Pro Tips

1. **Logo as Brand**: Make logo animation unique to your brand
2. **Link Underline**: Great for indicating active section
3. **Button Glow**: Draws attention to CTA
4. **Mobile First**: Test animations on mobile devices
5. **Performance**: Use GPU transforms (scale, rotate) when possible

## 🚀 Next Level Enhancements

Add these for even more polish:

### Breadcrumb Navigation
```jsx
import { breadcrumbAnimation } from '@/components/advanced-navbar-animations';
breadcrumbAnimation(breadcrumbRef);
```

### Search Bar
```jsx
import { searchBarAnimation } from '@/components/advanced-navbar-animations';
searchBarAnimation(searchRef);
```

### Hide on Scroll
```jsx
import { navbarHideOnScroll } from '@/components/advanced-navbar-animations';
useEffect(() => {
  return navbarHideOnScroll(headerRef);
}, []);
```

## 📊 Performance Metrics

Your navbar animations are optimized for:
- **Frame Rate**: 60 FPS on most devices
- **Performance**: GPU-accelerated transforms
- **Bundle Size**: Minimal GSAP imports
- **Memory**: Proper cleanup with gsap.context()

## 🎓 Learning Resources

- Check `src/components/advanced-navbar-animations.js` for more examples
- Refer to `GSAP_CHEATSHEET.md` for animation basics
- Review `GSAP_GUIDE.md` for detailed explanations

---

**Your navbar is now animated! Scroll up and down to see the blur effect, hover over links to see color changes, and try the mobile menu.** 🎉
