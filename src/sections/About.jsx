import { Code2, Lightbulb, Rocket, Users } from "lucide-react";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const highlights = [
  {
    icon: Code2,
    title: "Clean Code",
    description:
      "Writing maintainable, scalable code that stands the test of time.",
  },
  {
    icon: Rocket,
    title: "Performance",
    description:
      "Optimizing for speed and delivering lightning-fast user experiences.",
  },
  {
    icon: Users,
    title: "Collaboration",
    description: "Working closely with teams to bring ideas to life.",
  },
  {
    icon: Lightbulb,
    title: "Innovation",
    description:
      "Staying ahead with the latest technologies and best practices.",
  },
];

export const About = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Left column text animation
      gsap.fromTo(
        '.about-text-item',
        { opacity: 0, x: -50 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          stagger: 0.2,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            markers: false,
          },
          ease: 'power3.out',
        }
      );

      // Highlights cards animation with scale
      gsap.fromTo(
        '.highlight-card',
        { opacity: 0, scale: 0.8, y: 30 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.15,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
          },
          ease: 'back.out',
        }
      );

      // Icon hover effect
      const cards = document.querySelectorAll('.highlight-card');
      cards.forEach((card) => {
        const icon = card.querySelector('div:first-child');
        if (icon) {
          card.addEventListener('mouseenter', () => {
            gsap.to(icon, { scale: 1.1, duration: 0.3, ease: 'power2.out' });
          });
          card.addEventListener('mouseleave', () => {
            gsap.to(icon, { scale: 1, duration: 0.3 });
          });
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="about" className="py-32 relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Column */}
          <div className="space-y-8">
            <div className="about-text-item">
              <span className="text-secondary-foreground text-sm font-medium tracking-wider uppercase">
                About Me
              </span>
            </div>

            <h2 className="about-text-item text-4xl md:text-5xl font-bold leading-tight text-secondary-foreground">
              Building the future,
              <span className="font-serif italic font-normal text-white">
                {" "}
                one component at a time.
              </span>
            </h2>

            <div className="about-text-item space-y-4 text-muted-foreground">
              <p>
                I’m a passionate software engineer with over 1 year of
                experience specializing in modern frontend technologies. I have
                hands-on experience with React, Angular, and React Native,
                allowing me to build dynamic web and cross-platform mobile
                applications. I focus on creating scalable, efficient, and
                user-friendly interfaces using component-based architecture and
                best practices.
              </p>
              <p>
                I specialize in React, Angular, and React Native, building
                everything from modern web applications to scalable
                cross-platform mobile solutions. My approach focuses on creating
                efficient, maintainable, and high-performance applications using
                best practices and clean architecture.
              </p>
              <p>
                When I'm not coding, you'll find me exploring new technologies,
                contributing to open-source projects, or sharing knowledge with
                the developer community.
              </p>
            </div>

            <div className="about-text-item glass rounded-2xl p-6 glow-border">
              <p className="text-lg font-medium italic text-foreground">
                "My mission as a developer is to build efficient, scalable, and
                user-focused applications that go beyond basic functionality —
                delivering clean, maintainable code and creating digital
                experiences that are both reliable for users and easy for
                developers to work with."
              </p>
            </div>
          </div>

          {/* Right Column - Hilights */}
          <div className="grid sm:grid-cols-2 gap-6">
            {highlights.map((item, idx) => (
              <div
                key={idx}
                className="highlight-card glass p-6 rounded-2xl"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 hover:bg-primary/20">
                  <item.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
