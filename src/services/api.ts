import type {
  AuthResponse,
  Certification,
  Contact,
  Education,
  Experience,
  Profile,
  Project,
  Skill,
  SkillCategory,
} from "../types/api";

const API_BASE =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:5001/api/v1";

async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  const isBodyRequest = options.body !== undefined;

  const response = await fetch(`${API_BASE}${path}`, {
    credentials: "include",
    headers: {
      ...(isBodyRequest ? { "Content-Type": "application/json" } : {}),
      ...(options.headers ?? {}),
    },
    ...options,
  });

  const contentType = response.headers.get("content-type") || "";
  const payload = contentType.includes("application/json")
    ? await response.json()
    : await response.text();

  if (!response.ok) {
    throw new Error(
      typeof payload === "string"
        ? payload
        : payload?.message || "Request failed",
    );
  }

  return (payload ?? null) as T;
}

export const authApi = {
  login: (data: { email: string; password: string }) =>
    request<AuthResponse>("/auth/login", {
      method: "POST",
      body: JSON.stringify(data),
    }),
  register: (data: { email: string; password: string }) =>
    request<{ message: string }>("/auth/register", {
      method: "POST",
      body: JSON.stringify(data),
    }),
  me: () => request<Profile>("/auth/me"),
  meByEmail: (email: string) => request<Profile>(`/auth/me/${email}`),
  logout: () =>
    request<{ message: string }>("/auth/logout", {
      method: "POST",
    }),
  updateProfile: (data: Partial<Profile>) =>
    request<{ message: string }>("/auth/update", {
      method: "PATCH",
      body: JSON.stringify(data),
    }),
};

export const projectApi = {
  list: () => request<Project[]>("/projects"),
  get: (id: number) => request<Project>(`/projects/${id}`),
  create: (data: Partial<Project>) =>
    request<Project>("/projects", {
      method: "POST",
      body: JSON.stringify(data),
    }),
  update: (id: number, data: Partial<Project>) =>
    request<Project>(`/projects/${id}`, {
      method: "PATCH",
      body: JSON.stringify(data),
    }),
  remove: (id: number) =>
    request<{ message: string }>(`/projects/${id}`, {
      method: "DELETE",
    }),
};

export const experienceApi = {
  list: () => request<Experience[]>("/experiences"),
  create: (data: Partial<Experience>) =>
    request<Experience>("/experiences", {
      method: "POST",
      body: JSON.stringify(data),
    }),
  update: (id: number, data: Partial<Experience>) =>
    request<Experience>(`/experiences/${id}`, {
      method: "PATCH",
      body: JSON.stringify(data),
    }),
  remove: (id: number) =>
    request<{ message: string }>(`/experiences/${id}`, {
      method: "DELETE",
    }),
};

export const skillApi = {
  list: () => request<Skill[]>("/skills"),
  create: (data: Partial<Skill>) =>
    request<Skill>("/skills", {
      method: "POST",
      body: JSON.stringify(data),
    }),
  update: (id: number, data: Partial<Skill>) =>
    request<Skill>(`/skills/${id}`, {
      method: "PATCH",
      body: JSON.stringify(data),
    }),
  remove: (id: number) =>
    request<{ message: string }>(`/skills/${id}`, {
      method: "DELETE",
    }),
};

export const educationApi = {
  list: () => request<Education[]>("/education"),
  create: (data: Partial<Education>) =>
    request<Education>("/education", {
      method: "POST",
      body: JSON.stringify(data),
    }),
  update: (id: number, data: Partial<Education>) =>
    request<Education>(`/education/${id}`, {
      method: "PATCH",
      body: JSON.stringify(data),
    }),
  remove: (id: number) =>
    request<{ message: string }>(`/education/${id}`, {
      method: "DELETE",
    }),
};

export const certificationApi = {
  list: () => request<Certification[]>("/certifications"),
  create: (data: Partial<Certification>) =>
    request<Certification>("/certifications", {
      method: "POST",
      body: JSON.stringify(data),
    }),
  update: (id: number, data: Partial<Certification>) =>
    request<Certification>(`/certifications/${id}`, {
      method: "PATCH",
      body: JSON.stringify(data),
    }),
  remove: (id: number) =>
    request<{ message: string }>(`/certifications/${id}`, {
      method: "DELETE",
    }),
};

export const contactApi = {
  list: () => request<Contact[]>("/contacts"),
  create: (data: Partial<Contact>) =>
    request<Contact>("/contacts", {
      method: "POST",
      body: JSON.stringify(data),
    }),
  update: (id: number, data: Partial<Contact>) =>
    request<Contact>(`/contacts/${id}`, {
      method: "PATCH",
      body: JSON.stringify(data),
    }),
  remove: (id: number) =>
    request<{ message: string }>(`/contacts/${id}`, {
      method: "DELETE",
    }),
  markAsRead: (id: number) =>
    request<Contact>(`/contacts/${id}/read`, {
      method: "PATCH",
    }),
};

export const skillCategoryService = {
  parse: (items: Skill[]): SkillCategory[] => {
    const grouped = new Map<
      string,
      {
        category: string;
        icon: string;
        skills: Array<{ name: string; level: number }>;
      }
    >();

    items.forEach((skill) => {
      const key = skill.category || "Other";
      const current = grouped.get(key) ?? {
        category: key,
        icon: "◇",
        skills: [],
      };

      current.skills.push({ name: skill.name, level: skill.level });
      grouped.set(key, current);
    });

    return Array.from(grouped.values()).map((group) => ({
      category: group.category,
      icon: group.icon,
      skills: group.skills,
    }));
  },
};
