import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { authClient } from "../lib/auth";
import type { User } from "@neondatabase/neon-js/auth/types";
import type { UserProfile } from "../types";
import { api } from "../lib/api";

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  profile: UserProfile | null;
  plan: any | null;
  saveProfile: (profile:Omit<UserProfile, "userId" | 'updatedAt'>) => Promise<void>;
  generatePlan: () => Promise<void>;
  fetchProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export default function AuthProvider({ children }: { children: ReactNode }) {
  const [neonUser, setNeonUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [plan, setPlan] = useState<any | null>(null);

  useEffect(() => {
    (async function loadUser() {
      try {
        const result = await authClient.getSession();
        if (result && result.data?.user) {
          setNeonUser(result.data.user);
        } else {
          setNeonUser(null);
        }
      } catch (err) {
        setNeonUser(null);
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  async function saveProfile(profileData:Omit<UserProfile, "userId" | 'updatedAt'>) {
    if(!neonUser) {
      throw new Error("User must be authenticated to save profile");
    }
    
    const response = await api.saveProfile(neonUser.id, profileData);
    setProfile(response.profile);
  }

  async function fetchProfile() {
    if (!neonUser) return;
    try {
      const response = await api.getProfile(neonUser.id);
      setProfile(response);
    } catch (error) {
      console.error("Failed to fetch profile:", error);
    }
  }

  async function generatePlan() {
    if (!neonUser) {
      throw new Error("User must be authenticated to generate plan");
    }
    const response = await api.generatePlan(neonUser.id);
    setPlan(response.plan);
  }
  
  return (
    <AuthContext.Provider value={{ user: neonUser, isLoading, profile, plan, saveProfile, generatePlan, fetchProfile }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
}
