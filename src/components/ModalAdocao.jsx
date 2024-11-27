import { Fragment, useState } from 'react';
import { Transition, Dialog } from '@headlessui/react';

export default function ModalAdocao({ isOpen, closeModal, pet, status }) {
  const [isRequestSent, setIsRequestSent] = useState(false);

  const statusSteps = [
    { id: 1, title: 'Solicitação Enviada', active: isRequestSent || status === 'analisando' || status === 'aprovado' },
    { id: 2, title: 'Em Análise', active: status === 'analisando' || status === 'aprovado' },
    { id: 3, title: 'Aprovado', active: status === 'aprovado' },
  ];

  const handleRequestSubmit = () => {
    setIsRequestSent(true);
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
              <Dialog.Panel className="w-full max-w-xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <div className="mb-6">
                  <div className="flex items-center justify-between">
                    {statusSteps.map((step, index) => (
                      <div key={step.id} className="flex flex-col items-center">
                        <div
                          className={`flex items-center justify-center w-10 h-10 rounded-full text-sm font-bold ${
                            step.active ? 'bg-[#7DA632] text-white' : 'bg-gray-300 text-gray-500'
                          }`}
                        >
                          {step.id}
                        </div>
                        <div
                          className={`mt-2 text-sm ${
                            step.active ? 'text-[#7DA632]' : 'text-gray-400'
                          }`}
                        >
                          {step.title}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <Dialog.Title
                  as="h3"
                  className="text-lg font-bold leading-6 text-gray-900"
                >
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
                    {isRequestSent
                      ? 'Sua solicitação está sendo analisada. Você será notificado por e-mail quando o status for atualizado.'
                      : 'Clique em "Enviar Solicitação" para iniciar o processo de adoção. Após o envio, você será notificado por e-mail com o status de sua solicitação.'}
                  </p>
                </div>

                <div className="mt-6 flex justify-end space-x-4">
                  <button
                    type="button"
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300"
                    onClick={closeModal}
                  >
                    Cancelar
                  </button>
                  {!isRequestSent && (
                    <button
                      type="button"
                      className="px-4 py-2 text-sm font-medium text-white"
                      style={{ backgroundColor: '#7DA632' }}
                      onClick={handleRequestSubmit}
                    >
                      Enviar Solicitação
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
