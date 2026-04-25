import { ArrowUpRight, Github } from "lucide-react";
import { AnimatedBorderButton } from "@/components/AnimatedBorderButton";
import project1 from "../../public/projects/project1.jpg";
import project2 from "../../public/projects/project2.png";
import project3 from "../../public/projects/project3.png";
import project4 from "../../public/projects/project4.jpg";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    title: "Zambeel",
    description:
      "Zambeel empowers brands, sellers, and dropshippers worldwide to build and grow profitable e-commerce businesses across the UAE, Saudi Arabia, Kuwait, and Qatar — with everything from product sourcing to last-mile delivery, all in one place.",
    image: project1,
    tags: ["React", "Tailwind CSS", "JavaScript"],
    link: "#",
    github: "https://github.com/awais4511",
  },
  {
    title: "E-Commerce Platform",
    description:
      "A complete e-commerce solution built for modern businesses. Manage your products, process payments securely, track inventory in real time, and make data-driven decisions — all from one powerful dashboard.",
    image: project2,
    tags: ["React", "JavaScript", "Tailwind"],
    link: "#",
    github: "https://github.com/awais4511",
  },
  {
    title: "Food Website",
    description:
      "A visually stunning and user-friendly food website that offers a seamless browsing experience, showcasing delicious recipes, restaurant reviews, and culinary inspiration.",
    image: project3,
    tags: ["React", "JavaScript", "Tailwind CSS"],
    link: "#",
    github: "https://github.com/awais4511",
  },
  {
    title: "Flavor Fusion",
    description:
      "Flavor Fusion brings together the best tastes from around the world, creating a unique dining experience where every dish is crafted with passion and creativity.",
    image: project4,
    tags: ["React", "Tailwind CSS", "Redux"],
    link: "#",
    github: "https://github.com/awais4511",
  },
];

export const Projects = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header animation
      gsap.fromTo(
        '.projects-header',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.15,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
          },
          ease: 'power3.out',
        }
      );

      // Project cards animation
      gsap.fromTo(
        '.project-card',
        { opacity: 0, y: 50, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.7,
          stagger: 0.2,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 60%',
          },
          ease: 'back.out',
        }
      );

      // Image hover zoom effect
      const cards = document.querySelectorAll('.project-card');
      cards.forEach((card) => {
        const img = card.querySelector('img');
        if (img) {
          card.addEventListener('mouseenter', () => {
            gsap.to(img, { scale: 1.1, duration: 0.6, overwrite: 'auto' });
          });
          card.addEventListener('mouseleave', () => {
            gsap.to(img, { scale: 1, duration: 0.6, overwrite: 'auto' });
          });
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="projects" className="py-32 relative overflow-hidden">
      {/* Bg glows */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 left-0 w-64 h-64 bg-highlight/5 rounded-full blur-3xl" />
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mx-auto max-w-3xl mb-16">
          <span className="projects-header text-secondary-foreground text-sm font-medium tracking-wider uppercase">
            Featured Work
          </span>
          <h2 className="projects-header text-4xl md:text-5xl font-bold mt-4 mb-6 text-secondary-foreground">
            Projects that
            <span className="font-serif italic font-normal text-white">
              {" "}
              make an impact.
            </span>
          </h2>
          <p className="projects-header text-muted-foreground">
            A selection of my recent work, from complex web applications to
            innovative tools that solve real-world problems.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project, idx) => (
            <div
              key={idx}
              className="project-card group glass rounded-2xl overflow-hidden md:row-span-1"
            >
              {/* Image */}
              <div className="relative overflow-hidden aspect-video">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div
                  className="absolute inset-0 
                bg-gradient-to-t from-card via-card/50
                 to-transparent opacity-60"
                />
                {/* Overlay Links */}
                <div className="absolute inset-0 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <a
                    href={project.link}
                    className="p-3 rounded-full glass hover:bg-primary hover:text-primary-foreground transition-all"
                  >
                    <ArrowUpRight className="w-5 h-5" />
                  </a>
                  <a
                    href={project.github}
                    className="p-3 rounded-full glass hover:bg-primary hover:text-primary-foreground transition-all"
                  >
                    <Github className="w-5 h-5" />
                  </a>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 space-y-4">
                <div className="flex items-start justify-between">
                  <h3 className="text-xl font-semibold group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>
                  <ArrowUpRight
                    className="w-5 h-5 
                  text-muted-foreground group-hover:text-primary
                   group-hover:translate-x-1 
                   group-hover:-translate-y-1 transition-all"
                  />
                </div>
                <p className="text-muted-foreground text-sm">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag, tagIdx) => (
                    <span
                      key={tagIdx}
                      className="px-4 py-1.5 rounded-full bg-surface text-xs font-medium border border-border/50 text-muted-foreground hover:border-primary/50 hover:text-primary transition-all duration-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All CTA */}
        <div className="text-center mt-12 animate-fade-in animation-delay-500">
          <AnimatedBorderButton>
            View All Projects
            <ArrowUpRight className="w-5 h-5" />
          </AnimatedBorderButton>
        </div>
      </div>
    </section>
  );
};
