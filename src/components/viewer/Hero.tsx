import { authApi } from "@/services/api";
import React from "react";

export default function Hero() {
  const [profile, setProfile] = React.useState<any>(null);
  React.useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await authApi.meByEmail("dangbinhtrieu123@gmail.com");
        setProfile(data);
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };

    fetchProfile();
  }, []);

  if (!profile) {
    return <div>Loading...</div>;
  }

  const user = profile;

  return (
    <section
      id="about"
      className="relative min-h-screen flex flex-col justify-center overflow-hidden"
      style={{ paddingTop: "80px" }}
    >
      {/* Grid background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Glow */}
      <div
        className="absolute pointer-events-none"
        style={{
          top: "20%",
          left: "-10%",
          width: "600px",
          height: "600px",
          background:
            "radial-gradient(ellipse, rgba(124,58,237,0.12) 0%, transparent 70%)",
          filter: "blur(40px)",
        }}
      />

      <div className="relative max-w-6xl mx-auto px-6 py-24">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
          {/* Text side */}
          <div className="md:col-span-7">
            <div
              className="inline-flex items-center gap-2 text-xs font-mono px-3 py-1.5 rounded-full mb-8"
              style={{
                background: "rgba(124,58,237,0.12)",
                border: "1px solid rgba(124,58,237,0.25)",
                color: "var(--primary)",
              }}
            >
              <span
                className="w-1.5 h-1.5 rounded-full animate-pulse"
                style={{ background: "var(--accent)" }}
              />
              Available for opportunities
            </div>

            <h1
              className="font-display leading-none mb-6"
              style={{
                fontSize: "clamp(3rem, 7vw, 5.5rem)",
                color: "var(--foreground)",
              }}
            >
              {user?.name.split(" ").map((word: string, i: number) => (
                <span key={i} className="block">
                  {i === 1 ? (
                    <em
                      style={{ color: "var(--primary)", fontStyle: "italic" }}
                    >
                      {word}
                    </em>
                  ) : (
                    word
                  )}
                </span>
              ))}
            </h1>

            <p
              className="font-mono text-sm mb-2"
              style={{ color: "var(--accent)" }}
            >
              {user?.title} · {user?.location}
            </p>

            <p
              className="text-lg mb-10 max-w-lg"
              style={{ color: "var(--muted-foreground)", lineHeight: 1.75 }}
            >
              {user?.tagline}
            </p>

            <div className="flex flex-wrap gap-4">
              <a
                href="#projects"
                onClick={(e) => {
                  e.preventDefault();
                  document
                    .getElementById("projects")
                    ?.scrollIntoView({ behavior: "smooth" });
                }}
                className="inline-flex items-center gap-2 px-6 py-3 rounded font-medium text-sm transition-all duration-150"
                style={{ background: "var(--primary)", color: "#fff" }}
                onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.85")}
                onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
              >
                View Projects
                <span>→</span>
              </a>
              <a
                href={user?.resume_url}
                className="inline-flex items-center gap-2 px-6 py-3 rounded font-medium text-sm transition-all duration-150"
                style={{
                  border: "1px solid var(--border)",
                  color: "var(--foreground)",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.borderColor = "rgba(124,58,237,0.5)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.borderColor = "var(--border)")
                }
              >
                Download CV
                <span style={{ fontSize: "12px" }}>↓</span>
              </a>
            </div>

            <div className="flex items-center gap-6 mt-12">
              <a
                href={user?.github}
                className="font-mono text-xs transition-colors duration-150"
                style={{ color: "var(--muted-foreground)" }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.color = "var(--foreground)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.color = "var(--muted-foreground)")
                }
              >
                GitHub
              </a>
              <span style={{ color: "var(--border)" }}>·</span>
              <a
                href={user?.linkedin}
                className="font-mono text-xs transition-colors duration-150"
                style={{ color: "var(--muted-foreground)" }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.color = "var(--foreground)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.color = "var(--muted-foreground)")
                }
              >
                LinkedIn
              </a>
              <span style={{ color: "var(--border)" }}>·</span>
              <a
                href={`mailto:${user?.email}`}
                className="font-mono text-xs transition-colors duration-150"
                style={{ color: "var(--muted-foreground)" }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.color = "var(--foreground)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.color = "var(--muted-foreground)")
                }
              >
                {user?.email}
              </a>
            </div>
          </div>

          {/* Photo side */}
          <div className="md:col-span-5 flex justify-center md:justify-end">
            <div className="relative">
              {/* Decorative frame */}
              <div
                className="absolute -inset-3 rounded"
                style={{ border: "1px solid rgba(124,58,237,0.2)" }}
              />
              <div
                className="absolute -inset-6 rounded"
                style={{ border: "1px solid rgba(124,58,237,0.08)" }}
              />
              <img
                src={user?.avatar}
                alt={user?.name}
                className="relative rounded w-64 h-64 object-cover"
                style={{ filter: "grayscale(20%) contrast(1.05)" }}
              />
              {/* Accent corner */}
              <div
                className="absolute -bottom-2 -right-2 w-8 h-8"
                style={{
                  background: "var(--accent)",
                  clipPath: "polygon(100% 0, 0% 100%, 100% 100%)",
                }}
              />
            </div>
          </div>
        </div>

        {/* Bio subsection */}
        <div
          className="mt-24 pt-12"
          style={{ borderTop: "1px solid var(--border)" }}
        >
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            <div className="md:col-span-3">
              <p
                className="font-mono text-xs uppercase tracking-widest"
                style={{ color: "var(--muted-foreground)" }}
              >
                About Me
              </p>
            </div>
            <div className="md:col-span-9">
              <p
                className="text-lg leading-relaxed mb-6"
                style={{ color: "var(--foreground)" }}
              >
                {user?.bio}
              </p>
              <p
                className="text-base leading-relaxed"
                style={{ color: "var(--muted-foreground)" }}
              >
                {user?.objective}
              </p>

              <div className="flex flex-wrap gap-6 mt-8">
                {[
                  { label: "Years of Experience", value: "2+" },
                  { label: "Projects Shipped", value: "6+" },
                  { label: "Open Source Stars", value: "10+" },
                  { label: "Clients Served", value: "5+" },
                ].map((stat) => (
                  <div key={stat.label}>
                    <p
                      className="font-display text-3xl font-semibold"
                      style={{ color: "var(--foreground)" }}
                    >
                      {stat.value}
                    </p>
                    <p
                      className="text-xs font-mono mt-1"
                      style={{ color: "var(--muted-foreground)" }}
                    >
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
