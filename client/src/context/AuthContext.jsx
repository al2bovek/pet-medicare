import { createContext, useContext, useEffect, useState } from "react";
import { getMe } from "../api/auth.js";


export const AuthContext = createContext(null);

export function useAuth() {
  return useContext(AuthContext);
}

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

// console.log(user);

  const loadUser = async () => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      setLoading(false);
      return;
    }
    try {
      const me = await getMe();
      setUser(me.data);
    } catch {
      setUser(null);
    }
    setLoading(false);
  };

  const logout = () => {
    localStorage.removeItem("accessToken");
    setUser(null);
  };


  useEffect(() => {
    let isMounted = true;

    const init = async () => {
      if (!isMounted) return;
      await loadUser();
    };

    init();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, loading, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
