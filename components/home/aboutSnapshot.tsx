import { useEffect, useRef, useState } from "react";

export function AboutSnapshot() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 },
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const skills = [
    "React",
    "React Native",
    "TypeScript",
    "Next.js",
    "HTML",
    "CSS",
    "Tailwind",
    "UX Design",
    "Web Development",
    "Mobile Development",
    "Product Management",
  ];

  return (
    <section
      ref={sectionRef}
      className="py-24 md:py-32 bg-[hsl(var(--surface))]"
    >
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
          {/* Left - Pull Quote */}
          <div className={`${isVisible ? "fade-in-up" : "opacity-0"}`}>
            <blockquote className="text-2xl md:text-3xl lg:text-4xl font-display leading-snug text-[hsl(var(--foreground))]">
              &ldquo;Great products need{" "}
              <span className="text-[hsl(var(--accent))]">
                speed, polish, and soul
              </span>
              . I refuse to pick only two.&rdquo;
            </blockquote>
            <div className="mt-6 h-1 w-16 bg-[hsl(var(--accent))]" />
          </div>

          {/* Right - Description */}
          <div
            className={`${isVisible ? "fade-in-up stagger-2" : "opacity-0"}`}
          >
            <p className="text-[hsl(var(--text-secondary))] text-base md:text-lg leading-relaxed mb-6">
              I'm a senior front-end engineer with a sharp eye for design and
              product. I believe great products are technically solid and
              visually refined. My passion for art is a big part of why.
            </p>
            <p className="text-[hsl(var(--text-secondary))] text-base md:text-lg leading-relaxed">
              Originally from Brazil, grew up gaming, drawing, and staying
              active. Outside of engineering, you&apos;ll find me on the soccer
              field, running, at the local jazz bar, or traveling and exploring
              new places.
            </p>
          </div>
        </div>

        {/* Tech Marquee */}
        <div
          className={`mt-16 md:mt-24 overflow-hidden ${isVisible ? "fade-in-up stagger-3" : "opacity-0"}`}
        >
          <div className="flex animate-marquee whitespace-nowrap">
            {[...skills, ...skills].map((skill, i) => (
              <span
                key={i}
                className="mx-4 md:mx-6 text-sm md:text-base font-mono text-[hsl(var(--text-muted))] uppercase tracking-wider"
              >
                {skill}
                <span className="ml-4 md:ml-6 text-[hsl(var(--accent))]">
                  •
                </span>
              </span>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-marquee {
          animation: marquee 30s linear infinite;
        }
      `}</style>
    </section>
  );
}

export default AboutSnapshot;
