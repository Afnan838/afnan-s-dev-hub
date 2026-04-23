// Simple localStorage-based auth for demo (no real backend)
export interface AuthUser {
  email: string;
  role: "admin" | "user";
  name: string;
}

const AUTH_KEY = "recipe_ai_user";
const ALL_USERS_KEY = "recipe_ai_all_users";

const trackUser = (user: AuthUser) => {
  try {
    const allUsers = JSON.parse(localStorage.getItem(ALL_USERS_KEY) || "[]") as AuthUser[];
    const exists = allUsers.some(u => u.email === user.email);
    if (!exists) {
      allUsers.push(user);
      localStorage.setItem(ALL_USERS_KEY, JSON.stringify(allUsers));
    }
  } catch (e) {
    console.error("Error tracking user:", e);
  }
};

export const login = (email: string, password: string): AuthUser | null => {
  // Demo admin credentials
  if (email === "admin@recipeai.com" && password === "admin123") {
    const user: AuthUser = { email, role: "admin", name: "Admin" };
    localStorage.setItem(AUTH_KEY, JSON.stringify(user));
    trackUser(user);
    return user;
  }
  // Any other credentials → regular user
  if (email && password.length >= 4) {
    const user: AuthUser = { email, role: "user", name: email.split("@")[0] };
    localStorage.setItem(AUTH_KEY, JSON.stringify(user));
    trackUser(user);
    return user;
  }
  return null;
};

export const signup = (email: string, password: string, name: string): AuthUser | null => {
  if (email && password.length >= 4 && name) {
    const user: AuthUser = { email, role: "user", name };
    localStorage.setItem(AUTH_KEY, JSON.stringify(user));
    trackUser(user);
    return user;
  }
  return null;
};

export const logout = () => localStorage.removeItem(AUTH_KEY);

export const getUser = (): AuthUser | null => {
  const raw = localStorage.getItem(AUTH_KEY);
  return raw ? JSON.parse(raw) : null;
};

export const isAdmin = (): boolean => getUser()?.role === "admin";
