import { experienceApi } from "@/services/api";
import React, { useState } from "react";

export default function Experience() {
  const [experiences, setExperiences] = useState<any>([]);

  React.useEffect(() => {
    // Fetch experiences from the API
    const fetchExperiences = async () => {
      try {
        const data = await experienceApi.list();
        setExperiences(data);
      } catch (error) {
        console.error("Error fetching experiences:", error);
      }
    };

    fetchExperiences();
  }, []);

  console.log("Experiences:", experiences); // Log the experiences to check if they are being fetched correctly

  return (
    <section id="experience" className="py-24">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-16">
          <div className="md:col-span-3">
            <p
              className="font-mono text-xs uppercase tracking-widest"
              style={{ color: "var(--muted-foreground)" }}
            >
              Work Experience
            </p>
          </div>
          <div className="md:col-span-9">
            <h2
              className="font-display leading-tight"
              style={{
                fontSize: "clamp(2rem, 4vw, 3rem)",
                color: "var(--foreground)",
              }}
            >
              Where I&apos;ve built
              <br />
              <em style={{ color: "var(--primary)", fontStyle: "italic" }}>
                things that matter
              </em>
            </h2>
          </div>
        </div>

        <div className="space-y-0">
          {experiences.map((exp: any, i: number) => (
            <div
              key={exp.id}
              className="grid grid-cols-1 md:grid-cols-12 gap-8 py-12 group"
              style={{ borderTop: "1px solid var(--border)" }}
            >
              {/* Left column */}
              <div className="md:col-span-3">
                <p
                  className="font-mono text-xs"
                  style={{ color: "var(--muted-foreground)" }}
                >
                  {String(i + 1).padStart(2, "0")}
                </p>
                <p
                  className="font-mono text-xs mt-3"
                  style={{ color: "var(--muted-foreground)" }}
                >
                  {exp.period}
                </p>
                <p
                  className="font-mono text-xs mt-1"
                  style={{ color: "var(--muted-foreground)" }}
                >
                  {exp.location}
                </p>
              </div>

              {/* Right column */}
              <div className="md:col-span-9">
                <div className="flex flex-wrap items-start justify-between gap-4 mb-3">
                  <div>
                    <h3
                      className="font-display text-2xl font-semibold"
                      style={{ color: "var(--foreground)" }}
                    >
                      {exp.position}
                    </h3>
                    <p
                      className="font-mono text-sm mt-1"
                      style={{ color: "var(--accent)" }}
                    >
                      {exp.company}
                    </p>
                  </div>
                </div>

                <p
                  className="text-base mb-6"
                  style={{ color: "var(--muted-foreground)" }}
                >
                  {exp.description}
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <p
                      className="font-mono text-xs uppercase tracking-wide mb-3"
                      style={{ color: "var(--muted-foreground)" }}
                    >
                      Responsibilities
                    </p>
                    <ul className="space-y-2">
                      {exp.responsibilities.map((r: string) => (
                        <li
                          key={r}
                          className="flex items-start gap-2 text-sm"
                          style={{ color: "var(--foreground)" }}
                        >
                          <span
                            style={{
                              color: "var(--primary)",
                              marginTop: "4px",
                              flexShrink: 0,
                            }}
                          >
                            ›
                          </span>
                          {r}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p
                      className="font-mono text-xs uppercase tracking-wide mb-3"
                      style={{ color: "var(--muted-foreground)" }}
                    >
                      Achievements
                    </p>
                    <ul className="space-y-2">
                      {exp.achievements.map((a: string) => (
                        <li
                          key={a}
                          className="flex items-start gap-2 text-sm"
                          style={{ color: "var(--foreground)" }}
                        >
                          <span
                            style={{
                              color: "var(--accent)",
                              marginTop: "4px",
                              flexShrink: 0,
                            }}
                          >
                            ★
                          </span>
                          {a}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  {exp.technologies.map((tech: string) => (
                    <span
                      key={tech}
                      className="font-mono text-xs px-2 py-1 rounded"
                      style={{
                        background: "rgba(124,58,237,0.08)",
                        border: "1px solid rgba(124,58,237,0.15)",
                        color: "var(--muted-foreground)",
                      }}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
