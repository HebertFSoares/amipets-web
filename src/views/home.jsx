import { useEffect, useState } from "react";
import { api } from "@/lib/apiWrapper";
import PetCard from "@/components/petCard";
import { Button } from "@/components/ui/button";
import { Mail, PhoneCall } from "lucide-react";

export default function HomePage() {
  const [pets, setPets] = useState([]);
  const [displayedPets, setDisplayedPets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [limit, setLimit] = useState(6);

  useEffect(() => {
    const fetchPets = async () => {
      try {
        const response = await api.get("pets");
        setPets(response.data);
        setError(null);
      } catch (err) {
        setError("Nenhum pet encontrado. Tente novamente mais tarde.");
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

  const handleAdopt = (petId) => {
    const authToken = localStorage.getItem("authToken");

    if (!authToken) {
      alert("Você precisa estar autenticado para adotar um pet.");
      return;
    }

    api
      .post(
        `pets/${petId}/adopt`,
        {},
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      )
      .then(() => {
        alert("Pet adotado com sucesso!");
      })
      .catch(() => {
        alert("Erro ao tentar adotar o pet. Tente novamente mais tarde.");
      });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <section className="py-12 px-4 ">
        <div className="flex flex-col-reverse md:flex-row md:items-center justify-center ">
          <div className="text-center md:text-left md:w-1/2">
            <h2 className="font-bold text-primary-200 mb-4 lg:text-4xl text-3xl   ">
              Seu novo melhor amigo está esperando por você
            </h2>
            <p className="text-base text-gray-600 mb-6 md:text-sm lg:text-lg">
              Na AmiPets, cada pet disponível para adoção está esperando por um
              lar cheio de amor. Venha conhecê-los e transforme a vida deles
              para melhor, enquanto faz parte de uma causa que acredita em lares
              felizes e menos abandono.
            </p>
            <Button
              className="bg-primary-400 text-white px-6 py-3 rounded-lg shadow text-sm hover:bg-primary-300"
              onClick={() => {
                const section = document.getElementById("Pets");
                if (section) {
                  section.scrollIntoView({ behavior: "smooth" });
                }
              }}
            >
              Conheça nossos animais
            </Button>
          </div>
          <img
            src="src/assets/images/pit.jpg"
            alt="Imagem de um cão"
            className="w-full md:w-1/2 md:object-contain lg:w-96 rounded-lg"
          />
        </div>
      </section>

      <section className="bg-primary-600 py-12" id="Pets">
        <div className="container mx-auto px-4">
          <h3 className="text-4xl font-bold text-white text-center mb-6 lg:text-3xl">
            Nossas criaturinhas
          </h3>


            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 justify-items-center">
              {/*
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
                  onAdopt={() => handleAdopt}
                />
              ))}
                */}
                <PetCard
                  id={1}
                  nome="Rex"
                  especie="Cachorro"
                  dataNasc="01/01/2019"
                  tamanho="Grande"
                  personalidade="Brincalhão"
                  imagem="src/assets/images/dog1.jpg"
                  onAdopt={() => handleAdopt}
                />
                <PetCard
                  id={1}
                  nome="Rex"
                  especie="Cachorro"
                  dataNasc="01/01/2019"
                  tamanho="Grande"
                  personalidade="Brincalhão"
                  imagem="src/assets/images/dog1.jpg"
                  onAdopt={() => handleAdopt}
                />
                <PetCard
                  id={1}
                  nome="Rex"
                  especie="Cachorro"
                  dataNasc="01/01/2019"
                  tamanho="Grande"
                  personalidade="Brincalhão"
                  imagem="src/assets/images/dog1.jpg"
                  onAdopt={() => handleAdopt}
                />
                <PetCard
                  id={1}
                  nome="Rex"
                  especie="Cachorro"
                  dataNasc="01/01/2019"
                  tamanho="Grande"
                  personalidade="Brincalhão"
                  imagem="src/assets/images/dog1.jpg"
                  onAdopt={() => handleAdopt}
                />
                <PetCard
                  id={1}
                  nome="Rex"
                  especie="Cachorro"
                  dataNasc="01/01/2019"
                  tamanho="Grande"
                  personalidade="Brincalhão"
                  imagem="src/assets/images/dog1.jpg"
                  onAdopt={() => handleAdopt}
                />
                <PetCard
                  id={1}
                  nome="Rex"
                  especie="Cachorro"
                  dataNasc="01/01/2019"
                  tamanho="Grande"
                  personalidade="Brincalhão"
                  imagem="src/assets/images/dog1.jpg"
                  onAdopt={() => handleAdopt}
                />
            </div>


          {!loading && !error && pets.length > limit && (
            <div className="flex justify-center mt-6">
              <Button
                className="bg-white text-primary-400 px-6 py-3 rounded-lg shadow border border-primary-400 text-sm hover:bg-gray-100"
                onClick={loadMorePets}
              >
                Veja mais
              </Button>
            </div>
          )}
        </div>
      </section>

      <section className="py-12 px-4 md:px-8">
        <h1 className="font-bold text-gray-800 py-6 text-center text-3xl lg:text-4xl">
          Por que adotar um pet?
        </h1>

        <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg border border-primary-400 shadow p-6 flex flex-col md:flex-row items-center gap-4">
            <img
              src="src/assets/images/mulher_cachorro.png"
              alt="Mulher segurando cachorro"
              className="w-24 h-24 md:w-32 md:h-32 object-cover"
            />
            <div className="text-center md:text-left">
              <h3 className="text-2xl font-bold text-gray-800 mb-2">
                Companhia
              </h3>
              <p className="text-gray-600">
                Pets são ótimos companheiros. Eles estão sempre dispostos a
                brincar, passear e fazer companhia nos momentos de lazer.
              </p>
            </div>
          </div>

          <div className="bg-white rounded-lg border border-primary-400 shadow p-6 flex flex-col md:flex-row items-center gap-4">
            <img
              src="src/assets/images/homem_gato.png"
              alt="Homem segurando gato"
              className="w-24 h-24 md:w-32 md:h-32 object-cover"
            />
            <div className="text-center md:text-left">
              <h3 className="text-2xl font-bold text-gray-800 mb-2">
                Mudança de vida
              </h3>
              <p className="text-gray-600">
                Adotar um pet é uma experiência transformadora. Você muda a vida
                de um animalzinho e ele muda a sua para melhor.
              </p>
            </div>
          </div>

          <div className="bg-white rounded-lg border border-primary-400 shadow p-6 flex flex-col md:flex-row items-center gap-4">
            <img
              src="src/assets/images/mulher_coracao.png"
              alt="Mulher com coração"
              className="w-24 h-24 md:w-32 md:h-32 object-cover"
            />
            <div className="text-center md:text-left">
              <h3 className="text-2xl font-bold text-gray-800 mb-2">
                Amor incondicional
              </h3>
              <p className="text-gray-600">
                Pets adotados são extremamente gratos e leais aos seus donos.
                Eles sabem que foram salvos e retribuem com muito amor e
                carinho.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="">
        <div className="">
          <div className="bg-primary-600 p-12 text-center">
            <h3 className="text-white text-xl">
              Não deixe de trazer amor e alegria ao adotar um pet.
            </h3>
            <h2 className="text-primary-300 text-xl font-bold mb-4">
              Para mais informações:
            </h2>
            <div className="flex justify-center gap-12 mt-5">
              <div className="">
                <Mail size={35} className="text-primary-300 inline-block" />

                <p className="text-gray-600 text-md">amipetsz@gmail.com</p>
              </div>
              <div>
                <PhoneCall
                  size={32}
                  className="text-primary-300 inline-block"
                />

                <p className="text-gray-600 text-md">(85) 998273477</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
