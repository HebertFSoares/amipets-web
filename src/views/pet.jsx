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

        const otherPetsResponse = await api.get("pets");
        setOtherPets(otherPetsResponse.data.filter((p) => p.id !== parseInt(id)));
      } catch (err) {
        setError("Erro ao buscar os dados do pet: " + err.message);
        console.error(err);
      }
    };

    fetchPetData();
  }, [id]);

  const formatDate = (date) => {
    const options = { year: "numeric", month: "2-digit", day: "2-digit" };
    return new Date(date).toLocaleDateString("pt-BR", options);
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
      return personalidade.join(", ");
    }
    return personalidade || "";
  };

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div className="container mx-auto mt-8 px-4">
      {pet ? (
        <>
          {/* Detalhes do Pet */}
          <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6">
            <div className="flex flex-col md:flex-row">
              {/* Imagem do Pet */}
              <div className="w-full md:w-1/3 h-64 sm:h-80 md:h-96 overflow-hidden rounded-lg">
                <img
                  src={pet.foto}
                  alt={pet.nome}
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Informações do Pet */}
              <div className="mt-6 md:mt-0 md:ml-8 space-y-4">
                <h1 className="text-2xl sm:text-3xl font-bold text-[#7DA632]">{pet.nome}</h1>
                <p className="text-base sm:text-lg text-gray-700">
                  <strong>Espécie:</strong> {pet.especie}
                </p>
                <p className="text-base sm:text-lg text-gray-700">
                  <strong>Data de Nascimento:</strong> {formatDate(pet.dataNascimento)}
                </p>
                <p className="text-base sm:text-lg text-gray-700">
                  <strong>Tamanho:</strong> {pet.tamanho}
                </p>
                <p className="text-base sm:text-lg text-gray-700">
                  <strong>Personalidade:</strong> {formatPersonalidade(pet.personalidade)}
                </p>
                <p className="text-base sm:text-lg text-gray-700">
                  <strong>Descrição:</strong> {pet.descricao}
                </p>
                <p className="text-base sm:text-lg text-gray-700">
                  <strong>Status:</strong> {formatStatus(pet.status)}
                </p>
                <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                  {pet.status === "0" && (
                    <button
                      onClick={() => setIsModalOpen(true)}
                      className="bg-[#7DA632] text-white px-6 py-3 rounded-lg w-full sm:w-auto"
                    >
                      Adotar
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Modal de Adoção */}
          <ModalAdocao
            isOpen={isModalOpen}
            closeModal={() => setIsModalOpen(false)}
            pet={pet}
          />

          {/* Outros Pets */}
          <div className="mt-8">
            <h2 className="text-xl sm:text-2xl font-bold text-[#7DA632]">Outros Pets</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mt-6">
              {otherPets.map((pet) => (
                <div
                  key={pet.id}
                  className="bg-white rounded-lg shadow-lg overflow-hidden"
                >
                  <img
                    src={pet.foto}
                    alt={pet.nome}
                    className="w-full h-40 sm:h-48 object-cover"
                  />
                  <div className="p-4 space-y-2">
                  <h3 className="text-lg font-bold text-[#7DA632] h-6 overflow-hidden text-ellipsis whitespace-nowrap">{pet.nome}</h3>
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
                      className="bg-[#7DA632] text-white px-4 py-2 rounded-lg text-sm block text-center"
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
        <p className="text-center text-gray-700">Pet não encontrado.</p>
      )}
    </div>
  );
}
