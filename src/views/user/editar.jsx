import { useAuth } from '@/hooks/auth/AuthProvider';
import { api } from '@/lib/apiWrapper';
import { useEffect, useState } from 'react';

export default function UserEditarPage() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');
  const [endereco, setEndereco] = useState('');
  const [novasenha, setNovaSenha] = useState('');
  const [novasenha2, setNovaSenha2] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [userData, setUserData] = useState({
    nome: '',
    email: '',
    telefone: '',
    endereco: '',
  });
  const user = useAuth();

  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await api.get(`adotante/${user.user.userId}`, {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        setUserData(response.data);
      } catch (error) {
        console.error('Erro obtendo usuário!', error);
      }
    };
    getUser();
  }, [user]);

  const handleSubmitAll = async (event) => {
    event.preventDefault();

    setLoading(true);
    setError('');
    try {
      const data = {
        nome: nome || userData.nome,
        email: email || userData.email,
        telefone: telefone || userData.telefone,
        endereco: endereco || userData.endereco,
      };

      if (novasenha) {
        if (novasenha != novasenha2) {
          setError('As senhas não coincidem!');
          throw new Error('Senhas não coincidem');
        }
        data.senha = novasenha;
      }
      const response = await api.put(`adotante/${user.user.userId}`, data, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      setMessage('Dados atualizados com sucesso!');
    } catch (error) {
      console.error('Erro atualizando dados!', error);
      setError('Erro ao atualizar os dados.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <div className="flex-grow flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16 p-4">
        {/* Coluna Lateral Oculta em Telas Menores */}
        <div className="hidden md:block w-[244px] h-[500px] md:h-[790px] rounded-lg bg-primary-400" />

        {/* Formulário */}
        <div className="max-w-md w-full bg-white p-6 md:p-8 rounded-lg border border-primary-400 shadow-lg">
          <div className="flex flex-col gap-3 mb-6">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800">Alterar cadastro</h2>
          </div>

          <form onSubmit={handleSubmitAll}>
            {/* Nome */}
            <div className="mb-4">
              <div className="flex justify-between">
                <label htmlFor="nome" className="text-sm md:text-base">
                  Nome:{' '}
                </label>
                <span className="text-black/50">{userData.nome}</span>
              </div>
              <input
                className="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:ring-[#7DA632] focus:border-[#7DA632] p-3 md:p-4 text-lg"
                type="text"
                id="nome"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
              />
            </div>

            {/* Email */}
            <div className="mb-4">
              <div className="flex justify-between">
                <label htmlFor="email" className="text-sm md:text-base">
                  Email:{' '}
                </label>
                <span className="text-black/50">{userData.email}</span>
              </div>
              <input
                className="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:ring-[#7DA632] focus:border-[#7DA632] p-3 md:p-4 text-lg"
                type="text"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            {/* Telefone */}
            <div className="mb-4">
              <div className="flex justify-between">
                <label htmlFor="telefone" className="text-sm md:text-base">
                  Telefone:{' '}
                </label>
                <span className="text-black/50">{userData.telefone}</span>
              </div>
              <input
                className="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:ring-[#7DA632] focus:border-[#7DA632] p-3 md:p-4 text-lg"
                type="text"
                id="telefone"
                value={telefone}
                onChange={(e) => setTelefone(e.target.value)}
              />
            </div>

            {/* Endereço */}
            <div className="mb-4">
              <div className="flex justify-between">
                <label htmlFor="endereco" className="text-sm md:text-base">
                  Endereço:{' '}
                </label>
                <span className="text-black/50">{userData.endereco}</span>
              </div>
              <input
                className="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:ring-[#7DA632] focus:border-[#7DA632] p-3 md:p-4 text-lg"
                type="text"
                id="endereco"
                value={endereco}
                onChange={(e) => setEndereco(e.target.value)}
              />
            </div>

            {/* Trocar Senha */}
            <div>
              <div className="mb-4">
                <label htmlFor="novaSenha" className="text-sm md:text-base">
                  Trocar senha:{' '}
                </label>
                <input
                  className="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:ring-[#7DA632] focus:border-[#7DA632] p-3 md:p-4 text-lg"
                  type="password"
                  id="novaSenha"
                  onChange={(e) => setNovaSenha(e.target.value)}
                />
              </div>

              <div className="mb-4">
                <label htmlFor="novaSenha2" className="text-sm md:text-base">
                  Confirmar nova senha:{' '}
                </label>
                <input
                  className="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:ring-[#7DA632] focus:border-[#7DA632] p-3 md:p-4 text-lg"
                  type="password"
                  id="novaSenha2"
                  onChange={(e) => setNovaSenha2(e.target.value)}
                />
              </div>
            </div>

            {/* Mensagens de erro e sucesso */}
            {error && <p className="text-red-500 text-sm text-center mb-4">{error}</p>}

            {message && <p className="text-primary-300 text-sm text-center mb-4">{message}</p>}

            {/* Botão de Submit */}
            <div className="mb-6">
              <button
                type="submit"
                className="w-full bg-[#7DA632] text-white font-semibold py-3 px-4 rounded-md shadow-lg hover:bg-[#6b9132] transition duration-200"
                disabled={loading}
              >
                {loading ? '...' : 'Alterar dados'}
              </button>
            </div>
          </form>
        </div>

        {/* Coluna Lateral Oculta em Telas Menores */}
        <div className="hidden md:block w-[244px] h-[500px] md:h-[790px] rounded-lg bg-primary-400" />
      </div>
    </div>
  );
}
