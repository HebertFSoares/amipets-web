import { useState, useEffect } from "react";
import { api } from "@/lib/apiWrapper";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Button } from "../components/ui/button";
import { useAuth } from "@/hooks/auth/AuthProvider";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const navigate = useNavigate();
  const location = useLocation(); 
  const user = useAuth();

  useEffect(() => {
    const savedEmail = localStorage.getItem("userEmail");
    if (savedEmail) {
      setEmail(savedEmail);
    }

    if (location.state?.message) {
      setMessage(location.state.message);
    }
  }, [location]);

  const handleLogin = async (event) => {
    event.preventDefault();

    if (!email || !senha) {
      setError("Por favor, preencha todos os campos.");
      return;
    }

    setLoading(true);
    setError("");
    setMessage("");

    try {
      const response = await api.post("login", {
        email,
        senha,
      });

      if (response.status === 200) {
        console.log("Login bem-sucedido", response.data);
        setMessage("Login realizado com sucesso! Redirecionando...");
        user.login(response.data);
        navigate("/");
      }
    } catch (err) {
      if (err.response?.status === 401) {
        setError("Credenciais incorretas. Verifique o e-mail e senha.");
      } else {
        setError("Erro ao fazer login. Tente novamente.");
      }
      console.error("Erro no login:", err.response?.data || err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-grow flex items-center justify-center gap-8 sm:gap-12 md:gap-16">
        <div className="w-[244px] h-[450px] rounded-lg bg-primary-400 hidden sm:block" />

        <div className="max-w-lg w-full bg-white p-8 rounded-lg border border-primary-400 shadow-lg">
          <div className="flex flex-col gap-2 mb-6">
            <h2 className="text-3xl font-bold text-gray-800">Entrar</h2>
            <p>Que bom receber você novamente!</p>
          </div>

          <form onSubmit={handleLogin}>
            <div className="mb-6">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                E-mail
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:ring-[#7DA632] focus:border-[#7DA632] p-4 text-lg"
                placeholder="Digite seu e-mail"
                required
              />
            </div>

            <div className="mb-6">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Senha
              </label>
              <input
                type="password"
                id="password"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                className="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:ring-[#7DA632] focus:border-[#7DA632] p-4 text-lg"
                placeholder="Digite sua senha"
                required
              />
            </div>

            {error && <p className="text-red-500 text-sm text-center mb-4">{error}</p>}
            {message && <p className="text-primary-300 text-sm text-center mb-4">{message}</p>}

            <div className="flex flex-col mb-6 gap-2">
              <Button
                type="submit"
                className="w-full bg-primary-400 text-white font-semibold py-3 px-4 rounded-md shadow-lg hover:bg-primary-300 transition duration-200"
                disabled={loading}
              >
                {loading ? "Carregando..." : "Entrar"}
              </Button>
              <Button className="w-full bg-primary-700 text-gray-800 font-semibold py-3 px-4 rounded-md shadow-lg hover:bg-primary-500 transition duration-200">
                <Link to={"/registrar"}>Crie uma conta</Link>
              </Button>
            </div>

            <div className="flex justify-between items-center mb-6">
              <a href="#" className="text-sm text-[#7DA632] hover:underline">
                Esqueci minha senha
              </a>
            </div>
          </form>
        </div>

        <div className="w-[244px] h-[450px] rounded-lg bg-primary-400 hidden sm:block" />
      </div>
    </div>
  );
}
