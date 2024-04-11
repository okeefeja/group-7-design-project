import React from "react";
import { User } from "./types/API";

const AuthContext = React.createContext<
  [User | null, React.Dispatch<React.SetStateAction<User | null>>]
>([null, () => {}]);

export const AuthProvider = ({ children }: React.PropsWithChildren) => {
  const state = React.useState<User | null>(null);
  return <AuthContext.Provider value={state}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const [user, setUser] = React.useContext(AuthContext);
  if (typeof user == "undefined") {
    throw new Error("Missing AuthProvider");
  }
  return { user, setUser };
};
