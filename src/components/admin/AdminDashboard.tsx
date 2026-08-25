import { useEffect, useState } from "react";
import { profile, skillCategories } from "../../data/portfolio";
import { useAuth } from "../../context/AuthContext";
import {
  contactApi,
  experienceApi,
  projectApi,
  skillApi,
} from "../../services/api";
import type { Contact, Experience, Project, Skill } from "../../types/api";
import Modal, { Field, Input, Textarea, Select, ModalActions } from "./Modal";
import { features } from "process";

type AdminSection =
  | "overview"
  | "profile"
  | "projects"
  | "experience"
  | "skills"
  | "messages";

const navItems: { id: AdminSection; label: string; icon: string }[] = [
  { id: "overview", label: "Overview", icon: "⬡" },
  { id: "profile", label: "Profile", icon: "◎" },
  { id: "projects", label: "Projects", icon: "◈" },
  { id: "experience", label: "Experience", icon: "▣" },
  { id: "skills", label: "Skills", icon: "◆" },
  { id: "messages", label: "Messages", icon: "◻" },
];

const mockMessages = [
  {
    id: 1,
    name: "Sarah Chen",
    email: "sarah@techcorp.io",
    message:
      "Hi! We have a senior engineer opening that seems like a great match for your background.",
    status: "unread",
    date: "2024-01-18",
  },
  {
    id: 2,
    name: "David Park",
    email: "david@startupxyz.com",
    message:
      "Love your StreamPulse project. Would you be open to a consulting conversation?",
    status: "read",
    date: "2024-01-17",
  },
  {
    id: 3,
    name: "Linh Tran",
    email: "linh@vntech.vn",
    message: "Chào anh, em muốn hỏi về cơ hội hợp tác dự án freelance.",
    status: "unread",
    date: "2024-01-16",
  },
  {
    id: 4,
    name: "Marcus Wong",
    email: "marcus@vc.fund",
    message:
      "Interested in backing your AuthKit as a SaaS — do you have 15 min to chat?",
    status: "read",
    date: "2024-01-14",
  },
];

