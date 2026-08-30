"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { api } from "@/lib/api";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  // Load session from localStorage on mount
  useEffect(() => {
    const initAuth = async () => {
      const savedToken = localStorage.getItem("zubyte_token");
      const savedUser = localStorage.getItem("zubyte_user");

      if (savedToken && savedUser) {
        try {
          setToken(savedToken);
          setUser(JSON.parse(savedUser));

          // Validate token in background
          const profile = await api.auth.getMe().catch(() => null);
          if (profile?.data) {
            setUser(profile.data);
            localStorage.setItem("zubyte_user", JSON.stringify(profile.data));
          } else {
            logout();
          }
        } catch (e) {
          logout();
        }
      }
      setIsLoading(false);
    };

    initAuth();
  }, []);

  // Protected route guard
  useEffect(() => {
    if (isLoading) return;

    const isAdminRoute = pathname?.startsWith("/admin");
    const isLoginPage = pathname === "/admin/login";

    if (isAdminRoute && !isLoginPage && !user) {
      router.push("/admin/login");
    } else if (isLoginPage && user) {
      router.push("/admin");
    }
  }, [pathname, user, isLoading, router]);

  const login = async (identifier, password) => {
    try {
      const res = await api.auth.login(identifier, password);
      if (res.data?.token && res.data?.user) {
        localStorage.setItem("zubyte_token", res.data.token);
        localStorage.setItem("zubyte_user", JSON.stringify(res.data.user));
        setToken(res.data.token);
        setUser(res.data.user);
        router.push("/admin");
        return { success: true, user: res.data.user, message: res.message };
      }
      throw new Error("Invalid response from server");
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const logout = () => {
    localStorage.removeItem("zubyte_token");
    localStorage.removeItem("zubyte_user");
    setToken(null);
    setUser(null);
    router.push("/admin/login");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        role: user?.role || null,
        token,
        isAuthenticated: !!user,
        isLoading,
        isAdmin: user?.role === "admin",
        isDeveloper: user?.role === "developer",
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

