import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import styles from "./Login.module.css";

const Login = () => {
  const { login, register } = useAuth();
  const navigate = useNavigate();

  const [isRegister, setIsRegister] = useState(false);

  // Campos de cadastro
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [cpf, setCpf] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [cep, setCep] = useState("");
  const [cellphone, setCellphone] = useState("");
  const [birthDate, setBirthDate] = useState("");

  const [error, setError] = useState("");

  const validateEmail = (email) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const validateCPF = (cpf) =>
    /^\d{3}\.\d{3}\.\d{3}-\d{2}$/.test(cpf);

  const validateCEP = (cep) =>
    /^\d{5}-\d{3}$/.test(cep);

  const validateCell = (cell) =>
    /^\(\d{2}\)\s\d{4,5}-\d{4}$/.test(cell);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (isRegister) {
      // Verifica campos vazios
      if (!name || !email || !cpf || !password || !address || !cep || !cellphone || !birthDate) {
        setError("Preencha todos os campos.");
        return;
      }
      if (!validateEmail(email)) {
        setError("Email inválido.");
        return;
      }
      if (!validateCPF(cpf)) {
        setError("CPF inválido. Use o formato XXX.XXX.XXX-XX");
        return;
      }
      if (!validateCEP(cep)) {
        setError("CEP inválido. Use o formato XXXXX-XXX");
        return;
      }
      if (!validateCell(cellphone)) {
        setError("Celular inválido. Use o formato (XX) XXXXX-XXXX");
        return;
      }
      if (password.length < 6) {
        setError("Senha deve ter no mínimo 6 caracteres.");
        return;
      }

      const result = register({ name, email, cpf, senha: password, address, cep, cellphone, birthDate });
      if (!result.success) {
        setError(result.error);
        return;
      }

      alert("Cadastro realizado com sucesso!");
      navigate("/"); // redireciona para Home
    } else {
      // Login
      if (!cpf || !password) {
        setError("Preencha CPF e senha.");
        return;
      }
      const result = login(cpf, password);
      if (!result.success) {
        setError(result.error);
        return;
      }
      navigate("/"); // redireciona para Home
    }
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <h2>{isRegister ? "Cadastro" : "Login"}</h2>
        {error && <p className={styles.error}>{error}</p>}

        {isRegister && (
          <>
            <input type="text" placeholder="Nome completo" value={name} onChange={e => setName(e.target.value)} />
            <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
            <input type="text" placeholder="CPF (XXX.XXX.XXX-XX)" value={cpf} onChange={e => setCpf(e.target.value)} />
            <input type="password" placeholder="Senha (mínimo 6 caracteres)" value={password} onChange={e => setPassword(e.target.value)} />
            <input type="text" placeholder="Endereço" value={address} onChange={e => setAddress(e.target.value)} />
            <input type="text" placeholder="CEP (XXXXX-XXX)" value={cep} onChange={e => setCep(e.target.value)} />
            <input type="text" placeholder="Celular ((XX) XXXXX-XXXX)" value={cellphone} onChange={e => setCellphone(e.target.value)} />
            <input type="date" placeholder="Data de nascimento" value={birthDate} onChange={e => setBirthDate(e.target.value)} />
          </>
        )}

        {!isRegister && (
          <>
            <input type="text" placeholder="CPF (XXX.XXX.XXX-XX)" value={cpf} onChange={e => setCpf(e.target.value)} />
            <input type="password" placeholder="Senha" value={password} onChange={e => setPassword(e.target.value)} />
          </>
        )}

        <button type="submit">{isRegister ? "Cadastrar" : "Entrar"}</button>

        <p className={styles.toggle} onClick={() => { setIsRegister(!isRegister); setError(""); }}>
          {isRegister ? "Já possui cadastro? Faça login" : "Não possui cadastro? Cadastre-se"}
        </p>
      </form>
    </div>
  );
};

export default Login;
