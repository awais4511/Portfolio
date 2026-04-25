// Advanced Navbar Animation Examples
// Add these to your Navbar.jsx or import and use as needed

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

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
          duration: 0.3,
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
          duration: 0.3,
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
  let lastScrollY = 0;
  let tl = gsap.timeline({ paused: true });

  tl.to(navbarRef.current, {
    yPercent: -100,
    duration: 0.3,
    ease: 'power2.in',
  });

  ScrollTrigger.create({
    onUpdate: (self) => {
      if (self.getVelocity() < -500) {
        // Scrolling up fast
        tl.reverse();
      } else if (self.getVelocity() > 500) {
        // Scrolling down fast
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
            duration: 0.3,
          });
        } else {
          gsap.to(link, {
            color: 'var(--color-muted-foreground)',
            duration: 0.3,
          });
        }
      });
    },
  });
};

/**
 * Logo Text Split Animation
 * Animate logo text character by character
 */
export const animatedLogoText = (logoRef) => {
  if (!logoRef.current) return;

  const text = logoRef.current.textContent;
  logoRef.current.innerHTML = text
    .split('')
    .map((char) => `<span class="logo-char">${char}</span>`)
    .join('');

  gsap.fromTo(
    logoRef.current.querySelectorAll('.logo-char'),
    { opacity: 0, y: -10 },
    {
      opacity: 1,
      y: 0,
      duration: 0.4,
      stagger: 0.05,
      ease: 'back.out',
    }
  );
};

/**
 * Navbar Glow Effect
 * Add glow on hover to navbar items
 */
export const navbarGlowEffect = (itemSelector) => {
  const items = document.querySelectorAll(itemSelector);

  items.forEach((item) => {
    item.addEventListener('mouseenter', () => {
      gsap.to(item, {
        boxShadow: '0 0 20px rgba(32, 178, 166, 0.5)',
        duration: 0.3,
      });
    });

    item.addEventListener('mouseleave', () => {
      gsap.to(item, {
        boxShadow: '0 0 0px rgba(32, 178, 166, 0)',
        duration: 0.3,
      });
    });
  });
};

/**
 * Button Glow Animation
 * Animated glow effect on CTA button
 */
export const buttonGlowEffect = (buttonRef) => {
  const tl = gsap.timeline({ repeat: -1 });

  tl.to(buttonRef.current, {
    boxShadow: [
      '0 0 10px rgba(32, 178, 166, 0.3)',
      '0 0 20px rgba(32, 178, 166, 0.6)',
      '0 0 10px rgba(32, 178, 166, 0.3)',
    ],
    duration: 2,
    ease: 'sine.inOut',
  });

  return () => tl.kill();
};

/**
 * Smooth Scroll Animation
 * Smooth scroll to sections with animation
 */
export const smoothScrollToSection = (href) => {
  const target = document.querySelector(href);
  if (!target) return;

  gsap.to(window, {
    scrollTo: { y: target.offsetTop - 80 },
    duration: 0.8,
    ease: 'power2.inOut',
  });
};

/**
 * Mobile Menu Slide Animation
 * Slide menu from top with staggered items
 */
export const mobileMenuSlide = (menuRef, isOpen) => {
  if (isOpen) {
    gsap.fromTo(
      menuRef.current,
      { opacity: 0, y: -30, height: 0 },
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
        duration: 0.3,
        stagger: 0.08,
        ease: 'power2.out',
      }
    );
  } else {
    gsap.to(menuRef.current, {
      opacity: 0,
      y: -30,
      height: 0,
      duration: 0.3,
      ease: 'power2.in',
    });
  }
};

/**
 * Navbar Shrink on Scroll
 * Navbar gets smaller as you scroll down
 */
export const navbarShrinkOnScroll = (navbarRef) => {
  gsap.to(navbarRef.current, {
    scrollTrigger: {
      trigger: 'body',
      onUpdate: (self) => {
        const scale = gsap.utils.clamp(0.8, 1, 1 - self.getVelocity() / 500);
        gsap.to(navbarRef.current, {
          scale,
          duration: 0.3,
          overwrite: 'auto',
        });
      },
    },
  });
};

/**
 * Breadcrumb Animation
 * Animated breadcrumb path showing current section
 */
export const breadcrumbAnimation = (breadcrumbRef) => {
  const items = breadcrumbRef.current.querySelectorAll('.breadcrumb-item');

  gsap.fromTo(
    items,
    { opacity: 0, x: -10 },
    {
      opacity: 1,
      x: 0,
      duration: 0.4,
      stagger: 0.1,
      ease: 'power2.out',
    }
  );
};

/**
 * Search Bar Animation
 * Expandable search bar that grows on focus
 */
export const searchBarAnimation = (searchRef) => {
  const input = searchRef.current.querySelector('input');
  const container = searchRef.current;

  if (!input) return;

  input.addEventListener('focus', () => {
    gsap.to(container, {
      width: '300px',
      duration: 0.4,
      ease: 'power2.out',
    });
  });

  input.addEventListener('blur', () => {
    gsap.to(container, {
      width: '200px',
      duration: 0.4,
      ease: 'power2.out',
    });
  });
};

/**
 * Icon Rotation Animation
 * Rotate menu icon when clicked
 */
export const menuIconRotation = (iconRef) => {
  let isOpen = false;

  return () => {
    isOpen = !isOpen;
    gsap.to(iconRef.current, {
      rotation: isOpen ? 90 : 0,
      duration: 0.3,
      ease: 'power2.out',
    });
  };
};

export default {
  navLinkUnderline,
  navbarHideOnScroll,
  activeNavLink,
  animatedLogoText,
  navbarGlowEffect,
  buttonGlowEffect,
  smoothScrollToSection,
  mobileMenuSlide,
  navbarShrinkOnScroll,
  breadcrumbAnimation,
  searchBarAnimation,
  menuIconRotation,
};
