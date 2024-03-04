import { createContext, useContext, useEffect, useState } from "react";
import { UserProfileRes } from "./user.interface";
import { BASE_URL } from "../config/endpoints";
import Loading from "../components/loading/loading";

interface User extends UserProfileRes {
  email: string;
  firstName: string;
}

interface AuthContextProps {
  user: User | null;
  login: (
    email: string,
    password: string,
    onErr?: (msg: string) => void
  ) => Promise<void>;
  register: (
    firstName: string,
    email: string,
    password: string,
    onErr?: (msg: string) => void,
    onSuccess?: (msg: string) => void
  ) => Promise<void>;
  logout: () => void;
  isLogin: boolean;
  setIsLogin: React.Dispatch<React.SetStateAction<boolean>>;
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  autoLogin: () => Promise<void>;
}

const AuthContext = createContext<AuthContextProps>({
  user: null,
  login: () => Promise.resolve(),
  register: () => Promise.resolve(),
  logout: () => {},
  isLogin: false,
  setIsLogin: () => {},
  isLoading: false,
  setIsLoading: () => {},
  autoLogin: () => Promise.resolve(),
});

export const AuthProvider = ({
  children,
}: React.PropsWithChildren<unknown>) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLogin, setIsLogin] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const autoLogin = async () => {
    const token = localStorage.getItem("accesstoken");
    if (token) {
      setIsLoading(true)
      // Validate token and fetch user details
      const url = BASE_URL + "/profile";
      const response = await (
        await fetch(url, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        })
      ).json();
      if (response?.hasError) {
        setIsLogin(false);
        logout();
        return;
      }
      setIsLogin(true);
      setIsLoading(false);
      setUser((p: any) => ({ ...p, ...response.data }));
    }
  };
  

  useEffect(() => {
    // Check if user is already logged in
    autoLogin();
  }, []);

  const register = async (
    firstName: string,
    email: string,
    password: string,
    onErr?: (errMsg: string) => void,
    onSuccess?: (msg: string) => void
  ) => {
    try {
      const url = BASE_URL + "/auth/register";
      const response = await (
        await fetch(url, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ firstName, email, password }),
        })
      ).json();
      const { data, hasError, message } = response;
      console.log({ data, hasError, message });
      if (hasError) {
        onErr && onErr(message || "Something went wrong");
        return;
      }
      localStorage.setItem("accesstoken", data.accessToken);
      setIsLogin(true);
      data?.firstName &&
        setUser((p: any) => ({ ...p, firstName: response?.data?.firstName }));
      onSuccess && onSuccess(message || "Registration successful");
    } catch (error: any) {
      onErr && onErr(error.message);
      console.error("Registration failed:", error);
    }
  };

  const login = async (
    email: string,
    password: string,
    onErr?: (errMsg: string) => void
  ) => {
    try {
      const url = BASE_URL + "/auth/login";
      setIsLoading(true)
      const response = await (
        await fetch(url, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        })
      ).json();
      const { data, hasError, message } = response;
      console.log(data);
      if (hasError) {
        setIsLoading(false);
        onErr && onErr(message || "Something went wrong");
        return;
      }
      localStorage.setItem("accesstoken", data.accessToken);
      setIsLogin(true);
      data?.firstName &&
        setUser((p: any) => ({ ...p, firstName: response?.data?.firstName }));
        setIsLoading(false);
    } catch (error: any) {
      onErr && onErr(error.message);
      setIsLoading(false);
      console.error("Login failed:", error);
    }
  };

  const logout = () => {
    console.log("I was called ")
    localStorage.removeItem("accesstoken");
    setUser(null);
    setIsLogin(false);
  };

  return (
    <AuthContext.Provider
      value={{ user, login, logout, isLogin, setIsLogin, register, isLoading, setIsLoading, autoLogin }}
    >
      {children}
      <Loading show={isLoading} />
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

export default AuthProvider;
