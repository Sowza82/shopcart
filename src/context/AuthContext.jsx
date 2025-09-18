import { createContext, useContext, useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Recupera usuário logado ao iniciar
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) setUser(JSON.parse(savedUser));
  }, []);

  const saveUser = (data) => {
    setUser(data);
    localStorage.setItem("user", JSON.stringify(data));
  };

  const getUsers = () => {
    const users = localStorage.getItem("users");
    return users ? JSON.parse(users) : [];
  };

  const saveUsers = (users) => localStorage.setItem("users", JSON.stringify(users));

  const register = (newUserData) => {
    let users = getUsers();

    // Verifica se já existe cpf ou email
    if (users.some((u) => u.cpf === newUserData.cpf))
      return { success: false, error: "CPF já cadastrado" };
    if (users.some((u) => u.email === newUserData.email))
      return { success: false, error: "Email já cadastrado" };

    const userWithId = { id: uuidv4(), ...newUserData };
    users.push(userWithId);
    saveUsers(users);
    saveUser(userWithId);
    return { success: true };
  };

  const login = (cpf, senha) => {
    const users = getUsers();
    const found = users.find((u) => u.cpf === cpf && u.senha === senha);
    if (found) {
      saveUser(found);
      return { success: true };
    }
    return { success: false, error: "Usuário não encontrado" };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  const isLogged = () => !!user;

  return (
    <AuthContext.Provider value={{ user, register, login, logout, isLogged }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
