import { Fragment, useState, useEffect } from 'react';
import { Transition, Dialog } from '@headlessui/react';
import { jwtDecode } from "jwt-decode";
import { api } from '@/lib/apiWrapper';

export default function ModalAdocao({ isOpen, closeModal, pet, status, adocaoId }) {
  const [isRequestSent, setIsRequestSent] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [adotanteId, setAdotanteId] = useState(null);
  const [adocaoStatus, setAdocaoStatus] = useState(null);
  const [isStatusLoading, setIsStatusLoading] = useState(true);

  const token = localStorage.getItem('authToken');

  useEffect(() => {
    if (isOpen && pet.id) {
      console.log("ID do pet:", pet.id);
      const fetchStatus = async () => {
        try {
          setIsStatusLoading(true);
          console.log("Requisitando status para o pet com id:", pet.id); 
          
          const response = await api.get(`/adocao/pet/${pet.id}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          if (response.data && response.data.status) {
            setAdocaoStatus(response.data.status);
          } else {
            setError("Status da adoção não encontrado.");
          }
        } finally {
          setIsStatusLoading(false);
        }
      };

      fetchStatus();
    }
  }, [isOpen, pet.id]);
  
  useEffect(() => {
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        setAdotanteId(decodedToken.userId);
      } catch (err) {
        console.error("Erro ao decodificar o token:", err.message);
        setError("Erro de autenticação. Faça login novamente.");
      }
    }
  }, [token]);

  const statusSteps = [
    { id: 1, title: 'Solicitação Enviada', active: adocaoStatus === 'SOLICITACAO_ENVIADA' || adocaoStatus === 'EM_ANALISE' || adocaoStatus === 'APROVADO' },
    { id: 2, title: 'Em Análise', active: adocaoStatus === 'EM_ANALISE' || adocaoStatus === 'APROVADO' },
    { id: 3, title: 'Aprovado', active: adocaoStatus === 'APROVADO' },
  ];
  
  const handleRequestSubmit = async () => {
    setLoading(true);
    setError("");

    try {
      if (!token) {
        setError("Você precisa estar autenticado para fazer uma solicitação.");
        return;
      }

      if (!adotanteId) {
        setError("Não foi possível identificar o adotante. Faça login novamente.");
        return;
      }

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await api.post(
        '/adocao',
        {
          adotanteId,
          petId: pet.id,
        },
        config
      );

      if (response.status === 200) {
        setIsRequestSent(true);
        console.log("Solicitação de adoção enviada com sucesso!", response.data);
      }
    } catch (err) {
      setError("Erro ao enviar solicitação de adoção. Tente novamente.");
      console.error("Erro ao enviar solicitação:", err.response?.data || err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={closeModal}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-lg sm:max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <div className="flex flex-col items-center justify-between sm:flex-row sm:space-x-4">
                  {statusSteps.map((step) => (
                    <div key={step.id} className="flex flex-col items-center">
                      <div className={`flex items-center justify-center w-10 h-10 rounded-full text-sm font-bold ${step.active ? 'bg-[#7DA632] text-white' : 'bg-gray-300 text-gray-500'}`}>
                        {step.id}
                      </div>
                      <div className={`mt-2 text-sm ${step.active ? 'text-[#7DA632]' : 'text-gray-400'}`}>
                        {step.title}
                      </div>
                    </div>
                  ))}
                </div>

                <Dialog.Title as="h3" className="text-lg md:text-xl font-bold leading-6 text-gray-900">
                  Adote {pet?.nome || 'um Pet'}
                </Dialog.Title>

                <div className="mt-4 space-y-2">
                  <p className="text-sm text-gray-500">
                    <strong>Espécie:</strong> {pet?.especie || 'Não informado'}
                  </p>
                  <p className="text-sm text-gray-500">
                    <strong>Tamanho:</strong> {pet?.tamanho || 'Não informado'}
                  </p>
                  <p className="text-sm text-gray-500">
                    <strong>Idade:</strong> {pet?.idade || 'Não informado'}
                  </p>
                  <p className="text-sm text-gray-500">
                    <strong>Descrição:</strong> {pet?.descricao || 'Sem descrição'}
                  </p>
                </div>

                <div className="mt-4 bg-[#F5F8E6] p-4 rounded-lg">
                  <p className="text-sm" style={{ color: '#7DA632' }}>
                    Verifique o status acima. Qualquer dúvida, entre em contato com o suporte.
                  </p>
                  {error && <p className="text-red-500 text-sm">{error}</p>}
                </div>

                <div className="mt-6 flex justify-end space-x-4 w-full">
                  <button
                    type="button"
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300"
                    onClick={closeModal}
                  >
                    Cancelar
                  </button>

                  {!isRequestSent &&
                    adocaoStatus !== 'SOLICITACAO_ENVIADA' &&
                    adocaoStatus !== 'EM_ANALISE' &&
                    adocaoStatus !== 'APROVADO' && (
                      <button
                        type="button"
                        className="px-4 py-2 text-sm font-medium text-white"
                        style={{ backgroundColor: '#7DA632' }}
                        onClick={handleRequestSubmit}
                        disabled={loading}
                      >
                        {loading ? 'Enviando...' : 'Enviar Solicitação'}
                      </button>
                    )}
                </div>
              </Dialog.Panel>

            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
