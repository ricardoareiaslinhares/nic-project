import { useState, useEffect } from "react";
import {
  LS_TOKEN,
  LS_REFRESH_TOKEN,
  LS_TOKEN_TIMESTAMP,
  TOKEN_LIFESPAN,
} from "../../constants/constants";
import { api } from "../config";

export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const checkAuth = async () => {
    const { token, tokenTimestamp } = getTokenAndTimestamp(
      LS_TOKEN,
      LS_TOKEN_TIMESTAMP
    );

    if (!token || !tokenTimestamp) {
      setIsAuthenticated(false);
      return;
    }

    if (isTokenValid(TOKEN_LIFESPAN, Number(tokenTimestamp))) {
      setIsAuthenticated(true);
      return;
    }

    const refreshToken = localStorage.getItem(LS_REFRESH_TOKEN);
    if (!refreshToken) {
      localLogout();
      return;
    }
    const refreshSuccess = await refreshLogin(
      refreshToken,
      LS_TOKEN,
      LS_TOKEN_TIMESTAMP
    );
    setIsAuthenticated(refreshSuccess);
    if (!refreshSuccess) localLogout();
  };

  useEffect(() => {
    checkAuth();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const response = await api.post("/auth/login", { email, password });
      const data = response.data.data;

      localStorage.setItem(LS_TOKEN, data.access_token);
      localStorage.setItem(LS_REFRESH_TOKEN, data.refresh_token);
      localStorage.setItem(LS_TOKEN_TIMESTAMP, String(Date.now()));

      setIsAuthenticated(true);
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  const localLogout = () => {
    localStorage.removeItem(LS_TOKEN);
    localStorage.removeItem(LS_REFRESH_TOKEN);
    localStorage.removeItem(LS_TOKEN_TIMESTAMP);
    setIsAuthenticated(false);
  };

  const logout = async () => {
    const refreshToken = localStorage.getItem(LS_REFRESH_TOKEN);
    if (refreshToken) {
      try {
        await api.post("/auth/logout", { refresh_token: refreshToken });
      } catch (error) {
        console.error("Logout failed:", error);
      }
    }
    localLogout();
  };

  return { isAuthenticated, login, logout };
};

// Helper functions
const isTokenValid = (tokenLifeSpan: number, tokenTimestamp: number) => {
  if (!tokenLifeSpan || tokenLifeSpan === 0) return false;
  const elapsedTime = Date.now() - Number(tokenTimestamp);
  return elapsedTime < tokenLifeSpan;
};

const getTokenAndTimestamp = (
  tokenName: string,
  tokenTimeStampName: string
) => {
  const token = localStorage.getItem(tokenName);
  const tokenTimestamp = localStorage.getItem(tokenTimeStampName);
  return { token, tokenTimestamp };
};

const refreshLogin = async (
  refreshToken: string,
  tokenName: string,
  tokenTimeStampName: string
) => {
  try {
    const { data } = await api.post("/auth/refresh", {
      refresh_token: refreshToken,
    });
    localStorage.setItem(tokenName, data.access_token);
    localStorage.setItem(tokenTimeStampName, String(Date.now()));
    return true;
  } catch (error) {
    console.error("Refresh token expired,", error);
    return false;
  }
};
// ---
