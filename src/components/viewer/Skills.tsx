import { useEffect, useState } from "react";
import { skillApi } from "@/services/api";

export default function Skills() {
  const [skills, setSkills] = useState<any[]>([]);
  const [formattedSkills, setFormattedSkills] = useState<Map<
    string,
    {
      category: string;
      icon: string;
      skills: { id: number; name: string; level: number }[];
    }
  > | null>(null);

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const data = await skillApi.list();
        setSkills(data);
      } catch (error) {
        console.error("Error fetching skills:", error);
      }
    };
    fetchSkills();
  }, []);

  useEffect(() => {
    if (skills.length > 0) {
      const grouped = new Map<
        string,
        {
          category: string;
          icon: string;
          skills: { id: number; name: string; level: number }[];
        }
      >();

      skills.forEach((skill) => {
        if (!grouped.has(skill.category)) {
          grouped.set(skill.category, {
            category: skill.category,
            icon: skill.icon,
            skills: [],
          });
        }
        grouped.get(skill.category)?.skills.push({
          id: skill.id,
          name: skill.name,
          level: skill.level,
        });
      });

      setFormattedSkills(grouped);
    }
  }, [skills]);

  return (
    <section
      id="skills"
      className="py-24"
      style={{ background: "var(--secondary)" }}
    >
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-16">
          <div className="md:col-span-3">
            <p
              className="font-mono text-xs uppercase tracking-widest"
              style={{ color: "var(--muted-foreground)" }}
            >
              Technical Skills
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
              Tools I use to
              <br />
              <em style={{ color: "var(--primary)", fontStyle: "italic" }}>
                ship and scale
              </em>
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {Array.from(formattedSkills?.values() || []).map((cat) => (
            <div
              key={cat.category}
              className="rounded-lg p-6"
              style={{
                background: "var(--card)",
                border: "1px solid var(--border)",
              }}
            >
              <div className="flex items-center gap-3 mb-6">
                <span
                  className="text-xl"
                  style={{
                    color: "var(--primary)",
                    fontFamily: "var(--font-mono)",
                  }}
                >
                  {cat.icon}
                </span>
                <h3
                  className="font-mono text-sm font-medium uppercase tracking-wide"
                  style={{ color: "var(--foreground)" }}
                >
                  {cat.category}
                </h3>
              </div>

              <div className="space-y-4">
                {cat.skills.map((skill: any) => (
                  <div key={skill.id} className="space-y-1">
                    <div className="flex justify-between items-center mb-1.5">
                      <span
                        className="text-sm"
                        style={{ color: "var(--foreground)" }}
                      >
                        {skill.name}
                      </span>
                      <span
                        className="font-mono text-xs"
                        style={{ color: "var(--muted-foreground)" }}
                      >
                        {skill.level}%
                      </span>
                    </div>
                    <div
                      className="h-px w-full"
                      style={{ background: "rgba(255,255,255,0.05)" }}
                    >
                      <div
                        className="h-px transition-all duration-700"
                        style={{
                          width: `${skill.level}%`,
                          background: `linear-gradient(90deg, var(--primary), var(--accent))`,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
