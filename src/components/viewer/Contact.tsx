import React, { useState } from "react";
import { authApi, contactApi } from "@/services/api";

export default function Contact() {
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

  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    contactApi.create({
      name: form.name,
      email: form.email,
      message: form.message,
    });
    // setForm({ name: "", email: "", message: "" });
    setStatus("sending");
    setTimeout(() => setStatus("sent"), 1800);
  };

  return (
    <section
      id="contact"
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
              Get in Touch
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
              Let&apos;s build something
              <br />
              <em style={{ color: "var(--primary)", fontStyle: "italic" }}>
                remarkable together
              </em>
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          {/* Left: info */}
          <div className="md:col-span-4">
            <p
              className="text-base mb-8"
              style={{ color: "var(--muted-foreground)", lineHeight: 1.75 }}
            >
              I&apos;m open to full-time roles, consulting engagements, and
              interesting open-source collaborations. Drop me a line and
              I&apos;ll get back within 48 hours.
            </p>

            <div className="space-y-6">
              {[
                {
                  label: "Email",
                  value: profile?.email,
                  href: `mailto:${profile?.email}`,
                },
                {
                  label: "GitHub",
                  value: profile?.github?.replace("https://github.com/", ""),
                  href: profile?.github,
                },
                {
                  label: "LinkedIn",
                  value: profile?.linkedin?.replace("https://www.linkedin.com/in/", ""),
                  href: profile?.linkedin,
                },
                { label: "Location", value: profile?.location, href: null },
              ].map((item) => (
                <div key={item.label}>
                  <p
                    className="font-mono text-xs uppercase tracking-wide mb-1"
                    style={{ color: "var(--muted-foreground)" }}
                  >
                    {item.label}
                  </p>
                  {item.href ? (
                    <a
                      href={item.href}
                      className="text-sm transition-colors duration-150"
                      style={{ color: "var(--foreground)" }}
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.color = "var(--primary)")
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.color = "var(--foreground)")
                      }
                    >
                      {item.value}
                    </a>
                  ) : (
                    <p
                      className="text-sm"
                      style={{ color: "var(--foreground)" }}
                    >
                      {item.value}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Right: form */}
          <div className="md:col-span-8">
            {status === "sent" ? (
              <div
                className="rounded-lg p-12 text-center"
                style={{
                  background: "var(--card)",
                  border: "1px solid rgba(34,197,94,0.2)",
                }}
              >
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4"
                  style={{ background: "rgba(34,197,94,0.15)" }}
                >
                  <span style={{ color: "#22c55e", fontSize: "20px" }}>✓</span>
                </div>
                <h3
                  className="font-display text-xl mb-2"
                  style={{ color: "var(--foreground)" }}
                >
                  Message sent!
                </h3>
                <p
                  className="text-sm"
                  style={{ color: "var(--muted-foreground)" }}
                >
                  I&apos;ll reply to {form.email} within 48 hours.
                </p>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="rounded-lg p-8 space-y-6"
                style={{
                  background: "var(--card)",
                  border: "1px solid var(--border)",
                }}
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[
                    {
                      id: "name",
                      label: "Name",
                      type: "text",
                      placeholder: "Your name",
                    },
                    {
                      id: "email",
                      label: "Email",
                      type: "email",
                      placeholder: "you@company.com",
                    },
                  ].map((field) => (
                    <div key={field.id}>
                      <label
                        htmlFor={field.id}
                        className="block font-mono text-xs uppercase tracking-wide mb-2"
                        style={{ color: "var(--muted-foreground)" }}
                      >
                        {field.label}
                      </label>
                      <input
                        id={field.id}
                        type={field.type}
                        placeholder={field.placeholder}
                        value={form[field.id as "name" | "email"]}
                        onChange={(e) =>
                          setForm({ ...form, [field.id]: e.target.value })
                        }
                        required
                        className="w-full rounded px-4 py-3 text-sm outline-none transition-all duration-150"
                        style={{
                          background: "var(--background)",
                          border: "1px solid var(--border)",
                          color: "var(--foreground)",
                        }}
                        onFocus={(e) =>
                          (e.currentTarget.style.borderColor =
                            "rgba(124,58,237,0.5)")
                        }
                        onBlur={(e) =>
                          (e.currentTarget.style.borderColor = "var(--border)")
                        }
                      />
                    </div>
                  ))}
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block font-mono text-xs uppercase tracking-wide mb-2"
                    style={{ color: "var(--muted-foreground)" }}
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows={6}
                    placeholder="Tell me about your project or opportunity..."
                    value={form.message}
                    onChange={(e) =>
                      setForm({ ...form, message: e.target.value })
                    }
                    required
                    className="w-full rounded px-4 py-3 text-sm outline-none transition-all duration-150 resize-none"
                    style={{
                      background: "var(--background)",
                      border: "1px solid var(--border)",
                      color: "var(--foreground)",
                    }}
                    onFocus={(e) =>
                      (e.currentTarget.style.borderColor =
                        "rgba(124,58,237,0.5)")
                    }
                    onBlur={(e) =>
                      (e.currentTarget.style.borderColor = "var(--border)")
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <p
                    className="font-mono text-xs"
                    style={{ color: "var(--muted-foreground)" }}
                  >
                    Response within 48 hours
                  </p>
                  <button
                    type="submit"
                    disabled={status === "sending"}
                    className="px-6 py-3 rounded font-medium text-sm transition-all duration-150 flex items-center gap-2"
                    style={{
                      background: "var(--primary)",
                      color: "#fff",
                      opacity: status === "sending" ? 0.7 : 1,
                    }}
                  >
                    {status === "sending" ? (
                      <>
                        <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Sending...
                      </>
                    ) : (
                      "Send Message →"
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
