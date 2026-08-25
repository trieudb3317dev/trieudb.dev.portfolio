import { projectApi } from "@/services/api";
import React, { useState } from "react";

export default function Projects() {
  const [projects, setProjects] = useState<any[]>([]);
  // Fetch projects from the API
  React.useEffect(() => {
    const fetchProjects = async () => {
      try {
        const data = await projectApi.list();
        setProjects(data);
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };

    fetchProjects();
  }, []);
  console.log("Projects:", projects); // Log the projects to check if they are being fetched correctly
  const [activeFilter, setActiveFilter] = useState("All");
  const [expandedId, setExpandedId] = useState<number | null>(null);

  const categories = [
    "All",
    ...Array.from(new Set(projects.map((p) => p.category))),
  ];
  const filtered =
    activeFilter === "All"
      ? projects
      : projects.filter((p) => p.category === activeFilter);

  return (
    <section id="projects" className="py-24">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-12">
          <div className="md:col-span-3">
            <p
              className="font-mono text-xs uppercase tracking-widest"
              style={{ color: "var(--muted-foreground)" }}
            >
              Selected Work
            </p>
          </div>
          <div className="md:col-span-9">
            <h2
              className="font-display leading-tight mb-8"
              style={{
                fontSize: "clamp(2rem, 4vw, 3rem)",
                color: "var(--foreground)",
              }}
            >
              Projects that
              <br />
              <em style={{ color: "var(--primary)", fontStyle: "italic" }}>
                define my craft
              </em>
            </h2>

            {/* Filter pills */}
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveFilter(cat)}
                  className="font-mono text-xs px-3 py-1.5 rounded-full transition-all duration-150"
                  style={{
                    background:
                      activeFilter === cat ? "var(--primary)" : "transparent",
                    color:
                      activeFilter === cat ? "#fff" : "var(--muted-foreground)",
                    border: "1px solid",
                    borderColor:
                      activeFilter === cat ? "var(--primary)" : "var(--border)",
                  }}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filtered.map((project) => (
            <div
              key={project.id}
              className="rounded-lg overflow-hidden transition-all duration-200 group"
              style={{
                background: "var(--card)",
                border: "1px solid var(--border)",
                cursor: "pointer",
              }}
              onClick={() =>
                setExpandedId(expandedId === project.id ? null : project.id)
              }
              onMouseEnter={(e) =>
                (e.currentTarget.style.borderColor = "rgba(124,58,237,0.3)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.borderColor = "var(--border)")
              }
            >
              {/* Thumbnail */}
              <div
                className="relative h-52 overflow-hidden"
                style={{ background: "#1a1a26" }}
              >
                <img
                  src={project.thumbnail}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  style={{ filter: "grayscale(15%) contrast(1.05)" }}
                />
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(to bottom, transparent 50%, rgba(10,10,15,0.9) 100%)",
                  }}
                />
                <div className="absolute top-3 left-3 flex gap-2">
                  <span
                    className="font-mono text-xs px-2 py-1 rounded"
                    style={{
                      background: "rgba(10,10,15,0.85)",
                      color: "var(--muted-foreground)",
                    }}
                  >
                    {project.category}
                  </span>
                  {project.featured && (
                    <span
                      className="font-mono text-xs px-2 py-1 rounded"
                      style={{
                        background: "rgba(249,115,22,0.2)",
                        color: "var(--accent)",
                        border: "1px solid rgba(249,115,22,0.3)",
                      }}
                    >
                      Featured
                    </span>
                  )}
                </div>
                <div className="absolute top-3 right-3">
                  <span
                    className="font-mono text-xs px-2 py-1 rounded-full flex items-center gap-1.5"
                    style={{
                      background:
                        project.status === "Live"
                          ? "rgba(34,197,94,0.15)"
                          : "rgba(234,179,8,0.15)",
                      color: project.status === "Live" ? "#22c55e" : "#eab308",
                      border: `1px solid ${project.status === "Live" ? "rgba(34,197,94,0.3)" : "rgba(234,179,8,0.3)"}`,
                    }}
                  >
                    <span
                      className="w-1.5 h-1.5 rounded-full"
                      style={{
                        background:
                          project.status === "Live" ? "#22c55e" : "#eab308",
                      }}
                    />
                    {project.status}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3
                  className="font-display text-xl font-semibold mb-2"
                  style={{ color: "var(--foreground)" }}
                >
                  {project.title}
                </h3>
                <p
                  className="text-sm leading-relaxed mb-4"
                  style={{ color: "var(--muted-foreground)" }}
                >
                  {project.description}
                </p>

                {/* Tech stack */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {project.technologies.slice(0, 5).map((tech: string) => (
                    <span
                      key={tech}
                      className="font-mono text-xs px-2 py-0.5 rounded"
                      style={{
                        background: "rgba(124,58,237,0.08)",
                        border: "1px solid rgba(124,58,237,0.12)",
                        color: "var(--muted-foreground)",
                      }}
                    >
                      {tech}
                    </span>
                  ))}
                  {project.technologies.length > 5 && (
                    <span
                      className="font-mono text-xs px-2 py-0.5"
                      style={{ color: "var(--muted-foreground)" }}
                    >
                      +{project.technologies.length - 5}
                    </span>
                  )}
                </div>

                {/* Expanded features */}
                {expandedId === project.id && (
                  <div
                    className="mb-4 pt-4"
                    style={{ borderTop: "1px solid var(--border)" }}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <p
                      className="font-mono text-xs uppercase tracking-wide mb-3"
                      style={{ color: "var(--muted-foreground)" }}
                    >
                      Key Features
                    </p>
                    <ul className="space-y-1.5">
                      {project.features.map((f: string) => (
                        <li
                          key={f}
                          className="flex items-start gap-2 text-sm"
                          style={{ color: "var(--foreground)" }}
                        >
                          <span
                            style={{ color: "var(--primary)", flexShrink: 0 }}
                          >
                            ›
                          </span>
                          {f}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Links */}
                <div
                  className="flex items-center justify-between pt-3"
                  style={{ borderTop: "1px solid var(--border)" }}
                >
                  <button
                    className="font-mono text-xs"
                    style={{ color: "var(--muted-foreground)" }}
                    onClick={(e) => {
                      e.stopPropagation();
                      setExpandedId(
                        expandedId === project.id ? null : project.id,
                      );
                    }}
                  >
                    {expandedId === project.id ? "↑ Less" : "↓ More details"}
                  </button>
                  <div
                    className="flex gap-4"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <a
                      href={project.github_url}
                      className="font-mono text-xs transition-colors duration-150"
                      style={{ color: "var(--muted-foreground)" }}
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.color = "var(--foreground)")
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.color =
                          "var(--muted-foreground)")
                      }
                    >
                      GitHub ↗
                    </a>
                    <a
                      href={project.demo_url}
                      className="font-mono text-xs transition-colors duration-150"
                      style={{ color: "var(--primary)" }}
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.opacity = "0.7")
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.opacity = "1")
                      }
                    >
                      Live Demo ↗
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
