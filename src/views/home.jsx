import PetCard from "@/components/petCard";
import { Button } from "@/components/ui/button";

export default function HomePage() {
  const pets = [
    {
      id: 1,
      nome: "Magato Whiskas",
      especie: "Gato",
      dataNasc: "2023-01-15",
      tamanho: "Médio",
      personalidade: "Brincalhão",
      imagem:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTTGljO8Ivuniqps963BET_W2CW2cRUWab6sw&s",
    },
    {
      id: 2,
      nome: "Garuto Uzu Matu",
      especie: "Gato",
      dataNasc: "2022-06-10",
      tamanho: "Pequeno",
      personalidade: "Calma",
      imagem:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRWjsaOpJx4BA8xqdSFk0DqLbJYnxrn7ogmiw&s",
    },
    {
      id: 3,
      nome: "Itachi Whiskas",
      especie: "Gato",
      dataNasc: "2023-03-22",
      tamanho: "Pequeno",
      personalidade: "Independente",
      imagem:
        "https://down-br.img.susercontent.com/file/br-11134207-7r98o-lrpc2a9inlt0a1",
    },
    {
      id: 4,
      nome: "Maria Cheira Pum",
      especie: "Cachorra",
      dataNasc: "2021-11-15",
      tamanho: "Grande",
      personalidade: "Amorosa",
      imagem:
        "https://cdn0.peritoanimal.com.br/pt/posts/3/7/2/nomes_para_cadelas_pinscher_22273_orig.jpg",
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
      imagem:
        "https://aquinoticias.com/wp-content/uploads/2024/07/Snapinsta.app_379413281_18013838515873221_6581482338551642786_n_1080-946x1024.jpg.webp",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <section className="bg-[#EDF8E4] py-12">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold text-gray-800">
            Seu novo melhor amigo está esperando por você
          </h2>
          <p className="mt-4 text-gray-600">
            Conheça nossos pets disponíveis para adoção e mude a vida deles para
            melhor.
          </p>
          <div className="mt-6 flex justify-center space-x-4">
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
          <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-6">
            {pets.map((pet) => (
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
            ))}
          </div>

          <div className="flex justify-center mt-6">
            <Button className="bg-white text-primary-400 px-4 py-2 rounded-lg shadow border border-primary-400 text-sm hover:bg-gray-100">
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
          <ul className="space-y-4">
            <li className="flex items-center text-gray-600">
              <span className="mr-2">✔</span> Pets saudáveis e vacinados
            </li>
            <li className="flex items-center text-gray-600">
              <span className="mr-2">✔</span> Orientação durante a adoção
            </li>
            <li className="flex items-center text-gray-600">
              <span className="mr-2">✔</span> Apoio pós-adoção
            </li>
          </ul>
        </div>
      </section>

      <section className="bg-gray-100 py-12">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white rounded-lg shadow p-4">
            <p className="text-gray-800">
              Não deixe de trazer amor e alegria ao adotar um pet. Para
              informações:
            </p>
            <p className="text-gray-600 mt-2">Telefone: (XX) XXXX-XXXX</p>
            <p className="text-gray-600">Email: contato@adote.com</p>
          </div>
        </div>
      </section>
    </div>
  );
}
