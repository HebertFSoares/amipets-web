import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import PetCard from "@/components/petCard";
import { api } from "@/lib/apiWrapper";

export default function PetGallery() {
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchPets = async () => {
    try {
      const response = await api.get("pets");
      const data = response.data;

      if (Array.isArray(data)) {
        const formattedData = data.map((pet) => ({
          id: pet.id,
          nome: pet.nome,
          especie: pet.especie,
          dataNasc: pet.dataNascimento
            ? new Date(pet.dataNascimento).toLocaleDateString("pt-BR") 
            : "N/A",
          tamanho: pet.tamanho || "N/A",
          personalidade: pet.personalidade?.join(", ") || "N/A",
          imagem: pet.foto || "https://via.placeholder.com/150",
        }));

        setPets(formattedData);
      } else {
        console.error("Resposta inesperada da API:", data);
      }

      setLoading(false);
    } catch (error) {
      console.error("Erro ao buscar os pets:", error.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPets();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <div className="container mx-auto mt-8 px-4">
        <div className="bg-white p-6 rounded-lg shadow-md flex space-x-4">
          <select className="border border-gray-300 rounded-lg p-3">
            <option value="">Espécie</option>
            <option value="Cachorro">Cachorro</option>
            <option value="Gato">Gato</option>
          </select>
          <select className="border border-gray-300 rounded-lg p-3">
            <option value="">Tamanho</option>
            <option value="Pequeno">Pequeno</option>
            <option value="Médio">Médio</option>
            <option value="Grande">Grande</option>
          </select>
          <input
            type="text"
            placeholder="Personalidade"
            className="border border-gray-300 rounded-lg p-3 flex-grow"
          />
          <input
            type="text"
            placeholder="Nome"
            className="border border-gray-300 rounded-lg p-3 flex-grow"
          />
          <Button className="bg-[#7DA632] text-white px-6 py-3 rounded-lg">
            Pesquisar
          </Button>
        </div>
      </div>

      <div className="container mx-auto mt-8 px-4">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
          {loading ? (
            <p>Carregando...</p>
          ) : (
            pets.map((pet) => (
              <PetCard
                key={pet.id}
                id={pet.id}
                nome={pet.nome}
                especie={pet.especie}
                dataNasc={pet.dataNasc}
                tamanho={pet.tamanho}
                personalidade={pet.personalidade}
                imagem={pet.imagem}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}
