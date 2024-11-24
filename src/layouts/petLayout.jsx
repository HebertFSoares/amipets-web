import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";

export default function PetDetail() {
  const { id } = useParams();
  const [pet, setPet] = useState(null);
  const [otherPets, setOtherPets] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('authToken');

    if (!token) {
      setError('Token de autenticação não encontrado.');
      return;
    }

    const fetchPetData = async () => {
      try {
        const petResponse = await axios.get(`http://localhost:3000/api/pets/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setPet(petResponse.data);
        const otherPetsResponse = await axios.get('http://localhost:3000/api/pets', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

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
            <strong>Data de Nascimento:</strong> {pet.dataNasc}
          </p>
          <p className="text-lg text-gray-700">
            <strong>Tamanho:</strong> {pet.tamanho}
          </p>
          <p className="text-lg text-gray-700">
            <strong>Personalidade:</strong> {pet.personalidade}
          </p>
          <div className="flex space-x-4">
            <Link
              to={`/adotar/${pet.id}`}
              className="bg-[#7DA632] text-white px-6 py-3 rounded-lg"
            >
              Adotar
            </Link>
            <Link
              to={`/adotar/${pet.id}`}
              className="bg-[#7DA632] text-white px-6 py-3 rounded-lg"
            >
              Saiba mais
            </Link>
          </div>
        </div>
      </div>
    </div>
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
