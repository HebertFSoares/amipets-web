import { useParams, Link } from "react-router-dom";

export default function PetDetail() {
  const { id } = useParams();
  const pets = [
    {
      id: 1,
      nome: "Magato Whiskas",
      especie: "Gato",
      dataNasc: "2023-01-15",
      tamanho: "Médio",
      personalidade: "Brincalhão",
      imagem: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTTGljO8Ivuniqps963BET_W2CW2cRUWab6sw&s",
    },
    {
      id: 2,
      nome: "Garuto Uzu Matu",
      especie: "Gato",
      dataNasc: "2022-06-10",
      tamanho: "Pequeno",
      personalidade: "Calma",
      imagem: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRWjsaOpJx4BA8xqdSFk0DqLbJYnxrn7ogmiw&s",
    },
    {
      id: 3,
      nome: "Itachi Whiskas",
      especie: "Gato",
      dataNasc: "2023-03-22",
      tamanho: "Pequeno",
      personalidade: "Independente",
      imagem: "https://down-br.img.susercontent.com/file/br-11134207-7r98o-lrpc2a9inlt0a1",
    },
    {
      id: 4,
      nome: "Maria Cheira Pum",
      especie: "Cachorra",
      dataNasc: "2021-11-15",
      tamanho: "Grande",
      personalidade: "Amorosa",
      imagem: "https://cdn0.peritoanimal.com.br/pt/posts/3/7/2/nomes_para_cadelas_pinscher_22273_orig.jpg",
    },
    {
      id: 5,
      nome: "Zé Corote",
      especie: "Cachorro",
      dataNasc: "2022-09-10",
      tamanho: "Médio",
      personalidade: "Bagunceiro",
      imagem: "https://i.imgur.com/wtqP8h7.png",
    },
    {
      id: 6,
      nome: "Coronel Te Cheiro o Peido",
      especie: "Cachorro",
      dataNasc: "2020-08-05",
      tamanho: "Grande",
      personalidade: "Protetor",
      imagem: "https://aquinoticias.com/wp-content/uploads/2024/07/Snapinsta.app_379413281_18013838515873221_6581482338551642786_n_1080-946x1024.jpg.webp",
    },
    {
      id: 7,
      nome: "Zé Pelanca",
      especie: "Cachorro",
      dataNasc: "2019-06-15",
      tamanho: "Grande",
      personalidade: "Fiel",
      imagem: "https://preview.redd.it/ko6g84zhi8b41.jpg?auto=webp&s=4b0b531285413833eb148a2fbf5b9f7070ba33a0",
    },
    {
      id: 8,
      nome: "Negão Quebra Coco",
      especie: "Cachorro",
      dataNasc: "2018-12-25",
      tamanho: "Grande",
      personalidade: "Carismático",
      imagem: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6Xj_ZVzmrtsGvliAefthoXz7mTwsn_VaFLA&s",
    },
  ];

  const pet = pets.find((pet) => pet.id === parseInt(id));

  const otherPets = pets.filter((pet) => pet.id !== parseInt(id));

  return (
    <div className="container mx-auto mt-8 px-4">
      {pet ? (
        <>
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex">
              <img
                src={pet.imagem}
                alt={pet.nome}
                className="w-1/3 rounded-lg object-cover"
              />
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
                    width: "240px",
                    height: "380px",
                  }}
                >
                  <img
                    src={pet.imagem}
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
