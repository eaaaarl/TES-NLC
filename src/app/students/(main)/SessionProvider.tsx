"use client";
import React, {
  createContext,
  useState,
  useEffect,
  ReactNode,
  useContext,
} from "react";

interface StudentInfo {
  firstname: string;
  lastname: string;
  avatarUrl?: string;
}

interface SessionContextType {
  studentInfo: StudentInfo | null;
  loading: boolean;
  error: string | null;
}

export const SessionContext = createContext<SessionContextType>({
  studentInfo: null,
  loading: true,
  error: null,
});

interface SessionProviderProps {
  children: ReactNode;
}

export function SessionProvider({ children }: SessionProviderProps) {
  const [studentInfo, setStudentInfo] = useState<StudentInfo | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchStudentInfo() {
      try {
        const res = await fetch("/api/student/auth/profile");
        if (!res.ok) {
          throw new Error("Failed to fetch student profile");
        }
        const data: StudentInfo = await res.json();
        setStudentInfo(data);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }

    fetchStudentInfo();
  }, []);

  const value: SessionContextType = {
    studentInfo,
    loading,
    error,
  };

  return (
    <SessionContext.Provider value={value}>{children}</SessionContext.Provider>
  );
}

export function useSession() {
  const context = useContext(SessionContext);
  if (!context) {
    throw new Error("useSession must be used within a SessionProvider");
  }
  return context;
}
