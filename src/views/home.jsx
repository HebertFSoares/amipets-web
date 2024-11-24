import { useEffect, useState } from "react";
import axios from "axios";
import PetCard from "@/components/petCard";
import { Button } from "@/components/ui/button";

export default function HomePage() {
  const [pets, setPets] = useState([]);
  const [displayedPets, setDisplayedPets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [limit, setLimit] = useState(6);

  useEffect(() => {
    const fetchPets = async () => {
      const authToken = localStorage.getItem("authToken");

      if (!authToken) {
        setError("Token de autenticação não encontrado.");
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get("http://localhost:3000/api/pets", {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        });
        setPets(response.data);
      } catch (err) {
        setError("Erro ao carregar os pets.");
      } finally {
        setLoading(false);
      }
    };

    fetchPets();
  }, []);

  useEffect(() => {
    setDisplayedPets(pets.slice(0, limit));
  }, [pets, limit]);

  const loadMorePets = () => {
    setLimit(limit + 6);
  };

  if (loading) {
    return <div className="text-center py-4">Carregando...</div>;
  }

  if (error) {
    return <div className="text-center py-4">{error}</div>;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <section className="bg-[#EDF8E4] py-12">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            Seu novo melhor amigo está esperando por você
          </h2>
          <p className="text-lg text-gray-600 mb-6">
            Conheça nossos pets disponíveis para adoção e mude a vida deles para
            melhor.
          </p>
          <div className="flex justify-center space-x-4">
            <Button className="bg-primary-400 text-white px-6 py-2 rounded-lg shadow hover:bg-primary-300">
              Quem somos
            </Button>
            <Button className="bg-primary-400 text-white px-6 py-2 rounded-lg shadow hover:bg-primary-300">
              Pets
            </Button>
            <Button className="bg-primary-400 text-white px-6 py-2 rounded-lg shadow hover:bg-primary-300">
              Voluntários
            </Button>
            <Button className="bg-primary-400 text-white px-6 py-2 rounded-lg shadow hover:bg-primary-300">
              Contato
            </Button>
          </div>
        </div>
      </section>

      <section className="bg-primary-400 py-12">
        <div className="container mx-auto px-4">
          <h3 className="text-2xl font-bold text-white text-center mb-6">
            Nossas criaturinhas
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 justify-items-center">
            {displayedPets.map((pet) => (
              <PetCard
                key={pet.id}
                id={pet.id}
                nome={pet.nome}
                especie={pet.especie}
                dataNasc={pet.dataNasc}
                tamanho={pet.tamanho}
                personalidade={pet.personalidade}
                imagem={pet.foto}
              />
            ))}
          </div>

          <div className="flex justify-center mt-6">
            <Button
              className="bg-white text-primary-400 px-6 py-3 rounded-lg shadow border border-primary-400 text-sm hover:bg-gray-100"
              onClick={loadMorePets}
            >
              Veja mais
            </Button>
          </div>
        </div>
      </section>

      <section className="bg-gray-200 py-12">
        <div className="container mx-auto px-4">
          <h3 className="text-2xl font-bold text-gray-800 text-center mb-6">
            Por que adotar conosco?
          </h3>
          <ul className="space-y-4 text-center">
            <li className="text-gray-600">
              <span className="mr-2">✔</span> Pets saudáveis e vacinados
            </li>
            <li className="text-gray-600">
              <span className="mr-2">✔</span> Orientação durante a adoção
            </li>
            <li className="text-gray-600">
              <span className="mr-2">✔</span> Apoio pós-adoção
            </li>
          </ul>
        </div>
      </section>

      <section className="bg-gray-100 py-12">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white rounded-lg shadow p-6 text-center">
            <p className="text-gray-800 mb-4">
              Não deixe de trazer amor e alegria ao adotar um pet. Para
              informações:
            </p>
            <p className="text-gray-600">Telefone: (XX) XXXX-XXXX</p>
            <p className="text-gray-600">Email: contato@adote.com</p>
          </div>
        </div>
      </section>
    </div>
  );
}
