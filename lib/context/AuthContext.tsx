"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import { User } from "@supabase/supabase-js";
import { createClient } from "@/lib/supabase/client";
import { UserProfile } from "@/lib/types";

interface AuthContextType {
  user: User | null;
  profile: UserProfile | null;
  isAdmin: boolean;
  isLoading: boolean;
  signOut: () => Promise<void>;
  refreshProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const supabase = createClient();

  const fetchProfile = useCallback(
    async (userId: string, currentUser?: User | null) => {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", userId)
        .maybeSingle();

      if (error) {
        console.error("Error fetching profile:", error);
      }

      if (data) {
        setProfile(data as UserProfile);
      } else {
        // Auto-heal missing profile for OAuth or pre-existing auth users
        const activeUser = currentUser || (await supabase.auth.getUser()).data.user;
        if (activeUser && activeUser.id === userId) {
          const { data: newProfile, error: insertError } = await supabase
            .from("profiles")
            .upsert({
              id: userId,
              email: activeUser.email || '',
              full_name: (activeUser.user_metadata?.full_name as string) || (activeUser.user_metadata?.name as string) || null,
              avatar_url: (activeUser.user_metadata?.avatar_url as string) || (activeUser.user_metadata?.picture as string) || null,
              is_loyalty_member: true,
            })
            .select()
            .maybeSingle();

          if (!insertError && newProfile) {
            setProfile(newProfile as UserProfile);
          }
        }
      }

      // Check admin status via API route
      try {
        const res = await fetch("/api/admin", {
          cache: "no-store",
          credentials: "include",
        });
        if (res.ok) {
          const { isAdmin: adminStatus } = await res.json();
          setIsAdmin(adminStatus);
        } else {
          setIsAdmin(false);
        }
      } catch {
        setIsAdmin(false);
      }
    },
    [supabase]
  );

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        fetchProfile(session.user.id, session.user).finally(() => setIsLoading(false));
      } else {
        setIsLoading(false);
      }
    });

    // Listen for auth state changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        fetchProfile(session.user.id, session.user);
      } else {
        setProfile(null);
        setIsAdmin(false);
      }
    });

    return () => subscription.unsubscribe();
  }, [supabase, fetchProfile]);

  const signOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setProfile(null);
    setIsAdmin(false);
  };

  const refreshProfile = useCallback(async () => {
    if (user) {
      await fetchProfile(user.id, user);
    }
  }, [user, fetchProfile]);

  return (
    <AuthContext.Provider value={{ user, profile, isAdmin, isLoading, signOut, refreshProfile }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
