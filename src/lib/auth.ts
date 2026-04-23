import { addDBUser } from "./premium-db";

// Simple localStorage-based auth for demo (no real backend)
export interface AuthUser {
  email: string;
  role: "admin" | "user";
  name: string;
}

const AUTH_KEY = "recipe_ai_user";
const TRACKED_USERS_KEY = "recipe_ai_tracked_users";

const trackUser = (email: string, name: string) => {
  const usersStr = localStorage.getItem(TRACKED_USERS_KEY);
  const users: string[] = usersStr ? JSON.parse(usersStr) : [];
  if (!users.includes(email)) {
    users.push(email);
    localStorage.setItem(TRACKED_USERS_KEY, JSON.stringify(users));
  }
  // Also store in IndexedDB for premium features
  addDBUser({ email, name, created_at: new Date().toISOString() }).catch(console.error);
};

export const getTotalUsersCount = (): number => {
  const usersStr = localStorage.getItem(TRACKED_USERS_KEY);
  if (!usersStr) return 0;
  return JSON.parse(usersStr).length;
};

export const login = (email: string, password: string): AuthUser | null => {
  if (email === "admin@recipeai.com" && password === "admin123") {
    const user: AuthUser = { email, role: "admin", name: "Admin" };
    localStorage.setItem(AUTH_KEY, JSON.stringify(user));
    trackUser(email, "Admin");
    return user;
  }
  if (email && password.length >= 4) {
    const name = email.split("@")[0];
    const user: AuthUser = { email, role: "user", name };
    localStorage.setItem(AUTH_KEY, JSON.stringify(user));
    trackUser(email, name);
    return user;
  }
  return null;
};

export const signup = (email: string, password: string, name: string): AuthUser | null => {
  if (email && password.length >= 4 && name) {
    const user: AuthUser = { email, role: "user", name };
    localStorage.setItem(AUTH_KEY, JSON.stringify(user));
    trackUser(email, name);
    return user;
  }
  return null;
};

export const logout = () => localStorage.removeItem(AUTH_KEY);

export const getUser = (): AuthUser | null => {
  const raw = localStorage.getItem(AUTH_KEY);
  try {
    return raw ? JSON.parse(raw) : null;
  } catch (e) {
    return null;
  }
};

export const isAdmin = (): boolean => getUser()?.role === "admin";
