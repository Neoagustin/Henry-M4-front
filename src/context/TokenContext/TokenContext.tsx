"use client";

// context/TokenContext.tsx
import React, { createContext, useState, useContext, ReactNode } from "react";
import { ITokenContext } from "./types";

const TokenContext = createContext<ITokenContext | undefined>(undefined);

export const TokenProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [token, setToken] = useState<string | null>(
    typeof window !== "undefined" ? localStorage.getItem("userToken") : null
  );

  return <TokenContext.Provider value={{ token, setToken }}>{children}</TokenContext.Provider>;
};

export const useToken = () => {
  const context = useContext(TokenContext);
  if (!context) {
    throw new Error("useToken must be used within a TokenProvider");
  }
  return context;
};