export default function AdminDashboard({ onExit }: { onExit: () => void }) {
  const { user, login, logout } = useAuth();
  const [section, setSection] = useState<AdminSection>("overview");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [messages, setMessages] = useState(mockMessages);
  const [projects, setProjects] = useState<Project[]>([]);
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loadingData, setLoadingData] = useState(true);
  const [authError, setAuthError] = useState("");
  const [authForm, setAuthForm] = useState({
    email: "admin@portfolio.dev",
    password: "password123",
  });

  useEffect(() => {
    const loadDashboard = async () => {
      if (!user) return;

      try {
        setLoadingData(true);
        const [projectData, experienceData, skillData, messageData] =
          await Promise.all([
            projectApi.list().catch(() => []),
            experienceApi.list().catch(() => []),
            skillApi.list().catch(() => []),
            contactApi.list().catch(() => []),
          ]);

        setProjects(projectData);
        setExperiences(experienceData);
        setSkills(skillData);
        setMessages(
          messageData.length
            ? messageData.map((m) => ({
                id: Number(m.id),
                name: m.name,
                email: m.email,
                message: m.message,
                status: m.status === "read" ? "read" : "unread",
                date: new Date(m.created_at || Date.now())
                  .toISOString()
                  .slice(0, 10),
              }))
            : mockMessages,
        );
      } catch {
        setMessages(mockMessages);
      } finally {
        setLoadingData(false);
      }
    };

    void loadDashboard();
  }, [user]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setAuthError("");
      await login(authForm);
      setSection("overview");
    } catch (error) {
      setAuthError(
        error instanceof Error ? error.message : "Authentication failed",
      );
    }
  };

  if (!user) {
    return (
      <div
        className="min-h-screen flex items-center justify-center px-6"
        style={{ background: "var(--background)" }}
      >
        <div
          className="w-full max-w-md rounded-xl p-8"
          style={{
            background: "var(--card)",
            border: "1px solid var(--border)",
          }}
        >
          <div className="mb-6">
            <p
              className="font-mono text-xs uppercase tracking-wide"
              style={{ color: "var(--muted-foreground)" }}
            >
              Admin Access
            </p>
            <h1
              className="font-display text-3xl mt-2"
              style={{ color: "var(--foreground)" }}
            >
              Portfolio CMS
            </h1>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label
                className="block font-mono text-xs uppercase tracking-wide mb-2"
                style={{ color: "var(--muted-foreground)" }}
              >
                Email
              </label>
              <Input
                type="email"
                value={authForm.email}
                onChange={(e) =>
                  setAuthForm((prev) => ({ ...prev, email: e.target.value }))
                }
                placeholder="admin@portfolio.dev"
              />
            </div>
            <div>
              <label
                className="block font-mono text-xs uppercase tracking-wide mb-2"
                style={{ color: "var(--muted-foreground)" }}
              >
                Password
              </label>
              <Input
                type="password"
                value={authForm.password}
                onChange={(e) =>
                  setAuthForm((prev) => ({ ...prev, password: e.target.value }))
                }
                placeholder="password123"
              />
            </div>

            {authError && (
              <p className="font-mono text-xs" style={{ color: "#f87171" }}>
                {authError}
              </p>
            )}

            <button
              type="submit"
              className="w-full px-5 py-3 rounded text-sm font-medium"
              style={{ background: "var(--primary)", color: "#fff" }}
            >
              Sign in to dashboard
            </button>
          </form>

          <div
            className="mt-5 text-xs font-mono"
            style={{ color: "var(--muted-foreground)" }}
          >
            Demo credentials: admin@portfolio.dev / password123
          </div>
        </div>
      </div>
    );
  }

  const stats = [
    {
      label: "Total Projects",
      value: projects.length,
      change: "+1 this month",
      color: "var(--primary)",
    },
    {
      label: "Skill Categories",
      value: Array.from(new Set(skills.map((s) => s.category))).length || 1,
      change: "Stable",
      color: "var(--accent)",
    },
    {
      label: "Work Experiences",
      value: experiences.length,
      change: "+1 this year",
      color: "#22c55e",
    },
    {
      label: "New Messages",
      value: messages.filter((m) => m.status === "unread").length,
      change: "2 unread",
      color: "#eab308",
    },
  ];

  return (
    <div
      className="min-h-screen flex"
      style={{ background: "var(--background)" }}
    >
      {/* Sidebar */}
      <aside
        className="fixed inset-y-0 left-0 z-40 flex flex-col transition-transform duration-300"
        style={{
          width: "240px",
          background: "var(--card)",
          borderRight: "1px solid var(--border)",
          transform: sidebarOpen ? "translateX(0)" : undefined,
        }}
      >
        {/* Logo */}
        <div
          className="flex items-center justify-between px-6 py-5"
          style={{ borderBottom: "1px solid var(--border)" }}
        >
          <span
            className="font-display text-lg font-semibold"
            style={{ color: "var(--foreground)" }}
          >
            Admin<span style={{ color: "var(--primary)" }}>.</span>
          </span>
          <span
            className="font-mono text-xs px-2 py-0.5 rounded"
            style={{
              background: "rgba(124,58,237,0.12)",
              color: "var(--primary)",
            }}
          >
            v1
          </span>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-4 space-y-1">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setSection(item.id)}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded text-sm transition-all duration-150"
              style={{
                background:
                  section === item.id ? "rgba(124,58,237,0.12)" : "transparent",
                color:
                  section === item.id
                    ? "var(--foreground)"
                    : "var(--muted-foreground)",
                borderLeft:
                  section === item.id
                    ? "2px solid var(--primary)"
                    : "2px solid transparent",
              }}
            >
              <span className="font-mono text-base">{item.icon}</span>
              {item.label}
              {item.id === "messages" &&
                messages.filter((m) => m.status === "unread").length > 0 && (
                  <span
                    className="ml-auto text-xs font-mono px-1.5 py-0.5 rounded-full"
                    style={{ background: "var(--accent)", color: "#000" }}
                  >
                    {messages.filter((m) => m.status === "unread").length}
                  </span>
                )}
            </button>
          ))}
        </nav>

        {/* Exit */}
        <div
          className="px-3 pb-4"
          style={{ borderTop: "1px solid var(--border)", paddingTop: "12px" }}
        >
          <button
            onClick={onExit}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded text-sm transition-all duration-150"
            style={{ color: "var(--muted-foreground)" }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.color = "var(--foreground)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.color = "var(--muted-foreground)")
            }
          >
            <span>←</span>
            Back to Portfolio
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main
        className="flex-1 flex flex-col min-h-screen"
        style={{ marginLeft: "240px" }}
      >
        {/* Top bar */}
        <header
          className="sticky top-0 z-30 flex items-center justify-between px-8 py-4"
          style={{
            background: "rgba(10,10,15,0.92)",
            backdropFilter: "blur(16px)",
            borderBottom: "1px solid var(--border)",
          }}
        >
          <div>
            <h1
              className="font-display text-lg font-semibold capitalize"
              style={{ color: "var(--foreground)" }}
            >
              {section}
            </h1>
            <p
              className="font-mono text-xs"
              style={{ color: "var(--muted-foreground)" }}
            >
              Portfolio CMS ·{" "}
              {new Date().toLocaleDateString("en-US", { dateStyle: "medium" })}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <span
              className="font-mono text-xs"
              style={{ color: "var(--muted-foreground)" }}
            >
              {user?.name || "Admin"}
            </span>
            <button
              onClick={() => void logout()}
              className="font-mono text-xs px-3 py-1.5 rounded"
              style={{
                border: "1px solid var(--border)",
                color: "var(--muted-foreground)",
              }}
            >
              Logout
            </button>
          </div>
        </header>

        {/* Section content */}
        <div className="flex-1 p-8">
          {loadingData ? (
            <div
              className="font-mono text-sm"
              style={{ color: "var(--muted-foreground)" }}
            >
              Loading dashboard…
            </div>
          ) : (
            <>
              {section === "overview" && (
                <OverviewSection
                  stats={stats}
                  projects={projects}
                  experiences={experiences}
                  skills={skills}
                />
              )}
              {section === "profile" && <ProfileSection />}
              {section === "projects" && (
                <ProjectsSection
                  projects={projects}
                  setProjects={setProjects}
                />
              )}
              {section === "experience" && (
                <ExperienceSection
                  experiences={experiences}
                  setExperiences={setExperiences}
                />
              )}
              {section === "skills" && (
                <SkillsSection skills={skills} setSkills={setSkills} />
              )}
              {section === "messages" && (
                <MessagesSection
                  messages={messages}
                  setMessages={setMessages}
                />
              )}
            </>
          )}
        </div>
      </main>
    </div>
  );
}

