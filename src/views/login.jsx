import { useState } from "react";
import { api } from "@/lib/apiHandler";

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
    <div className="flex flex-col min-h-screen bg-gray-50">
      <div className="flex-grow flex items-center justify-center">
        <div className="w-full max-w-lg bg-white p-8 rounded-lg shadow-lg">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Entrar</h2>

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

            <div className="mb-6">
              <button
                type="submit"
                className="w-full bg-[#7DA632] text-white font-semibold py-3 px-4 rounded-md shadow-lg hover:bg-[#6b9132] transition duration-200"
                disabled={loading}
              >
                {loading ? "Carregando..." : "Entrar"}
              </button>
            </div>

            <div className="flex justify-between items-center mb-6">
              <a href="#" className="text-sm text-[#7DA632] hover:underline">
                Esqueci minha senha
              </a>
              <a href="#" className="text-sm text-[#7DA632] hover:underline">
                Ainda não é registrado? Clique aqui!
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
