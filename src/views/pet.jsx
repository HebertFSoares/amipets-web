import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { api } from "@/lib/apiWrapper";
import ModalAdocao from "@/components/ModalAdocao";

export default function PetDetail() {
  const { id } = useParams();
  const [pet, setPet] = useState(null);
  const [otherPets, setOtherPets] = useState([]);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  useEffect(() => {
    const fetchPetData = async () => {
      try {
        const petResponse = await api.get(`pets/${id}`);
        setPet(petResponse.data);

        const otherPetsResponse = await api.get('pets');
        setOtherPets(otherPetsResponse.data.filter((p) => p.id !== parseInt(id)));

      } catch (err) {
        setError('Erro ao buscar os dados do pet: ' + err.message);
        console.error(err);
      }
    };

    fetchPetData();
  }, [id]);

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  const formatDate = (date) => {
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    return new Date(date).toLocaleDateString('pt-BR', options);
  };

  const formatStatus = (status) => {
    if (status === "0") {
      return <span className="text-green-500 font-bold">Disponível para adoção</span>;
    } else if (status === "1") {
      return <span className="text-red-500 font-bold">Adotado</span>;
    }
    return <span className="text-gray-500">Status desconhecido</span>;
  };

  const formatPersonalidade = (personalidade) => {
    if (Array.isArray(personalidade)) {
      return personalidade.join(', ');
    }
    return personalidade || '';
  };
  
  return (
    <div className="container mx-auto mt-8 px-4">
      {pet ? (
        <>
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex">
              <div className="w-1/3 h-96 overflow-hidden rounded-lg">
                <img
                  src={pet.foto}
                  alt={pet.nome}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="ml-8 space-y-4">
                <h1 className="text-3xl font-bold text-[#7DA632]">{pet.nome}</h1>
                <p className="text-lg text-gray-700">
                  <strong>Espécie:</strong> {pet.especie}
                </p>
                <p className="text-lg text-gray-700">
                  <strong>Data de Nascimento:</strong> {formatDate(pet.dataNascimento)}
                </p>
                <p className="text-lg text-gray-700">
                  <strong>Tamanho:</strong> {pet.tamanho}
                </p>
                <p className="text-lg text-gray-700">
                  <strong>Personalidade:</strong> {formatPersonalidade(pet.personalidade)}
                </p>
                <p className="text-lg text-gray-700">
                  <strong>Descrição:</strong> {pet.descricao}
                </p>
                <p className="text-lg text-gray-700">
                  <strong>Status:</strong> {formatStatus(pet.status)}
                </p>
                <div className="flex space-x-4">
                  {pet.status === "0" && (
                    <button
                      onClick={() => setIsModalOpen(true)}
                      className="bg-[#7DA632] text-white px-6 py-3 rounded-lg"
                    >
                      Adotar
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>

          <ModalAdocao
            isOpen={isModalOpen}
            closeModal={() => setIsModalOpen(false)}
            pet={pet}
          />

          <div className="mt-8">
            <h2 className="text-2xl font-bold text-[#7DA632]">Outros Pets</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-6">
              {otherPets.map((pet) => (
                <div
                  key={pet.id}
                  className="bg-white rounded-lg shadow-lg overflow-hidden"
                  style={{
                    width: "300px",
                    height: "400px",
                  }}
                >
                  <img
                    src={pet.foto}
                    alt={pet.nome}
                    className="w-full h-40 object-cover"
                  />
                  <div className="p-4 space-y-2">
                    <h3 className="text-lg font-bold text-[#7DA632]">{pet.nome}</h3>
                    <p className="text-sm text-gray-700">
                      <strong>Espécie:</strong> {pet.especie}
                    </p>
                    <p className="text-sm text-gray-700">
                      <strong>Tamanho:</strong> {pet.tamanho}
                    </p>
                  </div>
                  <div className="p-4">
                    <Link
                      to={`/pets/${pet.id}`}
                      className="bg-[#7DA632] text-white px-4 py-2 rounded-lg text-sm"
                    >
                      Saiba mais
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      ) : (
        <p>Pet não encontrado.</p>
      )}
    </div>
  );
}
