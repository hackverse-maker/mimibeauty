import { createContext, useContext, useEffect, useState, useMemo, useCallback, type ReactNode } from "react";
import { toast } from "sonner";

export type User = {
  name: string;
  email: string;
  avatar?: string;
  bio?: string;
};

type AuthCtx = {
  user: User | null;
  isOpen: boolean;
  setIsOpen: (o: boolean) => void;
  mode: "login" | "signup" | "forgot" | "profile" | "reset";
  setMode: (m: "login" | "signup" | "forgot" | "profile" | "reset") => void;
  login: (email: string, pass: string) => Promise<boolean>;
  signup: (name: string, email: string, pass: string) => Promise<boolean>;
  logout: () => void;
  forgotPassword: (email: string) => Promise<boolean>;
  resetPassword: (password: string) => Promise<boolean>;
  updateProfile: (name: string, bio: string) => Promise<boolean>;
};

const Ctx = createContext<AuthCtx | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [mode, setMode] = useState<"login" | "signup" | "forgot" | "profile" | "reset">("login");

  // Load user session on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem("mimi-user");
      if (stored) {
        setUser(JSON.parse(stored));
      }
    } catch (e) {
      console.error("Failed to load user session", e);
    }
  }, []);

  const login = useCallback(async (email: string, pass: string): Promise<boolean> => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    // Simple validation
    if (!email.includes("@")) {
      toast.error("Invalid email address.");
      return false;
    }
    if (pass.length < 4) {
      toast.error("Password must be at least 4 characters.");
      return false;
    }

    const name = email.split("@")[0];
    const loggedUser: User = {
      name: name.charAt(0).toUpperCase() + name.slice(1),
      email,
      bio: "Skincare enthusiast. Devoted to the Mimi Beauty ritual.",
      avatar: `https://api.dicebear.com/7.x/adventurer/svg?seed=${name}`,
    };

    setUser(loggedUser);
    localStorage.setItem("mimi-user", JSON.stringify(loggedUser));
    toast.success(`Welcome back, ${loggedUser.name}!`);
    setIsOpen(false);
    return true;
  }, []);

  const signup = useCallback(async (name: string, email: string, pass: string): Promise<boolean> => {
    await new Promise((resolve) => setTimeout(resolve, 1000));

    if (!name.trim()) {
      toast.error("Please enter your name.");
      return false;
    }
    if (!email.includes("@")) {
      toast.error("Please enter a valid email.");
      return false;
    }
    if (pass.length < 6) {
      toast.error("Password must be at least 6 characters.");
      return false;
    }

    const newUser: User = {
      name,
      email,
      bio: "Just started my Mimi Beauty journey.",
      avatar: `https://api.dicebear.com/7.x/adventurer/svg?seed=${name}`,
    };

    setUser(newUser);
    localStorage.setItem("mimi-user", JSON.stringify(newUser));
    toast.success("Account created successfully!");
    setIsOpen(false);
    return true;
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem("mimi-user");
    toast.success("Logged out successfully.");
    setIsOpen(false);
  }, []);

  const forgotPassword = useCallback(async (email: string): Promise<boolean> => {
    await new Promise((resolve) => setTimeout(resolve, 800));
    if (!email.includes("@")) {
      toast.error("Please enter a valid email address.");
      return false;
    }
    toast.success("Password reset link sent to your email!");
    setMode("reset");
    return true;
  }, []);

  const resetPassword = useCallback(async (password: string): Promise<boolean> => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    if (password.length < 6) {
      toast.error("Password must be at least 6 characters.");
      return false;
    }
    toast.success("Password has been reset successfully. Please log in.");
    setMode("login");
    return true;
  }, []);

  const updateProfile = useCallback(async (name: string, bio: string): Promise<boolean> => {
    await new Promise((resolve) => setTimeout(resolve, 800));
    if (!name.trim()) {
      toast.error("Name cannot be empty.");
      return false;
    }
    
    setUser((prev) => {
      if (!prev) return null;
      const updated = { ...prev, name, bio };
      localStorage.setItem("mimi-user", JSON.stringify(updated));
      return updated;
    });

    toast.success("Profile updated successfully!");
    return true;
  }, []);

  const value = useMemo(() => ({
    user,
    isOpen,
    setIsOpen,
    mode,
    setMode,
    login,
    signup,
    logout,
    forgotPassword,
    resetPassword,
    updateProfile,
  }), [user, isOpen, mode, login, signup, logout, forgotPassword, resetPassword, updateProfile]);

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useAuth() {
  const c = useContext(Ctx);
  if (!c) throw new Error("useAuth outside AuthProvider");
  return c;
}
