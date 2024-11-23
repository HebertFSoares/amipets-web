import { Link } from "react-router-dom";

export default function PetGallery() {
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
          <button className="bg-[#7DA632] text-white px-6 py-3 rounded-lg">
            Pesquisar
          </button>
        </div>
      </div>

      <div className="container mx-auto mt-8 px-4">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
          {pets.map((pet) => (
            <div
              key={pet.id}
              className="bg-white rounded-lg shadow-lg overflow-hidden border-2"
              style={{
                width: "240px",
                height: "440px",
                borderColor: "#7DA632",
              }}
            >
              <img
                src={pet.imagem}
                alt={pet.nome}
                className="w-full h-40 object-cover"
              />
              <div className="p-4 space-y-1">
                <h3 className="text-lg font-bold text-[#7DA632] mb-2">
                  {pet.nome}
                </h3>
                <p className="text-sm text-gray-700 flex items-center">
                  <img
                    src="/assets/pata.png"
                    alt="Ícone de pata"
                    className="w-6 h-6 mr-2"
                  />
                  <strong>Espécie:</strong> {pet.especie}
                </p>
                <p className="text-sm text-gray-700 flex items-center">
                  <img
                    src="/assets/pata.png"
                    alt="Ícone de pata"
                    className="w-6 h-6 mr-2"
                  />
                  <strong>Data de Nasc.:</strong> {pet.dataNasc}
                </p>
                <p className="text-sm text-gray-700 flex items-center">
                  <img
                    src="/assets/pata.png"
                    alt="Ícone de pata"
                    className="w-6 h-6 mr-2"
                  />
                  <strong>Tamanho:</strong> {pet.tamanho}
                </p>
                <p className="text-sm text-gray-700 flex items-center">
                  <img
                    src="/assets/pata.png"
                    alt="Ícone de pata"
                    className="w-6 h-6 mr-2"
                  />
                  <strong>Personalidade:</strong> {pet.personalidade}
                </p>
              </div>
              <div className="p-4 flex justify-between">
                <Link
                  to={`/pets/${pet.id}`}
                  className="bg-[#7DA632] text-white px-4 py-2 rounded-lg text-sm"
                >
                  Adotar
                </Link>
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
    </div>
  );
}
