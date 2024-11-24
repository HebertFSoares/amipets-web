import { useState } from "react";
import { api } from "@/lib/apiWrapper";
import { Link } from "react-router-dom";
import { Button } from "../components/ui/button";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (event) => {
    event.preventDefault();

    setLoading(true);
    setError("");

    try {
      const response = await api.post("login", {
        email,
        senha,
      });

      if (response.status === 200) {
        console.log("Login bem-sucedido", response.data);
        localStorage.setItem("authToken", response.data.token);
      }
    } catch (err) {
      setError("Erro ao fazer login. Verifique suas credenciais.");
      console.error("Erro no login:", err.response?.data || err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-grow flex items-center justify-center gap-16">
        <div className="w-[244px] h-[450px] rounded-lg bg-primary-400" />
        <div className=" max-w-lg bg-white p-8 rounded-lg border border-primary-400 shadow-lg w-[420px]">
          <div className="flex flex-col gap-2 mb-6 ">
            <h2 className="text-3xl font-bold text-gray-800">Entrar</h2>
            <p>Que bom receber você novamente!</p>
          </div>

          <form onSubmit={handleLogin}>
            <div className="mb-6">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
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
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
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

            {error && (
              <p className="text-red-500 text-sm text-center mb-4">{error}</p>
            )}

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
        <div className="w-[244px] h-[450px] rounded-lg bg-primary-400" />
      </div>
    </div>
  );
}
