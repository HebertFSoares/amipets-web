import { useAuth } from "@/hooks/auth/AuthProvider"
import { api } from "@/lib/apiWrapper";
import { useEffect, useState } from "react";

export default function UserEditarPage() {
    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [telefone, setTelefone] = useState("");
    const [endereco, setEndereco] = useState("");
    const [novasenha, setNovaSenha] = useState("");
    const [novasenha2, setNovaSenha2] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [userData, setUserData] = useState({
        nome: "",
        email: "",
        telefone: "",
        endereco: ""
    });
    const user = useAuth();

    useEffect(() => {
        const getUser = async () => {
            try {
                const response = await api.get(`adotante/${user.user.userId}`, {
                    headers: { Authorization: `Bearer ${user.token}` }
                });
                setUserData(response.data)
            } catch (error) {
                console.error("Erro obtendo usuário!", error)
            }
        }
        getUser();

    }, [user])

    const handleSubmitAll = async (event) => {
        event.preventDefault();

        setLoading(true);
        setError("");
        try {
            const data = {
                nome: nome || userData.nome,
                email: email || userData.email,
                telefone: telefone || userData.telefone,
                endereco: endereco || userData.endereco
            }

            if(novasenha){
                if(novasenha != novasenha2){
                    setError("As senhas não coincidem!")
                    throw new Error("Senhas não coincidem")
                }
                data.senha = novasenha;
            }
            const response = await api.put(`adotante/${user.user.userId}`, data, {
                headers: { Authorization: `Bearer ${user.token}`}
            })
            setMessage("Dados atualizados com sucesso!")
        } catch (error) {
            console.error("Erro atualizando dados!", error)
            setError("Erro ao atualizar os dados.")
        }finally {
            setLoading(false);
          }

    }

    return (

        <div className="flex flex-col min-h-screen">
            <div className="flex-grow flex items-center justify-center gap-16">
                <div className="w-[244px] h-[790px] rounded-lg bg-primary-400" />


                <div className=" max-w-lg bg-white p-8 rounded-lg border border-primary-400 shadow-lg w-[420px]">
                    <div className="flex flex-col gap-3 mb-6">
                        <h2 className="text-3xl font-bold text-gray-800 ">Alterar cadastro</h2>
                    </div>
                    <form onSubmit={handleSubmitAll}>
                        <div class="mb-4">
                            <div className="flex justify-between">
                                <label htmlFor="nome">Nome: </label>
                                <span className="text-black/50">{userData.nome}</span>
                            </div>
                            <input className="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:ring-[#7DA632] focus:border-[#7DA632] p-4 text-lg" type="text" id="nome" value={nome} onChange={(e) => setNome(e.target.value)} />
                        </div>
                        <div class="mb-4">
                            <div className="flex justify-between">
                                <label htmlFor="email">Email: </label>
                                <span className="text-black/50">{userData.email}</span>
                            </div>
                            <input className="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:ring-[#7DA632] focus:border-[#7DA632] p-4 text-lg" type="text" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                        </div>
                        <div class="mb-4">
                            <div className="flex justify-between">
                                <label htmlFor="telefone">Telefone: </label>
                                <span className="text-black/50">{userData.telefone}</span>
                            </div>
                            <input className="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:ring-[#7DA632] focus:border-[#7DA632] p-4 text-lg" type="text" id="telefone" value={telefone} onChange={(e) => setTelefone(e.target.value)} />
                        </div>
                        <div class="mb-4">
                            <div className="flex justify-between">
                                <label htmlFor="endereco">Endereco: </label>
                                <span className="text-black/50">{userData.endereco}</span>
                            </div>
                            <input className="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:ring-[#7DA632] focus:border-[#7DA632] p-4 text-lg" type="text" id="endereco" value={endereco} onChange={(e) => setEndereco(e.target.value)} />
                        </div>
                        <div>
                            <div class="mb-4">
                                <label htmlFor="novaSenha">Trocar senha: </label>
                                <input className="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:ring-[#7DA632] focus:border-[#7DA632] p-4 text-lg" type="password" id="novaSenha" onChange={(e) => setNovaSenha(e.target.value)} />
                            </div>
                            <div class="mb-4">
                                <label htmlFor="novaSenha2">Confirmar nova senha: </label>
                                <input className="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:ring-[#7DA632] focus:border-[#7DA632] p-4 text-lg" type="password" id="novaSenha2" onChange={(e) => setNovaSenha2(e.target.value)} />
                            </div>
                        </div>



                        {error && (
                            <p className="text-red-500 text-sm text-center mb-4">{error}</p>
                        )}

                        {message && (
                            <p className="text-primary-300 text-sm text-center mb-4">{message}</p>
                        )}

                        <div className="mb-6">
                            <button
                                type="submit"
                                className="w-full bg-[#7DA632] text-white font-semibold py-3 px-4 rounded-md shadow-lg hover:bg-[#6b9132] transition duration-200"
                                disabled={loading}
                            >
                                {loading ? "..." : "Alterar dados"}
                            </button>
                        </div>
                    </form>
                </div>

                <div className="w-[244px] h-[790px] rounded-lg bg-primary-400" />
            </div>
        </div>

    )
}