function OverviewSection({
  stats,
  projects,
  experiences,
  skills,
}: {
  stats: { label: string; value: number; change: string; color: string }[];
  projects: Project[];
  experiences: Experience[];
  skills: Skill[];
}) {
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="rounded-lg p-5"
            style={{
              background: "var(--card)",
              border: "1px solid var(--border)",
            }}
          >
            <p
              className="font-mono text-xs uppercase tracking-wide mb-2"
              style={{ color: "var(--muted-foreground)" }}
            >
              {stat.label}
            </p>
            <p
              className="font-display text-4xl font-semibold"
              style={{ color: stat.color }}
            >
              {stat.value}
            </p>
            <p
              className="font-mono text-xs mt-2"
              style={{ color: "var(--muted-foreground)" }}
            >
              {stat.change}
            </p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent projects */}
        <div
          className="rounded-lg p-6"
          style={{
            background: "var(--card)",
            border: "1px solid var(--border)",
          }}
        >
          <p
            className="font-mono text-xs uppercase tracking-wide mb-4"
            style={{ color: "var(--muted-foreground)" }}
          >
            Recent Projects
          </p>
          <div className="space-y-3">
            {projects.slice(0, 3).map((p) => (
              <div key={p.id} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div
                    className="w-8 h-8 rounded flex items-center justify-center font-mono text-xs"
                    style={{
                      background: "rgba(124,58,237,0.12)",
                      color: "var(--primary)",
                    }}
                  >
                    {p.title[0]}
                  </div>
                  <div>
                    <p
                      className="text-sm font-medium"
                      style={{ color: "var(--foreground)" }}
                    >
                      {p.title}
                    </p>
                    <p
                      className="font-mono text-xs"
                      style={{ color: "var(--muted-foreground)" }}
                    >
                      {p.category}
                    </p>
                  </div>
                </div>
                <span
                  className="font-mono text-xs px-2 py-0.5 rounded-full"
                  style={{
                    background:
                      p.status === "live" || p.status === "Live"
                        ? "rgba(34,197,94,0.12)"
                        : "rgba(234,179,8,0.12)",
                    color:
                      p.status === "live" || p.status === "Live"
                        ? "#22c55e"
                        : "#eab308",
                  }}
                >
                  {String(p.status).charAt(0).toUpperCase() +
                    String(p.status).slice(1)}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* API routes preview */}
        <div
          className="rounded-lg p-6"
          style={{
            background: "var(--card)",
            border: "1px solid var(--border)",
          }}
        >
          <p
            className="font-mono text-xs uppercase tracking-wide mb-4"
            style={{ color: "var(--muted-foreground)" }}
          >
            API Routes
          </p>
          <div className="space-y-2">
            {[
              { method: "GET", path: "/api/v1/projects", status: 200 },
              { method: "POST", path: "/api/v1/projects", status: 201 },
              { method: "GET", path: "/api/v1/experiences", status: 200 },
              { method: "GET", path: "/api/v1/skills", status: 200 },
              { method: "POST", path: "/api/v1/contacts", status: 201 },
            ].map((route) => (
              <div
                key={route.path + route.method}
                className="flex items-center gap-3 font-mono text-xs"
              >
                <span
                  className="px-1.5 py-0.5 rounded text-xs"
                  style={{
                    background:
                      route.method === "GET"
                        ? "rgba(34,197,94,0.12)"
                        : "rgba(124,58,237,0.12)",
                    color:
                      route.method === "GET" ? "#22c55e" : "var(--primary)",
                    minWidth: "40px",
                    textAlign: "center",
                  }}
                >
                  {route.method}
                </span>
                <span style={{ color: "var(--muted-foreground)" }}>
                  {route.path}
                </span>
                <span className="ml-auto" style={{ color: "#22c55e" }}>
                  {route.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function ProfileSection() {
  const [form, setForm] = useState({ ...profile });
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div
      className="rounded-lg p-8 max-w-2xl"
      style={{ background: "var(--card)", border: "1px solid var(--border)" }}
    >
      <h2
        className="font-display text-xl mb-6"
        style={{ color: "var(--foreground)" }}
      >
        Profile Settings
      </h2>
      <div className="space-y-5">
        {[
          { key: "name", label: "Full Name", type: "text" },
          { key: "title", label: "Job Title", type: "text" },
          { key: "tagline", label: "Tagline", type: "text" },
          { key: "location", label: "Location", type: "text" },
          { key: "email", label: "Email", type: "email" },
          { key: "github", label: "GitHub URL", type: "url" },
          { key: "linkedin", label: "LinkedIn URL", type: "url" },
        ].map((field) => (
          <div key={field.key}>
            <label
              className="block font-mono text-xs uppercase tracking-wide mb-2"
              style={{ color: "var(--muted-foreground)" }}
            >
              {field.label}
            </label>
            <input
              type={field.type}
              value={form[field.key as keyof typeof form]}
              onChange={(e) =>
                setForm({ ...form, [field.key]: e.target.value })
              }
              className="w-full rounded px-4 py-2.5 text-sm outline-none transition-all duration-150"
              style={{
                background: "var(--background)",
                border: "1px solid var(--border)",
                color: "var(--foreground)",
              }}
              onFocus={(e) =>
                (e.currentTarget.style.borderColor = "rgba(124,58,237,0.5)")
              }
              onBlur={(e) =>
                (e.currentTarget.style.borderColor = "var(--border)")
              }
            />
          </div>
        ))}
        <div>
          <label
            className="block font-mono text-xs uppercase tracking-wide mb-2"
            style={{ color: "var(--muted-foreground)" }}
          >
            Biography
          </label>
          <textarea
            rows={4}
            value={form.bio}
            onChange={(e) => setForm({ ...form, bio: e.target.value })}
            className="w-full rounded px-4 py-2.5 text-sm outline-none resize-none transition-all duration-150"
            style={{
              background: "var(--background)",
              border: "1px solid var(--border)",
              color: "var(--foreground)",
            }}
            onFocus={(e) =>
              (e.currentTarget.style.borderColor = "rgba(124,58,237,0.5)")
            }
            onBlur={(e) =>
              (e.currentTarget.style.borderColor = "var(--border)")
            }
          />
        </div>
        <button
          onClick={handleSave}
          className="px-6 py-2.5 rounded text-sm font-medium transition-all duration-150"
          style={{
            background: saved ? "#22c55e" : "var(--primary)",
            color: "#fff",
          }}
        >
          {saved ? "✓ Saved" : "Save Changes"}
        </button>
      </div>
    </div>
  );
}

const emptyProject = {
  title: "",
  category: "Full-Stack",
  status: "Beta",
  featured: false,
  description: "",
  technologies: "",
  thumbnail: "",
  features: "",
  github: "",
  demo: "",
  tags: "",
};

function NewProjectModal({
  onClose,
  onSave,
  isEditing,
  initialData,
}: {
  onClose: () => void;
  onSave: (p: typeof emptyProject) => void;
  isEditing?: boolean;
  initialData?: any; // Partial<typeof emptyProject> | undefined
}) {
  const [form, setForm] = useState({
    ...emptyProject,
    ...(isEditing && {
      title: initialData?.title || "",
      category: initialData?.category || "Full-Stack",
      status: initialData?.status || "Beta",
      featured: initialData?.featured ?? false,
      description: initialData?.description || "",
      technologies: initialData?.technologies?.join(", ") || "",
      thumbnail: initialData?.thumbnail || "",
      features: initialData?.features?.join("; ") || "",
      github: initialData?.github_url || "",
      demo: initialData?.demo_url || "",
      tags: initialData?.tags?.join(", ") || "",
    }),
  });
  const [saving, setSaving] = useState(false);

  const set = (k: keyof typeof emptyProject, v: string | boolean) =>
    setForm((prev: any) => ({ ...prev, [k]: v }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      onSave(form);
      onClose();
    }, 900);
  };

  return (
    <Modal title="New Project" onClose={onClose} width="640px">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <Field label="Project Title">
            <Input
              required
              placeholder="e.g. StreamPulse"
              value={form.title}
              onChange={(e) => set("title", e.target.value)}
            />
          </Field>
          <Field label="Category">
            <Select
              value={form.category}
              onChange={(e) => set("category", e.target.value)}
            >
              {[
                "Full-Stack",
                "Frontend",
                "Backend",
                "Data Engineering",
                "Developer Tools",
                "Open Source",
              ].map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </Select>
          </Field>
        </div>

        <Field label="Thumbnail URL">
          <Input
            type="url"
            placeholder="https://..."
            value={form.thumbnail}
            onChange={(e) => set("thumbnail", e.target.value)}
          />
        </Field>

        <Field label="Description">
          <Textarea
            required
            rows={3}
            placeholder="Brief project summary..."
            value={form.description}
            onChange={(e) => set("description", e.target.value)}
          />
        </Field>

        <Field label="Features (comma-separated)">
          {/* The each one line is a feature */}
          <Textarea
            rows={3}
            placeholder="Real-time analytics, Custom dashboards..."
            value={form.features.split("; ").join("\n")}
            onChange={(e) => set("features", e.target.value)}
          />
        </Field>

        <div className="grid grid-cols-2 gap-4">
          <Field label="GitHub URL">
            <Input
              type="url"
              placeholder="https://github.com/..."
              value={form.github}
              onChange={(e) => set("github", e.target.value)}
            />
          </Field>
          <Field label="Live Demo URL">
            <Input
              type="url"
              placeholder="https://..."
              value={form.demo}
              onChange={(e) => set("demo", e.target.value)}
            />
          </Field>
        </div>

        <Field label="Technologies (comma-separated)">
          <Input
            placeholder="React, NestJS, PostgreSQL..."
            value={form.technologies}
            onChange={(e) => set("technologies", e.target.value)}
          />
        </Field>

        <Field label="Tags (comma-separated)">
          <Input
            placeholder="Analytics, Real-time, Dashboard..."
            value={form.tags}
            onChange={(e) => set("tags", e.target.value)}
          />
        </Field>

        <div className="grid grid-cols-2 gap-4">
          <Field label="Status">
            <Select
              value={form.status}
              onChange={(e) => set("status", e.target.value)}
            >
              <option value="Live">Live</option>
              <option value="Beta">Beta</option>
              <option value="Archived">Archived</option>
              <option value="WIP">WIP</option>
            </Select>
          </Field>
          <Field label="Featured">
            <div className="flex items-center gap-3 h-10">
              <button
                type="button"
                onClick={() => set("featured", !form.featured)}
                className="relative w-10 h-5 rounded-full transition-colors duration-200"
                style={{
                  background: form.featured
                    ? "var(--primary)"
                    : "rgba(255,255,255,0.1)",
                }}
              >
                <span
                  className="absolute top-0.5 w-4 h-4 rounded-full transition-transform duration-200"
                  style={{
                    background: "#fff",
                    left: "2px",
                    transform: form.featured
                      ? "translateX(20px)"
                      : "translateX(0)",
                  }}
                />
              </button>
              <span
                className="text-sm"
                style={{ color: "var(--muted-foreground)" }}
              >
                {form.featured ? "Featured" : "Not featured"}
              </span>
            </div>
          </Field>
        </div>

        <ModalActions
          onCancel={onClose}
          submitLabel={isEditing ? "Save Changes" : "Create Project"}
          saving={saving}
        />
      </form>
    </Modal>
  );
}

function ProjectsSection({
  projects,
  setProjects,
}: {
  projects: Project[];
  setProjects: React.Dispatch<React.SetStateAction<Project[]>>;
}) {
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);

  const toggleFeatured = async (id: number) => {
    const project = projects.find((p) => p.id === id);
    if (!project) return;

    const updated = await projectApi.update(id, {
      featured: !project.featured,
    });
    setProjects((prev) =>
      prev.map((p) =>
        p.id === id ? { ...p, ...updated, featured: !!updated.featured } : p,
      ),
    );
  };

  const toggleStatus = async (id: number) => {
    const project = projects.find((p) => p.id === id);
    if (!project) return;

    const nextStatus =
      project.status === "live" || project.status === "Live" ? "beta" : "live";
    const updated = await projectApi.update(id, { status: nextStatus });
    setProjects((prev) =>
      prev.map((p) =>
        p.id === id ? { ...p, ...updated, status: updated.status } : p,
      ),
    );
  };

  const handleNewProject = async (data: typeof emptyProject) => {
    const techs = data.technologies
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);
    const tags = data.tags
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);

    const created = await projectApi.create({
      title: data.title,
      category: data.category,
      status: data.status.toLowerCase() as "live" | "archived" | "beta" | "wip",
      featured: data.featured,
      description: data.description,
      github_url: data.github,
      demo_url: data.demo,
      tags,
      technologies: techs,
      thumbnail: data.thumbnail,
      features: data.features.split("\n").filter(Boolean),
    });

    setProjects((prev) => [created, ...prev]);
    setShowModal(false);
  };

  const handleEditProject = async (data: typeof emptyProject) => {
    if (!editingProject) return;

    const techs = data.technologies
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);
    const tags = data.tags
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);

    const updated = await projectApi.update(editingProject.id, {
      title: data.title,
      category: data.category,
      status: data.status.toLowerCase() as "live" | "archived" | "beta" | "wip",
      featured: data.featured,
      description: data.description,
      github_url: data.github,
      demo_url: data.demo,
      tags,
      technologies: techs,
      thumbnail: data.thumbnail,
      features: data.features.split("\n").filter(Boolean),
    });

    setProjects((prev) =>
      prev.map((p) => (p.id === editingProject.id ? { ...p, ...updated } : p)),
    );
    setShowModal(false);
    setIsEditing(false);
    setEditingProject(null);
  };

  const handleDelete = async (id: number) => {
    await projectApi.remove(id);
    setProjects((prev) => prev.filter((p) => p.id !== id));
  };

  return (
    <>
      {/* {showModal && (
        <NewProjectModal
          onClose={() => setShowModal(false)}
          onSave={handleNewProject}
        />
      )} */}
      {showModal && (
        <NewProjectModal
          onClose={() => {
            setShowModal(false);
            setIsEditing(false);
          }}
          onSave={isEditing ? handleEditProject : handleNewProject}
          isEditing={isEditing}
          initialData={editingProject}
        />
      )}
      <div className="space-y-4">
        <div className="flex items-center justify-between mb-6">
          <h2
            className="font-display text-xl"
            style={{ color: "var(--foreground)" }}
          >
            Projects ({projects.length})
          </h2>
          <button
            onClick={() => setShowModal(true)}
            className="px-4 py-2 rounded text-sm font-medium transition-opacity duration-150"
            style={{ background: "var(--primary)", color: "#fff" }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.85")}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
          >
            + New Project
          </button>
        </div>

        <div
          className="rounded-lg overflow-hidden"
          style={{ border: "1px solid var(--border)" }}
        >
          <table className="w-full">
            <thead>
              <tr
                style={{
                  borderBottom: "1px solid var(--border)",
                  background: "var(--card)",
                }}
              >
                {["Title", "Category", "Status", "Featured", "Actions"].map(
                  (h) => (
                    <th
                      key={h}
                      className="text-left px-5 py-3 font-mono text-xs uppercase tracking-wide"
                      style={{ color: "var(--muted-foreground)" }}
                    >
                      {h}
                    </th>
                  ),
                )}
              </tr>
            </thead>
            <tbody>
              {projects.map((p, i) => (
                <tr
                  key={p.id}
                  style={{
                    borderBottom:
                      i < projects.length - 1
                        ? "1px solid var(--border)"
                        : "none",
                    background: "var(--card)",
                  }}
                >
                  <td className="px-5 py-4">
                    <p
                      className="text-sm font-medium"
                      style={{ color: "var(--foreground)" }}
                    >
                      {p.title}
                    </p>
                    <p
                      className="font-mono text-xs"
                      style={{ color: "var(--muted-foreground)" }}
                    >
                      {(p.technologies ?? []).slice(0, 3).join(", ") ||
                        "No technologies listed"}
                    </p>
                  </td>
                  <td className="px-5 py-4">
                    <span
                      className="font-mono text-xs"
                      style={{ color: "var(--muted-foreground)" }}
                    >
                      {p.category}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <button
                      onClick={() => void toggleStatus(p.id)}
                      className="font-mono text-xs px-2 py-0.5 rounded-full"
                      style={{
                        background:
                          p.status === "live" || p.status === "Live"
                            ? "rgba(34,197,94,0.12)"
                            : "rgba(234,179,8,0.12)",
                        color:
                          p.status === "live" || p.status === "Live"
                            ? "#22c55e"
                            : "#eab308",
                      }}
                    >
                      {String(p.status).charAt(0).toUpperCase() +
                        String(p.status).slice(1)}
                    </button>
                  </td>
                  <td className="px-5 py-4">
                    <button
                      onClick={() => void toggleFeatured(p.id)}
                      className="font-mono text-xs"
                      style={{
                        color: p.featured
                          ? "var(--accent)"
                          : "var(--muted-foreground)",
                      }}
                    >
                      {p.featured ? "★ Featured" : "☆ Feature"}
                    </button>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex gap-3">
                      <button
                        onClick={() => {
                          setShowModal(true);
                          setIsEditing(!isEditing);
                          setEditingProject(p);
                        }}
                        className="font-mono text-xs"
                        style={{ color: "var(--primary)" }}
                      >
                        Edit
                      </button>
                      <button
                        className="font-mono text-xs"
                        style={{ color: "var(--muted-foreground)" }}
                        onMouseEnter={(e) =>
                          (e.currentTarget.style.color = "#ef4444")
                        }
                        onMouseLeave={(e) =>
                          (e.currentTarget.style.color =
                            "var(--muted-foreground)")
                        }
                        onClick={() => void handleDelete(p.id)}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

const emptyExp = {
  company: "",
  position: "",
  location: "",
  startDate: "",
  endDate: "",
  description: "",
  responsibilities: "",
  achievements: "",
  technologies: "",
};

function NewExperienceModal({
  onClose,
  onSave,
  initialData,
  isEditing,
}: {
  onClose: () => void;
  onSave: (e: typeof emptyExp) => void;
  initialData: Experience | null;
  isEditing?: boolean;
}) {
  const [form, setForm] = useState<any>({
    ...emptyExp,
    ...(isEditing && {
      id: initialData?.id || 0,
      company: initialData?.company || "",
      position: initialData?.position || "",
      location: initialData?.location || "",
      startDate: initialData?.start_date || "",
      endDate: initialData?.end_date || "",
      description: initialData?.description || "",
      responsibilities: (initialData?.responsibilities ?? []).join("\n") || "",
      achievements: (initialData?.achievements ?? []).join("\n") || "",
      technologies: (initialData?.technologies ?? []).join(", ") || "",
    }),
  });
  const [saving, setSaving] = useState(false);
  const set = (k: keyof typeof emptyExp, v: string) =>
    setForm((prev: any) => ({ ...prev, [k]: v }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      onSave(form);
      onClose();
    }, 900);
  };

  return (
    <Modal
      title={isEditing ? "Edit Experience" : "Add Experience"}
      onClose={onClose}
      width="640px"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <Field label="Company">
            <Input
              required
              placeholder="e.g. Ascend Analytics"
              value={form.company}
              onChange={(e) => set("company", e.target.value)}
            />
          </Field>
          <Field label="Job Position">
            <Input
              required
              placeholder="e.g. Senior Full-Stack Engineer"
              value={form.position}
              onChange={(e) => set("position", e.target.value)}
            />
          </Field>
        </div>

        <Field label="Location">
          <Input
            placeholder="e.g. Ho Chi Minh City / Remote"
            value={form.location}
            onChange={(e) => set("location", e.target.value)}
          />
        </Field>

        <div className="grid grid-cols-2 gap-4">
          <Field label="Start Date">
            <Input
              type="month"
              value={
                form.startDate
                  ? new Date(form.startDate).toISOString().slice(0, 7)
                  : ""
              }
              onChange={(e) => set("startDate", e.target.value)}
            />
          </Field>
          <Field label="End Date">
            <Input
              type="month"
              placeholder="Leave blank if current"
              value={
                form.endDate
                  ? new Date(form.endDate).toISOString().slice(0, 7)
                  : ""
              }
              onChange={(e) => set("endDate", e.target.value)}
            />
          </Field>
        </div>

        <Field label="Role Description">
          <Textarea
            required
            rows={2}
            placeholder="Brief summary of the role..."
            value={form.description}
            onChange={(e) => set("description", e.target.value)}
          />
        </Field>

        <Field label="Responsibilities (one per line)">
          <Textarea
            rows={3}
            placeholder={
              "Designed microservices architecture...\nReduced API response times by 60%..."
            }
            value={form.responsibilities}
            onChange={(e) => set("responsibilities", e.target.value)}
          />
        </Field>

        <Field label="Achievements (one per line)">
          <Textarea
            rows={2}
            placeholder={
              "Shipped analytics core, $2M ARR...\nReduced infra costs 35%..."
            }
            value={form.achievements}
            onChange={(e) => set("achievements", e.target.value)}
          />
        </Field>

        <Field label="Technologies Used (comma-separated)">
          <Input
            placeholder="Next.js, NestJS, PostgreSQL, Redis..."
            value={form.technologies}
            onChange={(e) => set("technologies", e.target.value)}
          />
        </Field>

        <ModalActions
          onCancel={onClose}
          submitLabel={isEditing ? "Update Experience" : "Add Experience"}
          saving={saving}
        />
      </form>
    </Modal>
  );
}

function ExperienceSection({
  experiences,
  setExperiences,
}: {
  experiences: Experience[];
  setExperiences: React.Dispatch<React.SetStateAction<Experience[]>>;
}) {
  const [showModal, setShowModal] = useState(false);
  const [editingExp, setEditingExp] = useState<Experience | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  const handleNew = async (data: typeof emptyExp) => {
    const techs = data.technologies
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);
    const responsibilities = data.responsibilities.split("\n").filter(Boolean);
    const achievements = data.achievements.split("\n").filter(Boolean);
    const period = [
      data.startDate
        ? new Date(data.startDate).setUTCDate(1) &&
          new Date(data.startDate).toISOString().slice(0, 7)
        : "?",
      data.endDate
        ? new Date(data.endDate).setUTCDate(1) &&
          new Date(data.endDate).toISOString().slice(0, 7)
        : "Present",
    ].join(" – ");

    const created = await experienceApi.create({
      company: data.company,
      position: data.position,
      period,
      location: data.location,
      description: data.description,
      responsibilities,
      achievements,
      technologies: techs,
      start_date: data.startDate || undefined,
      end_date: data.endDate || undefined,
    });

    setExperiences((prev) => [created, ...prev]);
    setShowModal(false);
  };

  const handleEdit = (exp: typeof emptyExp) => {
    if (!editingExp) return;
    const techs = exp.technologies
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);
    const responsibilities = exp.responsibilities.split("\n").filter(Boolean);
    const achievements = exp.achievements.split("\n").filter(Boolean);
    const period = [
      exp.startDate
        ? new Date(exp.startDate).setUTCDate(1) &&
          new Date(exp.startDate).toISOString().slice(0, 7)
        : "?",
      exp.endDate
        ? new Date(exp.endDate).setUTCDate(1) &&
          new Date(exp.endDate).toISOString().slice(0, 7)
        : "Present",
    ].join(" – ");

    experienceApi
      .update(Number(editingExp.id), {
        company: exp.company,
        position: exp.position,
        period,
        location: exp.location,
        description: exp.description,
        responsibilities,
        achievements,
        technologies: techs,
        start_date: exp.startDate || undefined,
        end_date: exp.endDate || undefined,
      })
      .then((updated) => {
        setExperiences((prev) =>
          prev.map((e) =>
            e.id === Number(editingExp.id) ? { ...e, ...updated } : e,
          ),
        );
        setShowModal(false);
        setIsEditing(false);
        setEditingExp(null);
      });
  };

  const handleDelete = async (id: number) => {
    await experienceApi.remove(id);
    setExperiences((prev) => prev.filter((exp) => exp.id !== id));
  };

  if (experiences.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 py-20">
        <p
          className="font-mono text-sm"
          style={{ color: "var(--muted-foreground)" }}
        >
          No work experience added yet.
        </p>
        <button
          onClick={() => setShowModal(true)}
          className="px-4 py-2 rounded text-sm font-medium transition-opacity duration-150"
          style={{ background: "var(--primary)", color: "#fff" }}
          onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.85")}
          onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
        >
          + Add Experience
        </button>
      </div>
    );
  }

  return (
    <>
      {showModal && (
        <NewExperienceModal
          onClose={() => {
            setShowModal(false);
            setIsEditing(false);
            setEditingExp(null);
          }}
          onSave={isEditing ? handleEdit : handleNew}
          isEditing={isEditing}
          initialData={editingExp}
        />
      )}
      <div className="space-y-4">
        <div className="flex items-center justify-between mb-6">
          <h2
            className="font-display text-xl"
            style={{ color: "var(--foreground)" }}
          >
            Work Experience
          </h2>
          <button
            onClick={() => setShowModal(true)}
            className="px-4 py-2 rounded text-sm font-medium transition-opacity duration-150"
            style={{ background: "var(--primary)", color: "#fff" }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.85")}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
          >
            + Add Experience
          </button>
        </div>
        <div className="space-y-4">
          {experiences &&
            experiences.map((exp) => (
              <div
                key={exp.id}
                className="rounded-lg p-5"
                style={{
                  background: "var(--card)",
                  border: "1px solid var(--border)",
                }}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h3
                      className="font-medium"
                      style={{ color: "var(--foreground)" }}
                    >
                      {exp.position}
                    </h3>
                    <p
                      className="font-mono text-xs mt-1"
                      style={{ color: "var(--accent)" }}
                    >
                      {exp.company} · {exp.period}
                    </p>
                  </div>
                  <div className="flex gap-3">
                    <button
                      onClick={() => {
                        setShowModal(true);
                        setIsEditing(!isEditing);
                        setEditingExp(exp);
                      }}
                      className="font-mono text-xs"
                      style={{ color: "var(--primary)" }}
                    >
                      Edit
                    </button>
                    <button
                      className="font-mono text-xs"
                      style={{ color: "var(--muted-foreground)" }}
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.color = "#ef4444")
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.color =
                          "var(--muted-foreground)")
                      }
                      onClick={() => void handleDelete(Number(exp.id))}
                    >
                      Delete
                    </button>
                  </div>
                </div>
                <p
                  className="text-sm mt-2"
                  style={{ color: "var(--muted-foreground)" }}
                >
                  {exp.description}
                </p>
                <div className="flex flex-wrap gap-1.5 mt-3">
                  {exp?.technologies?.map((tech) => (
                    <span
                      key={tech}
                      className="font-mono text-xs px-2 py-0.5 rounded"
                      style={{
                        background: "rgba(124,58,237,0.08)",
                        color: "var(--muted-foreground)",
                      }}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
        </div>
      </div>
    </>
  );
}

const emptySkill = { name: "", category: "Frontend", level: "80" };

function NewSkillModal({
  onClose,
  onSave,
  isEditing,
  editingSkill,
}: {
  onClose: () => void;
  onSave: (s: typeof emptySkill) => void;
  isEditing: boolean;
  editingSkill: Skill | null;
}) {
  const [form, setForm] = useState<any>({
    ...emptySkill,
    ...(isEditing && editingSkill && { ...editingSkill }),
  });
  const [saving, setSaving] = useState(false);
  const set = (k: keyof typeof emptySkill, v: string) =>
    setForm((prev: any) => ({ ...prev, [k]: v }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      onSave(form);
      onClose();
    }, 800);
  };

  const level = Math.min(100, Math.max(0, Number(form.level) || 0));

  return (
    <Modal
      title={isEditing ? "Edit Skill" : "Add Skill"}
      onClose={onClose}
      width="480px"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <Field label="Skill Name">
          <Input
            required
            placeholder="e.g. React / Next.js"
            value={form.name}
            onChange={(e) => set("name", e.target.value)}
          />
        </Field>

        <Field label="Category">
          <Select
            value={form.category}
            onChange={(e) => set("category", e.target.value)}
          >
            {skillCategories.map((c) => (
              <option key={c.category} value={c.category}>
                {c.category}
              </option>
            ))}
            <option value="Other">Other</option>
          </Select>
        </Field>

        <Field label={`Proficiency Level — ${level}%`}>
          <div className="space-y-3">
            <input
              type="range"
              min={0}
              max={100}
              value={level}
              onChange={(e) => set("level", e.target.value)}
              className="w-full accent-violet-500"
              style={{ accentColor: "var(--primary)" }}
            />
            <div
              className="h-1 rounded-full overflow-hidden"
              style={{ background: "rgba(255,255,255,0.06)" }}
            >
              <div
                className="h-full rounded-full transition-all duration-200"
                style={{
                  width: `${level}%`,
                  background:
                    "linear-gradient(90deg, var(--primary), var(--accent))",
                }}
              />
            </div>
            <div
              className="flex justify-between font-mono text-xs"
              style={{ color: "var(--muted-foreground)" }}
            >
              <span>Beginner</span>
              <span>Intermediate</span>
              <span>Expert</span>
            </div>
          </div>
        </Field>

        <ModalActions
          onCancel={onClose}
          submitLabel={isEditing ? "Update Skill" : "Add Skill"}
          saving={saving}
        />
      </form>
    </Modal>
  );
}

function SkillsSection({
  skills,
  setSkills,
}: {
  skills: Skill[];
  setSkills: React.Dispatch<React.SetStateAction<Skill[]>>;
}) {
  const [showModal, setShowModal] = useState(false);
  const [editingSkill, setEditingSkill] = useState<any>(null);
  const [isEditing, setIsEditing] = useState(false);

  const grouped = skills.reduce<
    Record<
      string,
      {
        category: string;
        icon: string;
        skills: Array<{ id: number; name: string; level: number }>;
      }
    >
  >((acc, skill) => {
    const category = skill.category || "Other";
    if (!acc[category]) {
      acc[category] = { category, icon: "◇", skills: [] };
    }
    acc[category].skills.push({
      id: skill.id,
      name: skill.name,
      level: Number(skill.level) || 0,
    });
    return acc;
  }, {});

  const handleNew = async (data: typeof emptySkill) => {
    const level = Math.min(100, Math.max(0, Number(data.level) || 0));
    const created = await skillApi.create({
      name: data.name,
      category: data.category,
      level,
      icon: "◇",
    });

    setSkills((prev) => [...prev, created]);
    setShowModal(false);
  };

  const handleEdit = async (data: typeof emptySkill) => {
    if (!editingSkill) return;
    const level = Math.min(100, Math.max(0, Number(data.level) || 0));
    const updated = await skillApi.update(Number(editingSkill.id), {
      name: data.name,
      category: data.category,
      level: Number(level) || 0,
      icon: "◇",
      order: editingSkill.order || 0,
    });

    setSkills((prev) =>
      prev.map((s) => (s.id === editingSkill.id ? { ...s, ...updated } : s)),
    );
    setShowModal(false);
    setIsEditing(false);
    setEditingSkill(null);
  };

  const handleDelete = async (id: number) => {
    await skillApi.remove(id);
    setSkills((prev) => prev.filter((skill) => skill.id !== id));
  };

  return (
    <>
      {showModal && (
        <NewSkillModal
          onClose={() => {
            setShowModal(false);
            setIsEditing(false);
            setEditingSkill(null);
          }}
          onSave={isEditing ? handleEdit : handleNew}
          isEditing={isEditing}
          editingSkill={editingSkill}
        />
      )}
      <div className="space-y-6">
        <div className="flex items-center justify-between mb-6">
          <h2
            className="font-display text-xl"
            style={{ color: "var(--foreground)" }}
          >
            Skills
          </h2>
          <button
            onClick={() => setShowModal(true)}
            className="px-4 py-2 rounded text-sm font-medium transition-opacity duration-150"
            style={{ background: "var(--primary)", color: "#fff" }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.85")}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
          >
            + Add Skill
          </button>
        </div>
        {Object.values(grouped).map((cat) => (
          <div
            key={cat.category}
            className="rounded-lg p-5"
            style={{
              background: "var(--card)",
              border: "1px solid var(--border)",
            }}
          >
            <h3
              className="font-mono text-sm font-medium uppercase tracking-wide mb-4"
              style={{ color: "var(--foreground)" }}
            >
              {cat.icon} {cat.category}
            </h3>
            <div className="space-y-3">
              {cat.skills.map((skill) => (
                <div key={skill.name} className="flex items-center gap-4">
                  <p
                    className="text-sm w-48 shrink-0"
                    style={{ color: "var(--foreground)" }}
                  >
                    {skill.name}
                  </p>
                  <div className="flex-1 flex items-center gap-3">
                    <div
                      className="flex-1 h-px"
                      style={{ background: "rgba(255,255,255,0.05)" }}
                    >
                      <div
                        className="h-px"
                        style={{
                          width: `${skill.level}%`,
                          background:
                            "linear-gradient(90deg, var(--primary), var(--accent))",
                        }}
                      />
                    </div>
                    <span
                      className="font-mono text-xs w-8 text-right"
                      style={{ color: "var(--muted-foreground)" }}
                    >
                      {skill.level}%
                    </span>
                  </div>
                  <button
                    className="font-mono text-xs"
                    style={{ color: "var(--primary)" }}
                    onClick={() => {
                      setIsEditing(true);
                      setEditingSkill(skill);
                      setShowModal(true);
                      console.log("Editing skill:", skill);
                    }}
                  >
                    Edit
                  </button>
                  <button
                    className="font-mono text-xs"
                    style={{ color: "var(--muted-foreground)" }}
                    onClick={() =>
                      void handleDelete(
                        skills.find((item) => item.name === skill.name)?.id ??
                          0,
                      )
                    }
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

function MessagesSection({
  messages,
  setMessages,
}: {
  messages: typeof mockMessages;
  setMessages: React.Dispatch<React.SetStateAction<typeof mockMessages>>;
}) {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<"all" | "unread" | "read">("all");

  const filtered = messages.filter((m) => {
    const matchesFilter = filter === "all" || m.status === filter;
    const matchesSearch =
      m.name.toLowerCase().includes(search.toLowerCase()) ||
      m.email.toLowerCase().includes(search.toLowerCase()) ||
      m.message.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const markRead = (id: number) => {
    contactApi.markAsRead(id);
    setMessages((prev) =>
      prev.map((m) => (m.id === id ? { ...m, status: "read" } : m)),
    );
  };

  const deleteMessage = (id: number) => {
    contactApi.remove(id);
    setMessages((prev) => prev.filter((m) => m.id !== id));
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-4 mb-6">
        <h2
          className="font-display text-xl"
          style={{ color: "var(--foreground)" }}
        >
          Messages ({messages.length})
        </h2>
        <div className="flex gap-2 ml-auto">
          {(["all", "unread", "read"] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className="font-mono text-xs px-3 py-1.5 rounded-full capitalize"
              style={{
                background: filter === f ? "var(--primary)" : "transparent",
                color: filter === f ? "#fff" : "var(--muted-foreground)",
                border: "1px solid",
                borderColor: filter === f ? "var(--primary)" : "var(--border)",
              }}
            >
              {f}
            </button>
          ))}
        </div>
        <input
          placeholder="Search messages..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="rounded px-3 py-1.5 text-sm outline-none"
          style={{
            background: "var(--card)",
            border: "1px solid var(--border)",
            color: "var(--foreground)",
            width: "180px",
          }}
        />
      </div>

      <div className="space-y-3">
        {filtered.map((msg) => (
          <div
            key={msg.id}
            className="rounded-lg p-5"
            style={{
              background: "var(--card)",
              border: `1px solid ${msg.status === "unread" ? "rgba(124,58,237,0.25)" : "var(--border)"}`,
            }}
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-3">
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center font-mono text-xs shrink-0"
                  style={{
                    background: "rgba(124,58,237,0.12)",
                    color: "var(--primary)",
                  }}
                >
                  {msg.name[0]}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <p
                      className="text-sm font-medium"
                      style={{ color: "var(--foreground)" }}
                    >
                      {msg.name}
                    </p>
                    {msg.status === "unread" && (
                      <span
                        className="w-1.5 h-1.5 rounded-full"
                        style={{ background: "var(--primary)" }}
                      />
                    )}
                  </div>
                  <p
                    className="font-mono text-xs"
                    style={{ color: "var(--muted-foreground)" }}
                  >
                    {msg.email} · {msg.date}
                  </p>
                </div>
              </div>
              <div className="flex gap-3 shrink-0">
                {msg.status === "unread" && (
                  <button
                    onClick={() => markRead(msg.id)}
                    className="font-mono text-xs"
                    style={{ color: "var(--primary)" }}
                  >
                    Mark read
                  </button>
                )}
                <a
                  href={`mailto:${msg.email}`}
                  className="font-mono text-xs"
                  style={{ color: "var(--muted-foreground)" }}
                >
                  Reply
                </a>
                <button
                  onClick={() => deleteMessage(msg.id)}
                  className="font-mono text-xs"
                  style={{ color: "var(--muted-foreground)" }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.color = "#ef4444")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.color = "var(--muted-foreground)")
                  }
                >
                  Delete
                </button>
              </div>
            </div>
            <p
              className="text-sm mt-3 ml-11"
              style={{ color: "var(--muted-foreground)" }}
            >
              {msg.message}
            </p>
          </div>
        ))}
        {filtered.length === 0 && (
          <div className="text-center py-12">
            <p
              className="font-mono text-sm"
              style={{ color: "var(--muted-foreground)" }}
            >
              No messages found
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
