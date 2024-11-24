import { Card, CardHeader, CardContent, CardFooter } from "./ui/card";
import { Button } from "./ui/button";
//import { Star } from "react-iconly";
import { Link } from "react-router-dom";

export default function PetCard({
  id,
  nome,
  especie,
  dataNasc,
  tamanho,
  personalidade,
  imagem,
}) {
  return (
    <div>
      <Card className="w-[350px]">
        <CardHeader>
          <img className="h-36 object-cover" src={imagem} alt={nome} />
        </CardHeader>
        <CardContent>
          <h1 className="text-md font-bold text-gray-800">{nome}</h1>
          <p className="text-sm flex items-center justify-start gap-1">
            <span>🐾</span> Espécie: {especie}
          </p>
          <p className="text-sm flex items-center justify-start gap-1">
            <span>🐾</span> Data Nasc: {dataNasc}
          </p>
          <p className="text-sm flex items-center justify-start gap-1">
            <span>🐾</span> Tamanho: {tamanho}
          </p>
          <p className="text-sm flex items-center justify-start gap-1">
            <span>🐾</span> Personalidade:
            <span className="italic">{personalidade}</span>
          </p>
        </CardContent>
        <CardFooter className="flex flex-col">
          <div className="flex gap-3 w-full">
            <Button className="bg-primary-400 text-white hover:bg-primary-300">
              <Link to={`/pets/${id}`}>Adotar</Link>
            </Button>
            {/*
            <Button className="bg-primary-400 text-white text-sm py-1 rounded hover:bg-primary-300 w-[25%]">
              <Star size={24} />
            </Button>
              */}
          </div>

          <Link
            className=" mt-3 inline-flex h-10 px-4 py-2 items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 bg-white text-primary-400 border-2 border-primary-600 hover:bg-gray-100 w-full"
            to={`/pets/${id}`}
          >
            Saiba Mais
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
