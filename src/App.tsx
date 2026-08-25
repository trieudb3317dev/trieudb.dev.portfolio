import { useState } from "react";
import Nav from "./components/viewer/Nav";
import Hero from "./components/viewer/Hero";
import Experience from "./components/viewer/Experience";
import Skills from "./components/viewer/Skills";
import Projects from "./components/viewer/Projects";
import Contact from "./components/viewer/Contact";
import AdminDashboard from "./components/admin/AdminDashboard";
import { education, certifications } from "./data/portfolio";
import { useAuth } from "./context/AuthContext";
import { Spokes } from "./components/loading-ui/spokes";

function ViewerFooter() {
  return (
    <footer className="py-12" style={{ borderTop: "1px solid var(--border)" }}>
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-12">
          {/* Education */}
          <div className="md:col-span-4">
            <p
              className="font-mono text-xs uppercase tracking-widest mb-4"
              style={{ color: "var(--muted-foreground)" }}
            >
              Education
            </p>
            {education.map((edu) => (
              <div key={edu.institution}>
                <p
                  className="font-medium text-sm"
                  style={{ color: "var(--foreground)" }}
                >
                  {edu.institution}
                </p>
                <p
                  className="text-sm mt-0.5"
                  style={{ color: "var(--muted-foreground)" }}
                >
                  {edu.degree}
                </p>
                <p
                  className="font-mono text-xs mt-1"
                  style={{ color: "var(--muted-foreground)" }}
                >
                  {edu.period} · GPA {edu.gpa}
                </p>
              </div>
            ))}
          </div>

          {/* Certifications */}
          <div className="md:col-span-4">
            <p
              className="font-mono text-xs uppercase tracking-widest mb-4"
              style={{ color: "var(--muted-foreground)" }}
            >
              Certifications
            </p>
            <div className="space-y-3">
              {certifications.map((cert) => (
                <div key={cert.name}>
                  <p
                    className="text-sm font-medium"
                    style={{ color: "var(--foreground)" }}
                  >
                    {cert.name}
                  </p>
                  <p
                    className="font-mono text-xs mt-0.5"
                    style={{ color: "var(--muted-foreground)" }}
                  >
                    {cert.issuer} · {cert.year}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Built with */}
          <div className="md:col-span-4">
            <p
              className="font-mono text-xs uppercase tracking-widest mb-4"
              style={{ color: "var(--muted-foreground)" }}
            >
              Built With
            </p>
            <div className="flex flex-wrap gap-1.5">
              {[
                "Next.js",
                "NestJS",
                "TypeScript",
                "PostgreSQL",
                "MongoDB",
                "TypeORM",
                "JWT",
                "Socket.IO",
                "Tailwind CSS",
                "Vercel",
                "Neon DB",
              ].map((tech) => (
                <span
                  key={tech}
                  className="font-mono text-xs px-2 py-0.5 rounded"
                  style={{
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid var(--border)",
                    color: "var(--muted-foreground)",
                  }}
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div
          className="flex flex-wrap items-center justify-between gap-4 pt-8"
          style={{ borderTop: "1px solid var(--border)" }}
        >
          <p
            className="font-mono text-xs"
            style={{ color: "var(--muted-foreground)" }}
          >
            © {new Date().getFullYear()} Dang Binh Trieu · Built with care in
            Danang City
          </p>
          <p
            className="font-mono text-xs"
            style={{ color: "var(--muted-foreground)" }}
          >
            DevFolio CMS · Open source
          </p>
        </div>
      </div>
    </footer>
  );
}

export default function App() {
  const [mode, setMode] = useState<"viewer" | "admin">("viewer");
  const { loading } = useAuth();

  if (loading) {
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={{ background: "var(--background)", color: "var(--foreground)" }}
      >
        <Spokes className="size-16" />
      </div>
    );
  }

  if (mode === "admin") {
    return <AdminDashboard onExit={() => setMode("viewer")} />;
  }

  return (
    <div style={{ background: "var(--background)", minHeight: "100vh" }}>
      <Nav onAdminClick={() => setMode("admin")} />
      <Hero />
      <Experience />
      <Skills />
      <Projects />
      <Contact />
      <ViewerFooter />
    </div>
  );
}
