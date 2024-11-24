import { useState } from "react";
import { api } from "@/lib/apiWrapper";
import { Link } from "react-router-dom";

export default function SignUpPage() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");
  const [endereco, setEndereco] = useState("");
  const [senha, setSenha] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignUp = async (event) => {
    event.preventDefault();

    setLoading(true);
    setError("");

    try {
      const response = await api.post("signup", {
        nome,
        email,
        telefone,
        endereco,
        senha,
      });

      if (response.status === 201) {
        console.log("Cadastro bem-sucedido", response.data);
      }
    } catch (err) {
      setError("Erro ao realizar cadastro. Verifique os dados.");
      console.error("Erro no cadastro:", err.response?.data || err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-grow flex items-center justify-center gap-16">
        <div className="w-[244px] h-[790px] rounded-lg bg-primary-400" />

        <div className=" max-w-lg bg-white p-8 rounded-lg border border-primary-400 shadow-lg w-[420px]">
          <div className="flex flex-col gap-3 mb-6">
            <h2 className="text-3xl font-bold text-gray-800 ">Cadastrar-se</h2>
            <p>
              Com uma conta, você poderá adotar um pet e transformar a vida dele
              para melhor!
            </p>
          </div>

          <form onSubmit={handleSignUp}>
            <div className="mb-6">
              <label
                htmlFor="nome"
                className="block text-sm font-medium text-gray-700"
              >
                Nome
              </label>
              <input
                type="text"
                id="nome"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                className="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:ring-[#7DA632] focus:border-[#7DA632] p-4 text-lg"
                placeholder="Digite seu nome"
                required
              />
            </div>

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
                htmlFor="telefone"
                className="block text-sm font-medium text-gray-700"
              >
                Telefone
              </label>
              <input
                type="text"
                id="telefone"
                value={telefone}
                onChange={(e) => setTelefone(e.target.value)}
                className="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:ring-[#7DA632] focus:border-[#7DA632] p-4 text-lg"
                placeholder="Digite seu telefone"
                required
              />
            </div>

            <div className="mb-6">
              <label
                htmlFor="endereco"
                className="block text-sm font-medium text-gray-700"
              >
                Endereço
              </label>
              <input
                type="text"
                id="endereco"
                value={endereco}
                onChange={(e) => setEndereco(e.target.value)}
                className="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:ring-[#7DA632] focus:border-[#7DA632] p-4 text-lg"
                placeholder="Digite seu endereço"
                required
              />
            </div>

            <div className="mb-6">
              <label
                htmlFor="senha"
                className="block text-sm font-medium text-gray-700"
              >
                Senha
              </label>
              <input
                type="password"
                id="senha"
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

            <div className="mb-6">
              <button
                type="submit"
                className="w-full bg-[#7DA632] text-white font-semibold py-3 px-4 rounded-md shadow-lg hover:bg-[#6b9132] transition duration-200"
                disabled={loading}
              >
                {loading ? "Carregando..." : "Cadastrar"}
              </button>
            </div>

            <div className="flex justify-between items-center mb-6">
              <Link to={'/login'} className="text-sm text-[#7DA632] hover:underline">
                Já tem uma conta? Entre aqui!
              </Link>
            </div>
          </form>
        </div>
        <div className="w-[244px] h-[790px] rounded-lg bg-primary-400" />
      </div>
    </div>
  );
}
