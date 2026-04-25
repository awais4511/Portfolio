import { Button } from "@/components/Button";
import { Menu, X } from "lucide-react";
import { useEffect, useState, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const navLinks = [
  { href: "#about", label: "About" },
  { href: "#projects", label: "Projects" },
  { href: "#experience", label: "Experience" },
  { href: "#testimonials", label: "Testimonials" },
];

export const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const logoRef = useRef(null);
  const navLinksRef = useRef(null);
  const ctaButtonRef = useRef(null);
  const mobileMenuRef = useRef(null);
  const headerRef = useRef(null);

  // Initial logo animation on mount
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Logo animation - slide in from left with scale
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

      // Nav links stagger animation
      gsap.fromTo(
        '.nav-link',
        { opacity: 0, y: -10 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power3.out',
          delay: 0.2,
        }
      );

      // CTA button animation
      gsap.fromTo(
        ctaButtonRef.current,
        { opacity: 0, x: 50 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          ease: 'back.out',
          delay: 0.4,
        }
      );

      // Hover effect on logo
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

      // Nav link hover animation
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
    }, headerRef);

    return () => ctx.revert();
  }, []);

  // Mobile menu animation
  useEffect(() => {
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

      // Stagger mobile menu items
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
    } else if (mobileMenuRef.current) {
      gsap.to(mobileMenuRef.current, {
        opacity: 0,
        y: -20,
        duration: 0.3,
        ease: 'power2.in',
      });
    }
  }, [isMobileMenuOpen]);

  const handleContactClick = () => {
    const contactSection = document.getElementById("contact");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" });
    }
    setIsMobileMenuOpen(false);
  };

  // Scroll animation - blur background on scroll
  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > 50;
      setIsScrolled(scrolled);

      // Animate navbar background blur on scroll
      if (headerRef.current) {
        if (scrolled) {
          gsap.to(headerRef.current, {
            backdropFilter: 'blur(10px)',
            backgroundColor: 'rgba(15, 23, 42, 0.8)',
            duration: 0.3,
            overwrite: 'auto',
          });
        } else {
          gsap.to(headerRef.current, {
            backdropFilter: 'blur(0px)',
            backgroundColor: 'rgba(15, 23, 42, 0)',
            duration: 0.3,
            overwrite: 'auto',
          });
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      ref={headerRef}
      className={`fixed top-0 left-0 right-0 transition-all duration-500 ${
        isScrolled ? "glass-strong py-3" : "bg-transparent py-5"
      }  z-50`}
    >
      <nav className="container mx-auto px-4 sm:px-6 flex items-center justify-between">
        <a
          ref={logoRef}
          href="#"
          className="text-xl font-bold tracking-tight hover:text-primary transition-colors"
        >
          Awais Iqbal<span className="text-primary">.</span>
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-1">
          <div className="glass rounded-full px-2 py-1 flex items-center gap-1" ref={navLinksRef}>
            {navLinks.map((link, index) => (
              <a
                href={link.href}
                key={index}
                className="nav-link px-4 py-2 text-sm text-muted-foreground hover:text-foreground rounded-full hover:bg-surface transition-all duration-300 relative"
              >
                {link.label}
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full origin-left" style={{ transform: 'scaleX(0)' }}></span>
              </a>
            ))}
          </div>
        </div>

        {/* CTA Button */}
        <div className="hidden md:block" ref={ctaButtonRef}>
          <Button size="sm" onClick={handleContactClick}>Contact Me</Button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 text-foreground cursor-pointer transition-transform duration-300"
          onClick={() => setIsMobileMenuOpen((prev) => !prev)}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div ref={mobileMenuRef} className="md:hidden glass-strong overflow-hidden">
          <div className="container mx-auto px-4 sm:px-6 py-6 flex flex-col gap-4">
            {navLinks.map((link, index) => (
              <a
                href={link.href}
                key={index}
                onClick={() => setIsMobileMenuOpen(false)}
                className="mobile-link text-lg text-muted-foreground hover:text-primary py-2 transition-colors duration-300"
              >
                {link.label}
              </a>
            ))}

            <Button onClick={handleContactClick}>
              Contact Me
            </Button>
          </div>
        </div>
      )}
    </header>
  );
};
