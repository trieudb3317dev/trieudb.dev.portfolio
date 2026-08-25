import { useEffect, useRef } from "react";

interface ModalProps {
  title: string;
  onClose: () => void;
  children: React.ReactNode;
  width?: string;
}

export default function Modal({ title, onClose, children, width = "560px" }: ModalProps) {
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "rgba(0,0,0,0.7)", backdropFilter: "blur(6px)" }}
      onClick={(e) => { if (e.target === overlayRef.current) onClose(); }}
    >
      <div
        className="relative flex flex-col rounded-xl w-full"
        style={{
          maxWidth: width,
          maxHeight: "90vh",
          background: "var(--card)",
          border: "1px solid rgba(124,58,237,0.2)",
          boxShadow: "0 24px 80px rgba(0,0,0,0.6)",
        }}
      >
        {/* Header */}
        <div
          className="flex items-center justify-between px-6 py-5 flex-shrink-0"
          style={{ borderBottom: "1px solid var(--border)" }}
        >
          <h2 className="font-display text-lg font-semibold" style={{ color: "var(--foreground)" }}>
            {title}
          </h2>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg flex items-center justify-center transition-colors duration-150"
            style={{ color: "var(--muted-foreground)" }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,0.06)";
              (e.currentTarget as HTMLButtonElement).style.color = "var(--foreground)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.background = "transparent";
              (e.currentTarget as HTMLButtonElement).style.color = "var(--muted-foreground)";
            }}
          >
            ✕
          </button>
        </div>

        {/* Scrollable body */}
        <div className="overflow-y-auto px-6 py-6 flex-1">
          {children}
        </div>
      </div>
    </div>
  );
}

/* ── Shared form primitives ── */

export function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label
        className="block font-mono text-xs uppercase tracking-wide mb-2"
        style={{ color: "var(--muted-foreground)" }}
      >
        {label}
      </label>
      {children}
    </div>
  );
}

const inputBase: React.CSSProperties = {
  background: "var(--background)",
  border: "1px solid var(--border)",
  color: "var(--foreground)",
  width: "100%",
  borderRadius: "6px",
  padding: "10px 14px",
  fontSize: "14px",
  outline: "none",
  transition: "border-color 0.15s",
};

export function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      style={inputBase}
      onFocus={(e) => { e.currentTarget.style.borderColor = "rgba(124,58,237,0.5)"; }}
      onBlur={(e) => { e.currentTarget.style.borderColor = "var(--border)"; }}
    />
  );
}

export function Textarea(props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      {...props}
      style={{ ...inputBase, resize: "none" }}
      onFocus={(e) => { e.currentTarget.style.borderColor = "rgba(124,58,237,0.5)"; }}
      onBlur={(e) => { e.currentTarget.style.borderColor = "var(--border)"; }}
    />
  );
}

export function Select(props: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select
      {...props}
      style={{ ...inputBase, cursor: "pointer" }}
      onFocus={(e) => { e.currentTarget.style.borderColor = "rgba(124,58,237,0.5)"; }}
      onBlur={(e) => { e.currentTarget.style.borderColor = "var(--border)"; }}
    />
  );
}

export function ModalActions({
  onCancel,
  onSubmit,
  submitLabel = "Save",
  saving = false,
}: {
  onCancel: () => void;
  onSubmit?: () => void;
  submitLabel?: string;
  saving?: boolean;
}) {
  return (
    <div
      className="flex items-center justify-end gap-3 pt-5 mt-5"
      style={{ borderTop: "1px solid var(--border)" }}
    >
      <button
        type="button"
        onClick={onCancel}
        className="px-5 py-2.5 rounded text-sm font-medium transition-colors duration-150"
        style={{ color: "var(--muted-foreground)", border: "1px solid var(--border)" }}
        onMouseEnter={(e) => (e.currentTarget.style.color = "var(--foreground)")}
        onMouseLeave={(e) => (e.currentTarget.style.color = "var(--muted-foreground)")}
      >
        Cancel
      </button>
      <button
        type="submit"
        onClick={onSubmit}
        disabled={saving}
        className="px-5 py-2.5 rounded text-sm font-medium flex items-center gap-2 transition-opacity duration-150"
        style={{ background: "var(--primary)", color: "#fff", opacity: saving ? 0.7 : 1 }}
      >
        {saving ? (
          <>
            <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            Saving...
          </>
        ) : submitLabel}
      </button>
    </div>
  );
}
