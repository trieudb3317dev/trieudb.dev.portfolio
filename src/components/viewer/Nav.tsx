import { useState, useEffect } from "react";

interface NavProps {
  onAdminClick: () => void;
}

const sections = ["About", "Experience", "Skills", "Projects", "Contact"];

export default function Nav({ onAdminClick }: NavProps) {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("About");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
      for (const s of sections) {
        const el = document.getElementById(s.toLowerCase());
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActive(s);
          }
        }
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background: scrolled ? "rgba(10,10,15,0.92)" : "transparent",
        backdropFilter: scrolled ? "blur(16px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(255,255,255,0.07)" : "none",
      }}
    >
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <span
          className="font-display text-xl font-semibold tracking-tight cursor-pointer"
          style={{ color: "var(--foreground)" }}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          TD<span style={{ color: "var(--primary)" }}>.</span>
        </span>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          {sections.map((s) => (
            <button
              key={s}
              onClick={() => scrollTo(s)}
              className="text-sm font-medium transition-colors duration-150"
              style={{
                color: active === s ? "var(--foreground)" : "var(--muted-foreground)",
                fontFamily: "var(--font-mono)",
              }}
            >
              {active === s && <span style={{ color: "var(--accent)" }}>›&nbsp;</span>}
              {s}
            </button>
          ))}
          <button
            onClick={onAdminClick}
            className="text-xs font-mono px-3 py-1.5 rounded transition-all duration-150"
            style={{
              border: "1px solid var(--primary)",
              color: "var(--primary)",
              fontFamily: "var(--font-mono)",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.background = "var(--primary)";
              (e.currentTarget as HTMLButtonElement).style.color = "#fff";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.background = "transparent";
              (e.currentTarget as HTMLButtonElement).style.color = "var(--primary)";
            }}
          >
            Admin ⌥
          </button>
        </div>

        {/* Mobile menu button */}
        <button
          className="md:hidden p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          style={{ color: "var(--foreground)" }}
        >
          <div className="w-5 flex flex-col gap-1">
            <span
              className="block h-px transition-all duration-200"
              style={{
                background: "var(--foreground)",
                transform: menuOpen ? "rotate(45deg) translateY(4px)" : "none",
              }}
            />
            <span
              className="block h-px transition-all duration-200"
              style={{
                background: "var(--foreground)",
                opacity: menuOpen ? 0 : 1,
              }}
            />
            <span
              className="block h-px transition-all duration-200"
              style={{
                background: "var(--foreground)",
                transform: menuOpen ? "rotate(-45deg) translateY(-4px)" : "none",
              }}
            />
          </div>
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div
          className="md:hidden px-6 pb-6 flex flex-col gap-4"
          style={{ borderTop: "1px solid var(--border)" }}
        >
          {sections.map((s) => (
            <button
              key={s}
              onClick={() => scrollTo(s)}
              className="text-left text-sm font-medium py-1"
              style={{ color: active === s ? "var(--foreground)" : "var(--muted-foreground)", fontFamily: "var(--font-mono)" }}
            >
              {s}
            </button>
          ))}
          <button
            onClick={() => { setMenuOpen(false); onAdminClick(); }}
            className="text-left text-sm font-mono"
            style={{ color: "var(--primary)" }}
          >
            Admin Dashboard →
          </button>
        </div>
      )}
    </nav>
  );
}
